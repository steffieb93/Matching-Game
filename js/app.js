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
    this.classList.toggle("open");
    // this.classList.add("disable-click");
}

// Function to check what the card is
function checkCard() {
    matchCard.push(this.firstChild);
    // console.log(matchCard);

    if(matchCard.length === 2) {
        moves++;
        document.querySelector(".moves").innerHTML = moves;

        // console.log(matchCard[0].className);
        // console.log(matchCard[1].className);

        if(matchCard[0].className == matchCard[1].className) {
            match();
            // console.log("match");
            // matchCard = [];
        }else {
            dontMatch();
            // console.log("unmatch");
            // matchCard = [];
        }
    }
}

// Function when cards match
function match() {
    matchCard[0].classList.add("match");
    matchCard[0].classList.remove("open");
    matchCard[1].classList.add("match");
    matchCard[1].classList.remove("open");

    matchCard = [];

}

// Function when cards don't match
function dontMatch() {
    matchCard[0].remove("open");
    // matchCard[0].remove("disable-click");
    matchCard[1].remove("open");
    // matchCard[1].remove("disable-click");

    matchCard = [];

}
/******************************************************************************/
/*
*   ALL "GLOBAL" VARIABLES
*/
let cards;
var cardsShuffled = [];
const deck = document.querySelector(".deck");
var matchCard = [];
let moves = 0;
/******************************************************************************/
/*
*   Making list that holds all the cards and shuffles them to deck
*/
//Searches for all of i tags that have fa class inside the li tag
cards = document.querySelectorAll(".card");
for (let i = 0; i < cards.length; i++) {
    cardsShuffled.push(cards[i]);
}

// Shuffles cards
shuffle(cardsShuffled);

// Adds shuffled cards to deck
for (let i = 0; i < cardsShuffled.length; i++) {
    [].forEach.call(cardsShuffled, function(item) {
        console.log(item);
        deck.appendChild(item);
    });
}
// console.log(deck);
/******************************************************************************/
/*
*   Making Event Listener to show what to do when a card is clicked
*/
for (let i = 0; i < cardsShuffled.length; i++) {
    cardsShuffled[i].addEventListener("click", showCard);
    cardsShuffled[i].addEventListener("click", checkCard);
}
