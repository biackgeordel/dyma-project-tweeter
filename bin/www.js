const http = require("http");
const https = require("https");
const app = require("../app");
const path = require("path");
fs = require("fs");
const env = require(`../environment/env.${process.env.NODE_ENV}.js`);
http
  .createServer((req, res) => {
    res.writeHead(301, {
      location: `https://${req.headers.host}${req.url}`,
    });
    res.end();
  })
  .listen(env.port.http);
https
  .createServer(
    {
      cert: env.cert,

      key: env.key,
    },
    app
  )
  .listen(env.port.https, () => {
    console.log("server listen the port " + env.port.https);
  });
