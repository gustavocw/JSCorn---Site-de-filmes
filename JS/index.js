//https://www.omdbapi.com/?i=tt3896198&apikey=71512f9f
//http://www.omdbapi.com/?s=avengers&apikey=71512f9f



//62a630dad602fd4c56967008d168632c

const movieSearchBox = document.getElementById('movie-search-box');
const searchList = document.getElementById('search-list');
const resultGrid = document.getElementById('result-grid');
const cardMovie = document.querySelector('.col-xs-12')






function displayMovieDetails(details){
    resultGrid.innerHTML = `
    <div class = "movie-poster">
        <img src = "${(details.Poster != "N/A") ? details.Poster : "image_not_found.png"}" alt = "movie poster">
    </div>
    <div class = "movie-info">
        <h3 class = "movie-title">${details.Title}</h3>
        <ul class = "movie-misc-info">
            <li class = "year">Year: ${details.Year}</li>
            <li class = "rated">Ratings: ${details.Rated}</li>
            <li class = "released">Released: ${details.Released}</li>
        </ul>
        <p class = "genre"><b>Genre:</b> ${details.Genre}</p>
        <p class = "writer"><b>Writer:</b> ${details.Writer}</p>
        <p class = "actors"><b>Actors: </b>${details.Actors}</p>
        <p class = "plot"><b>Plot:</b> ${details.Plot}</p>
        <p class = "language"><b>Language:</b> ${details.Language}</p>
        <p class = "awards"><b><i class = "fas fa-award"></i></b> ${details.Awards}</p>
    </div>
    `;

}


//Load movies from API
async function loadMovies(searchTerm){
    const URL = `http://www.omdbapi.com/?s=${searchTerm}&apikey=71512f9f`;
    const res = await fetch(`${URL}`);
    const data = await res.json();
    // console.log(data.Search)
    if(data.Response == "True") displayMovieList(data.Search);
}

function findMovies() {
    let searchTerm = (movieSearchBox.value).trim();
    if(searchTerm.length > 0){
        searchList.classList.remove('hide-search-list');
        loadMovies(searchTerm);
    } else {
        searchList.classList.add('hide-search-list');
    }
}

function displayMovieList(movies){
    searchList.innerHTML = "";
    for(let idx = 0; idx < movies.length; idx++){
        let movieListItem = document.createElement('div');
        movieListItem.dataset.id = movies[idx].imdbID;
        movieListItem.classList.add('search-list-item');
        if(movies[idx].Poster != "N/A")
        moviePoster = movies[idx].Poster;
        else
        moviePoster = "./IMG/image_not_found.png"


        movieListItem.innerHTML = `
        <div class="search-list-item">
            <div class="search-item-thumbnail">
                <img src="${moviePoster}" alt="thumb">
            </div>
            <div class="search-item-info">
                <h3>${movies[idx].Title}</h3>
                <p>${movies[idx].Year}</p>
            </div>
        </div>`;
        searchList.appendChild(movieListItem)

    }

    loadMovieDetails();
}

function loadMovieDetails() {
    const searchListMovies = searchList.querySelectorAll('.search-list-item');
    searchListMovies.forEach(movie =>{
        movie.addEventListener('click', async () =>{
            searchList.classList.add('hide-search-list');
            movieSearchBox.value = "";
            const result = await fetch
            (`http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=71512f9f`);
            const movieDetails = await result.json();
            //console.log(movieDetails)
            displayMovieDetails(movieDetails)
        })
    });
}





window.addEventListener('click', (event) => {
    if(event.target.className != "form-control"){
        searchList.classList.add('hide-search-list');
    }
});