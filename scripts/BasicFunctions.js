// *** Array Element Removal Functions ***
function removeArrayElementByValue(array, x){
	y = array.indexOf(x);
	if (y > -1) {
    	array.splice(y, 1);
	}
	return array;
}

function removeArrayElementById(array, y){
	if (y > -1) {
    	array.splice(y, 1);
	}
	return array;
}
//*************************************

// *** Number Rounder ***
function round(x){
	if(x>=parseInt(x)+0.5){
		return parseInt(x+1);
	}
	else{
		return parseInt(x);
	}
}

// *** Refresh the overall grade ***
function ovrefresh(){
	var sum=0;
	var ov=0;
	var num=subjects.length;
	for (var i = 0; i < num; i++) {
		if(subjects[i].overallgrade==0){num--;}
		sum = sum + round(subjects[i].overallgrade);
	};
	ov=sum/num;
	mainOverallGrade=Math.floor(ov * 100) / 100;
	if(mainOverallGrade>=1&&mainOverallGrade<=10){
		$(".overallgrade").html(mainOverallGrade);
	}
	else{
		$(".overallgrade").html("-");		
	}
}

// *** Refresh a subject overall ***
function refresh(x){
	var sum=0;
	var aov=0;
	var num=subjects[x].grades.length;
	if(num){
		for (var i = 0; i < num; i++) {
			sum = sum + subjects[x].grades[i];
		};
		aov = sum / num;
		if(subjects[x].fgrade){
			aov=((aov*3)+subjects[x].fgrade)/4;	
		}
		subjects[x].overallgrade=aov;
		if(parseInt(aov)!=aov){
			aov=round(aov);
		}
		$(".list").find("[data-subject-id='" + x + "']").find(".aov").html(aov);
	}
	else{
		subjects[x].overallgrade=0;
		$(".list").find("[data-subject-id='" + x + "']").find(".aov").html("-");
	}
	if(subjects[x].overallwanted){
		var wsum=0;
		var wov=0;
		var wnum=subjects[x].wantedgrades.length;
		if(wnum){
			for (var i = 0; i < wnum; i++) {
				wsum = wsum + subjects[x].wantedgrades[i];
			};
			wov = (wsum+sum) / (wnum+num);
			if(subjects[x].fgrade){
				wov=((wov*3)+subjects[x].fgrade)/4;	
			}
			subjects[x].overallwanted=wov;
			if(parseInt(wov)!=wov){
				wov=round(wov);
			}
			$(".list").find("[data-subject-id='" + x + "']").find(".wov").val(wov);
		}
		else{
			subjects[x].overallwanted=0;
			$(".list").find("[data-subject-id='" + x + "']").find(".wov").val("-");
		}
	}
	ovrefresh();
}

function refreshSubjectPosition(){
	for(k=0;k<=(subjects.length-1);k++){
		if((k+1)%4){
			$(".list").children(".column"+(k+1)%4).append($(".subjectcontainer[data-subject-id='"+ k +"']"));		
		}
		else{
			$(".list").children(".column"+4).append($(".subjectcontainer[data-subject-id='"+ k +"']"));				
		}
	}
	if((subjects.length+1)%4){
		$(".list").children(".column"+(subjects.length+1)%4).append($(".addingbox"));
	}
	else{
		$(".list").children(".column"+4).append($(".addingbox"));		
	}
}

function saveGrades(){
	setCookie("savedsubjects",JSON.stringify(subjects));
}

function loadGrades(){
	for(var k=0;k<subjects.length;k++){
		$( ".list" ).find("[data-subject-id='" + k + "']").remove();
	}
	
	subjects=[];

	subjects=JSON.parse(getCookie("savedsubjects"));
		
	for(var k=0;k<subjects.length;k++){

		if((k+1)%4){
			$(".list").children(".column"+(k+1)%4).append(premadesubject);		
		}
		else{
			$(".list").children(".column"+4).append(premadesubject);				
		}

		for(var l=0;l<subjects[k].grades.length;l++){
			$( ".lastadded" ).find(".addgr").parent().before( grade );
			$( ".glastadded" ).find( ".gr" ).val( subjects[k].grades[l] );
			$( ".glastadded" ).attr({"data-gr-id":l})
			$( ".glastadded" ).removeClass( "glastadded" );				
		}

		$( ".lastadded" ).attr({"data-subject-id":k});
		
		if(subjects[k].fgrade<=10&&subjects[k].fgrade>=1){
			$( ".lastadded" ).find(".addfgr").parent().before( fgrade );
			$( ".glastadded" ).find( ".fgr" ).val( subjects[k].fgrade );
			$( ".lastadded" ).find(".addfgr").addClass( "disabled" );
			$( ".glastadded" ).removeClass( "glastadded" );
		}

		$( ".lastadded" ).find(".subjectname").val(subjects[k].name);

		refresh(k);

		$( ".lastadded" ).find( ".wov" ).val( "-" );
		$( ".lastadded" ).removeClass( "lastadded" );
		
	}

	for(var k=0;k<subjects.length;k++){
		subjects[k].wantedgrades=[];
		subjects[k].overallwanted=0;
	}

	ovrefresh();
	refreshSubjectPosition();
	inputListenerRefresh()
}

