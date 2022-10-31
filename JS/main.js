const options = {
	method: 'GET',
};

fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=62a630dad602fd4c56967008d168632c', options)
	.then(response => response.json())
	.then(data => {
        const list = data.results;
        // console.log(list)

        list.forEach((movie) => {
            const {title, poster_path} = movie;
            const name = title;
            const poster = poster_path;
            const movies = `<li class="list-movies"><img href="" class="img-movie" src="https://image.tmdb.org/t/p/w500${poster}" <h2 class="list-title">${name}</h2></li>`
            document.querySelector('.movies').innerHTML += movies;
        })
    })
	