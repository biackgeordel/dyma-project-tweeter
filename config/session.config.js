const { app } = require("../app");
const session = require("express-session");
const MongoStore = require("connect-mongo");
app.use(
  session({
    secret: crypto.randomUUID(),
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 3600 * 24 * 1000,
      httpOnly: true,
    },
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://odilon:1234@cluster0.cim6nyb.mongodb.net/tweeter?retryWrites=true&w=majority&appName=Cluster0",
      ttl: 3600 * 24,
      autoRemove: "interval",
      autoRemoveInterval: 30,
    }),
  })
);
