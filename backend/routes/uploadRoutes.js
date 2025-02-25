const express = require('express');
const { uploadImages } = require('../controller/uploadController');


const Upload = require('../models/Upload');
const router = express.Router();

router.post('/', uploadImages);

router.get('/images/:userId', async (req, res) => {
  try {
      const images = await Upload.find({ userId: req.params.userId });
      res.json(images);
  } catch (error) {
      console.error('Error fetching images:', error);
      res.status(500).json({ error: 'Error fetching images' });
  }
});


module.exports = router;