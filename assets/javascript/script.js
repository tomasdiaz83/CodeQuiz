//click start button listener
//timer starts 
//prompts with questions
//if answers = wrong then subtract timer
//if answer = correct then continue prompts
//if all questions completed && timer = 0 then end game
//localStorage for the scores 
//input for saving initials

// var for all selectors - 

// var time
// var win
// var loss
// var button
// etc.

// button start

// function starting timer
// function winning
// function loss
// function initials
// function showing all the quiz questions
// function submit the input in the form for initials

// //storing data
// function storing wins
// function storing losses
// function storing intiials

// variables for selectors
var startButton = document.querySelector(".start-button");
var instructionCard = document.querySelector("#instructionCard");
var questionCard = document.querySelector("#questionCard");
var timerEl = document.querySelector("#timer");

// other variables
var timer;
var timerCount

function init () {
    timerEl.textContent = "Time Left : " + 60;
}

// Begins the timer and initiates the game over protocols
function startTimer() {
    //sets timer
    timer = setInterval(function(){
        timerCount--;
        timerEl.textContent = "Time Left : " + timerCount;
    }, 1000);;

}

//Begins the game
function startGame() {
    //Hides instructionCard
    instructionCard.style.display = "none";
    //Displays the questionCard
    questionCard.style.display = "block";
    //Begins the timer
    timerCount = 60;
    startTimer();
}

startButton.addEventListener("click", startGame);

init();