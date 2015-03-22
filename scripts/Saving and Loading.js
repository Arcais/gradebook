if(getCookie("savedsubjects")){
	loadGrades();
}

$(document).on('click', '.savesubjects', function() {
	saveGrades();
});

$(document).on('click', '.loadsubjects', function() {

	if(getCookie("savedsubjects")){
		loadGrades();
	}
	else{
		alert("Save file doesn't exist.");
	}

});