/**
 * Turntable.fm Auto Awexomer with Style Script
 * Auto bop code by Izzmo, https://github.com/izzmo/AutoAwesomer
 * Modified and made Awexomer by B^Dub, https://github.com/DubbyTT/Auto-Awexomer
 * Photoshop work by B^Dub
 * Last Updated: May 27th, 2013
 * 
 * If you have any questions or concerns,
 * find me in http://turntable.fm/bdubs
 */

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
    double_click_check = false;
  }
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
    awexomerTimer: null,
    lamed: false,
    tt1: null,
    tt2: null,
    tt3: null,
    tt4: null,
    tt5: null,
    tt6: null,   
    progress: 0,
    progressInt: 0,
    progressTimeout: 0,
    progressAmt: 0,
    degree: 0,
    percent: 0, 
    roominfo: null,
    roomview: null,
    room: '',
    watcher: null,
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
          window.bdub.cancel();
          window.bdub.setProgress(0, 'up', 0);
          window.bdub.lamed = false;
          var timeAmt = Math.floor(Math.random()*window.bdub.ttObj.currentSong.metadata.length/4*1000)+1000;
          window.bdub.botMessage.find('span').html('');
          window.bdub.awexomerTimer = setTimeout(function() {
            window.bdub.awexome();
          }, timeAmt);
          window.bdub.setProgress(100, 'up', timeAmt);
        } // end if() my bots and I
      }
      else if(d.command == 'update_votes') {
        $.each(d.room.metadata.votelog, function() {
          if(this[0] == window.turntable.user.id) {
            window.bdub.cancel();
            window.bdub.setProgress(100, this[1], 0);
            if(this[1] === 'down') {
              //$("#lame-button").css("background-position","-88px -178px");
              //$("#awesome-button").css("background-position","-132px -178px");
            }
            else {
              //$("#lame-button").css("background-position","0px -178px");
              //$("#awesome-button").css("background-position","-220px -178px");
            }
          }
        });     
      }
    },
    setProgress: function(percentDone, vote, delay) {
      var num = parseInt(87 - (87 * percentDone/100)) + 7;
      if(num > 87) num = 87;
      else if(num < 7) num = 7;
      var temp = "-" + num + "px 0px";
      if(window.bdub.progressTimout != null) {
        clearTimeout(window.bdub.progressTimout);
        window.bdub.progressTimout = null;
      }      
      if(percentDone >= 100 && vote === 'up') {
        window.bdub.progressTimout = setTimeout(function() {
          window.bdub.progressTimout = null;
          $('div#tt5').hide();
          $('div#tt6').hide();
          $('div#tt4').show();
        }, delay);
      }
      else if(percentDone >= 100 && vote === 'down') {
        window.bdub.progressTimout = setTimeout(function() {
          window.bdub.progressTimout = null;
          $('div#tt4').hide();
          $('div#tt5').hide();
          $('div#tt6').show();
        }, delay);
      }
      $('div#tt4').hide();
      $('div#tt5').hide();
      $('div#tt6').hide();
      window.bdub.tt2.css({"-webkit-transition": "background-position "+delay+"ms linear"});
      $('div#tt2').css("background-position", temp);
    },
    awexome: function() {
      window.bdub.cancel();
      window.bdub.vote('up');
      window.bdub.setProgress(100, 'up', 0);
      //$("#lame-button").css("background-position","0px -178px");
      //$("#awesome-button").css("background-position","-220px -178px");
    },
    lame: function() {
      if(!window.bdub.lamed) {
        window.bdub.cancel();
        //window.bdub.vote('up');
        window.bdub.botMessage.find('span').html("Awexoming will resume next song.");
        window.bdub.lamed = true;
      }
      window.bdub.setProgress(100, 'down', 0);
      setTimeout(function() {window.bdub.vote('down');}, 250);
      //$("#awesome-button").css("background-position","-132px -178px");
      //$("#lame-button").css("background-position","-88px -178px");
    },
    cancel: function() {
      if(window.bdub.awexomerTimer != null) {
        clearTimeout(window.bdub.awexomerTimer);
        window.bdub.awexomerTimer = null;
      }
    },
    init: function() {
      $('.roomView').ready(function() {
        var x, prop = 0;
        if(window.bdub.roominfo === null) {
          for(x in turntable) {
            prop = turntable[x];
            if(typeof prop === "object" && prop !== null && typeof prop.setupRoom !== 'undefined') {
              window.bdub.roominfo = prop;
              break;
            }
          }
        }
        if(window.bdub.roominfo !== null) {
          for(x in window.bdub.roominfo) {
            prop = window.bdub.roominfo[x];
            if(typeof prop === "object" && prop !== null && prop.hasOwnProperty("prefix") && (prop.prefix === 'room' || prop.prefix === 'concert')) {
              window.bdub.roomview = prop;
              break;
            }
          }
        }

        window.bdub.ttObj = window.turntable.buddyList.room;
        if(window.bdub.ttObj === null) {
          alert('Could not find turntable.fm objects. You should refresh your page and try again.');
          return;
        }
        window.bdub.room = window.location.pathname;

        $('a.header-logo').hide();
        window.bdub.tt1 = $('<div id="tt1">\&nbsp\;</div>');
        window.bdub.tt1.css({
          "position": "absolute",
          "top": "0px",
          "left": "0px",
          "background": "url('https://raw.github.com/DubbyTT/Auto-Awexomer/master/images/tt1.png') 0 0 no-repeat",
          "width": "90px",
          "height": "42px",
          "cursor": "pointer",
          "z-index": "1001"
        });
        window.bdub.tt2 = $('<div id="tt2">\&nbsp\;</div>');
        window.bdub.tt2.css({
          "position": "absolute",
          "top": "0px",
          "left": "0px",
          "background": "url('https://raw.github.com/DubbyTT/Auto-Awexomer/master/images/tt2.png') 0 0 no-repeat",
          "width": "90px",
          "height": "42px",
          "cursor": "pointer",
          "z-index": "1002",
          "-webkit-transition": "background-position 50ms linear"
        });
        window.bdub.tt3 = $('<div id="tt3">\&nbsp\;</div>');
        window.bdub.tt3.css({
          "position": "absolute",
          "top": "0px",
          "left": "0px",
          "background": "url('https://raw.github.com/DubbyTT/Auto-Awexomer/master/images/tt3.png') 0 0 no-repeat",
          "width": "90px",
          "height": "42px",
          "cursor": "pointer",
          "z-index": "1003"
        });
        window.bdub.tt4 = $('<div id="tt4">\&nbsp\;</div>');
        window.bdub.tt4.css({
          "position": "absolute",
          "top": "0px",
          "left": "0px",
          "background": "url('https://raw.github.com/DubbyTT/Auto-Awexomer/master/images/tt4.png') 0 0 no-repeat",
          "width": "90px",
          "height": "42px",
          "cursor": "pointer",
          "z-index": "1006"
        });
        window.bdub.tt5 = $('<div id="tt5">\&nbsp\;</div>');
        window.bdub.tt5.css({
          "position": "absolute",
          "top": "0px",
          "left": "0px",
          "background": "url('https://raw.github.com/DubbyTT/Auto-Awexomer/master/images/tt5.png') 0 0 no-repeat",
          "width": "90px",
          "height": "42px",
          "cursor": "pointer",
          "z-index": "1005"
        });
        window.bdub.tt6 = $('<div id="tt6">\&nbsp\;</div>');
        window.bdub.tt6.css({
          "position": "absolute",
          "top": "0px",
          "left": "0px",
          "background": "url('https://raw.github.com/DubbyTT/Auto-Awexomer/master/images/tt6.png') 0 0 no-repeat",
          "width": "90px",
          "height": "42px",
          "cursor": "pointer",
          "z-index": "1004"
        });
        $('div.header-content').append(window.bdub.tt3);
        $('div.header-content').append(window.bdub.tt1);
        $('div.header-content').append(window.bdub.tt2);
        $('div.header-content').append(window.bdub.tt4);
        $('div.header-content').append(window.bdub.tt5);
        $('div.header-content').append(window.bdub.tt6);
        $('div#tt5').hide();
        $('div#tt6').hide();
        $('div#tt4').hide();
        window.bdub.tt3.click(function(msg10) {
          msg10.preventDefault();
          window.open('http://turntable.fm', '_current');
        });
        window.bdub.tt4.click(function(msg11) {
          msg11.preventDefault();
          window.open('http://turntable.fm', '_current');
        });
        window.bdub.tt5.click(function(msg12) {
          msg12.preventDefault();
          window.open('http://turntable.fm', '_current');
        });
        window.bdub.tt6.click(function(msg13) {
          msg13.preventDefault();
          window.open('http://turntable.fm', '_current');
        });

        window.bdub.botMessage = $('<div id="bot-message">B^Dub\'s Auto Awexomer. <span style="font-style: italic;"></span> <a href="#" style="text-decoration: none; color: yellow; font-weight: bold;">Turn off</a></div>');
        window.bdub.botMessage.css({
          position: 'fixed',
          color: '#ADADAD',
          top: '0px',
          left: '95px',
          zIndex: '5000',
          textAlign: 'left',
          fontSize: '10px',
          fontFace: 'Verdana'
        });
        $('div.header-content').append(window.bdub.botMessage);

        window.bdub.botMessage.find('a').click(function(e) {
          e.preventDefault();
          window.bdub.destruct();
          window.turntable.removeEventListener("message", window.bdub.listener);
          window.bdub = null;
        });

        $('#lame-button').unbind(); // cancel TT's default callback for the lame button, add in our own.
        $('#lame-button').bind('click', function() {
          window.bdub.lame();
        });

        turntable.addEventListener("message", window.bdub.listener);
        window.bdub.setProgress(0, 'up', 0);
        window.bdub.setProgress(100, 'up', 1000);
        if(window.bdub.ttObj.roomData.metadata.current_dj != window.turntable.user.id) 
          setTimeout(function(){ 
            window.bdub.awexome(); // automatically awexome the song upon load, unless I'm dj'ing
          }, 1000);

        // Timer for resetting Turntable's AFK Timers
        // Runs every 60 seconds
        window.bdub.botResetAFKTimer = setInterval(function() {
          $(window).focus();
        }, 60000);

        window.bdub.watcher = setInterval(function() {
          if(window.location.pathname != window.bdub.room) {
            console.log('New Room dude! Time to reset my brain...');
            window.bdub.destruct();
            setTimeout(function() {  
              window.bdub.init();
            }, 3000);
          }
        }, 3000);
      });

    },
    destruct: function() {
      clearInterval(window.bdub.botResetAFKTimer);
      clearInterval(window.bdub.watcher);
      window.bdub.cancel();
      window.bdub.botMessage.remove();
      window.bdub.tt1.remove();
      window.bdub.tt2.remove();
      window.bdub.tt3.remove();
      window.bdub.tt4.remove();
      window.bdub.tt5.remove();
      window.bdub.tt6.remove();
      $('a.header-logo').show();
      double_click_check2 = true; //allow awexomer to be turned on again
    }
  });

  window.bdub.init();
  
});
  
}
