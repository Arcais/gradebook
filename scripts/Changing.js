// *** Change grade buttons functions ***
var tempGrade=0;
var tempSelector;

$(document).on('click', '.gradeup', function() {
	tempSelector = $( this ).parent();
	if(tempSelector.hasClass("fgrcontainer")){
		subjectSelector = parseInt(tempSelector.parent().parent().attr("data-subject-id"));
		tempGrade = subjects[subjectSelector].fgrade;
		if(tempGrade<10){
			tempSelector.children( ".gr" ).val( tempGrade+1 );
			subjects[subjectSelector].fgrade=subjects[subjectSelector].fgrade+1;
		}
		if(tempGrade>10||tempGrade<1){
			tempSelector.children( ".gr" ).val( 1 );
			subjects[subjectSelector].fgrade=1;
		}
	}
	else if(tempSelector.hasClass("wgrcontainer")){
		gradeSelector = parseInt(tempSelector.attr("data-wgr-id"));
		subjectSelector = parseInt(tempSelector.parent().parent().attr("data-subject-id"));
		tempGrade = subjects[subjectSelector].wantedgrades[gradeSelector];
		if(tempGrade<10){
			tempSelector.children( ".gr" ).val( tempGrade+1 );
			subjects[subjectSelector].wantedgrades[gradeSelector]=subjects[subjectSelector].wantedgrades[gradeSelector]+1;
		}
		if(tempGrade>10||tempGrade<1){
			tempSelector.children( ".gr" ).val( 1 );
			subjects[subjectSelector].wantedgrades[gradeSelector]=1;
		}
	}
	else{
		gradeSelector = parseInt(tempSelector.attr("data-gr-id"));
		subjectSelector = parseInt(tempSelector.parent().parent().attr("data-subject-id"));
		tempGrade = subjects[subjectSelector].grades[gradeSelector];
		if(tempGrade<10){
			tempSelector.children( ".gr" ).val( tempGrade+1 );
			subjects[subjectSelector].grades[gradeSelector]=subjects[subjectSelector].grades[gradeSelector]+1;
		}
		if(tempGrade>10||tempGrade<1){
			tempSelector.children( ".gr" ).val( 1 );
			subjects[subjectSelector].grades[gradeSelector]=1;
		}
	}
	tempGrade=0;
	refresh(subjectSelector);
});

$(document).on('click', '.gradedown', function() {
	tempSelector = $( this ).parent();
	if(tempSelector.hasClass("fgrcontainer")){
		subjectSelector = parseInt(tempSelector.parent().parent().attr("data-subject-id"));
		tempGrade = subjects[subjectSelector].fgrade;
		if(tempGrade>1){
			tempSelector.children( ".gr" ).val( tempGrade-1 );
			subjects[subjectSelector].fgrade=subjects[subjectSelector].fgrade-1;
		}
		if(tempGrade>10||tempGrade<1){
			tempSelector.children( ".gr" ).val( 1 );
			subjects[subjectSelector].fgrade=1;
		}
	}
	else if(tempSelector.hasClass("wgrcontainer")){
		gradeSelector = parseInt(tempSelector.attr("data-wgr-id"));
		subjectSelector = parseInt(tempSelector.parent().parent().attr("data-subject-id"));
		tempGrade = subjects[subjectSelector].wantedgrades[gradeSelector];
		if(tempGrade>1){
			tempSelector.children( ".gr" ).val( tempGrade-1 );
			subjects[subjectSelector].wantedgrades[gradeSelector]=subjects[subjectSelector].wantedgrades[gradeSelector]-1;
		}
		if(tempGrade>10||tempGrade<1){
			tempSelector.children( ".gr" ).val( 1 );
			subjects[subjectSelector].wantedgrades[gradeSelector]=1;
		}
	}
	else{
		gradeSelector = parseInt(tempSelector.attr("data-gr-id"));
		subjectSelector = parseInt(tempSelector.parent().parent().attr("data-subject-id"));
		tempGrade = parseInt(subjects[subjectSelector].grades[gradeSelector]);
		if(tempGrade>1){
			tempSelector.children( ".gr" ).val( tempGrade-1 );
			subjects[subjectSelector].grades[gradeSelector]=subjects[subjectSelector].grades[gradeSelector]-1;
		}
		if(tempGrade>10||tempGrade<1){
			tempSelector.children( ".gr" ).val( 1 );
			subjects[subjectSelector].grades[gradeSelector]=1;
		}
	}
	tempGrade=0;
	refresh(subjectSelector);
});

// *** Input Change Verifier ***
$('.gr').each(function() {
	var elem = $( this );

   	// Save current value of element
   	elem.data('oldVal', elem.val());

   	// Look for changes in the value
   	elem.bind("propertychange change click keyup input paste", function(event){
    // If value has changed...
    if (elem.data('oldVal') != elem.val()) {
       	// Updated stored value
       	elem.data('oldVal', elem.val());

       	subjectSelector=parseInt(elem.parent().parent().parent().attr("data-subject-id"));
       	gradeSelector=parseInt(elem.parent().attr("data-gr-id"));

       	if(parseInt(elem.val())<=10&&parseInt(elem.val())>=1){
       		subjects[subjectSelector].grades[gradeSelector]=parseInt(elem.val());
       		refresh(subjectSelector);
   		}

    }

   });
 });