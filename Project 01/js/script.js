// event listener to respond to "Show another quote" button clicks
// when user clicks anywhere on the button, the "printQuote" function is called
document.getElementById('loadQuote').addEventListener("click", printQuote, false);
document.getElementById('loadQuote').addEventListener("click", randomBackgroundColor, false);

//sets an automatic refresh of the quote every 10 seconds if the button isn't clicked (extra credit)
var intervalID = setInterval(printQuote, 10000);

//array to hold quotes that have been used so that all quotes will be seen before repeating (extra credit)
var usedQuotes = [];
var selectedQuote = {};

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

    //close the paragraph tag whether or not citation/year were added
    message += '</p>';

    document.getElementById('quote-box').innerHTML = message;

    //log quote to console to track use (extra credit)
    console.log(selectedQuote.quote);
    //add quote to usedQuotes to avoid using it again for now
    usedQuotes.push(selectedQuote);
    //reset the interval so that it doesn't immediately pick another quote
    clearInterval(intervalID);
    intervalID = setInterval(printQuote, 10000);
}

//generate a random quote by trapping the quote generation in a loop until it is unique (extra credit)
function getUniqueQuote(selectedQuote) {
    var uniqueQuote = getRandomQuote();

    while (uniqueQuote in usedQuotes) {
        uniqueQuote = getRandomQuote();
    }
    return uniqueQuote;
}

//function to change background color when called to a randomly generated RGB value (extra credit)
function randomBackgroundColor() {
    document.body.style.backgroundColor = "rgb(" + getColorNumber() + ", " + getColorNumber() + ", " + getColorNumber() + ")";
}