const dbConfig = require("../config/db.config");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;

db.url = dbConfig.url;

db.Stat = require("./Stat.js")(mongoose);
db.Session = require("./Session.js")(mongoose);
db.Action = require("./Action.js")(mongoose);

module.exports = db;