//jquery "styling"
$("body").children().css("background-color", "#eaeaea").css("padding", "5px 15px").css("margin-top", "10px").css("margin-bottom", "10px");
$("#title").css("background-color", "#454851");
$("#subtitle").css("background-color", "#454851");

//selectors
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
        false2 : "Born in Egypt, began life as a prostitute, converted by miraculous exclusion from the Church, was covered in a habit of hair",
        false3 : "Born in Italy, began life as a soldier, divested himself of all property, miraculously marked by the wounds of Christ"
    },
    {
        question : "What is contemplative prayer?",
        answer : "The interior act by which man is set wholly to gaze upon the Lord and live from that gaze",
        false1 : "The interior act by which man orders his inner life so as to achieve perfect harmony",
        false2 : "The exterior act by which man gives praise and adoration to the source of creation",
        false3 : "The exterior act by which man reflects upon his inner life and make repentance"
    },
    {
        question : "Which best describes Pascal's Wager, concerning the agnostic?",
        answer : "If God does not exist, there is no gain and no loss; if God exists, there is gain for living well, or eternal loss for sin. Thus bet on God and live well.",
        false1 : "If God does exist, one's life is but the toss of a coin between going to hell or going to heaven. Thus enjoy life, by virtue or by vice.",
        false2 : "If God does not exist, the afterlife must surely be hell; if God does exist, there is only half a chance of hell. So most every bet is hell.",
        false3 : "If God does exist, he would surely keep one from eternal hell. So live your life as you wish, and be assured of heavenly reward."
    }
];

//other variables
var gameQuestions = [];
var scores = [];
var scored = false;

//Upon losing the game, set timer to zero (in case it went negative), remove all answers from question card, give your score, and ask to play again
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

//storing scores locally
function storeScores() {
    localStorage.setItem("storedScores", JSON.stringify(scores))
}

//making the high score list, listing only up to 10 players
function renderScores() {
    scoreList.textContent = "";

    for (var i = 0; i < scores.length && i < 10; i++) {
        var li = document.createElement("li");
        li.textContent = scores[i].user + " : Finished with " + scores[i].score + " seconds left";

        scoreList.appendChild(li);
    }
}

//Putting name and score into an object, then storing and reinitializing the game
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

//win status, halting the timer and putting a listener on to the score input field
function winGame() {
    clearInterval(timer);
    questionCard.style.display= "none";
    saveScoreCard.style.display= "block";

    document.querySelector("#ScoreInput").addEventListener("submit", acceptScore)
}

// Function to make questions, selected randomly
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
        button.classList.add("ans-button");
        questionCard.children[2].appendChild(button);
        
        //displaying random answer in the button
        var rand = Math.floor(Math.random()*ans.length);
        questionCard.children[2].children[i].textContent = ans[rand];
        
        //add event listener which checks if answer is correct
        questionCard.children[2].children[i].addEventListener("click", function(event) {
            event.stopPropagation();
            if (event.target.textContent !== gameQuestions[randNum].answer) {
                event.target.style.backgroundColor = "red";
                event.target.style.color = "red";
                timerCount -= 10;
            } else {
                gameQuestions.splice(randNum,1);
                for (j = 0; j < 4; j++) {
                    questionCard.children[2].children[0].remove();
                }
                makeQuestion();
            }
        });

        //removing answer from the array
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
    timerCount = questions.length * 20;
    timerEl.textContent = "Time Left : " + timerCount;
    startTimer();
    makeQuestion();
}

//To begin the game
startButton.addEventListener("click", startGame);

// reset upon page load
function init () {
    instructionCard.style.display = "block";
    questionCard.style.display = "none";
    saveScoreCard.style.display = "none";
    highScoreCard.style.display = "block";
    gameOverCard.style.display = "none";
    document.querySelector("#timeToComplete").textContent = questions.length * 20;

    //Removing "used" listeners to ensure they are not piled one on top of another
    if(scored = true) {
        document.querySelector("#ScoreInput").removeEventListener("submit", acceptScore);
        scored = false;
    }
    
    //setting the timer
    timerEl.textContent = "Time Left : 00";
    questionCount = 0;
    Object.assign(gameQuestions, questions);

    var storedScores = JSON.parse(localStorage.getItem("storedScores"));
    if (storedScores !== null) {
        scores = storedScores;
    }
    renderScores();
}

init();