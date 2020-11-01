
// Quotes obtained from https://www.kaggle.com/coolcoder22/quotes-dataset

var quotes = [];

function generateQuote() {
    // Get a random quote from the list of quotes
    let quote_pair = quotes[Math.floor(Math.random()*(quotes.length-1))];
    let quote = quote_pair[1];
    let author = quote_pair[0];
    $('#quote').html(quote);
    $('#author').html(author);
}

$('#next').click(() => {
    // The image will always be an image of a forest to fit the green background!
    $('#article-img').attr('src', `https://source.unsplash.com/250x350/?forest`);
    generateQuote();
})

// Wait until the document is finished loading!
$(document).ready(function() {
    Papa.parse('/quotes.csv', {
      download: true,
    	complete: function(results) {
    	    $('#loading').hide();
            $('#content-body').fadeIn();
            // quotes will be a list of objects.
    		quotes = results.data;
    		generateQuote();
    	}
    });
});
