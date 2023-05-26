const express = require("express");
const router = express.Router();
router.use("/index", (req, res) => {
  console.log(router);

  res.render("index");
});
module.exports = router;
