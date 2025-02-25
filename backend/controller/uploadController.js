const multer = require('multer');
const Upload = require('../models/Upload');
// Storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage }).array('images', 3);

exports.uploadImages = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.error('Multer error:', err); // Log multer errors
            return res.status(500).json({ message: 'File upload failed', error: err });
        }

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'No files uploaded' });
        }

        try {
            const uploadedFiles = req.files.map((file) => ({
                userId: req.user ? req.user.id : null, // Ensure userId is available
                filename: file.originalname,
                path: file.path
            }));
            const savedImages = await Upload.insertMany(uploadedFiles);

            res.status(200).json({ message: 'Files uploaded successfully', files: savedImages });
        } catch (dbError) {
            console.error('Database error:', dbError);
            res.status(500).json({ message: 'Database error', error: dbError });
        }
    });
};