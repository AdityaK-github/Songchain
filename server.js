require('dotenv').config(); // Load environment variables from .env
const express = require('express');
const multer = require('multer');
const axios = require('axios');
const cors = require('cors');
const FormData = require('form-data'); // Import form-data package

const app = express();
const port = 3000;

// Pinata API configuration from environment variables
const PINATA_API_KEY = process.env.PINATA_API_KEY;
const PINATA_SECRET_API_KEY = process.env.PINATA_SECRET_API_KEY;

// Enable CORS
app.use(cors());

// Set up Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload route
app.post('/upload', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const url = 'https://api.pinata.cloud/pinning/pinFileToIPFS';
    const formData = new FormData();

    // Append the file to FormData
    formData.append('file', req.file.buffer, {
        filename: req.file.originalname,
        contentType: req.file.mimetype, // Set the content type
    });

    try {
        const response = await axios.post(url, formData, {
            headers: {
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                pinata_api_key: PINATA_API_KEY,
                pinata_secret_api_key: PINATA_SECRET_API_KEY,
                ...formData.getHeaders(), // Add form-data headers
            },
        });
        res.json({ success: true, data: response.data });
    } catch (error) {
        console.error('Error uploading file:', error.response ? error.response.data : error.message);
        res.status(500).send('Error uploading file to Pinata');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
