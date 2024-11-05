// script.js
const apiKey = "nxG7DR40Lj6K7aimEBNY7fywGJMwP15AFyEmwy06";
const currentImageContainer = document.getElementById("current-image-container");
const searchForm = document.getElementById("search-form");
const searchHistory = document.getElementById("search-history");

async function getCurrentImageOfTheDay() {
    const currentDate = new Date().toISOString().split("T")[0];
    await getImageOfTheDay(currentDate);
}

async function getImageOfTheDay(date) {
    try {
        const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`);
        const data = await response.json();
        displayImage(data);
        saveSearch(date);
        addSearchToHistory();
    } catch (error) {
        currentImageContainer.innerHTML = `<p>Error fetching data</p>`;
    }
}

function displayImage(data) {
    currentImageContainer.innerHTML = `
        <h2>${data.title}</h2>
        <img src="${data.url}" alt="${data.title}">
        <p>${data.explanation}</p>
    `;
}

function saveSearch(date) {
    let searches = JSON.parse(localStorage.getItem("searches")) || [];
    if (!searches.includes(date)) {
        searches.push(date);
        localStorage.setItem("searches", JSON.stringify(searches));
    }
}

function addSearchToHistory() {
    searchHistory.innerHTML = "";
    const searches = JSON.parse(localStorage.getItem("searches")) || [];
    searches.forEach(date => {
        const listItem = document.createElement("li");
        listItem.textContent = date;
        listItem.addEventListener("click", () => getImageOfTheDay(date));
        searchHistory.appendChild(listItem);
    });
}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const selectedDate = document.getElementById("search-input").value;
    if (selectedDate) getImageOfTheDay(selectedDate);
});
getCurrentImageOfTheDay();
