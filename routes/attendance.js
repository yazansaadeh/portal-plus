const express = require("express");
const QRCode = require("qrcode");

const router = express.Router();

router.post("/api/generateQRCode", async (req, res) => {
  const { courseId } = req.body;
  const generateQR = async (text) => {
    try {
      const qrDataUrl = await QRCode.toDataURL(text);
      res.send(qrDataUrl);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error generating QR code");
    }
  };
  await generateQR(courseId);
});

module.exports = router;
