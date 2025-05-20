const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://odilon:1234@cluster0.cim6nyb.mongodb.net/tweeter?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then((response) => {
    console.log(response.STATES["1"]);
    console.log("connexion ok");
  });
