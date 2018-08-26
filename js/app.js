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

// Shows card when clicked
function showCard() {
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
}


// List that holds all of the cards and calls shuffle function to shuffle cards
let cards = document.getElementsByClassName("card");
var randomCards = [...cards];

// let cardsShuffled = shuffle(randomCards);
shuffle(randomCards);

// Adds shuffled cards to deck
const deck = document.querySelector(".deck");

for (let i = 0; i < randomCards.length; i++) {
    [].forEach.call(randomCards, function(item) {
        deck.appendChild(item);
    });
}

// Adds event listener to each card
for (let i = 0; i < randomCards.length; i++) {
    randomCards[i].addEventListener("click", showCard);
}
