import sharp from "sharp";

export const resize = async (req, res, next) => {
  try {
    const filePath = req.file.path;

    await sharp(filePath)
      .resize(500, 500, { fit: "inside" })
      .jpeg()
      .toFile(`public/img/users/${req.file.filename}`);
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "an error occured" });
  }
};
