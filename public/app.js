

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

