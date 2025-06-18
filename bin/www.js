const http = require("http");
const https = require("https");
const app = require("../app");
const path = require("path");
const port = process.env.PORT || 3000;
fs = require("fs");
http
  .createServer((req, res) => {
    res.writeHead(301, {
      location: `https://${req.headers.host}${req.url}`,
    });
    res.end();
  })
  .listen(80);
https
  .createServer(
    {
      cert: fs.readFileSync(path.join(__dirname, "../ssl/certificate.pem")),
      key: fs.readFileSync(path.join(__dirname, "../ssl/private-key.pem")),
    },
    app
  )
  .listen(port, () => {
    console.log("server listen the port " + port);
  });
