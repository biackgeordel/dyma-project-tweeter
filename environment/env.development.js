const path = require("path");
const fs = require("fs");
module.exports = {
  dbUrl:
    "mongodb+srv://odilon:1234@cluster0.cim6nyb.mongodb.net/tweeter?retryWrites=true&w=majority&appName=Cluster0",
  cert: fs.readFileSync(
    path.join(__dirname, "../ssl/odilon-project.fr_ssl_certificate.cer")
  ),
  key: fs.readFileSync(
    path.join(__dirname, "../ssl/_.odilon-project.fr_private_key.key")
  ),
  env: "development",
  port: {
    http: 3003,
    https: 3001,
  },
};
