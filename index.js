const browse = document.getElementById("browse")
const enterTitle = document.getElementsByClassName("enter-title");
const container = document.getElementsByClassName("container");
const seen = document.getElementById("seen-this-one");
let backButton = document.getElementById("Back-Button");
const form = document.getElementById("lookup-form");

//function clearPage{ 
//which will clear everything except for the h1 heding on the page:
let savedEnterTitle, savedContainer, savedScreen;

function clearScreen(){
    // if(browse) {
    //     browse.remove();
    // }
    //saving the homepage information to restore
    savedEnterTitle = Array.from(enterTitle);
    savedContainer = Array.from(container);
    savedSeen = seen;
    //removing the homepage information to load one addEventListener events
    savedSeen.remove();
    savedEnterTitle.forEach(el => el.remove());
    savedContainer.forEach(el => el.remove());

    // for(let i = 0; i < dropdowns.length; i++){
    //     dropdowns[i].remove();
    // }
}

//DELIVERABLES:
// Step 1: fetch the movie data from db.json
//Step 2: Randomly select movie
//Step 3: auto-play the trailer 2 seconds after the webpage is fully loaded

// This function ensures that the DOM content is fully loaded first
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

//add.EventListener #2
//listens for a 'form' submit
//does a strict equality comparison between the movie title entered and the movies in th db.json file (I don't think it should be case sensitive)
//regardless of whether it finds a match, 
//calls the clearPage function()
//if it finds a match, it returns the movie listing page 
//if it doesn't find a match "Sorry, not in our data base."
//stretch goal: if it's not in the data base, we allow the user to submit the title online, for us to add
//code goes here:
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
        // for(let i = 0; i< hidden.length; i++){
        //     hidden[i].classList.remove("hidden");
        //     hidden[i].classList.add("shown");
        // }
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
//listens for a 'mousover' over the id="movie-details" box
//calls the clearPage function()
//will grab the <h2> and <p> tags in the "movie-details" div and console log the information on the page
//will contain an addEventListener for a click on the thumbs or thumbs button
//code goes here:

// example
//listens for a 'mousover' over the id="movie-details" box
const myDiv = document.getElementById("movie-details");
function fetchMovieDetails(randomMovie) {
    let title = randomMovie.title;
    let rating = `Rating: ${randomMovie.rating}`;
    let cast = `Cast: ${randomMovie.cast}`;
    let synopsis = `Synopsis: ${randomMovie.synopsis}`

    // fetch("http://localhost:3000/movies")
    // .then(resp => resp.json())
    // .then(movies => mouse(movies))
    // .catch(error => console.log(error));

    
    myDiv.addEventListener("mouseover", function(event) {
        document.querySelector(".movie-title").innerText = title;
        document.querySelector(".rating").innerText = rating;
        document.querySelector(".cast").innerText = cast;
        document.querySelector(".synopsis").innerText = synopsis;
        
    
        event.target.style.backgroundColor = "#292C33";
    });
};


// function mouse(movies) {
    // title = movies[randomMovieIndex].title;
    // rating = movies[randomMovieIndex].rating;
    //  cast = movies[randomMovieIndex].cast;
    //  synopsis = movies[randomMovieIndex].synopsis;


// });}
// myDiv.addEventListener("mouseout", function(event) {
// event.target.style.backgroundColor = "#292C33";
// });

// example
//calls the clearPage function()
//clearScreen()

// example
//will grab the <h2> and <p> tags in the "movie-details" div and console log the information on the page
// const element = document.getElementsByTagName("p")
// const element = document.getElementsByTagName("h2")
// console.log(element)
// console.log(element1)

//addEventListener #4?
//submit 'form' of filters

