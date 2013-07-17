/**
 * Turntable.fm Cheater
 * Socket code stolen from Izzmo, https://github.com/izzmo/AutoAwesomer thank you kind sir!
 * Modified and coded by B^Dub, https://github.com/DubbyTT/Auto-Awexomer
 * Last Updated: January 17th, 2013
 * 
 * If you have any questions or concerns, don't ask me.. you're the one who's trying to cheat!
 * Don't use this in my room or you will be booted!!!!
 * This is against Turntable rules... but some rooms seem to encourage Free For All
 * and don't mind if you auto your way up, 
 * so go try to use this there... if you wanna cheat, you cheater -_-
 * 
 * Find me in http://turntable.fm/bdubs
 */

if(typeof double_click_check3 === "undefined") {
  var double_click_check3 = true; //allow cheater to be turned on only once
}
if(double_click_check3) {
  double_click_check3 = false; //make sure a second click doesn't turn on the Cheater again
// CHEATER!!!!!!!!!!!
// -----------------------------------------------------
$(document).ready(function() {
  
  if(window.cheater == undefined) window.cheater = { };
  
  window.cheater = $.extend(window.cheater, {
    ttObj: null,  
    autoDJ: 0,
    autoDJCnt: 1,
    isDj: false,
    playlist: {}, //Playlist container
    saved_playlist: {}, //Playlist container
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
    roomInfo: function () {
      var rq = { api: 'room.info', roomid: window.cheater.ttObj.roomId };
      var callback = null;
      if (arguments.length == 1) {
        if (typeof arguments[0] === 'function') {
          callback = arguments[0];
        } else if (arguments[0] === 'boolean') {
           rq.extended = arguments[0];
        }
      } else if (arguments.length == 2) {
        rq.extended = arguments[0];
        callback    = arguments[1];
      }
      window.cheater.socket(rq, callback);
    },
    addDj: function() { window.cheater.socket({ api: "room.add_dj", roomid: window.cheater.ttObj.roomId }); },
    contains: function(sArray, sElement) { // check if sElement is in sArray
      var i = sArray.length;
      while (i--) { if (sArray[i] == sElement) { return true; } }
      return false;
    },
    playlistAll: function () {
      var playlistName = 'default'
        , callback     = null;
      switch (arguments.length) {
        case 1:
            if      (typeof arguments[0] == 'string'  ) { playlistName = arguments[0]; }
            else if (typeof arguments[0] == 'function') { callback     = arguments[0]; }
            break;
        case 2:
            playlistName = arguments[0];
            callback     = arguments[1];
            break;
      }
      var rq = { api: 'playlist.all', playlist_name: playlistName };
      window.cheater.socket(rq, callback);
    },
    playlistReorder: function () {
      var playlistName = 'default'
        , indexFrom    = 0
        , indexTo      = 0
        , callback     = null;
      switch (arguments.length) {
        case 2:
            indexFrom = arguments[0];
            indexTo   = arguments[1];
            break;
        case 3:
            if (typeof arguments[0] == 'string' && typeof arguments[1] == 'number' && typeof arguments[2] == 'number') {
              playlistName = arguments[0];
              indexFrom    = arguments[1];
              indexTo      = arguments[2];
            } else if (typeof arguments[0] == 'number' && typeof arguments[1] == 'number' && typeof arguments[2] == 'function') {
              indexFrom    = arguments[0];
              indexTo      = arguments[1];
              callback     = arguments[2];
            }
            break;
        case 4:
            playlistName = arguments[0];
            indexFrom    = arguments[1];
            indexTo      = arguments[2];
            callback     = arguments[3];
            break;
      }
      var rq = { api: 'playlist.reorder', playlist_name: playlistName, index_from: indexFrom, index_to: indexTo };
      window.cheater.socket(rq, callback);
    },
    listener: function(d) {
      // 8888888b.  8888888888 888b     d888      8888888b. 888888 
      // 888   Y88b 888        8888b   d8888      888  "Y88b  "88b 
      // 888    888 888        88888b.d88888      888    888   888 
      // 888   d88P 8888888    888Y88888P888      888    888   888 
      // 8888888P"  888        888 Y888P 888      888    888   888 
      // 888 T88b   888        888  Y8P  888      888    888   888 
      // 888  T88b  888        888   "   888      888  .d88P   88P 
      // 888   T88b 8888888888 888       888      8888888P"    888 
      //                                                     .d88P 
      //                                                   .d88P"  
      if(d.command === 'rem_dj') {
        if(d.user[0].userid === window.turntable.user.id) { // If I just came off the deck...
          window.cheater.isDj = false; // Not DJing Anymore
        }
        if(!window.cheater.isDj) { // If not a DJ already
          if(window.cheater.autoDJ > 0) { // Only try to get up if autoDJ is set
            window.cheater.addDj();  // Try to add self
            if(window.cheater.autoDJ === 1) { // If ONCE set, disarm the autoDJ (to prevent getting booted), someone might have beat you up
              window.cheater.autoDJ = 0; // Turn off
              window.cheater.autoDJCnt = 1; // Reset rolling menu index
              window.cheater.autoDJMessage.find('a').html("|OFF|");
            }
          }
        }
      }
      //        d8888 8888888b.  8888888b.       8888888b. 888888 
      //       d88888 888  "Y88b 888  "Y88b      888  "Y88b  "88b 
      //      d88P888 888    888 888    888      888    888   888 
      //     d88P 888 888    888 888    888      888    888   888 
      //    d88P  888 888    888 888    888      888    888   888 
      //   d88P   888 888    888 888    888      888    888   888 
      //  d8888888888 888  .d88P 888  .d88P      888  .d88P   88P 
      // d88P     888 8888888P"  8888888P"       8888888P"    888 
      //                                                    .d88P 
      //                                                  .d88P"  
      else if(d.command === 'add_dj') {
        if(d.user[0].userid === window.turntable.user.id) {
          window.cheater.isDj = true; // Yup, I'm DJing
        }
      }
    },
    init: function() {
      $('.roomView').ready(function() {
        window.cheater.ttObj = window.turntable.buddyList.room;
        if(window.cheater.ttObj === null) {
          alert('Could not find turntable.fm objects. You should refresh your page and try again.');
          return;
        }
        window.cheater.room = window.location.pathname;

        turntable.addEventListener("message", window.cheater.listener);

        window.cheater.offMessage =          $('<div id="off-message"><span style="font-style: italic;"></span> <a href="#" style="text-decoration: none; color: yellow; font-weight: bold;">Ch</a></div>');
        window.cheater.autoDJMessage =       $('<div id="autodj-message">eater!!!: <a href="#" style="text-decoration: none; color: yellow; font-weight: bold;">|OFF|</a></div>');
        window.cheater.offMessage.css({      position: 'absolute', color: '#ADADAD', top: '44px', zIndex: '5000', textAlign: 'left', paddingLeft: '6px', paddingTop: '2px', paddingRight: '2px', paddingBottom: '2px', fontSize: '10px', fontFace: 'Verdana'});
        window.cheater.autoDJMessage.css({   position: 'absolute', color: '#ADADAD', top: '44px', left: '13px', zIndex: '5000', textAlign: 'left', paddingLeft: '6px', paddingTop: '2px', paddingRight: '2px', paddingBottom: '2px', fontSize: '10px', fontFace: 'Verdana'});
        window.cheater.shuffleMessage =      $('<div id="shuffle-message"><a href="#" style="text-decoration: none; color: yellow; font-weight: bold;">|shuffle|</a></div>');
        window.cheater.shuffleMessage.css({  position: 'absolute', color: '#ADADAD', top: '44px', left: '100px', zIndex: '5000', textAlign: 'left', paddingLeft: '6px', paddingTop: '2px', paddingRight: '2px', paddingBottom: '2px', fontSize: '10px', fontFace: 'Verdana'}); 
        
        
        $('div.info').append(window.cheater.offMessage);
        window.cheater.offMessage.find('a').click(function(e) {
          e.preventDefault();
          window.cheater.destruct();
          window.turntable.removeEventListener("message", window.cheater.listener);
          window.cheater = null;
        });

        $('div.info').append(window.cheater.autoDJMessage);
        window.cheater.autoDJMessage.find('a').click(function(e) {
          e.preventDefault();
          window.cheater.autoDJCnt++;
          switch(window.cheater.autoDJCnt) {
            case 1: window.cheater.autoDJMessage.find('a').html("|OFF|"); window.cheater.autoDJ = 0; break;
            case 2: window.cheater.autoDJMessage.find('a').html("|ONCE|"); window.cheater.autoDJ = 1; break;
            case 3: window.cheater.autoDJMessage.find('a').html("|ALWAYS|"); window.cheater.autoDJ = 2; break;
          }
          if(window.cheater.autoDJCnt == 3) window.cheater.autoDJCnt = 0;
          window.cheater.roomInfo(true, function(data) { 
            window.cheater.isDj = window.cheater.contains(data.room.metadata.djs,window.turntable.user.id);
          });
        });

        // isDj on start?
        window.cheater.roomInfo(true, function(data) { 
          window.cheater.isDj = window.cheater.contains(data.room.metadata.djs,window.turntable.user.id);
        });

        $('div.info').append(window.cheater.shuffleMessage);
        window.cheater.shuffleMessage.find('a').click(function(msg8) {
          msg8.preventDefault();
          window.cheater.shuffleMessage.find('a').css("color","red").html("|WAIT|");
          window.cheater.playlist = {};
          window.cheater.saved_playlist = {};
          var checkShuffle = null;
          var checkShuffle = prompt("Are you sure you want to shuffle your tracks? Please type \"yes\" and click OK. \n\nClick Cancel if you want to back up your songs to the Chrome console first.  Go in there and copy them into a new text file.");
          
          if(checkShuffle && checkShuffle.match(/^yes$/i)) console.log("You typed yes");
          else {
            window.cheater.shuffleMessage.find('a').css("color","yellow").html("|shuffle|");
            window.cheater.playlistAll(function (data) {
              if(data.success) {
                console.log("[ SONG BACKUP START - START COPY HERE --> ]");
                for(var i = 0; i < data.list.length; i++) {
                  window.cheater.saved_playlist[i] = data.list[i]._id;
                }
                console.log(JSON.stringify(window.cheater.saved_playlist));
                console.log("[ <-- END COPY HERE - SONG BACKUP END ]");
                alert(data.list.length+" SONGS BACKED UP! \n\nRight click and open the Inspect Element tool, then click Console tab, and copy song data.");
              }
              else
                alert("ERROR: Your songs are not backed up!!!");
            });
            return;
          }
          
          window.cheater.playlistAll(function (data) {
            if(data.success) {              
              var songCount = 0;
              var songsLeft = 0;
              var new_rand_loc = 0; 
              var shuffleInt = setInterval(function () {
                if (songCount > data.list.length) {
                  clearInterval(shuffleInt);
                  window.cheater.shuffleMessage.find('a').css("color","yellow").html("|shuffle|");
                  alert("SONGS SHUFFLED!\n\nDon't forget to refresh the page to update the view of your queue.");
                }
                else {
                  songsLeft = data.list.length-songCount;
                  new_rand_loc = Math.ceil(Math.random() * data.list.length);
                  window.cheater.playlistReorder(songCount, new_rand_loc, function (data2) {
                    if(data2.success) window.cheater.shuffleMessage.find('a').css("color","red").html(songsLeft.toString());
                  });
                  songCount++;
                }
              }, 1000);
            } // end data.success
            else {
              alert("ERROR: Could not retrieve playlist info!!!");
            }
          }); // end playlistAll func
        }); // end shuffleMessage click func

      });
    },
    destruct: function() {
      window.cheater.autoDJMessage.remove();
      window.cheater.offMessage.remove();
      window.cheater.shuffleMessage.remove();
      double_click_check3 = true; //allow awexomer to be turned on again
    }
  });
  window.cheater.init();
  
});
  
}