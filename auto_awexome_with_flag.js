/**
 * Turntable.fm Auto Awexomer with Style Script
 * Auto bop code by Izzmo, https://github.com/izzmo/AutoAwesomer
 * Styling examples by billyrennekamp, https://github.com/billyrennekamp/turnTheTable
 * Modified and made Awexomer by B^Dub, https://github.com/DubbyTT/Auto-Awexomer
 * Photoshop work by B^Dub
 * Last Updated: November 6th, 2012
 * 
 * If you have any questions or concerns,
 * find me in http://turntable.fm/bdubs
 */

// Blue Style
// -----------------------------------------------------
if (!($ = window.jQuery)) { // typeof jQuery=='undefined' works too
  if(typeof double_click_check === "undefined") { 
    var double_click_check = true; //allow styles to be applied only once
    //alert("first define double");
  }
  if(double_click_check) {
    //alert("first run double");  
    script = document.createElement('script');
    script.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
    script.onload = blueStyle;
    document.body.appendChild(script);
    double_click_check = false;
  }
}
else {
  if(typeof double_click_check === "undefined") { 
    var double_click_check = true; //allow styles to be applied only once
    //alert("first define double");
  }
  if(double_click_check) {
    //alert("first run double");  
    blueStyle();
    double_click_check = false;
  }
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
  //$("#left_speaker").css("background", "url('https://raw.github.com/DubbyTT/Auto-Awexomer/master/images/left_speaker4.png') 0 0 no-repeat").css("top","120px");
  // Right Speaker
  $("#right_speaker").css("background", "url('https://raw.github.com/DubbyTT/Auto-Awexomer/master/images/right_speaker2.png') 0 0 no-repeat");
  //$("#right_speaker").css("background", "url('https://raw.github.com/DubbyTT/Auto-Awexomer/master/images/right_speaker4.png') 0 0 no-repeat").css("top","112px");	// Vote Down Button
	//$("#hwdSSRfEep").css("background", "url('https://raw.github.com/DubbyTT/Auto-Awexomer/master/images/vote_btns2.png') 0 0 no-repeat");
	// Vote Up Button
	//$("#turntable").children(":first-child").children(":nth-child(2)").children(":nth-child(13)").css("background", "url('https://raw.github.com/DubbyTT/Auto-Awexomer/master/images/vote_btns2.png') 0 0 no-repeat").css("background-position","0 -90px");
	$("#turntable").children(":first-child").children(":nth-child(2)").children().each(function(i) {
		if($(this).css("left") === "370px") {
			$(this).css("background", "url('https://raw.github.com/DubbyTT/Auto-Awexomer/master/images/vote_btns2.png') 0 0 no-repeat").css("background-position","0 -90px");
    }
	});
	// Meter Needle
	$("#meterNeedle").children(":first-child").children(":first-child").attr("src", "https://raw.github.com/DubbyTT/Auto-Awexomer/master/images/needle2.png");
	// Mute Button
	$("a.mute_btn").css("background", "url('https://raw.github.com/DubbyTT/Auto-Awexomer/master/images/mute_btn2.png') 0 0 no-repeat");
}

