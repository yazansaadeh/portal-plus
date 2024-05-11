const express = require("express");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const router = express.Router();

// Configure Multer
const storage = multer.memoryStorage(); // Store file data in memory
const upload = multer({ storage: storage });
const uploadDirectory = "./uploads"; // You can change this directory to your desired location
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

// Define route for handling file upload
router.post(
  "/api/storeTrainingFile",
  upload.single("trainingFile"),
  async (req, res) => {
    // 'trainingFile' should match the name attribute of your file input in the client
    const file = req.file; // Uploaded file object
    if (!file) {
      return res.status(400).send("No file uploaded");
    }
    try {
      // Create a write stream to save the file
      const filePath = `${uploadDirectory}/${file.originalname}`;
      const writeStream = fs.createWriteStream(filePath);

      // Write the file data to the write stream
      writeStream.write(file.buffer);

      // Close the write stream
      writeStream.end();

      console.log("File saved successfully:", filePath);
      res.send("File uploaded and saved successfully");
    } catch (error) {
      console.error("Error saving file:", error);
      res.status(500).send("Error saving file");
    }
  }
);

router.get("/api/getFile/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "..", uploadDirectory, filename); // Resolve absolute file path

  // Check if the file exists
  if (fs.existsSync(filePath)) {
    // If the file exists, send it as a response
    res.sendFile(filePath);
  } else {
    // If the file does not exist, send a 404 Not Found response
    res.status(404).send("File not found");
  }
});

router.post(
  "/api/deleteTrainingFile",
  upload.single("trainingFile"),
  async (req, res) => {
    const file = req.file; // Uploaded file object
    if (!file) {
      return res.status(400).send("No file uploaded");
    }
    const filePath = path.join(
      __dirname,
      "..",
      uploadDirectory,
      file.originalname
    ); // Resolve absolute file path

    try {
      // Check if the file exists
      if (fs.existsSync(filePath)) {
        // If the file exists, delete it
        fs.unlinkSync(filePath);
        res.status(200).send("File deleted successfully");
      } else {
        // If the file does not exist, send a 404 Not Found response
        res.status(404).send("File not found");
      }
    } catch (error) {
      // If an error occurs during file deletion, send a 500 Internal Server Error response
      console.error("Error deleting file:", error);
      res.status(500).send("Error deleting file");
    }
  }
);

module.exports = router;
