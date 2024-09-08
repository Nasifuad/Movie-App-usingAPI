const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=db865b4d295f7629dedf31bf09848745&page=1";

const IMG_PATH = "https://image.tmdb.org/t/p/w1280";

const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=04c35731a5ee918f014970082a0088b1&query="';
document.addEventListener("DOMContentLoaded", () => {
  const search = document.getElementById("search");
  const searchbtn = document.getElementById("searchbtn");
  const main = document.getElementById("mainid");
  getMovies(API_URL);
  async function getMovies(URL) {
    const res = await fetch(URL);
    const data = await res.json();
    console.log(data.results);
    showMovies(data.results);
  }
  function showMovies(movies) {
    main.innerHTML = "";
    movies.forEach((movie) => {
      const {
        title,
        poster_path,
        release_date,
        vote_average,
        original_language,
        overview,
      } = movie;

      const new_Movie = document.createElement("div");
      new_Movie.classList.add("movie");
      new_Movie.innerHTML = `
     <div class="movie"></div>
          <img
          src=" ${IMG_PATH + poster_path} "
          alt="${title}"
          id="movie-img"
        />
        <div class="movie-head">
          <h3 id="title">${title}</h3>
          <p id="year">2020</p>
          <p id="language">${lang(original_language)}</p>
          <p id="rating" class="${color(vote_average)}">8.9</p>
        </div>
        <div id="overview">
          ${overview}
        </div>
          `;
      main.appendChild(new_Movie);
    });
  }
  searchbtn.addEventListener("click", (e) => {
    e.preventDefault();
    const title = search.value;

    if (title && title !== "") {
      getMovies(SEARCH_API + title);
    } else {
      window.location.reload();
    }
  });
  function color(g) {
    if (g >= 8) {
      return "green";
    } else if (g >= 5) {
      return "yellow";
    } else {
      return "red";
    }
  }
  function lang(f) {
    if (f == "en") {
      return "English";
    } else {
      return "Foreign";
    }
  }
});