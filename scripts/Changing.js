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

