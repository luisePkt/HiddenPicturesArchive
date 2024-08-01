import multer from "multer";
import path from "path";

const storage = multer.diskStorage({ // img werden lokal gespeichert
  destination: (req, file, cb) => {
    cb(null, "public/img/users"); // speicherpfad
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname) // filename
    );
  },
});

export const upload = multer({ storage: storage }).single("file"); // nur eine datei kann gespeichert werden
