// *** Initializing variables ***
var mainOverallGrade=10; //Main Overall Grade Init
var deleteModeOn=0; //Delete Mode is off at Init
var gradeSelector; //Flexible variables for object selection
var subjectSelector; //Flexible variables for object selection
var subjects = [
	{
		name:"",
		overallgrade:10,
		wantedgrade:0,
		grades:[10,10],
		wantedgrades:[],
		fgrade:0,
		wantedmode:0
	}
]; //Main Object for all the subjects

// *** Adding placeholders to the first subject box ***
$( ".lastadded" ).find( ".gr" ).val( "10" );
$( ".lastadded" ).find( ".wov" ).val( "-" );
$( ".lastadded" ).removeClass( "lastadded" );
ovrefresh();

// *** DOM Handling ***
$(document).ready(function(){
    $(".infobtn").sticky({className:"stickiedinfo"});
    $(".deletegradebtn").sticky({topSpacing:10});
    $('.row').pinterest_grid({
		no_columns: 4,
		padding_x: 24,
		padding_y: 10,
		single_column_breakpoint: 700,
		});

});