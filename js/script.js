const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=vote_count.desc&api_key=a0814a81d9e0ea8e164320078c18b3cb&page=1';

const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';

const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=a0814a81d9e0ea8e164320078c18b3cb&query="';

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');


getMovie(API_URL)

async function getMovie(url) {
    const res = await fetch(url);
    const data = await res.json();

    showMovies(data.results)
}


function showMovies(movies){
    main.innerHTML = '';

    movies.forEach(movie => {
        const {title, poster_path, vote_average, overview } = movie
        
        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')

        movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}">

            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>

            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
        `

        main.appendChild(movieEl)
    });

}

function getClassByRate(vote){
    if(vote >= 8){
        return 'green'
    } else if(vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}


form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchTerm = search.value

    if(searchTerm && searchTerm !== '') {
        getMovie(SEARCH_API + searchTerm)

        search.value = ''
        currentPage = 1;
        pageCounter.innerText = ` Page ${currentPage}`;
    } else {
        window.location.reload()
    }
})
let currentPage = 1;
const loadMore = document.getElementById('nextPage');
const pageCounter = document.getElementById('currentPage');
loadMore.addEventListener('click', () => {
    getMovie(API_URL + `&page=${currentPage + 1}`);
    window.scrollTo(0, 0);
    currentPage++;
    pageCounter.innerText = ` Page ${currentPage}`;
    console.log(currentPage);
});
const previousPage = document.getElementById('previousPage');
previousPage.addEventListener('click', () => {
    if (currentPage > 1) {
        getMovie(API_URL + `&page=${currentPage - 1}`);
        window.scrollTo(0, 0);
        currentPage--;
        pageCounter.innerText = ` Page ${currentPage}`;
    }
});

const hiroSection = document.getElementById('hiro-section-img');
const images = [
    './images/ctMserH8g2SeOAnCw5gFjdQF8mo.webp',
    './images/9xfDWXAUbFXQK585JvByT5pEAhe.webp',
    './images/ctxm191q5o3axFzQsvNPlbKoSYv.webp',
    './images/npD65vPa4vvn1ZHpp3o05A5vdKT.webp',
    './images/u7OpeS4eckBSR1wFxFTuyy3FjHE.webp'
]
const randomImage = images[Math.floor(Math.random() * images.length)];
hiroSection.style.backgroundImage = `url(${randomImage})`;
