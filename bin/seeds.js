const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const User = require("../models/user");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/ibi-ironhack", {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE,
  useMongoClient: true
});

var salt = bcrypt.genSaltSync(bcryptSalt);
const password = "ironhack";
var encryptedPass = bcrypt.hashSync(password, salt);

const boss = new User({
  username: "admin@ironhack.com",
  name: "Isak",
  password: encryptedPass,
  role: "BOSS"
});

User.create(boss, (err, user) => {
  if (err) {
    throw err;
  }
  console.log(user);
  mongoose.connection.close();
});
