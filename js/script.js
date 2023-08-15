const global = {
    currentLocation : window.location.pathname,

};
const showSpinner=()=>{
    document.querySelector(".spinner").classList.add("show");
}
const hideSpinner=()=>{
    document.querySelector(".spinner").classList.remove("show");
}

// Highliting active link : on which page currently present gets highlited in nav bar
const highlightActiveLink=()=>{
    // const ul = document.getElementsByClassName("highlight-active-link");
    const li = document.querySelectorAll('.nav-link');
    li.forEach(links=>{
        if (links.getAttribute("href")==global.currentLocation){
            links.classList.add("active");
        }
    })
}

// Displaying 20 most pupular movies
async function displayPopularMovies(){
    const {results} = await getDataFromApi('movie/popular');
    // console.log(results[0]);
    results.forEach(movie=>{
        // <div class="card">
        //   <a href="movie-details.html?id=1">
        //     <img
        //       src="images/no-image.jpg"
        //       class="card-img-top"
        //       alt="Movie Title"
        //     />
        //   </a>
        //   <div class="card-body">
        //     <h5 class="card-title">Movie Title</h5>
        //     <p class="card-text">
        //       <small class="text-muted">Release: XX/XX/XXXX</small>
        //     </p>
        //   </div>
        // </div>

        const div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML=`
                    <a href="movie-details.html?id=${movie.id}">
                    ${movie.poster_path ? `<img
                            src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                            class="card-img-top"
                            alt="${movie.title}"
                            />` 
                            :
                             ` <img
                                src="images/no-image.jpg"
                                class="card-img-top"
                                alt="Movie Title"
                                />`
                    }
                    </a>
                
                    <div class="card-body">
                        <h5 class="card-title"></h5>
                        <p class="card-text">
                        <small class="text-muted">Release: ${movie.release_date}</small>
                        </p>
                    </div>
                    `
        const parentDiv = document.getElementById("popular-movies");
        parentDiv.appendChild(div);

    });
}



// Displaying 20 most pupular TV shows 
async function displayPopularShows(){
    const {results} = await getDataFromApi('tv/popular');
    // console.log(results[0]);
    results.forEach(show=>{
        // <div class="card">
        //   <a href="movie-details.html?id=1">
        //     <img
        //       src="images/no-image.jpg"
        //       class="card-img-top"
        //       alt="Movie Title"
        //     />
        //   </a>
        //   <div class="card-body">
        //     <h5 class="card-title">Movie Title</h5>
        //     <p class="card-text">
        //       <small class="text-muted">Release: XX/XX/XXXX</small>
        //     </p>
        //   </div>
        // </div>

        const div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML=`
                    <a href="tv-details.html?id=${show.id}">
                    ${show.poster_path ? `<img
                            src="https://image.tmdb.org/t/p/w500${show.poster_path}"
                            class="card-img-top"
                            alt="${show.name}"
                            />` 
                            :
                             ` <img
                                src="images/no-image.jpg"
                                class="card-img-top"
                                alt="Show Title"
                                />`
                    }
                    </a>
                
                    <div class="card-body">
                        <h5 class="card-title"></h5>
                        <p class="card-text">
                        <small class="text-muted">Air Date: ${show.first_air_date}</small>
                        </p>
                    </div>
                    `
        const parentDiv = document.getElementById("popular-shows");
        parentDiv.appendChild(div);

    });
}

// async function(){}  OR
const getDataFromApi= async endpoints =>{
    
    // const ApiUrl = "https://www.themoviedb.org/3";
    // const ApiKey = "1546d93cdac471a69e16168fb94a4c87";
    // const response = await fetch(`${ApiUrl}${endpoints}?api_key=${ApiKey}&language=en-US`);
    // const data = await response.json()
    // return data;
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNTQ2ZDkzY2RhYzQ3MWE2OWUxNjE2OGZiOTRhNGM4NyIsInN1YiI6IjY0ZDlkZjI4ZDEwMGI2MDBhZGEyNTIxYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bEizNUc7oSxcfDL27i30V4KI1-yyvCiouRVAEd_Ysls'
        }
      };
      showSpinner();
      const response = await fetch(`https://api.themoviedb.org/3/${endpoints}?language=en-US&page=1`, options)
      const data = await response.json()
      hideSpinner();
      return data;
}
// displaying movie details 
async function movieDetail(){
    const movieId = window.location.search.split("=")[1];
    const movie = await getDataFromApi(`movie/${movieId}`);
    //  Overlay for background image
    displayBackGroundImage('movie',movie.backdrop_path);
    const div = document.createElement("div")
    // console.log(movie);
    div.innerHTML=`
                    <div class="details-top">
                    <div>
                    <img
                            ${movie.poster_path ? `<img
                            src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                            class="card-img-top"
                            alt="${movie.title}"
                            />` 
                            :
                            ` <img
                                src="images/no-image.jpg"
                                class="card-img-top"
                                alt="Movie Title"
                                />`
                            }
                    />
                    </div>
                    <div>
                    <h2>${movie.title}</h2>
                    <p>
                        <i class="fas fa-star text-primary"></i>
                        ${(movie.vote_average).toFixed(1)} / 10
                    </p>
                    <p class="text-muted">Release Date: ${movie.release_date}</p>
                    <p>
                    ${movie.overview}
                    </p>
                    <h5>Genres</h5>
                    <ul class="list-group">
                    ${movie.genres.map((eachGenre)=> `<li>${eachGenre.name}</li>`).join("")}
                        
                    </ul>
                    <a href="${movie.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
                    </div>
                </div>
                <div class="details-bottom">
                    <h2>Movie Info</h2>
                    <ul>
                    <li><span class="text-secondary">Budget:</span> $${numAddCommas(movie.budget)}</li>
                    <li><span class="text-secondary">Revenue:</span> $${numAddCommas(movie.revenue)}</li>
                    <li><span class="text-secondary">Runtime:</span> ${movie.runtime} minutes</li>
                    <li><span class="text-secondary">Status:</span>  ${movie.status}</li>
                    </ul>
                    <h4>Production Companies</h4>
                    <br>${movie.production_companies
                        .map((comp)=>`<ul>${comp.name}</ul>`)
                        .join("")
                
                    }
                </div>


    `
    const parentDiv = document.querySelector("#movie-details");
    parentDiv.appendChild(div);
}


