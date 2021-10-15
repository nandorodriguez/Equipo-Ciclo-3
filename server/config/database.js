const mongoose = require("mongoose");
const user = "reactfanboy";
const password = "chXJ6tyTmoapkgT5";
const db = "tiendaOnline";
const uri = `mongodb://${user}:${password}@tiendaonline-shard-00-00.z9r8h.mongodb.net:27017,tiendaonline-shard-00-01.z9r8h.mongodb.net:27017,tiendaonline-shard-00-02.z9r8h.mongodb.net:27017/${db}?ssl=true&replicaSet=atlas-c0uagk-shard-0&authSource=admin&retryWrites=true`;
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("DB conected"))
  .catch((err) => console.log(err));

module.exports = mongoose.connection;
