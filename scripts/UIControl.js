// *** Menu open/close trigger button ***
$(document).on('click', '.subjectmenutrigger', function() {
	if($( this ).children(".fa").hasClass("fa-angle-down")){
		$( this ).parent().children(".subjectmenubox").slideDown();
		$( this ).children(".fa").removeClass("fa-angle-down");
		$( this ).children(".fa").addClass("fa-angle-up");		
	}
	else if($( this ).children(".fa").hasClass("fa-angle-up")){
		$( this ).parent().children(".subjectmenubox").slideUp();
		$( this ).children(".fa").removeClass("fa-angle-up");
		$( this ).children(".fa").addClass("fa-angle-down");		
	}
});

// *** Carousel for Help Menu ***
$(document).ready(function() {
	 
	$(".slidecontainer").owlCarousel({
	 
	navigation : false, // Show next and prev buttons
	slideSpeed : 500,
	paginationSpeed : 400,
	singleItem:true

	// "singleItem:true" is a shortcut for:
	// items : 1, 
	// itemsDesktop : false,
	// itemsDesktopSmall : false,
	// itemsTablet: false,
	// itemsMobile : false
	 
	});
	 
});

// *** Open Help Menu ***
$(document).on('click', '.infobtn', function() {
		$( ".helpcontainer" ).toggleClass("display");
});

// *** Close Help Menu ***
$(document).on('click', '.closehelp', function() {
		$( ".helpcontainer" ).toggleClass("display");
});