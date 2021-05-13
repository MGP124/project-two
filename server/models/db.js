const mongoose = require("mongoose");

// const mongoUser = 'dbReadOnlyUser';
// const mongoPasswd = 'jelly1234';
// const mongoDBName = 'MERN-STARTER-DB';
// const mongoServer = 'cluster0.vvqav.mongodb.net';

const mongoUser = "dbUser";
// const mongoPasswd = "hideMe!!";
const mongoDBName = "FoodGrid";
const mongoServer = "localhost:27017";

// const url =
//   `mongodb+srv://${mongoUser}:${mongoPasswd}` +
//   `@${mongoServer}/${mongoDBName}?retryWrites=true&w=majority`;

const localMongoUrl = `mongodb://${mongoServer}/${mongoDBName}`;

mongoose.connect(localMongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once("open", (_) =>
  console.log("MongoDB is now connected:", `${mongoUser}@${localMongoUrl}`)
);
db.on("error", (err) => console.error("MongoDB connection error!", err));
