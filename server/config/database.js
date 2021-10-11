const { MongoClient } = require("mongodb");
const user = "reactfanboy";
const password = "I8hK7qVIE1nCGTCW";
const db = "tiendaOnline";
const uri = `mongodb+srv://${user}:${password}@tiendaonline.z9r8h.mongodb.net/${db}?retryWrites=true`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client
  .connect()
  .then(() => console.log("DB connected"))
  .catch((e) => console.error(e));

// const mongoose = require("mongoose");
// const user = "reactfanboy";
// const password = "I8hK7qVIE1nCGTCW";
// const db = "tiendaOnline";
// const uri = `mongodb+srv://${user}:${password}@tiendaonline.z9r8h.mongodb.net/${db}?retryWrites=true`;

// mongoose
//   .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("DB conected"))
//   .catch((err) => console.log(err));
