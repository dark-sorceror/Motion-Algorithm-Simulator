const express = require('express');
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv');
const morgan = require('morgan');

dotenv.config();

const app = express();

const PORT = process.env.EXPRESS_API_PORT ?? process.exit(1);
const PROXY_API_URL = process.env.PROXY_API_URL ?? process.exit(1);
const BACKEND_API_URL = process.env.BACKEND_API_URL ?? process.exit(1);
const FRONTEND_URL = process.env.FRONTEND_URL ?? process.exit(1);

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.post('/api', async (req, res) => {
    const data = req.body;

    try {
        const response = await axios.post(BACKEND_API_URL, data);

        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error communicating with backend: ', error.response ? error.response.data : error.message);

        res.status(500).json({
            error: 'Error processing data in backend',
            details: error.response ? error.response.data : error.message
        });
    }
});

app.listen(PORT, () => {
    console.log('Server is running');
    console.log(`Listening to requests on ${PROXY_API_URL}`);
    console.log(`Expecting requests from ${FRONTEND_URL}`);
    console.log(`Forwarding requests to backend: ${BACKEND_API_URL}`);
});