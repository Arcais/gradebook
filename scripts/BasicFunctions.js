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
	$(".overallgrade").html(mainOverallGrade);
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