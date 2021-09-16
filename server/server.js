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

  app.all("/*", (req, res, next) => {
    console.log(`[FRONT-END] - ${new Date()}: [${req.method}] ${req.originalUrl} from ${req.ip}`);
    next();
  });

  app.all("/api", (req, res, next) => {
    console.log(`[API] - ${new Date()}: [${req.method}] ${req.originalUrl} from ${req.ip}`);
    res.send({ "message": "Welcome" });
  });

  // back end server routes
  require("./routes/Stat.router")(app);
  require("./routes/Session.router")(app);
  require("./routes/Action.router")(app);
  require("./routes/General.router")(app);

  if (process.env.NODE_ENV !== 'test') {
    // Init Nuxt.js
    const nuxt = new Nuxt(config)

    // Build only in dev mode
    if (config.dev) {
      const builder = new Builder(nuxt)
      await builder.build()
    }

    // Give nuxt middleware to express
    app.use(nuxt.render)
  }

  return app;
}

module.exports = app;

start();