/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
 */

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from "./games.js";

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA);

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
 */

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
  // Get the container element where game cards will be added
  const gamesContainer = document.getElementById("games-container");

  // Loop over each game in the array
  for (let game of games) {
    // Create a new div element for the game card
    const gameCard = document.createElement("div");
    gameCard.classList.add("game-card");

    // Set the inner HTML using a template literal
    gameCard.innerHTML = `
      <img src="${game.img}" class="game-img" alt="${game.name}">
      <h3>${game.name}</h3>
      <p>Backers: ${game.backers}</p>
      <p>Pledged: $${game.pledged.toLocaleString()}</p>
    `;

    // Append the game card to the container
    gamesContainer.appendChild(gameCard);
  }
}

// Call the function with the parsed game data
addGamesToPage(GAMES_JSON);

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
 */

// Calculate total contributions (number of backers)
const totalContributions = GAMES_JSON.reduce(
  (sum, game) => sum + game.backers,
  0
);

// Update the contributionsCard element
const contributionsCard = document.getElementById("num-contributions");
contributionsCard.textContent = totalContributions.toLocaleString();

// Calculate total amount pledged
const totalPledged = GAMES_JSON.reduce((sum, game) => sum + game.pledged, 0);

// Update the raisedCard element
const raisedCard = document.getElementById("total-raised");
raisedCard.textContent = `$${totalPledged.toLocaleString()}`;

// Display total number of games
const gamesCard = document.getElementById("num-games");
gamesCard.textContent = GAMES_JSON.length;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
 */

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
  const unfundedGames = GAMES_JSON.filter((game) => game.pledged < game.goal);
  clearGames(); // optional: clears previous cards
  addGamesToPage(unfundedGames);
}

// show only games that are fully funded
function filterFundedOnly() {
  const fundedGames = GAMES_JSON.filter((game) => game.pledged >= game.goal);
  clearGames(); // optional: clears previous cards
  addGamesToPage(fundedGames);
}

// show all games
function showAllGames() {
  clearGames(); // optional: clears previous cards
  addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button

// Attach event listeners
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);
function clearGames() {
  const gamesContainer = document.getElementById("games-container");
  gamesContainer.innerHTML = "";
}
/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
 */

// grab the description container
// Get the container where the description will be added
const descriptionContainer = document.getElementById("description-container");

// Count the number of unfunded games
const unfundedCount = GAMES_JSON.filter(
  (game) => game.pledged < game.goal
).length;

// Calculate total amount raised
const totalRaised = GAMES_JSON.reduce((sum, game) => sum + game.pledged, 0);

// Total number of games
const totalGames = GAMES_JSON.length;

// Create the message using a template string and ternary operator
const message = `A total of $${totalRaised.toLocaleString()} has been raised for ${totalGames} game${
  totalGames === 1 ? "" : "s"
}. 
Currently, ${unfundedCount} game${
  unfundedCount === 1 ? " remains" : "s remain"
} unfunded. We need your help to fund these amazing games!`;

// Create a new paragraph element
const messageParagraph = document.createElement("p");
messageParagraph.textContent = message;

// Add the paragraph to the description container
descriptionContainer.appendChild(messageParagraph);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = GAMES_JSON.sort((item1, item2) => {
  return item2.pledged - item1.pledged;
});

// Use destructuring and spread operator to grab the top two games
const [firstGame, secondGame, ...rest] = sortedGames;

// Create and append element for the top pledge game
const topGameElement = document.createElement("h3");
topGameElement.textContent = firstGame.name;
firstGameContainer.appendChild(topGameElement);

// Create and append element for the runner-up game
const runnerUpElement = document.createElement("h3");
runnerUpElement.textContent = secondGame.name;
secondGameContainer.appendChild(runnerUpElement);
