const app = require('./server.js');
const PORT = process.env.PORT || 3000
const db = require("./models");

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("Connected to the database!");
    app.listen(PORT, () => {
      console.log("Server has started!");
    });
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });


