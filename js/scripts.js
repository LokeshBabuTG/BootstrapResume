(function ($) {
"use strict"; // Start of use strict

function msToTime(duration) {
	var milliseconds = parseInt((duration%1000))
		, seconds = parseInt((duration/1000)%60)
		, minutes = parseInt((duration/(1000*60))%60)
		, hours = parseInt((duration/(1000*60*60))%24);

	hours = (hours < 10) ? "0" + hours : hours;
	minutes = (minutes < 10) ? "0" + minutes : minutes;
	seconds = (seconds < 10) ? "0" + seconds : seconds;

	return minutes + ":" + seconds ;
}


// Smooth scrolling using jQuery easing
$('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
	if (
		location.pathname.replace(/^\//, "") ==
			this.pathname.replace(/^\//, "") &&
		location.hostname == this.hostname
	) {
		var target = $(this.hash);
		target = target.length
			? target
			: $("[name=" + this.hash.slice(1) + "]");
		if (target.length) {
			$("html, body").animate(
				{
					scrollTop: target.offset().top,
				},
				1000,
				"easeInOutExpo"
			);
			return false;
		}
	}
});

// Closes responsive menu when a scroll trigger link is clicked
$(".js-scroll-trigger").click(function () {
	$(".navbar-collapse").collapse("hide");
});

// Activate scrollspy to add active class to navbar items on scroll
$("body").scrollspy({
	target: "#sideNav",
});

$("#contactMe_form").submit(function( event ) {
	console.time("contactMe")
	var form = $(event.target)
	var arr = form.serializeArray();
	var formData = {};
	for(var i in arr)
		formData[arr[i].name] = arr[i].value;
	
	$.getJSON( form.attr("action"), formData,  function(response) {
		console.log( "success" );
		form.find("input, textarea").val("");
		
		$.extend(response, {
			header : "Message Sent",
			timeTaken : msToTime(console.timeEnd("contactMe")),
			toastMessage : "Thanks for your message, I will try to Contact you back.",
			id : performance.now()
		});
		
		var toast = Handlebars.compile($("#contactMeToast").html())(response);
		
		$("#contactMe").append($("<div>").html(toast));
		toast = $("#" + response.id).toast();
		$(toast).toast('show');
	})
	.done(function() {
		console.log( "second success" );
	})
	.fail(function() {
		console.log( "error" );
	})
	.always(function() {
		console.log( "complete" );
	});
  
	return false;
});
})(jQuery); // End of use strict
