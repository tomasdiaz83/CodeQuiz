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
var instructionCard = document.querySelector("#instructionCard");
var questionCard = document.querySelector("#questionCard");
var startButton = document.querySelector(".start-button");
var timerEl = document.querySelector("#timer");
var answerChoice = document.querySelectorAll("input");

// other variables
var questionCount = 0;
var timer;
var timerCount;
var questions = [
    {
        question : "What term describes the relation of Jesus' humanity to His divinity in His person?",
        answer : "The Hypostatic Union",
        false1 : "The Homoiousion",
        false2 : "The Divinic Humanity",
        false3 : "The Person Theletism"
    },
    {
        question : "What does it mean to say Mary is Immaculately Conceived?",
        answer : "Mary is conceived without the stain of sin",
        false1 : "Mary conceives by miraculous power the Son of God",
        false2 : "Mary gives birth to Christ without any impurity",
        false3 : "Mary conceives the idea of God without any admixture"
    },
    {
        question : "Which short biography best describes the Father of Monks, Anthony the Great?",
        answer : "Born in Egypt, began life as a hermit, fought with demons in the desert, ally of St. Athanaius against the Arians",
        false1 : "Born in Italy, began life as a hermit, his sister called miraculous rain, written of by Gregory the Great",
        false2 : "Born in Egypt, began life as a prostitute, converted by miraculous exclusion from the Church, was covered in a habit of hair,",
        false3 : "Born in Italy, began life as a soldier, divested himself of all property, miraculously marked by the wounds of Christ"
    },
];

// rest upon page load
function init () {
    timerEl.textContent = "Time Left : " + 60;
    questionCount = 0;
}

// Function to make questions
function makeQuestion(x) {
    //show question #
    questionCount++;
    questionCard.children[0].children[0].textContent = questionCount;
    //present random question
    questionCard.children[1].textContent = x[Math.floor(Math.random()*x.length)].question;

    


    // TODO: There's a problem in the for-loop, which is trying to get a random property (answer choice)
    // for (i = 0; i < 4; i++) {
    //     var randomProperty = function (displayedQuestion) {
    //         var keys = Object.keys(displayedQuestion);
    //         return displayedQuestion[keys[keys.length * Math.random() << 0]];
    //     }
    //     questionCard.children[2].children[i].value = randomProperty;
    // }
}
// Function to check answer chosen

//function 

// Begins the timer and initiates the game-over protocols
function startTimer() {
    //sets timer
    timer = setInterval(function(){
        timerCount--;
        timerEl.textContent = "Time Left : " + timerCount;
        if (timerCount <= 0) {
            clearInterval(timer);
            // gameOver();
        }
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
    var gameQuestions = questions;
    makeQuestion(gameQuestions);
}

startButton.addEventListener("click", startGame);


init();