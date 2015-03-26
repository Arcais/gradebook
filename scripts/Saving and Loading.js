if(getCookie("savedsubjects")){
	loadGrades();
}

$(document).on('click', '.savesubjects', function() {
	var aux=[[]];
		console.log(aux);
	for(var k=0;k<subjects.length;k++){
		aux[k]=[];
		if((subjects[k].wantedgrades!=[])&&(subjects[k].overallwanted!=0)){
			for(var l=0;l<subjects[k].wantedgrades.length;l++){
				aux[k].push(subjects[k].wantedgrades[l]);
			}
			aux[k].push(subjects[k].overallwanted);
			console.log(aux);
			subjects[k].wantedgrades=[];
			subjects[k].overallwanted=0;
		}
	}
	saveGrades()
	for(var k=0;k<aux.length;k++){
		for(var l=0;l<aux[k].length-1;l++){
			subjects[k].wantedgrades[l]=aux[k][l];
		}
		subjects[k].overallwanted=aux[k][l];
	}
});

$(document).on('click', '.loadsubjects', function() {

	if(getCookie("savedsubjects")){
		loadGrades();
	}
	else{
		alert("Save file doesn't exist.");
	}

});