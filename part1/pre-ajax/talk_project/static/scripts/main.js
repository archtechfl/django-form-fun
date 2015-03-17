$(function() {

	$('#post-form').on('submit', function(event){
		event.preventDefault();
		console.log("form submitted");
		create_post();
	});

	// AJAX for posting
	function create_post() {
	    console.log("create post is working!"); // sanity check
	    console.log($('#post-form input[name="csrfmiddlewaretoken"]').val());
	    $.ajax({
	        url : "create_post/", // the endpoint
	        type : "POST", // http method
	        data : {
	        	csrfmiddlewaretoken: $('#post-form input[name="csrfmiddlewaretoken"]').val(),
	        	the_post: $('#post-text').val(),
	        }, // data sent with the post request
	        // handle a successful response
	        success : function(json) {
	            $('#post-text').val(''); // remove the value from the input
	            console.log(json); // log the returned json to the console
	            $("#talk").prepend("<li><strong>"+json.text+"</strong> - <em> "+json.author+"</em> - <span> "+json.created+"</span></li>");
	            console.log("success"); // another sanity check
	        },

	        // handle a non-successful response
	        error : function(xhr,errmsg,err) {
	            $('#results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: "+errmsg+
	                " <a href='#' class='close'>&times;</a></div>"); // add the error to the dom
	            console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
	        }
	    });
	};

});