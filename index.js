const browse = document.getElementById("browse")
const enterTitle = document.getElementsByClassName("enter-title");
const container = document.getElementsByClassName("container");
const seen = document.getElementById("seen-this-one");
const dropdowns = document.getElementsByClassName("dropdowns")

function clearScreen(){
    if(browse) {
        browse.remove();
    }
    if(seen){
        seen.remove();
    }
    for(let i = 0; i < enterTitle.length; i++){
        enterTitle[i].remove();
    }
    for(let i = 0; i < container.length; i++){
        container[i].remove();
    }
    for(let i = 0; i < dropdowns.length; i++){
        dropdowns[i].remove();
    }
}