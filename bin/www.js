const http = require("http");
const https = require("https");
const app = require("../app");
const path = require("path");
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
      cert: fs.readFileSync(
        path.join(__dirname, "../ssl/odilon-project.fr_ssl_certificate.cer")
      ),
      key: fs.readFileSync(
        path.join(__dirname, "../ssl/_.odilon-project.fr_private_key.key")
      ),
    },
    app
  )
  .listen(443, () => {
    console.log("server listen");
  });
