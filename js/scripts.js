(function ($) {
"use strict"; // Start of use strict

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
	var form = $(event.target)
	var arr = form.serializeArray();
	var formData = {};
	for(var i in arr)
		formData[arr[i].name] = arr[i].value;
	
	$.getJSON( form.attr("action"), formData,  function(response) {
		console.log( "success" );
		form.find("input, textarea").val("");
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
