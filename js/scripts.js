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
	
	form.find("button[type='submit']").remove();
	form.append(Handlebars.compile($("#contactMeButton").html())({working : true}));
	
	var arr = form.serializeArray();
	var formData = {};
	for(var i in arr)
		formData[arr[i].name] = arr[i].value;
	
	var feedBackObject = {};
	var buttonObject = {};

	$.ajax({
            url: form.attr("action"),
            type: "POST",
            crossDomain: true,
            data: JSON.stringify(formData),
            dataType: "json",
            success: function (response) {
                console.log( "success" );
            },
            error: function (xhr, status) {
                console.log( "error" );
            }
        });
	
	$.post( form.attr("action"), formData,  function(response) {
		console.log( "success" );
		form.find("input, textarea").val("");
				
		feedBackObject["toastMessage"] = "Thanks for your message, I will contact to Contact you back.";
		feedBackObject["class"] = "success";
		feedBackObject["success"] = true;
		feedBackObject["orOrSeeAlso"] = "See Also";
		
		form.find("button[type='submit']").remove();
		form.append(Handlebars.compile($("#contactMeButton").html())({working : false, success : true}));
	})
	.done(function() {
		console.log( "second success" );
	})
	.fail(function() {
		console.log( "error" );
		feedBackObject["toastMessage"] = "There is a Error Sending your message. Please Try Agan after Some time";
		feedBackObject["class"] = "danger";
		feedBackObject["success"] = false;
		feedBackObject["orOrSeeAlso"] = "or";
		
		form.find("button[type='submit']").remove();
		form.append(Handlebars.compile($("#contactMeButton").html())({working : false, success : false}));
	})
	.always(function() {
		console.log( "complete" );
		
		
		var toast = Handlebars.compile($("#contactMeResponse").html())(feedBackObject);
		
		$("#contactMe_responseMessage").html(toast);
		
		setTimeout(function(){ $("#contactMe_responseMessage .message").remove(); }, 5000);
	});
  
	return false;
});
})(jQuery); // End of use strict
