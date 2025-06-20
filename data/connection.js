console.log(process.env.NODE_ENV);
const mongoose = require("mongoose");
const env = require(`../environment/env.${process.env.NODE_ENV}`);
mongoose.connect(`${env.dbUrl}`).then((response) => {
  console.log(response.STATES["1"]);
  console.log("connexion ok");
});
