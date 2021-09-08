const express = require('express')
const bodyParser = require("body-parser")
const path = require('path')
const { Nuxt, Builder } = require('nuxt')
const jsonServer = require('json-server')
const app = express()

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
})

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

async function start() {

  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  app.all("/*", (req, res, next) => {
    console.log(`[FRONT-END] - ${new Date()}: [${req.method}] ${req.originalUrl} from ${req.ip}`);
    next();
  });

  app.all("/api", (req, res, next) => {
    console.log(`[API] - ${new Date()}: [${req.method}] ${req.originalUrl} from ${req.ip}`);
    res.send({ "message": "Welcome" });
  });

  const db = require("./models");
  db.mongoose
    .connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    .then(() => {
      console.log("Connected to the database!");
    })
    .catch(err => {
      console.log("Cannot connect to the database!", err);
      process.exit();
    });

  // back end server routes
  // app.use('/api', jsonServer.defaults(), jsonServer.router(path.join(__dirname, 'db.json')));
  require("./routes/Stat.router")(app);
  require("./routes/Session.router")(app);
  require("./routes/Action.router")(app);
  require("./routes/General.router")(app);

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  const PORT = process.env.PORT || 3000
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
}
start()
