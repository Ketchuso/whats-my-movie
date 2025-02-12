const browse = document.getElementById("browse")
const enterTitle = document.getElementsByClassName("enter-title");
const container = document.getElementsByClassName("container");
const seen = document.getElementById("seen-this-one");
// const dropdowns = document.getElementsByClassName("dropdowns")

//function clearPage{ 
//which will clear everything except for the h1 heding on the page}
//code goes here:

function clearScreen(){
    // if(browse) {
    //     browse.remove();
    // }
    if(seen){
        seen.remove();
    }
    for(let i = 0; i < enterTitle.length; i++){
        enterTitle[i].remove();
    }
    for(let i = 0; i < container.length; i++){
        container[i].remove();
    }
    // for(let i = 0; i < dropdowns.length; i++){
    //     dropdowns[i].remove();
    // }
}

//addEvenListener # 1?
//listens for click on 'Browse Movies"
//calls the clearPage function()
//handles the event by displaying all movies
//code goes here:


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
    const form = document.getElementById("lookup-form");

    form.addEventListener("submit", e => movieLookup(e));
}

function movieLookup(e){
    e.preventDefault();
    clearScreen();
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
    let found = movies.find(movie => movie.title === e.target.lookup.value)

    if (found){
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
    }
    else {
        console.log("Movie not found")
    }
}

findForm();
//add.EventListener #3
//listens for a 'mousover' over the id="movie-details" box
//calls the clearPage function()
//will grab the <h2> and <p> tags in the "movie-details" div and console log the information on the page
//will contain an addEventListener for a click on the thumbs or thumbs button
//code goes here:


//addEventListener #4?
//submit 'form' of filters


