const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();

const PORT = process.env.EXPRESS_API_PORT;
const FLASK_API_URL = process.env.FLASK_BACKEND_URL

app.use(express.json());
app.use(cors());

app.post('/api', async (req, res) => {
    const data = req.body;

    try {
        const response = await axios.post(FLASK_API_URL, data);

        res.status(200).json(response.data); 
    } catch (error) {
        console.error('Error communicating with Flask:', error);
        res.status(500).json({ error: 'Error processing data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Server is listening to ${FLASK_API_URL}`);
});