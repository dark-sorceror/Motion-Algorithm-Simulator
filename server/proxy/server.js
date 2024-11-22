const express = require('express');
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv');
const morgan = require('morgan');

dotenv.config();

const app = express();

const PORT = process.env.EXPRESS_API_PORT ?? process.exit(1);
const FLASK_API_URL = process.env.FLASK_API_URL ?? process.exit(1);
const FRONTEND_URL = process.env.FRONTEND_URL ?? process.exit(1);
const FRONTEND_BASE_URL = process.env.FRONTEND_BASE_URL ?? process.exit(1);

app.use(express.json());
app.use(morgan('dev'));
app.use(cors({
    origin: FRONTEND_BASE_URL,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.post('/api', async (req, res) => {
    const data = req.body;

    try {
        const response = await axios.post(FLASK_API_URL, data);

        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error communicating with Flask API:', error.response ? error.response.data : error.message);

        res.status(500).json({
            error: 'Error processing data',
            details: error.response ? error.response.data : error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Proxying requests to Flask API at ${FLASK_API_URL}`);
    console.log(`Frontend can access API at ${FRONTEND_URL}`);
});