
// Add some states
// Clickbait headlines obtained from https://www.kaggle.com/vikassingh1996/news-clickbait-dataset

function generateHeadline() {
    // markov library uses Markov chains to try to generate a coherent chain of words
    let sent = markov.generateRandom(150);
    // Here we're finding nouns within this generated sentence
    // and using a random noun to get an image of that noun
    // and using that image as the image for the post.
    wordpos.getNouns(sent)
      .then(res => {
          // source.unsplash is an image api that lets us get images with a search term!
          $('#article-img').attr('src', `https://source.unsplash.com/250x300/?${res[0]}`);
          // Hide the loading circle and let the card fade in
          $('#loading').hide();
          $('#content-body').fadeIn();
      });
    // Update the headline
    $('#headline').html(sent);
}

// Clicking the next button will change the image source and will generate a new headline
$('#next').click(() => {
    $('#article-img').attr('src', "");
    generateHeadline();
})

// Wait until the document is finished loading!
$(document).ready(function() {
    // PapaParse is able to read local text files
    Papa.parse('/clickbait.txt', {
        download: true,
    	complete: function(results) {
    	    // Only get the first row of the csv file
    	    results.data = results.data.map((x) => x[0]);
    	    // Update the Markov chain model with the data and train it
    		markov.addStates(results.data);
    		markov.train(10);
    		generateHeadline();
    	}
    });
});
