import NodeClam from "clamscan";
import fs from "fs";
import path from "path";

const initClamScan = async () => {
  // initialise clamscan:
  const clamscan = await new NodeClam().init({
    clamdscan: {
      socket: "/tmp/clamd.socket",
      port: 3310,
      timeout: 60000,
    },
    preference: "clamdscan",
  });
  return clamscan;
};

let clamscanInstance;
try {
  clamscanInstance = await initClamScan();
  console.log("clamscan initialisiert");
} catch (error) {
  console.log("clamscan nicht initialisiert: ", error);
}

export const scan = async (req, res, next) => {
  // überprüfen, ob req.file vorhanden ist:
  if (!req.file) {
    // return res.status(400).json({ message: "No file provided" });
    // überspring scan, wenn kein bild vorhanden und geh zur nächsten middleware
    next();
  } else {
    try {
      const filePath = path.resolve(req.file.path);
      console.log("scanning file");

      const scanResult = await clamscanInstance.scanFile(filePath);
      if (scanResult.isInfected) {
        fs.unlinkSync(filePath);
        return res
          .status(400)
          .json({ message: "file infected", viruses: scanResult.viruses });
      } else {
        console.log("file clean");
        //   res.json({
        //     message: "datei ist clean hochgeladen unter " + req.file.path,
        //   });
        next();
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "an error occured" });
    }
  }
};
