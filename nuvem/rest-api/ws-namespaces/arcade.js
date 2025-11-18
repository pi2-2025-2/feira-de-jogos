const jwt = require("jsonwebtoken");
const { ioMachine, app } = require("../http-server.js"); 
const Joi = require("joi");
const db = require("../db.js");

const coinInsertedSchema = Joi.object({
  arcade: Joi.number().integer().positive().allow(0).required(),
  operation: Joi.number().integer().positive().allow(0).required(),
});

const machinesStatus = new Map();

async function getArcadeToken() {
  const result = await db.query(
    'SELECT "token" FROM "machines" WHERE "name" like \'arcade-%\' LIMIT 1;'
  );
  return process.env.TOKEN_SECRET_KEY_ARCADE || result.rows[0].token;
}

ioMachine.of("/arcade").use(async (socket, next) => {
  try {
    const token = socket.handshake.auth.token;
    const secretKeyArcade = await getArcadeToken();
    jwt.verify(token, secretKeyArcade);
    next();
  } catch (error) {
    console.error("Authentication error", error);
    next(new Error("Authentication error"));
  }
});

ioMachine.of("/arcade").on("connection", (socket) => {
  
  socket.on("ping", (data) => {
    console.log("ping received:", JSON.stringify(data));

    machinesStatus.set(data.id, {
      machine: data.machine,      
      lastPing: Date.now(),
    });
  });

  socket.on("coinInserted", (data) => {
    const { error } = coinInsertedSchema.validate(data);
    if (error) {
      console.log(error);
      return;
    }

    console.log("coinInserted", data);

    const { arcade, operation } = data;
    db.query(
      'UPDATE "operations" SET "completed" = true WHERE "id" = $1;',
      [operation],
      (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(`Coin inserted: arcade ${arcade}, operation ${operation}`);
      }
    );
  });

});

app.get("/health", (req, res) => {
  const status = [];

  for (const [id, info] of machinesStatus.entries()) {
    status.push({
      id,
      machine: info.machine,
      lastPing: info.lastPing,
      alive: Date.now() - info.lastPing < 5000,
    });
  }

  res.json(status);
});
