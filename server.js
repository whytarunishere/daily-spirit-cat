const express = require('express');
const path = require('path');
const request = require('request');
require('dotenv').config();
const app = express();
const PORT = 3000;

const apikey = process.env.API_KEY;

// Serve static files from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));
console.log('API Key:', process.env.API_KEY ? 'Exists' : 'Missing');

app.get('/quote', (req, res) => {
    res.status(200).json({ message: "This works!" });
    console.log("Received /quote request"); 
    request.get({
        url: 'https://api.api-ninjas.com/v1/quotes',
        headers: {
            'X-Api-Key': apikey
        },
    }, function (error, response, body) {
         if (error) {
            console.error('Request failed:', error);
            return res.status(500).json({ error: 'Request failed' });
        }

        if (response.statusCode !== 200) {
            console.error('Error response:', response.statusCode, body);
            return res.status(response.statusCode).json({ error: 'External API error' });
        }

        try {
            const data = JSON.parse(body);
            return res.json({ quote : data[0].quote});
        } catch (err) {
            console.error('JSON parse error:', err);
            return res.status(500).json({ error: 'Invalid JSON from API' });
        }
    })
})

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

