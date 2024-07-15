import multer from "multer";
import path from "path";

export const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "../public/img/users");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});
