// // After the API loads, call a function to enable the search box.
// function handleAPILoaded() {
//   $('#search-button').attr('disabled', false);
// }

// // Search for a specified string.
// function search() {
//   var q = $('#query').val();
//   console.log(q);
//   var request = gapi.client.youtube.search.list({
//     q: 'q',
//     part: 'snippet'
//   });

//   request.execute(function(response) {
//     var str = JSON.stringify(response.result);
//     $('#search-container').html('<pre>' + str + '</pre>');
//   });
// }

function search() {

	console.log('Search Started');
  var apiKey = '52788970992-v4a14n8qoa14d7lh7e2hfoq097al2d89.apps.googleusercontent.com';
	var q = $('#query').val();
	
    gapi.client.setApiKey(apiKey);
    gapi.client.load('youtube', 'v3', function() {
        isLoad = true;
    }); 
	console.log('Search Request');
	
    request = gapi.client.youtube.search.list({
				q: 'q',
        part: 'id, snippet',
        type: 'video',
        order: 'date'
     });
    

  request.execute(function(response) {
    var str = JSON.stringify(response.result);
    $('#search-container').html('<pre>' + str + '</pre>');
  });
}