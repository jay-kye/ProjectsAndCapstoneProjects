const gameContainer = document.getElementById("game");

const COLORS = [
  "red", "blue", "green", "orange", "purple",
  "red", "blue", "green", "orange", "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

let fCards = []; // flippedCards would be placed here
let mCards = []; // matchedCards would be placed here


function handleCardClick(e) {
  const pickedCard = e.target; // pickedCards declared
  // add conditions
  // 1) flipped cards are less than 2
  // 2) and are not in matchedCards and not in flippedCards
  if (fCards.length < 2 && !mCards.includes(pickedCard) && !fCards.includes(pickedCard)){
    pickedCard.style.backgroundColor = pickedCard.classList[0];
    // then change its bgcolor to its color which in class
    fCards.push(pickedCard);
    // then place pickedCard into flippedCards area
    if (fCards.length === 2){
      setTimeout(isColorMatched, 1000);
      // if 2 cards placed in flippedCard area, then run the function, wait for 1 sec
    }
  }
}

function isColorMatched(){
  const [card1, card2] = fCards;
  // get 1st and 2nd cards from flippedCards area
  
  //if 1st and 2nd cards are the same color,
  if (card1.classList[0] === card2.classList[0]){
    mCards.push(card1, card2);
    // then move 2cards to matchedCards area
  } else {
    card1.style.backgroundColor = '';
    card2.style.backgroundColor = '';
    // then reset the card colors
  }
  fCards = [];
  // empty flippedCards area then do re-game
}

// when the DOM loads
createDivsForColors(shuffledColors);
