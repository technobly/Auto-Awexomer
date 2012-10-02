/**
 * Turntable.fm Blue Style Script
 * Created by billyrennekamp, https://github.com/billyrennekamp/turnTheTable
 * Modified by B^Dub, https://github.com/DubbyTT/Auto-Awexomer
 * Last Updated: October 1st, 2012
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
	// Wallpaper
	$("#turntable").children(":first-child").children(":nth-child(2)").children(":nth-child(3)").attr("src", "https://raw.github.com/DubbyTT/Auto-Awexomer/master/images/wallpaper2.png");
	// Floor
	$("#turntable").children(":first-child").children(":nth-child(2)").children(":nth-child(4)").attr("src", "https://raw.github.com/DubbyTT/Auto-Awexomer/master/images/floor2.png");
	// DJ Table
	$("#turntable").children(":first-child").children(":nth-child(2)").children(":nth-child(5)").attr("src", "https://raw.github.com/DubbyTT/Auto-Awexomer/master/images/dj_table2.png");
	// Guage
	$("#turntable").children(":first-child").children(":nth-child(2)").children(":nth-child(6)").attr("src", "https://raw.github.com/DubbyTT/Auto-Awexomer/master/images/gauge2.png");
	// Song Board
	$("#songboard").css("color", "cyan");
	$("#songboard_artist").css("text-shadow", "none"); // 40px default, has a red shadow by default, removing it makes it crisp
	$("#songboard_title").css("text-shadow", "none").css("font-size","18px"); // 15px default, has a red shadow by default, removing it makes it better... still hard to read because it's small font size
	// Left Speaker
	$("#left_speaker").css("background", "url('https://raw.github.com/DubbyTT/Auto-Awexomer/master/images/left_speaker2.png') 0 0 no-repeat");
	// Right Speaker
	$("#right_speaker").css("background", "url('https://raw.github.com/DubbyTT/Auto-Awexomer/master/images/right_speaker2.png') 0 0 no-repeat");
	// Vote Down Button
	//$("#hwdSSRfEep").css("background", "url('https://raw.github.com/DubbyTT/Auto-Awexomer/master/images/vote_btns2.png') 0 0 no-repeat");
	// Vote Up Button
	$("#turntable").children(":first-child").children(":nth-child(2)").children(":nth-child(13)").css("background", "url('https://raw.github.com/DubbyTT/Auto-Awexomer/master/images/vote_btns2.png') 0 0 no-repeat").css("background-position","0 -90px");
	// Meter Needle
	$("#meterNeedle").children(":first-child").children(":first-child").attr("src", "https://raw.github.com/DubbyTT/Auto-Awexomer/master/images/needle2.png");
	// Mute Button
	$("a.mute_btn").css("background", "url('https://raw.github.com/DubbyTT/Auto-Awexomer/master/images/mute_btn2.png') 0 0 no-repeat");
}