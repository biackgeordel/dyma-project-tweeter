const Multer = require("multer");
const path = require("path");
const config = {
  storage: Multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, "../public/images"));
    },
    filename: (req, file, cb) => {
      const regexFile = /(?<nom>[a-z0-9\.\(\)_\- ]+)\.(?<extension>[a-z]{3})/i;
      const { nom, extension } = regexFile.exec(file.originalname).groups;
      cb(null, Date.now() + "-" + nom + "." + extension);
    },
  }),
};
module.exports = Multer(config).array("profil");
