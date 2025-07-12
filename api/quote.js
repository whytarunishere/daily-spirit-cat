const request = require('request');
require('dotenv').config();

module.exports = (req, res) => {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const apikey = process.env.API_KEY;

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
            return res.status(200).json({ quote: data[0].quote });
        } catch (err) {
            console.error('JSON parse error:', err);
            return res.status(500).json({ error: 'Invalid JSON from API' });
        }
    });
};
