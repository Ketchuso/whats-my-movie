const browse = document.getElementById("browse")
const enterTitle = document.getElementsByClassName("enter-title");
const container = document.getElementsByClassName("container");
const seen = document.getElementById("seen-this-one");
let backButton = document.getElementById("Back-Button");
const form = document.getElementById("lookup-form");

//When invoked, function clearScreen will clear everything except for the h1 heading, in order to load other content
let savedEnterTitle, savedContainer, savedScreen;

function clearScreen(){
    //saving the homepage information to restore
    savedEnterTitle = Array.from(enterTitle);
    savedContainer = Array.from(container);
    savedSeen = seen;
    //removing the homepage information to load one addEventListener events
    savedSeen.remove();
    savedEnterTitle.forEach(el => el.remove());
    savedContainer.forEach(el => el.remove());
}

// The next three functions work together to select a random movie and auto play its trailer
document.addEventListener("DOMContentLoaded", () => {
    // Then a random movie is fetched by calling the fetchRandomMOvie function and is displayed 2 seconds after the webpage is fully loaded
    //(setTimeout() receives argument in miliseconds)
    setTimeout(fetchRandomMovie, 2000);
});

//This function will retrieve a random movie from the db.json file
function fetchRandomMovie(){
    // We use the fetch function to send a request to json-server
    fetch("http://localhost:3000/movies")
    // This is a promise chain that handles the response from fetch()
    //converts the response body which is in JSON format, into a JavaScript array
    .then(resp => resp.json())
    //this selects a random movie from the movies array
    .then(movies => {
        Math.random() 
        //generates a random decimal between 0 and 1.
        //Math.random() * movies.length scales this number to the size of the movies array.
        //Math.floor(...) rounds it down to the nearest whole number, ensuring it's a valid array index.
        let randomMovie = movies[Math.floor(Math.random() * movies.length)];
        console.log(displayRandomMovie(randomMovie));
        fetchMovieDetails(randomMovie);
    })
}

// This function takes a movie object as an arguement
// It converts the YouTubeURL to the embed format so the video autoplays (on mute)
function displayRandomMovie(movie){
    let player = document.getElementById("player"); //26, HTML
        // this didn't work becauseYouTube does not allow embedding its regular video links; 
        // it blocks embedding for security reasons unless the URL is in embed format
        // player.src = `${movie.trailer}`;
        
        // You have to convert the YouTube URL to the embed format
        // This allows YouTube videos to be played inside an <iframe>
        if (player){
        // To convert the YouTube URL to the embed format
        // Step 1: extract the video ID (split("v=")[1] gets everything after "v=" and split("&")[0] removes any additional parameters), and assign it to videoID
        let videoId = movie.trailer.split("v=")[1].split("&")[0]; 
        // Step2: use string interpolation to embed the videoId to the embed format
        let embedURL = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`;
        // Step 3: set the embed format URL link to the "src" attribute of the <iframe> tag in the HTML file
        player.src = embedURL; //set the src in iframe
    }
}

//add.EventListener #1
//listens for a 'submit' on the movie lookup feature
//if it finds a match, the movie listing page is returned
//if it doesn't find a match, an error message is displayed
function findForm(){
    form.addEventListener("submit", e => movieLookup(e));
}

function movieLookup(e){
    e.preventDefault();
    fetch("http://localhost:3000/movies")
    .then(resp => resp.json())
    .then(movies => findMovie(e, movies))
    .catch(error => console.log(error));
}

function findMovie(e, movies){
    let image = document.getElementById("Find-Image");
    let title = document.getElementById("Find-Title");
    let rating = document.getElementById("Find-Rating");
    let genre = document.getElementById("Find-Genre");
    let trailer = document.getElementById("Find-Trailer");
    let cast = document.getElementById("Find-Cast");
    let synopsis = document.getElementById("Find-Synopsis");
    let hiddenDiv = document.querySelector(".Hidden-Div");
    let found = movies.find(movie => movie.title.toLowerCase() === e.target.lookup.value.toLowerCase())
    if (found){
        clearScreen();
        hiddenDiv.classList.remove("Hidden-Div");
        hiddenDiv.classList.add("shown");
        image.src = found.image;
        title.textContent = found.title; 
        rating.textContent = `Rating: ${found.rating}`;
        genre.textContent = `Genre: ${found.genre}`;
        trailer.href = found.trailer;
        cast.textContent = `Cast: ${found.cast}`;
        synopsis.textContent = `Synopsis: ${found.synopsis}`;
        goBack(hiddenDiv);
        form.reset();
    }
    else {
        alert("Error: Movie not found")
        form.reset();
    }
}

//addEventListener #2
//listens for a click on the movie lookup results page
//handles the event by reloading the content of the home page
function goBack(hiddenDiv){
    backButton.addEventListener("click", () => {
        console.log("I was clicked")
        hiddenDiv.classList.remove("shown");
        hiddenDiv.classList.add("Hidden-Div");
        
        document.body.append(savedSeen);
        savedEnterTitle.forEach(el => document.body.append(el))
        savedContainer.forEach(el => document.body.append(el)) 
    })
}
findForm();

//add.EventListener #3
//listens for a 'mousover', over the id="movie-details" box
//grabs the randomly selected movie's details
//displays the reults
const myDiv = document.getElementById("movie-details");
function fetchMovieDetails(randomMovie) {
    let title = randomMovie.title;
    let rating = `Rating: ${randomMovie.rating}`;
    let cast = `Cast: ${randomMovie.cast}`;
    let synopsis = `Synopsis: ${randomMovie.synopsis}`

    myDiv.addEventListener("mouseover", function(event) {
        document.querySelector(".movie-title").innerText = title;
        document.querySelector(".rating").innerText = rating;
        document.querySelector(".cast").innerText = cast;
        document.querySelector(".synopsis").innerText = synopsis;
        
    
        event.target.style.backgroundColor = "#292C33";
    });
};
