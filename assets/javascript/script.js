var instructionCard = document.querySelector("#instructionCard");
var questionCard = document.querySelector("#questionCard");
var saveScoreCard = document.querySelector("#saveScoreCard");
var startButton = document.querySelector(".start-button");
var timerEl = document.querySelector("#timer");
var scoreList = document.querySelector("#score-list");

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
var scores = [];
var scored = false;

function gameOver() {
    timerEl.textContent = 0
    gameOverCard.style.display = "block";
    questionCard.style.display = "none";
    gameOverCard.children[1].children[0].textContent = questionCount - 1;
    gameOverCard.children[1].children[1].textContent = questions.length;
    for (j = 0; j < 4; j++) {
        questionCard.children[2].children[0].remove();
    }
    gameOverCard.children[2].addEventListener("click", init);
}

function storeScores() {
    localStorage.setItem("storedScores", JSON.stringify(scores))
}

function renderScores() {
    scoreList.textContent = "";

    for (var i = 0; i < scores.length && i < 10; i++) {
        var li = document.createElement("li");
        li.textContent = scores[i].user + " : " + scores[i].score;

        scoreList.appendChild(li);
    }
}

function acceptScore() {
    scored = true;
    var newUser = document.querySelector("#Score").value.trim();
    var newScore = {
        user : newUser,
        score : timerCount
    };
    scores.push(newScore);
    storeScores();
    init();
}

function winGame() {
    clearInterval(timer);
    questionCard.style.display= "none";
    saveScoreCard.style.display= "block";

    document.querySelector("#ScoreInput").addEventListener("submit", acceptScore)
}

// Function to make questions
function makeQuestion() {
    if (gameQuestions[0] == undefined) {
        winGame();
        return;
    }
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

    //displaying answers in the buttons
    for (i = 0; i < 4; i++) {
        //creating a button
        var button = document.createElement("button");
        questionCard.children[2].appendChild(button);
        
        //displaying random answer in the button
        var rand = Math.floor(Math.random()*ans.length);
        questionCard.children[2].children[i].textContent = ans[rand];
        
        //add event listener which checks if answer is correct
        questionCard.children[2].children[i].addEventListener("click", function(event) {
            event.stopPropagation();
            if (event.target.textContent !== gameQuestions[randNum].answer) {
                event.target.style.backgroundColor = "red";
                timerCount -= 10;
            } else {
                gameQuestions.splice(randNum,1);
                for (j = 0; j < 4; j++) {
                    questionCard.children[2].children[0].remove();
                }
                makeQuestion();
            }
        });
        ans.splice(rand,1);
    }    
}

// Begins the timer and initiates the game-over protocols
function startTimer() {
    //sets timer
    timer = setInterval(function(){
        timerCount--;
        timerEl.textContent = "Time Left : " + timerCount;
        if (timerCount <= 0) {
            clearInterval(timer);
            gameOver();
        }
    }, 1000);;
}

//Begins the game
function startGame() {
    //Hides instructionCard
    instructionCard.style.display = "none";
    //Displays the questionCard
    questionCard.style.display = "block";
    highScoreCard.style.display = "none";
    saveScoreCard.style.display = "none";
    //Begins the timer
    timerCount = questions.length * 15;
    timerEl.textContent = "Time Left : " + timerCount;
    startTimer();
    makeQuestion();
}

startButton.addEventListener("click", startGame);

// reset upon page load
function init () {
    instructionCard.style.display = "block";
    questionCard.style.display = "none";
    saveScoreCard.style.display = "none";
    highScoreCard.style.display = "block";
    gameOverCard.style.display = "none";

    if(scored = true) {
        document.querySelector("#ScoreInput").removeEventListener("submit", acceptScore);
        scored = false;
    }
    
    //setting the timer
    timerEl.textContent = "Time Left : ";
    questionCount = 0;
    Object.assign(gameQuestions, questions);

    var storedScores = JSON.parse(localStorage.getItem("storedScores"));
    if (storedScores !== null) {
        scores = storedScores;
    }
    renderScores();
}

init();