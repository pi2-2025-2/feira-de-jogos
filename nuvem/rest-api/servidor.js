require("dotenv").config();
const { app, httpServer } = require("./http-server.js");
const path = require("path");
const port = process.env.PORT || 3000;


app.use("/dashboard", require("express").static(path.join(__dirname, "public")));

const postLogin = require("./routes/postLogin");
const postTransfer = require("./routes/postTransfer");
const postDebit = require("./routes/postDebit");
const postCredit = require("./routes/postCredit");
const postMfa = require("./routes/postMfa");
const postConfirmPurchase = require("./routes/postConfirmPurchase.js");
const getBalance = require("./routes/getBalance");
const getGames = require("./routes/getGames");
const getStatement = require("./routes/getStatement");
const getProducts = require("./routes/getProducts");
const getUncompletedPurchases = require("./routes/getUncompletedPurchases");

app.use("/api/v2", postLogin);
app.use("/api/v2", postTransfer);
app.use("/api/v2", postDebit);
app.use("/api/v2", postCredit);
app.use("/api/v2", postMfa);
app.use("/api/v2", postConfirmPurchase);
app.use("/api/v2", getBalance);
app.use("/api/v2", getGames);
app.use("/api/v2", getStatement);
app.use("/api/v2", getProducts);
app.use("/api/v2", getUncompletedPurchases);

require("./ws-namespaces/default.js");
require("./ws-namespaces/vending-machine.js");
require("./ws-namespaces/arcade.js");

httpServer.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}!`);
});
