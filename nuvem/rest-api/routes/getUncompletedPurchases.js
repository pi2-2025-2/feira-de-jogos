const express = require("express");
const router = express.Router();
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();
const audience = process.env.GOOGLE_CLIENT_ID.split(" ");
const db = require("../db.js");

router.get("/uncompletedPurchases", async (req, res) => {
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
    const auth = await db.query(
      'SELECT "id" FROM "people" WHERE "email" = $1 and "operator" = true',
      [email]
    );
    if (auth.rowCount === 0) {
      return res.sendStatus(401);
    }

    let purchasesSearch = await db.query(
      "SELECT o.id, peoplefrom.name AS from_name, o.to, products.name AS product_name, o.value, o.date, o.mfa, o.completed FROM operations AS o JOIN people AS peoplefrom ON o.from = peoplefrom.id JOIN products ON o.product = products.id WHERE o.completed = FALSE AND products.type = (SELECT id FROM types WHERE name = 'foods' LIMIT 1) ORDER BY o.date DESC;"
    );
    const purchases = purchasesSearch.rows.map((purchase) => ({
      id: purchase.id,
      from: purchase.from_name,
      to: purchase.to,
      product: purchase.product_name,
      value: purchase.value,
      timestamp: purchase.date,
      completed: purchase.completed,
    }));

    return res.status(200).json(purchases);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
});

module.exports = router;
