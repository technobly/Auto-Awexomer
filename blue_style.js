if (!($ = window.jQuery)) { // typeof jQuery=='undefined' works too
	script = document.createElement( 'script' );
   script.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
	script.onload=turnTheTable;
	document.body.appendChild(script);
}
else {
	turnTheTable();
}

function turnTheTable() {
	alert("B^Dub's Blue Style");
	$("#turntable").children(":first-child").children(":nth-child(2)").children().each(function(i){
		switch(i){
			case 1:
				//background
				$(this).attr("src", "https://raw.github.com/DubbyTT/Auto-Awexomer/master/images/wallpaper2.png");
			break;
			case 2:
				//floor
				$(this).attr("src", "http://billyrennekamp.com/turntable/new/floor2.png");
			break;
			case 3:
				//table
				$(this).attr("src", "https://raw.github.com/DubbyTT/Auto-Awexomer/master/images/dj_table2.png");
			break;
			case 4:
				//gauge
				$(this).attr("src", "https://raw.github.com/DubbyTT/Auto-Awexomer/master/images/gauge2.png");
			break;
		}
	});

	//song board
	//$("#songboard").css("font-family", "Arial Black").css("color", "black");
	$("#songboard").css("color", "cyan");
	//$("#songboard_artist").css("text-shadow", "none").css("font-size", "30px");
	//$("#songboard_title").css("text-shadow", "none");

	/*
	//buttons
	$(".mv_container").prev().prev().each(function(i){
		if(i == 0){
			$(this).css("background", "url('http://billyrennekamp.com/turntable/new/yes.png') 0 0 no-repeat");
		}
		else{
			$(this).css("background", "url('http://billyrennekamp.com/turntable/new/no.png') 0 0 no-repeat");
		}

	});
	*/

	//left speaker
	//$("#left_speaker").css("visibility", "hidden");
	$("#left_speaker").css("background", "url('https://raw.github.com/DubbyTT/Auto-Awexomer/master/images/left_speaker2.png') 0 0 no-repeat");

	//right speaker
    //$("#right_speaker").css("visibility", "hidden");
	$("#right_speaker").css("background", "url('https://raw.github.com/DubbyTT/Auto-Awexomer/master/images/right_speaker2.png') 0 0 no-repeat");

    //needle
	//$("#meterNeedle").children(":first-child").children(":first-child").attr("src", "http://billyrennekamp.com/turntable/new/needle.png");

}