function gradeInputListenerRefresh(){
	
	// *** Grade Input Change Listener ***
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
	       	if(elem.hasClass("fgr")){
		       	if(parseInt(elem.val())<=10&&parseInt(elem.val())>=1){
		       		subjects[subjectSelector].fgrade=parseInt(elem.val());
		       		refresh(subjectSelector);
		   		}
	       	}
	       	
	       	else if(elem.hasClass("wgr")){

	       	}
	       	
	       	else{
	       		gradeSelector=parseInt(elem.parent().attr("data-gr-id"));
		       	if(parseInt(elem.val())<=10&&parseInt(elem.val())>=1){
		       		subjects[subjectSelector].grades[gradeSelector]=parseInt(elem.val());
		       		refresh(subjectSelector);
		   		}
			}

	    }

	   });
	 });

}

function subjectnameInputListenerRefresh(){

	// *** Subject Name Input Change Listener ***
	$('.subjectname').each(function() {
		var elem = $( this );

	   	// Save current value of element
	   	elem.data('oldVal', elem.val());

	   	// Look for changes in the value
	   	elem.bind("propertychange change click keyup input paste", function(event){
	    // If value has changed...
	    if (elem.data('oldVal') != elem.val()) {
	       	// Updated stored value
	       	elem.data('oldVal', elem.val());

	       	subjectSelector=parseInt(elem.parent().parent().attr("data-subject-id"));
	       	subjects[subjectSelector].name=elem.val();

	    }

	   });
	 });

}

function wantedgradeInputListenerRefresh(){

	// *** Wanted Average Input Change Listener ***
	$('.wov').each(function() {
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

		    deleteWantedGrades(elem.parent().parent().parent(),subjectSelector);

	       	if(parseInt(elem.val())<=10&&parseInt(elem.val())>=1){
		       	subjects[subjectSelector].overallwanted=parseInt(elem.val());
		       	addWantedGrades(elem.parent().parent().parent(),subjectSelector);
		   	}
		   	else{
	       		subjects[subjectSelector].overallwanted=0;
			}

	    }

	   });
	 });

}

function inputListenerRefresh(){
	gradeInputListenerRefresh();
	subjectnameInputListenerRefresh();
	wantedgradeInputListenerRefresh();
}

function deleteWantedGrades(elem, x){
	subjects[x].wantedgrades=[];
	$( elem ).find(".wgrcontainer").remove();
}

function addWantedGrades(elem, x){
	var overalltotal=subjects[x].grades.length*subjects[x].overallgrade;
	var wantedtotal=0;
	var total=overalltotal+wantedtotal;
	var totalnum=subjects[x].grades.length+subjects[x].wantedgrades.length;
	var z=0;
	console.log(total);
	if(subjects[x].fgrade){
		var newoverallgrade=((subjects[x].overallgrade*4)-subjects[x].fgrade)/3;
		overalltotal=subjects[x].grades.length*newoverallgrade;
		while( (((total/totalnum)*3+subjects[x].fgrade)/4) < (subjects[x].overallwanted-0.5) ){
	console.log(2);
			subjects[x].wantedgrades[z]=subjects[x].overallwanted;
			wantedtotal=wantedtotal+subjects[x].wantedgrades[z];
			total=overalltotal+wantedtotal;
			totalnum=subjects[x].grades.length+subjects[x].wantedgrades.length;
			while(((((total/totalnum)*3+subjects[x].fgrade)/4)<(subjects[x].overallwanted-0.5))&&(subjects[x].wantedgrades[z]<10)){
	console.log(3);
				subjects[x].wantedgrades[z]++;
				wantedtotal++;
				total=overalltotal+wantedtotal;
				totalnum=subjects[x].grades.length+subjects[x].wantedgrades.length;
			}
			total=overalltotal+wantedtotal;
			totalnum=subjects[x].grades.length+subjects[x].wantedgrades.length;
			z++;
		}
	}
	else{
	console.log(total);
	console.log(totalnum);
		while((total/totalnum)<(subjects[x].overallwanted-0.5)){
	console.log(5);
			subjects[x].wantedgrades[z]=subjects[x].overallwanted;
			wantedtotal=wantedtotal+subjects[x].wantedgrades[z];
			while(((total/totalnum)<(subjects[x].overallwanted-0.5))&&(subjects[x].wantedgrades[z]<10)){
	console.log(6);
				subjects[x].wantedgrades[z]++;
				wantedtotal++;
				total=overalltotal+wantedtotal;
				totalnum=subjects[x].grades.length+subjects[x].wantedgrades.length;
			}
			total=overalltotal+wantedtotal;
			totalnum=subjects[x].grades.length+subjects[x].wantedgrades.length;
			z++;
		}
	}
	for(var k=0;k<subjects[x].wantedgrades.length;k++){
		$( elem ).find(".addgr").parent().before( neededgrade );
		$( ".wglastadded" ).attr({"data-wgr-id":k});
		$( ".wglastadded" ).find( ".wgr" ).val( subjects[x].wantedgrades[k] );
		$( ".wglastadded" ).removeClass( "wglastadded" );
	}
}