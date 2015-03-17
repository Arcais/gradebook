// *** Function to create a new Subject Box ***
$(document).on('click', '.addbox', function() {
	$( this ).parent().parent().before( subject );
	$( ".lastadded" ).find( ".gr" ).val( "10" );
	$( ".lastadded" ).find( ".wov" ).val( "-" );
	subjects.push({
		name:"",
		overallgrade:10,
		wantedgrade:0,
		grades:[10,10],
		wantedgrades:[],
		fgrade:0,
		wantedmode:0
	});
	var columnSelector = parseInt((subjects.length%4)+1);
	if(columnSelector==0){
		columnSelector=4;
	}
	$( ".lastadded" ).attr({"data-subject-id":subjects.length-1});
	$( ".lastadded" ).removeClass( "lastadded" );
	$( this ).parent().parent().parent().parent().find(".column"+columnSelector).append( $( this ).parent().parent().clone() );
	$( this ).parent().parent().remove();
	ovrefresh();
});

// *** Function to create grades for specific box ***
$(document).on('click', '.addgr', function() {
	$( this ).parent().before( grade );
	subjectSelector=parseInt($( ".glastadded" ).parent().parent().attr("data-subject-id"));
	subjects[subjectSelector].grades.push(5);
	$( ".glastadded" ).attr({"data-gr-id":subjects[subjectSelector].grades.length-1})
	$( ".glastadded" ).find( ".gr" ).val( subjects[subjectSelector].grades[subjects[subjectSelector].grades.length-1] );
	$( ".glastadded" ).removeClass( "glastadded" );
	refresh(subjectSelector);
});

// *** Function to create the final grade for the specific box ***
$(document).on('click', '.addfgr', function() {
	$( this ).parent().before( fgrade );
	subjectSelector=parseInt($( ".glastadded" ).parent().parent().attr("data-subject-id"));
	subjects[subjectSelector].fgrade=5;
	$( ".glastadded" ).find( ".fgr" ).val( subjects[subjectSelector].fgrade );
	$( this ).attr({"data-final-exists":1});
	$( ".glastadded" ).removeClass( "glastadded" );
	$( this ).addClass( "disabled" );
	refresh(subjectSelector);
});

