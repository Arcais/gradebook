// *** Turn on Delete Mode ***
$(document).on('click', '.deletegradebtn', function(){
	$( ".gradecontainer .draggr" ).draggable({ revert: "invalid", cancel:false, cursorAt: { top: 45, left: 17 }, stack: ".gradecontainer .draggr" });
	$( ".gradecontainer .draggr" ).draggable("disable");
	switch (deleteModeOn) {
	    case 0:
			$( ".gradecontainer .draggr" ).draggable("enable");
			$( ".addgr" ).addClass( "disabled" );
			$( ".addfgr" ).addClass( "disabled" );
			$( ".wov" ).addClass( "disabled" );
			$( ".addbox" ).addClass( "disabled" );
			$( this ).addClass("deletemodeon");
			deleteModeOn=1;
	        break;
	    case 1:
			$( ".gradecontainer .draggr" ).draggable("disable");
			$( ".addgr" ).removeClass( "disabled" );
			$(".list").find("[data-final-exists='" + 0 + "']").removeClass( "disabled" );
			$( ".wov" ).removeClass( "disabled" );
			$( ".addbox" ).removeClass( "disabled" );
			$( this ).removeClass("deletemodeon");
			deleteModeOn=0;
	        break;
	}
});

// *** Deleting Grades ***
$( ".deletegradebtn" ).droppable({
      activeClass: "deleteselected",
      hoverClass: "deletedropped",
      drop: function( event, ui ) {
		var k=0;
	    subjectSelector = parseInt(ui.draggable.parent().parent().attr("data-subject-id"));
      	if(ui.draggable.hasClass("fgrcontainer")){
      		ui.draggable.parent().find(".addfgr").attr({"data-final-exists":0});
	    	subjects[subjectSelector].fgrade=0;
    	}
    	else if(ui.draggable.hasClass("wgrcontainer")){
	    	removeArrayElementById(subjects[subjectSelector].wantedgrades,ui.draggable.attr("data-wgr-id"));
    	}
    	else{
	    	removeArrayElementById(subjects[subjectSelector].grades,ui.draggable.attr("data-gr-id"));
	    	for(k=parseInt(ui.draggable.attr("data-gr-id"))+1;k<=parseInt(subjects[subjectSelector].grades.length);k++){
	    		ui.draggable.parent().find("[data-gr-id='" + k + "']").attr({"data-gr-id":k-1});
	    	}

    	}
       	ui.draggable.remove();
		refresh(subjectSelector);
      }
    });

// *** Deleting Subjects ***
$(document).on('click', '.delsubjectbox', function() {
	if (confirm("Are you sure you want to delete this box?")) {
		var k=0;
		subjectSelector=parseInt($( this ).parent().parent().attr("data-subject-id"));
		removeArrayElementById(subjects,subjectSelector);
		for(k=parseInt(subjectSelector)+1;k<=parseInt(subjects.length);k++){
	    	$( ".list" ).find("[data-subject-id='" + k + "']").attr({"data-subject-id":k-1});
	    }
    	$( this ).parent().parent().remove();
    	ovrefresh();
    }
});