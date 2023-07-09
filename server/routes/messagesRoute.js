const {addMessage, getAllMessages, addPhotoMessage} = require("../controllers/messagesController");
const router= require("express").Router();

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Set the destination folder for uploaded photos
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + '-' + file.originalname); // Set the filename for the uploaded photo
    },
  });
  
  // Create the multer upload instance using the storage configuration
  const upload = multer({ storage });

router.post("/addmsg/", addMessage);
router.post("/getmsg/", getAllMessages);

// Add a new route for handling photo uploads
router.post('/addphotomsg', upload.single('photo'), addPhotoMessage);

module.exports = router;