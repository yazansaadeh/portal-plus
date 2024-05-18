const express = require("express");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const router = express.Router();
const Training = require("../models/trainingFile");
const isLogin = require("../middlewares/isLogin");

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
  isLogin,
  upload.single("trainingFile"),
  async (req, res) => {
    // 'trainingFile' should match the name attribute of your file input in the client
    const file = req.file; // Uploaded file object
    if (!file) {
      return res.status(400).send("No file uploaded");
    }
    const isThereFile = await Training.findOne({
      studentId: req.user.username,
    });
    if (isThereFile) {
      return res.status(500).send("لا يمكنك ارسال اكثر من ملف واحد");
    }
    const extensionFile = file.originalname.split(".")[1];
    try {
      // Create a write stream to save the file
      const filePath = `${uploadDirectory}/${req.user.username}.${extensionFile}`;
      const writeStream = fs.createWriteStream(filePath);

      // Write the file data to the write stream
      writeStream.write(file.buffer);

      // Close the write stream
      writeStream.end();
      const trainingFile = new Training({
        fileName: `${req.user.username}.${extensionFile}`,
        studentMajor: req.user.major,
        studentId: req.user.username,
      });
      trainingFile.save();

      res.send("File saved successfully");
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

router.post("/api/deleteTrainingFile", isLogin, async (req, res) => {
  const { studentId, fileName } = req.body;
  if (!fileName) {
    return res.status(400).send("No file uploaded");
  }
  const filePath = path.join(__dirname, "..", uploadDirectory, fileName); // Resolve absolute file path

  try {
    // Check if the file exists
    if (fs.existsSync(filePath)) {
      // If the file exists, delete it
      fs.unlinkSync(filePath);
      const deletedFile = await Training.findOneAndDelete({ studentId });
      if (deletedFile) {
        res.status(200).send("File deleted successfully");
      } else {
        res.status(404).send("No matching record found in the database");
      }
    } else {
      // If the file does not exist, send a 404 Not Found response
      res.status(404).send("File not found");
    }
  } catch (error) {
    // If an error occurs during file deletion, send a 500 Internal Server Error response
    console.error("Error deleting file:", error);
    res.status(500).send("Error deleting file");
  }
});

router.get("/api/getTrainingFile", isLogin, async (req, res) => {
  const files = await Training.find({ studentMajor: req.user.major });
  res.send(files);
});
router.get("/api/getTrainingFileForOneStudent", isLogin, async (req, res) => {
  const file = await Training.findOne({ studentId: req.user.username });
  res.send(file);
});

router.post("/api/checkTrainingFile", async (req, res) => {
  const { checkType, fileName, declineText } = req.body;
  const updateTrainingStatus = await Training.findOneAndUpdate(
    { fileName: fileName, fileStatus: "null" },
    { fileStatus: checkType, declineText },
    { new: true }
  );
  res.send(updateTrainingStatus.fileStatus);
});

router.post("/api/removeFileInDoctorPage", async (req, res) => {
  const { fileName } = req.body;
  const updatedFile = await Training.findOneAndUpdate(
    { fileName },
    { showInDoctorPage: false },
    { new: true }
  );
  res.send(updatedFile._id);
});

module.exports = router;
