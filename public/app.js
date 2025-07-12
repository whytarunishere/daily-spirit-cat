const express = require('express');
const path = require('path');
const request = require('request');
require('dotenv').config();
const app = express();
const PORT = 3000;

const apikey = process.env.API_KEY;
console.log('API Key:', process.env.API_KEY ? 'Exists' : 'Missing');
// Serve static files from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));


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



window.addEventListener("DOMContentLoaded", () => {
    console.log("Fetching quote...");
    fetch('/quote')
        .then(res => {
            console.log("Got response:", res);
            return res.json();
        })
        .then(data => {
            console.log("Quote data:", data);
            document.getElementById("quoteText").textContent = `"${data.quote}"`;
        })
        .catch(err => {
            console.error("Error fetching quote:", err);
            document.getElementById("quoteText").textContent = "Failed to load quote.";
        });

});

function loadCat() {
    
    var url = "https://cataas.com/cat";

    var catImg = document.getElementById("catImage")
    var loader = document.getElementById("loadingImage")
    var heroImg = document.getElementById("heroImage")
    var res = document.getElementById("result");
    var qText = document.getElementById("quoteText");
    var getCatbtn = document.getElementById("getCatbtn")

    getCatbtn.style.display = "none"
    heroImg.style.display = "none"
    catImg.style.display = "none"
    res.style.display = "none"
    loader.style.display = "block"

    catImg.src = url;

    const loadStart = Date.now();

    catImg.onload = () => {
        const loadDuration = Date.now() - loadStart;
        const delay = Math.max(0, 3000 - loadDuration);
        qText.style.display = "block";

        setTimeout(() => {
            catImg.src = url;
            loader.style.display = "none";
            heroImg.style.display = "none"
            catImg.style.display = "block";
            res.style.display = "block";

            res.classList.add("fade-in");

        }, delay);
    }

}

function changeColor() {
    var ele = document.querySelector("h1");
    if (ele.style.color == "red") {
        ele.style.color = "blue";
    } else {
        ele.style.color = "red";
    }

}
setInterval(changeColor, 250);

