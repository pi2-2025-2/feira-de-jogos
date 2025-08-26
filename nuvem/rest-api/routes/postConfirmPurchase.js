const express = require("express");
const router = express.Router();
const { OAuth2Client } = require("google-auth-library");
const Joi = require("joi");
const client = new OAuth2Client();
const audience = process.env.GOOGLE_CLIENT_ID.split(" ");
const db = require("../db.js");

const transferSchema = Joi.object({
  purchaseId: Joi.number().integer().positive().allow(0).required(),
});

router.post("/confirmPurchase", async (req, res) => {
  let payload;
  let email;
  try {
    const ticket = await client.verifyIdToken({
      audience,
      idToken: req.token,
    });
    payload = ticket.getPayload();
    email = payload.email;
  } catch (err) {
    console.error(err);
    return res.sendStatus(401);
  }

  try {
    const { error } = transferSchema.validate(req.body);
    if (error) {
      return res.status(400).send({ error: error.details[0].message });
    }

    const auth = await db.query(
      'SELECT "id" FROM "people" WHERE "email" = $1 and "operator" = true',
      [email],
    );
    if (auth.rowCount === 0) {
      return res.sendStatus(401);
    }

    const { purchaseId } = req.body;
    const purchaseSearch = await db.query(
      'select * from "operations" where id = $1 and completed = false;',
      [purchaseId],
    );
    if (purchaseSearch.rowCount === 0) {
      return res.status(404).send("Compra não encontrada");
    }

    const operation = purchaseSearch.rows[0];
    const fromId = operation.from;
    const productValue = operation.value;
    const productId = operation.product;



    let expenses = await db.query(
      'SELECT COALESCE(SUM("value"), 0) AS sum FROM "operations" WHERE "from" = $1 and "completed" = true',
      [fromId],
    );
    expenses = parseInt(expenses.rows[0].sum);

    let revenues = await db.query(
      'SELECT COALESCE(SUM("value"), 0) AS sum FROM "operations" WHERE "to" = $1 and "completed" = true',
      [fromId],
    );
    revenues = parseInt(revenues.rows[0].sum);

    let BalanceValue = revenues - expenses;
    if (productValue > BalanceValue) {
      return res.status(402).send("Saldo Insuficiente");
    }

    const productSearch = await db.query(
      'SELECT "type" FROM "products" WHERE "id" = $1',
      [productId],
    );
    
    if (productSearch.rowCount === 0) {
      return res.status(403).send("Produto Inexistente");
    }
    const machineType = productSearch.rows[0].type;

    const typeSearch = await db.query(
      'SELECT "name" FROM "types" WHERE "id" = $1',
      [machineType],
    );

    if (typeSearch.rows[0].name != "foods"){
      return res.status(403).send("Tipo de Produto Invalido");
    }

    const stockSearch = await db.query(
      'SELECT "quantity" FROM "stock" WHERE "product" = $1;',
      [productId],
    );

    if (stockSearch.rowCount === 0 || stockSearch.rows[0].quantity == 0) {
      return res.status(403).send("Produto Fora de Estoque");
    }


    const updateResult = await db.query(
      'UPDATE "operations" SET "completed" = true WHERE "id" = $1;',
      [purchaseId]
    );

    return res.status(200).send("Compra Confirmada com Sucesso!");
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
});

module.exports = router;
