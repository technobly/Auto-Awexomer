/**
 * Turntable.fm Auto Awexomer with Style Script
 * Auto bop code by Izzmo, https://github.com/izzmo/AutoAwesomer
 * Styling examples by billyrennekamp, https://github.com/billyrennekamp/turnTheTable
 * Modified and made Awexomer by B^Dub, https://github.com/DubbyTT/Auto-Awexomer
 * Photoshop work by B^Dub
 * Last Updated: November 14th, 2012
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
    script = document.createElement( 'script' );
    script.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
    script.onload=blueStyle;
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
	// Guage
	$("#awesome-meter").css("background", "url('https://raw.github.com/DubbyTT/Auto-Awexomer/master/images/board-sprite-02.png') 0 0 no-repeat").css("background-position","-258px -102px");
	// Song Board
	$("#songboard").css("color", "cyan").css("background", "url('https://raw.github.com/DubbyTT/Auto-Awexomer/master/images/board-sprite-02.png') 0 0 no-repeat").css("background-position","0px -102px");
	$("#songboard-artist").css("text-shadow", "none"); // 40px default, has a red shadow by default, removing it makes it crisp
	$("#songboard-title").css("text-shadow", "none").css("font-size","18px"); // 15px default, has a red shadow by default, removing it makes it better... still hard to read because it's small font size
  $("#time-since-start").css("text-shadow", "none");
  $("#time-left").css("text-shadow", "none");
  //$("#progress-bar").css("color", "cyan").css("text-shadow", "none");
  $("#progress-bar").css("background", "url('https://raw.github.com/DubbyTT/Auto-Awexomer/master/images/progress-bar2.png') 0 0 repeat-x").css("background-position","0px -7px");
  $("#progress").css("background", "url('https://raw.github.com/DubbyTT/Auto-Awexomer/master/images/progress-bar2.png') 0 0 repeat-x").css("background-position","0px 0px").css("box-shadow","0 0 5px rgba(0,0,255,0.6)");
	// Vote Down Button
	$("#lame-button").css("background", "url('https://raw.github.com/DubbyTT/Auto-Awexomer/master/images/board-sprite-02.png') 0 0 no-repeat").css("background-position","0px -178px");
  // Vote Up Button
  $("#awesome-button").css("background", "url('https://raw.github.com/DubbyTT/Auto-Awexomer/master/images/board-sprite-02.png') 0 0 no-repeat").css("background-position","-220px -178px");
  // Meter Needle
	//$("#awesome-needle.green").css("background", "url('https://raw.github.com/DubbyTT/Auto-Awexomer/master/images/board-sprite-02.png') 0 0 no-repeat").css("background-position","-338px -146px");
  //$("#awesome-needle.red").css("background", "url('https://raw.github.com/DubbyTT/Auto-Awexomer/master/images/board-sprite-02.png') 0 0 no-repeat").css("background-position","-338px -125px");
  //$("#awesome-needle:after").css("background", "url('https://raw.github.com/DubbyTT/Auto-Awexomer/master/images/board-sprite-02.png') 0 0 no-repeat").css("background-position","-335px -125px");
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
    vote: function(c) {
      var f = $.sha1(window.bdub.ttObj.roomId + c + window.bdub.ttObj.currentSong._id);
      var d = $.sha1(Math.random() + "");
      var e = $.sha1(Math.random() + "");
      window.bdub.socket({
          api: "room.vote",
          roomid: window.bdub.ttObj.roomId,
          val: c,
          vh: f,
          th: d,
          ph: e
      });
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
      if(d.command == 'newsong' && d.room.metadata.current_dj != window.turntable.user.id) {
        if(!(window.turntable.user.id == "4fde9255aaa5cd1e680004f8" && (d.room.metadata.current_dj == "503bf99baaa5cd1b5200075f" || d.room.metadata.current_dj == "5022e5c6aaa5cd20d6000009" || d.room.metadata.current_dj == "4ffd38d1aaa5cd3dc80000a3")) ) {
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
      context.clearRect(0, 0, 100, 100);
      context.beginPath();
      context.arc(39, 35, 32, -Math.PI, degree*Math.PI/180 - Math.PI, false);
      context.lineWidth = 2;
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
        window.bdub.ttObj = window.turntable.buddyList.room;
        if(window.bdub.ttObj === null) {
          alert('Could not find turntable.fm objects. You should refresh your page and try again.');
          return;
        }
        window.bdub.room = window.location.pathname;
        var meterObj = $('#awesome-meter');
        if(meterObj.length > 0 && meterObj.css('display') != 'none') {
          var meter = meterObj.position();
          window.bdub.arc = $('<canvas id="bdub-arc" width="75" height="30" style="overflow: hidden; position: absolute; z-index: 20000; top: ' + meter.top + 'px; left: ' + meter.left + 'px;">B\^Dub\'s Auto Awesomer</canvas>');
         window.bdub.arc.prependTo(meterObj.parent());
          window.bdub.showArc = true;
        }
        else
          window.bdub.showArc = false;

        window.bdub.botMessage = $('<div id="bot-message">B^Dub\'s Auto Awexomer. <span style="font-style: italic;"></span> <a href="#" style="text-decoration: none; color: yellow; font-weight: bold;">Turn off</a></div>');
        window.bdub.botMessage.css({
          position: 'fixed',
          color: '#ADADAD',
          top: '0px',
          zIndex: '5000',
          textAlign: 'left',
          paddingLeft: '6px',
          paddingTop: '2px',
          paddingRight: '3px',
          paddingBottom: '3px',
          fontSize: '10px',
          fontFace: 'Verdana'
        });
        $('div.info').append(window.bdub.botMessage);
        
        window.bdub.botMessage.find('a').click(function(e) {
          e.preventDefault();
          window.bdub.destruct();
          window.turntable.removeEventListener("message", window.bdub.listener);
          window.bdub = null;
        });

        //var buttons = $('.roomView > div:nth-child(2) a[id]'); // 1st is Awesome button, 2nd is Lame
        $('#lame-button').unbind(); // cancel TT's default callback for the lame button, add in our own.
        $('#lame-button').bind('click', function() {
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
      double_click_check2 = true; //allow awexomer to be turned on again
    }
  });
  
  window.bdub.init();
  
});
  
}