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

