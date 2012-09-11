/**
 * Turntable.fm Blue Style Script
 * Created by billyrennekamp, https://github.com/billyrennekamp/turnTheTable
 * Modified by B^Dub, https://github.com/DubbyTT/Auto-Awexomer
 * Last Updated: August 31th, 2012
 * 
 * If you have any questions or concerns,
 * find me in http://turntable.fm/code_ninjas
 */

if (!($ = window.jQuery)) { // typeof jQuery=='undefined' works too
	script = document.createElement( 'script' );
	script.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
	script.onload=blueStyle;
	document.body.appendChild(script);
}
else {
	blueStyle();
}

function blueStyle() {
	//alert("B^Dub's Blue Style Enable");
	$("#turntable").children(":first-child").children(":nth-child(2)").children().each(function(i){
		switch(i){
			case 2:
				//background
				$(this).attr("src", "https://raw.github.com/DubbyTT/Auto-Awexomer/master/images/wallpaper2.png");
			break;
			case 3:
				//floor
				$(this).attr("src", "https://raw.github.com/DubbyTT/Auto-Awexomer/master/images/floor2.png");
			break;
			case 4:
				//table
				$(this).attr("src", "https://raw.github.com/DubbyTT/Auto-Awexomer/master/images/dj_table2.png");
			break;
			case 5:
				//gauge
				$(this).attr("src", "https://raw.github.com/DubbyTT/Auto-Awexomer/master/images/gauge2.png");
			break;
		}
	});

	//song board
	$("#songboard").css("color", "cyan");
	$("#songboard_artist").css("text-shadow", "none"); // 40px default, has a red shadow by default, removing it makes it crisp
	$("#songboard_title").css("text-shadow", "none").css("font-size","18px"); // 15px default, has a red shadow by default, removing it makes it better... still hard to read because it's small font size

	//left speaker
	$("#left_speaker").css("background", "url('https://raw.github.com/DubbyTT/Auto-Awexomer/master/images/left_speaker2.png') 0 0 no-repeat");

	//right speaker
	$("#right_speaker").css("background", "url('https://raw.github.com/DubbyTT/Auto-Awexomer/master/images/right_speaker2.png') 0 0 no-repeat");

	//Vote Down Button
	$("#ypHbNfbRPJ").css("background", "url('https://raw.github.com/DubbyTT/Auto-Awexomer/master/images/vote_btns2.png') 0 0 no-repeat");

	//Vote Up Button
	$("#peHbM").css("background", "url('https://raw.github.com/DubbyTT/Auto-Awexomer/master/images/vote_btns2.png') 0 0 no-repeat").css("background-position","0 -90px");

	//Meter Needle
	$("#meterNeedle").children(":first-child").children(":first-child").attr("src", "https://raw.github.com/DubbyTT/Auto-Awexomer/master/images/needle2.png");
		
	//Mute Button
	$("a.mute_btn").css("background", "url('https://raw.github.com/DubbyTT/Auto-Awexomer/master/images/mute_btn2.png') 0 0 no-repeat");
}