if(typeof double_click_check2 === "undefined") {
  var double_click_check2 = true; //allow awexomer to be turned on only once
  //alert("first define double2");
}
if(double_click_check2) {
  //alert("first run double2");
  double_click_check2 = false; //make sure a second click doesn't turn on the awexomer again
  // Auto Awexomer
  // -----------------------------------------------------
$(document).ready(function() {
  
  if(window.bdub == undefined) window.bdub = { };
  
  window.bdub = $.extend(window.bdub, {
    ttObj: null,
    awesomer: null,
    showArc: true,
    lamed: false,
    arcInt: 0,
    deg: 0.0,
    savedStickers: {},
    flag: [{"top":84,"angle":0,"sticker_id":"4f86fd3ee77989117e000002","left":50}, {"top":84,"angle":0,"sticker_id":"4f86fd3ee77989117e000002","left":118}, {"top":84,"angle":0,"sticker_id":"4f86fd3ee77989117e000002","left":185}, {"top":13,"angle":0,"sticker_id":"4f86fd3ee77989117e000002","left":50}, {"top":13,"angle":0,"sticker_id":"4f86fd3ee77989117e000002","left":118}, {"top":13,"angle":0,"sticker_id":"4f86fd3ee77989117e000002","left":185}, {"top":155,"angle":0,"sticker_id":"4f86fe15e77989117e000005","left":50}, {"top":227,"angle":0,"sticker_id":"4f86fe15e77989117e000005","left":50}, {"top":155,"angle":0,"sticker_id":"4f86fe15e77989117e000005","left":150}, {"top":227,"angle":0,"sticker_id":"4f86fe15e77989117e000005","left":150}, {"top":13,"angle":0,"sticker_id":"4f86fe15e77989117e000005","left":250}, {"top":83,"angle":0,"sticker_id":"4f86fe15e77989117e000005","left":250}, {"top":227,"angle":0,"sticker_id":"4f86fe15e77989117e000005","left":250}, {"top":155,"angle":0,"sticker_id":"4f86fe15e77989117e000005","left":250}, {"top":13,"angle":0,"sticker_id":"4f86fe15e77989117e000005","left":351}, {"top":83,"angle":0,"sticker_id":"4f86fe15e77989117e000005","left":351}, {"top":155,"angle":0,"sticker_id":"4f86fe15e77989117e000005","left":351}, {"top":227,"angle":0,"sticker_id":"4f86fe15e77989117e000005","left":351}],
    vote: function(c) {
      var f = $.sha1(window.bdub.ttObj.roomId + c + window.bdub.ttObj.currentSong._id);
      var d = $.sha1(Math.random() + "");
      var e = $.sha1(Math.random() + "");
      window.bdub.socket({ api: "room.vote", roomid: window.bdub.ttObj.roomId, val: c, vh: f, th: d, ph: e });
    },
    placeStickers: function(c) {
      window.bdub.socket({ api: 'sticker.place', placements: c, is_dj: true, roomid: window.bdub.ttObj.roomId });
    },
    getStickerPlacements: function(userid, callback) {
      var rq = { api: 'sticker.get_placements', userid: userid};
      window.bdub.socket(rq, callback);
    },
    socket: function (c, a) {
        if (c.api == "room.now") {
            return;
        }
        c.msgid = turntable.messageId;
        turntable.messageId += 1;
        c.clientid = turntable.clientId;
        if (turntable.user.id && !c.userid) {
            c.userid = turntable.user.id;
            c.userauth = turntable.user.auth;
        }
        var d = JSON.stringify(c);
        if (turntable.socketVerbose) {
            LOG(util.nowStr() + " Preparing message " + d);
        }
        var b = $.Deferred();
        turntable.whenSocketConnected(function () {
            if (turntable.socketVerbose) {
                LOG(util.nowStr() + " Sending message " + c.msgid + " to " + turntable.socket.host);
            }
            if (turntable.socket.transport.type == "websocket") {
                turntable.socketLog(turntable.socket.transport.sockets[0].id + ":<" + c.msgid);
            }
            turntable.socket.send(d);
            turntable.socketKeepAlive(true);
            turntable.pendingCalls.push({
                msgid: c.msgid,
                handler: a,
                deferred: b,
                time: util.now()
            });
        });
        return b.promise();
    },
    listener: function(d) {
      if(d.command == 'newsong' && d.room.metadata.current_dj != bdub.ttObj.selfId) {
        if(!(bdub.ttObj.selfId == "4fde9255aaa5cd1e680004f8" && (d.room.metadata.current_dj == "503bf99baaa5cd1b5200075f" || d.room.metadata.current_dj == "5022e5c6aaa5cd20d6000009" || d.room.metadata.current_dj == "4ffd38d1aaa5cd3dc80000a3")) ) {
          clearTimeout(window.bdub.awesomer);
          clearInterval(window.bdub.arcInt);
          window.bdub.lamed = false;
          var timeAmt = Math.floor(Math.random()*window.bdub.ttObj.currentSong.metadata.length/4*1000);
          window.bdub.botMessage.find('span').html('');
          window.bdub.awesomer = setTimeout(function() {
            window.bdub.vote('up');
          }, timeAmt);
        
          if(!window.bdub.showArc) return;

          window.bdub.deg = 0.0;
          window.bdub.degAmt = 180 / timeAmt * 55;
          if(window.bdub.arcInt != 0) {
            clearInterval(window.bdub.arcInt);
            window.bdub.arcInt = 0;
          }
          window.bdub.arcInt = setInterval(function() {
            if(window.bdub.deg >= 180) {
              clearInterval(window.bdub.arcInt);
              window.bdub.arcInt = 0;
            }
            window.bdub.setArc(window.bdub.deg, false);
            window.bdub.deg += window.bdub.degAmt;
          }, 50);
        } // end if() my bots and I
      }
      else if(d.command == 'update_votes') {
        $.each(d.room.metadata.votelog, function() {
          if(this[0] == window.turntable.user.id) {
            window.bdub.stop();
            window.bdub.setArc(180, this[1] == "down");
          }
        });     
      }
    },
    setArc: function(degree, red) {
      if(!window.bdub.showArc) return;
      var context = window.bdub.arc[0].getContext('2d');
      context.clearRect(0, 0, 1000, 500);
      context.beginPath();
      context.arc(203, 162, 137, -Math.PI, degree*Math.PI/180 - Math.PI, false);
      context.lineWidth = 6;
      if(red)
        context.strokeStyle = 'rgb(255, 0, 0)';
      else
        context.strokeStyle = 'rgb(0, 130, 200)';
      context.shadowOffsetX = 0;
      context.shadowOffsetY = 0;
      context.shadowBlur = 20;
      if(red)
        context.shadowColor = 'rgba(255, 0, 0, 1)';
      else
        context.shadowColor = 'rgba(0, 150, 255, 1)';
      context.stroke();
    },
    room: '',
    watcher: null,
    stop: function() {
      clearTimeout(window.bdub.awesomer);
      clearInterval(window.bdub.arcInt);
      window.bdub.arcInt = 0;
    },
    awesome: function() {
      window.bdub.vote('up');
      window.bdub.stop();
      window.bdub.setArc(180, false);
    },
    lame: function() {
      if(!window.bdub.lamed) {
        window.bdub.vote('up');
        window.bdub.stop();
        window.bdub.botMessage.find('span').html("Awexoming will resume next song.");
        window.bdub.lamed = true;
      }
      window.bdub.setArc(180, true);
      setTimeout(function() {window.bdub.vote('down');}, 250);
    },
    init: function() {
      $('.roomView').ready(function() {
        for(var prop in window.turntable) {
          if(window.turntable[prop] != undefined && window.turntable[prop].hasOwnProperty('currentDj'))
            window.bdub.ttObj = window.turntable[prop];
        }
        if(window.bdub.ttObj === null) {
          alert('Could not find turntable.fm objects. You should refresh your page and try again.');
          return;
        }
        window.bdub.room = window.location.pathname;
        var meterObj = $('#meterGauge');
        if(meterObj.length > 0 && meterObj.css('display') != 'none') {
          var meter = $('#meterGauge').position();
          window.bdub.arc = $('<canvas id="bdub-arc" width="406" height="158" style="overflow: hidden; position: absolute; z-index: 20000; top: ' + meter.top + 'px; left: ' + meter.left + 'px;">bdub\'s AutoAwesome</canvas>');
          $($('.roomView > div')[1]).prepend(window.bdub.arc);
          window.bdub.showArc = true;
        }
        else
          window.bdub.showArc = false;

        window.bdub.botMessage =          $('<div id="bot-message">B^Dub\'s Auto Awexomer. <span style="font-style: italic;"></span> <a href="#" style="text-decoration: none; color: #00F0FF; font-weight: bold;">Turn off</a></div>');
        window.bdub.flagMessage =      $('<div id="flag-message"><a href="#" style="text-decoration: none; color: #00F0FF; font-weight: bold;">|flag stickers|</a></div>');
        window.bdub.botMessage.css({
          position: 'fixed',
          color: 'white',
          top: '-1px',
          //left: '13px',
          zIndex: '5000',
          textAlign: 'left',
          //paddingLeft: '2px',
          paddingLeft: '13px',
          paddingTop: '2px',
          paddingRight: '2px',
          paddingBottom: '2px',
          fontSize: '10px',
          fontFace: 'Verdana'
        });
        window.bdub.flagMessage.css({
          position: 'fixed',
          color: 'white',
          top: '41px',
          //left: '350px',
          zIndex: '5000',
          textAlign: 'left',
          //paddingLeft: '2px',
          paddingLeft: '350px',
          paddingTop: '2px',
          paddingRight: '2px',
          paddingBottom: '2px',
          fontSize: '10px',
          fontFace: 'Verdana'
        });

        $('.header').append(window.bdub.botMessage);
        window.bdub.botMessage.find('a').click(function(msg1) {
          msg1.preventDefault();
          window.bdub.destruct();
          window.turntable.removeEventListener("message", window.bdub.listener);
          window.bdub = null;
        });

        $('.header').append(window.bdub.flagMessage);
        window.bdub.flagMessage.find('a').click(function(msg8) {
          msg8.preventDefault();
          window.bdub.getStickerPlacements(bdub.ttObj.selfId, function(data) {
            window.bdub.savedStickers = data.placements;
          });
          window.bdub.placeStickers(window.bdub.flag);
          alert("If you click \"Turn Off\" it will restore your old stickers.");
        });

        var buttons = $('.roomView > div:nth-child(2) a[id]'); // 1st is Awesome button, 2nd is Lame
        $(buttons[1]).unbind(); // cancel TT's default callback for the lame button, add in our own.
        $(buttons[1]).bind('click', function() {
          window.bdub.lame();
        });

        turntable.addEventListener("message", window.bdub.listener);
        window.bdub.awesome(); // automatically awesome the song upon load

        // Timer for resetting Turntable's AFK Timers
        // Runs every 60 seconds
        window.bdub.botResetAFKTimer = setInterval(function() {
          $($('form input:last')[0]).keydown();
        }, 60000);

        window.bdub.watcher = setInterval(function() {
          if(window.location.pathname != window.bdub.room) {
            console.log('New Room found, reinitializing...');
            window.bdub.destruct();
            if(window.bdub.showArc) {
              var meterObj = $('#meterGauge');
              var check = setInterval(function() {
                if(meterObj.length > 0 && meterObj.css('display') != 'none') {
                  window.bdub.init();
                  clearInterval(check);
                }
              }, 1000);
              setTimeout(function() {clearInterval(check);}, 10000);
            }
          }
        }, 3000);

      });
    },
    destruct: function() {
      clearInterval(window.bdub.botResetAFKTimer);
      clearInterval(window.bdub.watcher);
      window.bdub.stop();
      window.bdub.arc.remove();
      window.bdub.botMessage.remove();
      window.bdub.flagMessage.remove();
      window.bdub.placeStickers(window.bdub.savedStickers);
      double_click_check2 = true; //allow awexomer to be turned on again
    }
  });
  
  window.bdub.init();
  
});
  
}