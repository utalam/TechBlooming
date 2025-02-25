const fetchButton = document.getElementById('fetch-news');
const playButton = document.getElementById('play-news');
const newsList = document.getElementById('news-list');

const apiKey = '39d981f93eea4a2cbbb0eb5c8dc3eda5'; // Replace with your NewsAPI key
const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

let headlines = [];

fetchButton.addEventListener('click', () => {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            headlines = data.articles.map(article => article.title).slice(0, 5);
            newsList.innerHTML = '';
            headlines.forEach(headline => {
                const li = document.createElement('li');
                li.textContent = headline;
                newsList.appendChild(li);
            });
            playButton.style.display = 'inline-block';
        })
        .catch(error => {
            newsList.innerHTML = '<li>Error fetching news. Try again later.</li>';
            console.error('Error:', error);
        });
});

playButton.addEventListener('click', () => {
    if (headlines.length === 0) {
        alert('Please fetch news first!');
        return;
    }
    const speech = new SpeechSynthesisUtterance(headlines.join('. '));
    speech.lang = 'en-US';
    speech.rate = 1;
    window.speechSynthesis.speak(speech);
});

playButton.style.display = 'none';