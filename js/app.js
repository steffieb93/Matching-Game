/* What to do in js:
*   - Create a list that holds all of your cards
*   - Display the cards on the page
*       - shuffle the list of cards using the provided "shuffle" method
*       - loop through each card and create its HTML
*       - add each card's HTML to the page
*   - Set up the event listener for a card. If a card is clicked:
*       - display the card's symbol (put this functionality in another function that you call from this one)
*       - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
*       - if the list already has another card, check to see if the two cards match
*           + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
*           + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
*           + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
*           + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
*/
/******************************************************************************/
/*
*   ALL FUNCTIONS
*/
// Creation of game
function gameBoard() {
    //Searches for all of i tags that have fa class inside the li tag
    cards = document.getElementsByClassName("card");
    for (let i = 0; i < cards.length; i++) {
        cardsShuffled.push(cards[i]);
    }

    // Shuffles cards
    shuffle(cardsShuffled);

    // Adds shuffled cards to deck
    for (let i = 0; i < cardsShuffled.length; i++) {
        [].forEach.call(cardsShuffled, function(item) {
            deck.appendChild(item);
        });
    }
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Function to show card when clicked
function showCard() {
    if (this.className != "class open") {
        this.classList.toggle("open");
        this.classList.toggle("disable-click");
    }
}

// Function to check what the card is
function checkCard() {
    matchCard.push(this);

    click++;
    if (click == 1) {
        timer();
    }

    if(matchCard.length === 2) {
        moves++;
        document.querySelector(".moves").innerHTML = moves;

        if(matchCard[0].firstChild.className == matchCard[1].firstChild.className) {
            match();
        }else {
            dontMatch();
        }
    }
}

// Function when cards match
function match() {
    matchCard[0].classList.add("match");
    matchCard[0].classList.remove("open");
    matchCard[1].classList.add("match");
    matchCard[1].classList.remove("open");

    matches++;
    if (matches == 8) {
        congratulation();
    }

    starsCount++;
    if (starsCount == 2) {
        changeStar();
        starsCount = 0;
    }

    matchCard = [];
}

// Function when cards don't match
function dontMatch() {
    matchCard[0].classList.add("dont-match");
    matchCard[1].classList.add("dont-match");
    setTimeout(closeCard,600);
}

// Function to close card after an unmatch
var closeCard = function () {
    matchCard[0].classList.remove("dont-match");
    matchCard[0].classList.remove("open");
    matchCard[0].classList.remove("disable-click");
    matchCard[1].classList.remove("dont-match");
    matchCard[1].classList.remove("open");
    matchCard[1].classList.remove("disable-click");

    matchCard = [];
}

// Function to change stars Background
function changeStar() {
    stars[starIndex].style.visibility = "collapse";
    starIndex++;
}

// Function to Start timer
function timer() {
    clearTime = setInterval(function () {
        seconds++;
        document.querySelector(".timer").innerHTML = "Time: " + minutes + " Minutes " + seconds + " Seconds";

        if (seconds == 60) {
            minutes++;
            seconds = 0;

            document.querySelector(".timer").innerHTML = "Time: " + minutes + " Minutes " + seconds + " Seconds";
        }
    },1000)
}

// Function to Stop Timer
function stopTimer() {
    seconds = 0;
    minutes = 0;
    click = 0;

    document.querySelector(".timer").innerHTML = "Time: " + minutes + " Minutes " + seconds + " Seconds";
    clearInterval(clearTime);
}

// Function when restart icon is clicked
function restartGame() {
    moves = 0;
    matches = 0;
    document.querySelector(".moves").innerHTML = moves;

    for (let i = 0; i < cardsShuffled.length; i++) {
        cardsShuffled[i].classList.remove("open");
        cardsShuffled[i].classList.remove("match");
        cardsShuffled[i].classList.remove("dont-match");
        cardsShuffled[i].classList.remove("disable-click");
    }

    starIndex = 0;
    for (let i = 0; i < stars.length; i++) {
        stars[i].style.visibility = "visible";
    }
}

// Function when game is over
function congratulation() {
    clearInterval(clearTime);
    startover.style.visibility = "visible";

    document.querySelector(".gameOver").innerHTML = "Congratulations! You have won the game in " + moves + " moves and with a time of " + minutes + " minutes and " + seconds + " seconds!";
}
/******************************************************************************/
/*
*   ALL OUTSIDE VARIABLES
*/
let cards;
var cardsShuffled = [];
const deck = document.querySelector(".deck");
var matchCard = [];
let moves = 0;
let click = 0;
let matches = 0;
let starsCount = 0;
let starIndex = 0;
const stars = document.querySelectorAll(".stars li");
const restart = document.querySelector(".restart");
let seconds = 0;
let minutes = 0;
var startTime = true;
var clearTime;
const replay = document.querySelector(".replay");
const startover = document.querySelector(".congratulation");
/******************************************************************************/
/*
*   Making list that holds all the cards and shuffles them to deck
*/
gameBoard();
/******************************************************************************/
/*
*   Making Event Listener to show what to do when a card is clicked
*/
for (let i = 0; i < cardsShuffled.length; i++) {
    cardsShuffled[i].addEventListener("click", showCard);
    cardsShuffled[i].addEventListener("click", checkCard);
}
/******************************************************************************/
/*
*   Event Listeners for restarting the game
*/
// When refresh icon is clicked
restart.addEventListener("click", function () {
    restartGame();
    gameBoard();
    stopTimer();
});

// When play again button is clicked
replay.addEventListener("click", function () {
    startover.style.visibility = "collapse";

    restartGame();
    gameBoard();
    stopTimer();
});
