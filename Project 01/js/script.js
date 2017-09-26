// event listener to respond to "Show another quote" button clicks
// when user clicks anywhere on the button, the "printQuote" function is called
document.getElementById('loadQuote').addEventListener("click", printQuote, false);
document.getElementById('loadQuote').addEventListener("click", randomColorsSetter, false);

//array to hold quotes that have been used so that all quotes will be seen before repeating (extra credit)
var usedQuotes = [];
var selectedQuote = {};

//sets an automatic refresh of the quote and color change every 10 seconds if the button isn't clicked on page load (extra credit)
function startIntervals() {
    var quoteInterval = setInterval(printQuote, 3000);
    var colorInterval = setInterval(randomColorsSetter, 3000);
}

//uses random number * length to get proper range
function getRandomQuote() {
    return quotes[Math.floor(Math.random() * quotes.length)];
}

//function to generate random values for background color (extra credit)
function getColorNumber() {
    return Math.floor(Math.random() * 256);
}

//builds print string out of randomly selected quote
function printQuote() {
    //first check if all quotes have been used already, if so reset usedQuotes
    if (usedQuotes.length === quotes.length) {
        usedQuotes = [];
        //log to the console when the array is reset (for debug)
        console.log("All quotes used");
    }

    selectedQuote = getUniqueQuote();

    message = '<p class="quote">' + selectedQuote.quote + '</p>';
    message += '<p class="source">' + selectedQuote.source;
    //check if there's a citation, if so add to message
    if ('citation' in selectedQuote) {
        message += '<span class="citation">' + selectedQuote.citation + '</span>';
    }
    //same as above but for year
    if ('year' in selectedQuote) {
        message += '<span class="year">' + selectedQuote.year + '</span>';
    }

    //close the paragraph tag and apply HTML change whether or not citation/year were added
    message += '</p>';
    document.getElementById('quote-box').innerHTML = message;

    //log quote to console to track use (extra credit)
    console.log(selectedQuote.quote);

    //add quote to usedQuotes to avoid using it again for now
    usedQuotes.push(selectedQuote);

    //reset the intervals so that they don't immediately pick another quote
    clearInterval(quoteInterval);
    clearInterval(colorInterval);
    startIntervals();
}

//generate a random quote by trapping the quote generation in a loop until it is unique (extra credit)
function getUniqueQuote(selectedQuote) {
    var uniqueQuote = getRandomQuote();

    while (usedQuotes.includes(uniqueQuote)) {
        uniqueQuote = getRandomQuote();
    }
    return uniqueQuote;
}

//function to change background color when called to a randomly generated RGB value (extra credit)
function randomColorsSetter() {
    var colorString = "rgb(" + getColorNumber() + ", " + getColorNumber() + ", " + getColorNumber() + ")";
    document.body.style.backgroundColor = colorString;
    document.getElementById("loadQuote").setAttribute("background-color", colorString);
}

//start intervals if nothing is clicked
startIntervals();