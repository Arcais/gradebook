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

		refresh(k);

		$( ".lastadded" ).find( ".wov" ).val( "-" );
		$( ".lastadded" ).removeClass( "lastadded" );
		
	}

	ovrefresh();
	refreshSubjectPosition();
}