// Display Backdrop On Details Pages
function displayBackGroundImage(type, backgroundPath) {
    const overlayDiv = document.createElement('div');
    overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`;
    overlayDiv.style.backgroundSize = 'cover';
    overlayDiv.style.backgroundPosition = 'center';
    overlayDiv.style.backgroundRepeat = 'no-repeat';
    overlayDiv.style.height = '100vh';
    overlayDiv.style.width = '100vw';
    overlayDiv.style.position = 'absolute';
    overlayDiv.style.top = '0';
    overlayDiv.style.left = '0';
    overlayDiv.style.zIndex = '-1';
    overlayDiv.style.opacity = '0.1';
  
    if (type === 'movie') {
      document.querySelector('#movie-details').appendChild(overlayDiv);
    } else {
      document.querySelector('#show-details').appendChild(overlayDiv);
    }
  }


// Display Slider Movies
async function displaySlider() {
    const { results } = await getDataFromApi('movie/now_playing');
  
    results.forEach((movie) => {
      const div = document.createElement('div');
      div.classList.add('swiper-slide');
  
      div.innerHTML = `
        <a href="movie-details.html?id=${movie.id}">
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
        </a>
        <h4 class="swiper-rating">
          <i class="fas fa-star text-secondary"></i> ${movie.vote_average} / 10
        </h4>
      `;
  
      document.querySelector('.swiper-wrapper').appendChild(div);
  
      initSwiper();
    });
  }
  
  function initSwiper() {
    const swiper = new Swiper('.swiper', {
      slidesPerView: 1,
      spaceBetween: 30,
      freeMode: true,
      loop: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      breakpoints: {
        500: {
          slidesPerView: 2,
        },
        700: {
          slidesPerView: 3,
        },
        1200: {
          slidesPerView: 4,
        },
      },
    });
  }
  
// Display Show Details
async function displayShowDetails() {
    const showId = window.location.search.split('=')[1];
  
    const show = await getDataFromApi(`tv/${showId}`);
  
    // Overlay for background image
    displayBackGroundImage('tv', show.backdrop_path);
    const div = document.createElement('div');
  
    div.innerHTML = `
    <div class="details-top">
    <div>
    ${
      show.poster_path
        ? `<img
      src="https://image.tmdb.org/t/p/w500${show.poster_path}"
      class="card-img-top"
      alt="${show.name}"
    />`
        : `<img
    src="../images/no-image.jpg"
    class="card-img-top"
    alt="${show.name}"
  />`
    }
    </div>
    <div>
      <h2>${show.name}</h2>
      <p>
        <i class="fas fa-star text-primary"></i>
        ${show.vote_average.toFixed(1)} / 10
      </p>
      <p class="text-muted">Last Air Date: ${show.last_air_date}</p>
      <p>
        ${show.overview}
      </p>
      <h5>Genres</h5>
      <ul class="list-group">
        ${show.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
      </ul>
      <a href="${
        show.homepage
      }" target="_blank" class="btn">Visit show Homepage</a>
    </div>
  </div>
  <div class="details-bottom">
    <h2>Show Info</h2>
    <ul>
      <li><span class="text-secondary">Number of Episodes:</span> ${
        show.number_of_episodes
      }</li>
      <li><span class="text-secondary">Last Episode To Air:</span> ${
        show.last_episode_to_air.name
      }</li>
      <li><span class="text-secondary">Status:</span> ${show.status}</li>
    </ul>
    <h4>Production Companies</h4>
    <div class="list-group">
      ${show.production_companies
        .map((company) => `<span>${company.name}</span>`)
        .join(', ')}
    </div>
  </div>
    `;
  
    document.querySelector('#show-details').appendChild(div);
  }
  


function numAddCommas(num){
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
const PageRouter =()=>{
    // console.log(global.currentLocation);
    switch(global.currentLocation){
        case "/":
        case "/index.html":
            console.log("Home page");
            displayPopularMovies();
            displaySlider();
            break;
        case "/shows.html":
            console.log("TV show page");
            displayPopularShows();
            break;
        case "/search.html":
            console.log("Search page"); 
            break;
        case "/movie-details.html":
            console.log("Movie details page"); 
            movieDetail();
            break;              
        case "/tv-details.html":
            console.log("TV details page");
            displayShowDetails();
            break;            
    }
}

function init(){
PageRouter()
highlightActiveLink()
}

init()
