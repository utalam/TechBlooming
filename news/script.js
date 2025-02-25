// DOM elements
const fetchButton = document.getElementById('fetch-news');
const playButton = document.getElementById('play-news');
const newsList = document.getElementById('news-list');

// NewsAPI endpoint (replace with your API key)
const apiKey = '39d981f93eea4a2cbbb0eb5c8dc3eda5'; // Get this from newsapi.org
const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

// Store news headlines
let headlines = [];

// Fetch news
fetchButton.addEventListener('click', () => {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            headlines = data.articles.map(article => article.title).slice(0, 5); // Limit to 5 headlines
            newsList.innerHTML = ''; // Clear previous list
            headlines.forEach(headline => {
                const li = document.createElement('li');
                li.textContent = headline;
                newsList.appendChild(li);
            });
            playButton.style.display = 'inline-block'; // Show play button after fetching
        })
        .catch(error => {
            newsList.innerHTML = '<li>Error fetching news. Try again later.</li>';
            console.error('Error:', error);
        });
});

// Play news aloud
playButton.addEventListener('click', () => {
    if (headlines.length === 0) {
        alert('Please fetch news first!');
        return;
    }
    const speech = new SpeechSynthesisUtterance(headlines.join('. ')); // Join headlines with periods
    speech.lang = 'en-US'; // Set language
    speech.rate = 1; // Normal speed
    window.speechSynthesis.speak(speech); // Speak
});

// Initially hide play button
playButton.style.display = 'none';