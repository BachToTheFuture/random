
// Tweets from https://www.kaggle.com/austinreese/trump-tweets

function generateTweet() {
    // Uses markov.js to generate a coherent string of words
    let sent = markov.generateRandom(200);
    $('#tweet').html(sent);
}

// When the next button is clicked generate the tweet
// This is using jQuery
$('#next').click(() => {
    generateTweet();
})

$(document).ready(function() {
    Papa.parse('trumptweets.csv', {
      download: true,
    	complete: function(results) {
            $('#loading').hide();
            $('#content-body').fadeIn();
            // Only get the first column
            results.data = results.data.map((x) => x[0]);
            // Train the Markov chain and generate tweet!
    		markov.addStates(results.data);
    		markov.train(11);
    		generateTweet();
    	}
    });
});