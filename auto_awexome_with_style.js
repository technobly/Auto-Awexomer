/**
 * Turntable.fm Auto Awexomer with Style Script
 * Auto bop code by Izzmo, https://github.com/izzmo/AutoAwesomer
 * Styling examples by billyrennekamp, https://github.com/billyrennekamp/turnTheTable
 * Stop Animations code by Frick, https://github.com/Frick/ttplus
 * cssInject by Aliev (Turntable X), http://turntablex.com
 * Modified and made Awexomer by B^Dub, https://github.com/DubbyTT/Auto-Awexomer
 * Photoshop work by B^Dub
 * Last Updated: April 17th, 2013
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

function cssInject(data) {
  var ss = document.styleSheets;
  var original = {}; // call cssInject(original) to revert to previous state 
  for(var i = 0; i < ss.length; i++) {
    var rules = ss[i].cssRules || ss[i].rules;
    if(!rules) {
      continue;
    }
    for(var j = 0; j < rules.length; j++) {
      if(!(rules[j].selectorText)) continue;
      var selector = rules[j].selectorText;
      var style = rules[j].style;
      if(data[selector]) { // this rule matches! 
        original[selector] = {};
        for(prop in data[selector]) {
          var new_value = data[selector][prop];
          original[selector][prop] = style[prop];
          style[prop] = new_value;
        }
      }
    }
  }
  return original;
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
  $("#progress-bar").css("background", "url('https://raw.github.com/DubbyTT/Auto-Awexomer/master/images/progress-bar2.png') 0 0 repeat-x").css("background-position","0px -7px");
  $("#progress").css("background", "url('https://raw.github.com/DubbyTT/Auto-Awexomer/master/images/progress-bar2.png') 0 0 repeat-x").css("background-position","0px 0px").css("box-shadow","0 0 5px rgba(0,0,255,0.6)");
  // Add Song panel
  $("#song-add").css("color", "cyan").css("text-shadow", "none");
  $("div.btn.amazon").css("background", "url('https://raw.github.com/DubbyTT/Auto-Awexomer/master/images/board-sprite-02.png') 0 0 no-repeat").css("background-position","-27px -253px");
  $("div.btn.itunes").css("background", "url('https://raw.github.com/DubbyTT/Auto-Awexomer/master/images/board-sprite-02.png') 0 0 no-repeat").css("background-position","-54px -253px");
  $("div.btn.lastfm").css("background", "url('https://raw.github.com/DubbyTT/Auto-Awexomer/master/images/board-sprite-02.png') 0 0 no-repeat").css("background-position","-81px -253px");
  $("div.btn.spotify").css("background", "url('https://raw.github.com/DubbyTT/Auto-Awexomer/master/images/board-sprite-02.png') 0 0 no-repeat").css("background-position","-108px -253px");
  $("div.btn.rdio").css("background", "url('https://raw.github.com/DubbyTT/Auto-Awexomer/master/images/board-sprite-02.png') 0 0 no-repeat").css("background-position","-135px -253px");
	// Vote Down Button
	$("#lame-button").css("background", "url('https://raw.github.com/DubbyTT/Auto-Awexomer/master/images/board-sprite-02.png') 0 0 no-repeat").css("background-position","0px -178px");
  //$("#lame-button:hover").css("background-position","-44px -178px");
  // Vote Up Button
  $("#awesome-button").css("background", "url('https://raw.github.com/DubbyTT/Auto-Awexomer/master/images/board-sprite-02.png') 0 0 no-repeat").css("background-position","-220px -178px"); //.css("position","absolute").css("top","6px").css("right","9px").css("width","44px").css("height","75px");
  //$("#awesome-button:hover").css("background-position","-176px -178px");
  // Meter Needle
	//$("#awesome-needle.green").css("background", "url('https://raw.github.com/DubbyTT/Auto-Awexomer/master/images/board-sprite-02.png') 0 0 no-repeat").css("background-position","-338px -146px");
  //$("#awesome-needle.red").css("background", "url('https://raw.github.com/DubbyTT/Auto-Awexomer/master/images/board-sprite-02.png') 0 0 no-repeat").css("background-position","-338px -125px");
  //$("#awesome-needle:after").css("background", "url('https://raw.github.com/DubbyTT/Auto-Awexomer/master/images/board-sprite-02.png') 0 0 no-repeat").css("background-position","-335px -125px");
  
  //THANKSGIVING
  //var turkey1 = $('<div id="turkey1"><img src="https://s3.amazonaws.com/static.turntable.fm/roommanager_assets/avatars/353/fullfront.png"></div>');
  //turkey1.css({ position: 'absolute', top: '70px', left: '-370px'});
  //$("div.crowd").append(turkey1);
  //var turkey2 = $('<div id="turkey2"><img src="https://s3.amazonaws.com/static.turntable.fm/roommanager_assets/avatars/352/fullfront.png"></div>');
  //turkey2.css({ position: 'absolute', top: '53px', left: '-507px'});
  //$("div.crowd").append(turkey2);
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

    ////////////////////////////////////////////////////////////////////
    // Stop Animations code by Frick, https://github.com/Frick/ttplus //
    ////////////////////////////////////////////////////////////////////
    roominfo2: null,
    roommanager: null,
    animations: true,
    startAnimations: function() {
      window.bdub.roommanager.crowds.forEach(function(crowds) {
        crowds.forEach(function(crowd) {
          crowd.start();
        });
      });
      window.bdub.roommanager.djBooth.start();
      // Replace speech bubbles
      window.bdub.roommanager.speak = window.bdub.speakAnim;
      // Show meter needle (animated movement)
      window.bdub.roommanager.showFloater = window.bdub.floaterAnim;
      // Replace animation option
      $("#bdub-stop-animation").text("Stop Animations");
    },
    stopAnimations: function() {
      window.bdub.roommanager.crowds.forEach(function(crowds) {
        crowds.forEach(function(crowd) {
          crowd.stop();
        });
      });
      window.bdub.roommanager.djBooth.stop();
      // Stop speech bubbles
      window.bdub.speakAnim = window.bdub.roommanager.speak;
      window.bdub.roommanager.speak = $.noop;
      // Stop fanned/snagged animations
      window.bdub.floaterAnim = window.bdub.roommanager.showFloater;
      window.bdub.roommanager.showFloater = $.noop;
      // Replace animation option
      $("#bdub-stop-animation").text("Start Animations");
    },
    refreshUsers: function() {
      // Called when RemDj, AddDj and Newsong events received to update UI
      if(window.bdub.animations === false) {
        window.bdub.startAnimations();
        window.setTimeout(function() {
          window.bdub.stopAnimations();
        }, 500);
      }
    },
    addAnimationToggle: function() {
      $('#settings-dropdown').prepend('<li id="bdub-stop-animation" class="option">Stop Animations</li>');
      $('#bdub-stop-animation').on("click", function(e) {
        e.preventDefault();
        e.stopPropagation();
        window.bdub.animations = !window.bdub.animations;
        // disable animations
        if(window.bdub.animations === false) {
          window.bdub.stopAnimations();
        } else {
          // re-enable animations
          window.bdub.startAnimations();
        }
      });
    },
    ////////////////////////////////////////////////////////////////////
    // Stop Animations code by Frick, https://github.com/Frick/ttplus //
    ////////////////////////////////////////////////////////////////////
    crowd: true,
    crowdsave: null,
    addCrowdToggle: function() {
      $('#settings-dropdown').prepend('<li id="bdub-crowd" class="option">Blackout</li>');
      $('#bdub-crowd').on("click", function(e) {
        e.preventDefault();
        e.stopPropagation();
        window.bdub.crowd = !window.bdub.crowd;
        // disable crowd
        if(window.bdub.crowd === false) {
          $("#stage-background").hide();
          $("#audience").hide();
          $("#dj-table").hide();
          window.bdub.crowdsave = cssInject({
            '.zoom-0 #bigboard::before, .zoom-0 #bigboard::after': {
              'top': '-54px',
              'background': 'url("https://raw.github.com/DubbyTT/Auto-Awexomer/master/images/board-sprite-04.png") -264px -178px no-repeat'
            },
            '.zoom-0 #songboard::before, .zoom-0 #songboard::after': {
              'top': '-60px',
              'background': 'url(https://raw.github.com/DubbyTT/Auto-Awexomer/master/images/board-sprite-04.png) -303px -178px no-repeat'
            }
          });
          $("#bdub-crowd").text("Restore Crowd");
        } else {
          // re-enable crowd
          $("#stage-background").show();
          $("#audience").show();
          $("#dj-table").show();
          cssInject(window.bdub.crowdsave);
          $("#bdub-crowd").text("Blackout");
        }
      });
    },
    updateStageUsers: 0,
    setLights: function(level) {
      switch(level) {
        case 0: window.bdub.updateStageUsers = 10; window.bdub.roommanager.drawStage(0); break;
        case 1: window.bdub.updateStageUsers = 55; window.bdub.roommanager.drawStage(1); break;
        case 2: window.bdub.updateStageUsers = 250; window.bdub.roommanager.drawStage(2); break;
        case 3: window.bdub.updateStageUsers = 450; window.bdub.roommanager.drawStage(3); break;
      }
    },
    knob_pos: 0,
    addLightKnob: function() {
      $('#header .info').css('right', '250px');
      $('#switch-room').css('right', '134px');
      $('#header .userauth-container').css('right', '80px').after('<div style="position:absolute;top:15px;right:45px;width:30px;height:30px;background: url(https://raw.github.com/DubbyTT/Auto-Awexomer/master/images/knob_animation5.png) 0px 0px no-repeat;background-position:0px -124px"><div id="bdub-lights-knob"/></div>');
      $('#bdub-lights-knob').parent().click(function() {
        if(++window.bdub.knob_pos > 4) window.bdub.knob_pos = 0;
        switch(window.bdub.knob_pos) {
          case 0: 
            if(window.bdub.lights_timer != null) {
              clearInterval(window.bdub.lights_timer);
              window.bdub.lights_timer = null;
            }
            $("#bdub-lights-knob").parent().css("background-position","0px -124px"); 
            window.bdub.setLights(0); 
            break;
          case 1: 
            if(window.bdub.lights_timer != null) {
              clearInterval(window.bdub.lights_timer);
              window.bdub.lights_timer = null;
            }
            $("#bdub-lights-knob").parent().css("background-position","0px -93px"); 
            window.bdub.setLights(1); 
            break;
          case 2: 
            if(window.bdub.lights_timer != null) {
              clearInterval(window.bdub.lights_timer);
              window.bdub.lights_timer = null;
            }
            $("#bdub-lights-knob").parent().css("background-position","0px -62px"); 
            window.bdub.setLights(2); 
            break;
          case 3: 
            if(window.bdub.lights_timer != null) {
              clearInterval(window.bdub.lights_timer);
              window.bdub.lights_timer = null;
            }
            $("#bdub-lights-knob").parent().css("background-position","0px -31px"); 
            window.bdub.setLights(3); 
            break;
          case 4: 
            $("#bdub-lights-knob").parent().css("background-position","0px 0px"); 
            window.bdub.lights_timer = setInterval(function () {
              window.bdub.setLights(Math.floor(Math.random() * 4));
            }, 100 );
            break;
        }
        
      });
    },
    vote: function(vote, callback) {
      var f = $.sha1(window.bdub.ttObj.roomId + vote + window.bdub.ttObj.currentSong._id);
      var d = $.sha1(Math.random() + "");
      var e = $.sha1(Math.random() + "");
      window.bdub.socket({
        api: "room.vote",
        roomid: window.bdub.ttObj.roomId,
        section: window.bdub.ttObj.section,
        val: vote,
        vh: f,
        th: d,
        ph: e
      }, function (g) {
          if (g.success) {
            //console.log("[VOTE SUCCESS]: " + JSON.stringify(g,null,' '));
          }
          else if (g.err === "Cannot vote on your song.") {
            alert("I'm sorry but the Awexomer script has an error and you're not bopping.  Please refresh the TAB and reload ;-)");
            console.log("[VOTE FAIL]: " + JSON.stringify(g,null,' '));
          }
          if (callback) {
              callback(g);
          }
      });
    },
    socket: function (data, callback) { // Borrowed from Turntable X :) 
      var msg, defer = $.Deferred();
      if(data.api == "room.now") {
        defer.resolved();
        callback();
        return defer.promise();
      }
      data.msgid = turntable.messageId;
      turntable.messageId += 1;
      data.clientid = turntable.clientId;
      if(turntable.user.id && !data.userid) {
        data.userid = turntable.user.id;
        data.userauth = turntable.user.auth;
      }
      msg = JSON.stringify(data);
      turntable.whenSocketConnected(function() {
        turntable.socket.send(msg);
        turntable.socketKeepAlive(true);
        turntable.pendingCalls.push({
          msgid: data.msgid,
          handler: callback,
          deferred: defer,
          time: util.now()
        });
      });
      return defer.promise();
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
            //window.bdub.vote('up');
            window.bdub.awesome();
          }, timeAmt);
        
          if(!window.bdub.showArc) return;

          window.bdub.deg = 0.0;
          $("#awesome-button").css("background-position","-132px -178px");
          $("#lame-button").css("background-position","0px -178px");
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
        window.bdub.refreshUsers(); // Updates UI if animations are stopped
      }
      else if(d.command == 'add_dj' || d.command == 'rem_dj') {
        window.bdub.refreshUsers(); // Updates UI if animations are stopped 
      }
      else if(d.command == 'update_votes') {
        $.each(d.room.metadata.votelog, function() {
          if(this[0] == window.turntable.user.id) {
            window.bdub.stop();
            window.bdub.setArc(180, 'down' === this[1]);
            if('down' === this[1]) {
              $("#lame-button").css("background-position","-88px -178px");
              $("#awesome-button").css("background-position","-132px -178px");
            }
            else {
              $("#lame-button").css("background-position","0px -178px");
              $("#awesome-button").css("background-position","-220px -178px");
            }
          }
        });     
      }
    },
    setArc: function(degree, red) {
      if(!window.bdub.showArc) return;
      var context = window.bdub.arc[0].getContext('2d'), $arc = $(window.bdub.arc);
      context.clearRect(0, 0, 100, 100);
      context.beginPath();
      context.arc($arc.width()/2, $arc.height()+5, $arc.height()+2, -Math.PI, degree*Math.PI/180 - Math.PI, false);
      context.lineWidth = 2;
      if(red)
        context.strokeStyle = 'rgb(255, 0, 0)';
      else
        context.strokeStyle = 'rgb(0, 70, 255)';
      context.shadowOffsetX = 0;
      context.shadowOffsetY = 0;
      context.shadowBlur = 20;
      if(red)
        context.shadowColor = 'rgba(255, 0, 0, 1)';
      else
        context.shadowColor = 'rgba(0, 70, 255, 1)';
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
      $("#lame-button").css("background-position","0px -178px");
      $("#awesome-button").css("background-position","-220px -178px");
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
      $("#awesome-button").css("background-position","-132px -178px");
      $("#lame-button").css("background-position","-88px -178px");
    },
    init: function() {
      $('.roomView').ready(function() {
        ////////////////////////////////////////////////////////////////////
        // Stop Animations code by Frick, https://github.com/Frick/ttplus //
        ////////////////////////////////////////////////////////////////////
        var x, prop = 0;
        if(window.bdub.roominfo2 === null) {
          for(x in turntable) {
            prop = turntable[x];
            if(typeof prop === "object" && prop !== null && typeof prop.setupRoom !== 'undefined') {
              window.bdub.roominfo2 = prop;
              break;
            }
          }
        }
        if(window.bdub.roominfo2 !== null) {
          for(x in window.bdub.roominfo2) {
            prop = window.bdub.roominfo2[x];
            if(typeof prop === "object" && prop !== null && prop.hasOwnProperty("prefix") && (prop.prefix === 'room' || prop.prefix === 'concert')) {
              window.bdub.roommanager = prop;
              break;
            }
          }
        }
        ////////////////////////////////////////////////////////////////////
        // Stop Animations code by Frick, https://github.com/Frick/ttplus //
        ////////////////////////////////////////////////////////////////////
        window.bdub.roommanager.updateStage = function(e) {
          var t = window.bdub.updateStageUsers;
          var i = window.bdub.updateStageUsers;
          !t || Math.abs(i - t) > 10 ? this.numDancersAtLastStageUpdate = i : i = t;
          var n = 0;
          i > 400 ? n = 3 : i > 200 ? n = 2 : i > 50 && (n = 1);
          var o = this.roomData.metadata;
          //o.upvotes / o.listeners > .8 && n++, 
          this.drawStage(Math.min(3, n), e);
        };

        window.bdub.ttObj = window.turntable.buddyList.room;
        if(window.bdub.ttObj === null) {
          alert('Could not find turntable.fm objects. You should refresh your page and try again.');
          return;
        }
        window.bdub.room = window.location.pathname;
        var meterObj = $('#awesome-meter');
        if(meterObj.length > 0 && meterObj.css('display') != 'none') {
          var meter = meterObj.position();
          window.bdub.arc = $('<canvas id="bdub-arc" width="' + meterObj.width() + '" height="' + parseInt(meterObj.height()*0.39) + '" style="overflow: hidden; position: absolute; z-index: 20000; top: ' + meter.top + 'px; left: ' + meter.left + 'px;">B\^Dub\'s Auto Awesomer</canvas>');
         window.bdub.arc.prependTo(meterObj.parent());
          window.bdub.showArc = true;
        }
        else
          window.bdub.showArc = false;

        if(typeof TTX === "undefined" || typeof TTX.Viz === "undefined" || typeof TTX.Viz.settings() === "undefined") {
          window.bdub.addCrowdToggle();     // Add crowd toggle button to menu
          window.bdub.addAnimationToggle(); // Add stop animations button to menu
          window.bdub.addLightKnob();       // Add the coolness!!
        }

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
        if(window.bdub.ttObj.roomData.metadata.current_dj != window.turntable.user.id) window.bdub.awesome(); // automatically awesome the song upon load, unless I'm dj'ing

        // Timer for resetting Turntable's AFK Timers
        // Runs every 60 seconds
        window.bdub.botResetAFKTimer = setInterval(function() {
          $(window).focus();
        }, 60000);

        window.bdub.watcher = setInterval(function() {
          if(window.location.pathname != window.bdub.room) {
            console.log('New Room found, reinitializing...');
            window.bdub.destruct();
            if(window.bdub.showArc) {
              var meterObj = $('#awesome-meter');
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
      $("#awesome-button").css("background-position","-132px -178px");
      $("#lame-button").css("background-position","0px -178px");
      var tempelement = document.getElementById("bdub-stop-animation");
      tempelement.parentNode.removeChild(tempelement);
      var tempelement = document.getElementById("bdub-crowd");
      tempelement.parentNode.removeChild(tempelement);
      var tempelement = document.getElementById("bdub-lights-knob");
      tempelement.parentNode.remove(tempelement);
      $('#header .info').css('right', '230px');
      $('#switch-room').css('right', '110px');
      $('#header .userauth-container').css('right', '50px');
      double_click_check2 = true; //allow awexomer to be turned on again
    }
  });
  
  window.bdub.init();
  
});
  
}
