// event listener to respond to "Show another quote" button clicks
// when user clicks anywhere on the button, the "printQuote" function is called
document.getElementById('loadQuote').addEventListener("click", printQuote, false);

//uses random number * length to get proper range
function getRandomQuote() {
    return quotes[Math.floor(Math.random() * quotes.length)];
}

//builds print string out of randomly selected quote
function printQuote() {
    var selectedQuote = getRandomQuote();
    message = '<p class="quote">' + selectedQuote.quote + '</p>';
    message += '<p class="source">' + selectedQuote.source + '</p>';
    document.getElementById('quote-box').innerHTML = message;
}