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
var ansChoices = document.querySelectorAll(".answer-choices");

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
var gameQuestions = [];

//function 

// Function to make questions
function makeQuestion() {
    //show question #
    questionCount++;
    questionCard.children[0].children[0].textContent = questionCount;
    //select a random question
    var randNum = Math.floor(Math.random()*gameQuestions.length);
    var randQuestion = gameQuestions[randNum].question;
    //present selected random question
    questionCard.children[1].textContent = randQuestion;

    //creating and filling array with corresponding answers
    var ans = []
    for (var x in gameQuestions[randNum]) {
        ans.push(gameQuestions[randNum][x])
    }
    //removing first in the array (the question)
    ans.splice(0,1);
    
    //function to check answers
    function ansCheck(e) {
        e.removeEventListener("onclick", ansCheck);
        console.log(e);
        if (e.textContent === gameQuestions[randNum].answer) {
            //TODO: We need some way of telling the user "Correct"
            gameQuestions.splice(randNum,1);
            if (gameQuestions.length > 0) {
                makeQuestion();
            }
            else {
                winGame();
            }
        } else {
            e.style.backgroundColor = "red";
        }
    }

    //displaying answers in the buttons
    for (i = 0; i < 4; i++) {
        var rand = Math.floor(Math.random()*ans.length);
        questionCard.children[2].children[i].textContent = ans[rand];
        //add event listener which checks if answer is correct
        questionCard.children[2].children[i].addEventListener("click", ansCheck(questionCard.children[2].children[i]));
        ans.splice(rand,1);
    }

    //delete selected random question from the array
    
}

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
    startButton.removeEventListener("click", startGame);
    //Hides instructionCard
    instructionCard.style.display = "none";
    //Displays the questionCard
    questionCard.style.display = "block";
    //Begins the timer
    timerCount = 60;
    startTimer();
    makeQuestion();
}

startButton.addEventListener("click", startGame);

// reset upon page load
function init () {
    timerEl.textContent = "Time Left : " + 60;
    questionCount = 0;
    gameQuestions = questions;
}

init();