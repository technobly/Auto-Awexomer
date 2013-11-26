/**
 * Turntable.fm Snake Sticker Game by B^Dub, https://github.com/Technobly
 * Written: January 7th, 2013
 * Released to public domain: November 25th, 2013
 * 
 * If you have any questions or concerns,
 * find me in http://turntable.fm/bdubs
 *
 * See how to play here: http://www.youtube.com/watch?v=hQyAi6KAk0E
 * 
 * A user can PM the commands to the person running this bookmarklet
 * -----------------------------------------------------------------
 * SNAKE - pm's them back the rules and how to play
 * PLAY - starts the game for them, locks out PLAY for all others while game in progress
 * STATS - pm's them back the current game stats
 * User controls snake with A S D F keys and enter via PM window.
 * Person running the bookmarklet can override control directly with ARROW keys 
 * (useful to end someone's game, or to troll them)
 *
 * The person running the bookmarklet can type the word PLAY into the chat all by itself
 * to start the game for them.  They control snake directly with ARROW keys.
 * Once a PM window opens from yourself, you can type STATS into it to get current stats.
 */

$(document).ready(function() {
  
  if(window.bdub == undefined) window.bdub = { };
  
  window.bdub = $.extend(window.bdub, {
    ttObj: null,
    speakGame: true,
    currentAnimation: null,
    usersList: {}, //Array to keep the users in
    roomInfo: function () {
      var rq = { api: 'room.info', roomid: window.bdub.ttObj.roomId };
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
      window.bdub.socket(rq, callback); //function(data) { 
        //console.log("ROOMINFO: "+JSON.stringify(data));
      //});
    },
    placeStickers: function(c) {
      window.bdub.socket({ api: 'sticker.place', placements: c, is_dj: true, roomid: window.bdub.ttObj.roomId });
    },
    speak: function(c) {
      window.bdub.socket({ api: 'room.speak', roomid: window.bdub.ttObj.roomId, text: c.toString() });
    },
    pm: function (msg, userid, callback) {
      var rq = { api: 'pm.send', receiverid: userid, text: msg.toString() };
      window.bdub.socket(rq, callback);
    },

    //
    // 8888888b.         d8888 888b    888 8888888b.  8888888b. 8888888 Y88b   d88P 8888888888 888      .d8888b.  
    // 888   Y88b       d88888 8888b   888 888  "Y88b 888   Y88b  888    Y88b d88P  888        888     d88P  Y88b 
    // 888    888      d88P888 88888b  888 888    888 888    888  888     Y88o88P   888        888     Y88b.      
    // 888   d88P     d88P 888 888Y88b 888 888    888 888   d88P  888      Y888P    8888888    888      "Y888b.   
    // 8888888P"     d88P  888 888 Y88b888 888    888 8888888P"   888      d888b    888        888         "Y88b. 
    // 888 T88b     d88P   888 888  Y88888 888    888 888         888     d88888b   888        888           "888 
    // 888  T88b   d8888888888 888   Y8888 888  .d88P 888         888    d88P Y88b  888        888     Y88b  d88P 
    // 888   T88b d88P     888 888    Y888 8888888P"  888       8888888 d88P   Y88b 8888888888 88888888 "Y8888P"  
    //                                                           
    randPixels: function() {
      window.bdub.seg = new Array();
      for(var x=0; x<20; x++) {
        var top = window.bdub.topNums[Math.floor(Math.random() * window.bdub.topNums.length)];
        var left = window.bdub.leftNums[Math.floor(Math.random() * window.bdub.leftNums.length)];
        window.bdub.seg.push({"top":top,"angle": 0,"sticker_id": "4f86fd3ee77989117e000002","left":left});
      }
      window.bdub.placeStickers(window.bdub.seg);
    },

    //
    //  .d8888b.  888b    888        d8888 888    d8P  8888888888 .d8888b.         d8888 888b     d888 8888888888 
    // d88P  Y88b 8888b   888       d88888 888   d8P   888       d88P  Y88b       d88888 8888b   d8888 888        
    // Y88b.      88888b  888      d88P888 888  d8P    888       888    888      d88P888 88888b.d88888 888        
    //  "Y888b.   888Y88b 888     d88P 888 888d88K     8888888   888            d88P 888 888Y88888P888 8888888    
    //     "Y88b. 888 Y88b888    d88P  888 8888888b    888       888  88888    d88P  888 888 Y888P 888 888        
    //       "888 888  Y88888   d88P   888 888  Y88b   888       888    888   d88P   888 888  Y8P  888 888        
    // Y88b  d88P 888   Y8888  d8888888888 888   Y88b  888       Y88b  d88P  d8888888888 888   "   888 888        
    //  "Y8888P"  888    Y888 d88P     888 888    Y88b 8888888888 "Y8888P88 d88P     888 888       888 8888888888
    //
    gamestate: 0,
    minutes: 0,
    seconds: 0,
    curPlayer: {"name":"joe blow","userid":null,"start":0,"end":0,"time":0,"moves":0},
    temp1: Date.now(),
    temp2: null,
    winners: new Array(),
    seg: new Array(),
    topNums: new Array(0, 62, 124, 186, 248),
    leftNums: new Array(1, 63, 125, 187, 249, 311, 373, 435),
    fakeWall1: new Array({"top":62,"left":187},{"top":62,"left":249},{"top":124,"left":187},{"top":124,"left":249},{"top":186,"left":187},{"top":186,"left":249}),
    winner: new Array({"top":0,"angle": 0,"sticker_id": "4f86fd3ee77989117e000002","left":125},{"top":0,"angle": 0,"sticker_id": "4f86fd3ee77989117e000002","left":311},
                      {"top":62,"angle": 0,"sticker_id": "4f86fd3ee77989117e000002","left":125},{"top":62,"angle": 0,"sticker_id": "4f86fd3ee77989117e000002","left":311},
                      {"top":186,"angle": 0,"sticker_id": "4f86fd3ee77989117e000002","left":63},{"top":186,"angle": 0,"sticker_id": "4f86fd3ee77989117e000002","left":373},
                      {"top":248,"angle": 0,"sticker_id": "4f86fd3ee77989117e000002","left":125},{"top":248,"angle": 0,"sticker_id": "4f86fd3ee77989117e000002","left":187},{"top":248,"angle": 0,"sticker_id": "4f86fd3ee77989117e000002","left":249},{"top":248,"angle": 0,"sticker_id": "4f86fd3ee77989117e000002","left":311}),
    loser: new Array({"top":0,"angle": 0,"sticker_id": "4f86fd3ee77989117e000002","left":125},{"top":0,"angle": 0,"sticker_id": "4f86fd3ee77989117e000002","left":311},
                      {"top":62,"angle": 0,"sticker_id": "4f86fd3ee77989117e000002","left":125},{"top":62,"angle": 0,"sticker_id": "4f86fd3ee77989117e000002","left":311},
                      {"top":186,"angle": 0,"sticker_id": "4f86fd3ee77989117e000002","left":125},{"top":186,"angle": 0,"sticker_id": "4f86fd3ee77989117e000002","left":187},{"top":186,"angle": 0,"sticker_id": "4f86fd3ee77989117e000002","left":249},{"top":186,"angle": 0,"sticker_id": "4f86fd3ee77989117e000002","left":311},
                      {"top":248,"angle": 0,"sticker_id": "4f86fd3ee77989117e000002","left":63},{"top":248,"angle": 0,"sticker_id": "4f86fd3ee77989117e000002","left":373}),
    fakeCherries: new Array({"top":0,"left":63},{"top":0,"left":125},{"top":0,"left":187},{"top":0,"left":249},{"top":0,"left":311},{"top":0,"left":373},
                            {"top":0,"left":435},{"top":62,"left":435},{"top":124,"left":435},{"top":186,"left":435},{"top":248,"left":435},
                            {"top":248,"left":63},{"top":248,"left":125},{"top":248,"left":187},{"top":248,"left":249},{"top":248,"left":311},{"top":248,"left":373},
                            {"top":0,"left":1},{"top":62,"left":1},{"top":124,"left":1},{"top":186,"left":1},{"top":248,"left":1}),
    cherry: 0, // Current cherry location
    cherryCnt: 0, // How many cherries the snake has eaten
    cherries: new Array({"top":-44,"angle":-90,"sticker_id":"4f86fe33e77989117e000006","left":14}, // Top 
      {"top":-44,"angle":-90,"sticker_id":"4f86fe33e77989117e000006","left":76},
      {"top":-44,"angle":-90,"sticker_id":"4f86fe33e77989117e000006","left":138},
      {"top":-44,"angle":-90,"sticker_id":"4f86fe33e77989117e000006","left":200},
      {"top":-44,"angle":-90,"sticker_id":"4f86fe33e77989117e000006","left":262},
      {"top":-44,"angle":-90,"sticker_id":"4f86fe33e77989117e000006","left":324},
      {"top":10,"angle":0,"sticker_id":"4f86fe33e77989117e000006","left":438}, // Right
      {"top":72,"angle":0,"sticker_id":"4f86fe33e77989117e000006","left":438},
      {"top":134,"angle":0,"sticker_id":"4f86fe33e77989117e000006","left":438},
      {"top":196,"angle":0,"sticker_id":"4f86fe33e77989117e000006","left":438},
      {"top":258,"angle":0,"sticker_id":"4f86fe33e77989117e000006","left":438},
      {"top":319,"angle":90,"sticker_id":"4f86fe33e77989117e000006","left":14}, // Bottom
      {"top":319,"angle":90,"sticker_id":"4f86fe33e77989117e000006","left":76},
      {"top":319,"angle":90,"sticker_id":"4f86fe33e77989117e000006","left":138},
      {"top":319,"angle":90,"sticker_id":"4f86fe33e77989117e000006","left":200},
      {"top":319,"angle":90,"sticker_id":"4f86fe33e77989117e000006","left":262},
      {"top":319,"angle":90,"sticker_id":"4f86fe33e77989117e000006","left":324},
      {"top":10,"angle":180,"sticker_id":"4f86fe33e77989117e000006","left":-102}, // Left
      {"top":72,"angle":180,"sticker_id":"4f86fe33e77989117e000006","left":-102},
      {"top":134,"angle":180,"sticker_id":"4f86fe33e77989117e000006","left":-102},
      {"top":196,"angle":180,"sticker_id":"4f86fe33e77989117e000006","left":-102},
      {"top":258,"angle":180,"sticker_id":"4f86fe33e77989117e000006","left":-102}),
    cache: {},
    snakeTimer: null,
    // check for an object collision
    isCollision: function(obj_needle, obj_haystack) {
      console.log(JSON.stringify(obj_haystack,null,' '));
      for(var i in obj_haystack) {
        console.log(i+" "+obj_haystack[i].left+" "+obj_needle.left+" "+obj_haystack[i].top+" "+obj_needle.top);
        if (obj_haystack[i].left === obj_needle.left && obj_haystack[i].top === obj_needle.top) {
          return true;
        }
      }
      return false;
    },
    snakeGame: function() {
      if(window.bdub.gamestate === 0) {
        // Initialize
        // --------------------------------------------------
        window.bdub.cherryCnt = 0;
        window.bdub.cherry = 0;
        window.bdub.seg = new Array();
        window.bdub.seg.push({"top":window.bdub.topNums[0],"angle": 0,"sticker_id": "4f86fd3ee77989117e000002","left":435});
        window.bdub.seg.push({"top":window.bdub.topNums[0],"angle": 0,"sticker_id": "4f86fd3ee77989117e000002","left":497});
        window.bdub.seg.push({"top":window.bdub.topNums[0],"angle": 0,"sticker_id": "4f86fd3ee77989117e000002","left":559});
        window.bdub.seg.push(window.bdub.cherries[0]);
        window.bdub.seg.push({"top":163,"angle":90,"sticker_id":"4f86fd32e77989117e000001","left":225});
        window.bdub.seg.push({"top":163,"angle":90,"sticker_id":"4f86fd32e77989117e000001","left":164});
        window.bdub.seg.push({"top":85,"angle":90,"sticker_id":"4f86fd32e77989117e000001","left":225});
        window.bdub.seg.push({"top":85,"angle":90,"sticker_id":"4f86fd32e77989117e000001","left":164});
        window.bdub.gamestate = 1;
        window.bdub.placeStickers(window.bdub.seg);
      }
      else if(window.bdub.gamestate === 1) {
        // Update Inputs and Views
        // --------------------------------------------------
        var keycode = bdub.cache.keyCode;
        if (
          keycode[0] == 37 && keycode[1] == 39 || 
          keycode[0] == 39 && keycode[1] == 37 || 
          keycode[0] == 38 && keycode[1] == 40 || 
          keycode[0] == 40 && keycode[1] == 38
        ) {
          bdub.cache.keyCode[1] = bdub.cache.keyCode[0];
        }

        keycode = bdub.cache.keyCode[1];
        // SET THE NEW SNAKE HEAD POSITION, based on direction pressed
        if (keycode == 39) { // RIGHT
          var newLeft = window.bdub.seg[0].left + 62;
          if(newLeft > 435) newLeft = window.bdub.leftNums[0];
          var newTop = window.bdub.seg[0].top;            
        }
        else if (keycode == 40) { // DOWN
          var newLeft = window.bdub.seg[0].left;
          var newTop = window.bdub.seg[0].top + 62;
          if(newTop > 248) newTop = window.bdub.topNums[0];
        } 
        else if (keycode == 38) { // UP
          var newLeft = window.bdub.seg[0].left;
          var newTop = window.bdub.seg[0].top - 62;
          if(newTop < 0) newTop = window.bdub.topNums[window.bdub.topNums.length - 1];
        } 
        else if (keycode == 37) { // LEFT
          var newLeft = window.bdub.seg[0].left - 62;
          if(newLeft < 0) newLeft = window.bdub.leftNums[window.bdub.leftNums.length - 1];
          var newTop = window.bdub.seg[0].top;             
        }
        
        window.bdub.seg.pop(); // Remove wall
        window.bdub.seg.pop(); // Remove wall
        window.bdub.seg.pop(); // Remove wall
        window.bdub.seg.pop(); // Remove wall
        var tempCherry = window.bdub.seg.pop(); // Remove cherry
        var tempTail = window.bdub.seg.pop(); // Remove tail
        
        // check if snake has slithered into itself (before we add the wall segs, and snake head)
        if( window.bdub.isCollision({"top":newTop,"left":newLeft}, window.bdub.seg) )
          window.bdub.gamestate = 2; // Game over

        window.bdub.seg.splice(0,0,{"top":newTop,"angle": 0,"sticker_id": "4f86fd3ee77989117e000002","left":newLeft});

        // check if snake has eaten a cherry (before we add the wall segs, and snake head)
        if( newTop === window.bdub.fakeCherries[window.bdub.cherry].top && newLeft === window.bdub.fakeCherries[window.bdub.cherry].left ) {
          window.bdub.cherryCnt++;
          // ADD random cherry
          do {
            window.bdub.cherry = Math.floor(Math.random() * window.bdub.cherries.length);
          } while( window.bdub.isCollision(window.bdub.fakeCherries[window.bdub.cherry], window.bdub.seg) )
          window.bdub.seg.push(window.bdub.cherries[window.bdub.cherry]);
          window.bdub.seg.splice(window.bdub.seg.length-1,0,tempTail); // replace tail so snake grows
        }
        else {
          window.bdub.seg.push(tempCherry);
        }

        // ADD wall segs back in
        window.bdub.seg.push({"top":163,"angle":90,"sticker_id":"4f86fd32e77989117e000001","left":225});
        window.bdub.seg.push({"top":163,"angle":90,"sticker_id":"4f86fd32e77989117e000001","left":164});
        window.bdub.seg.push({"top":85,"angle":90,"sticker_id":"4f86fd32e77989117e000001","left":225});
        window.bdub.seg.push({"top":85,"angle":90,"sticker_id":"4f86fd32e77989117e000001","left":164});
                     
        console.log("TEST WALL");
        // check if snake has slithered into a wall obstacle (use fakeWall array for better matching)
        if( window.bdub.isCollision(window.bdub.seg[0], window.bdub.fakeWall1) )
          window.bdub.gamestate = 2; // Game over

        if(window.bdub.gamestate === 2) {
          // Game Over
          // --------------------------------------------------
          console.log("GAME OVER");
          window.bdub.resetSnake();
          //window.bdub.placeStickers(window.bdub.placements9); // Remove stickers
          console.log("RAND PIXEL");
          window.bdub.randPixels(); // Call randPixel 3 times - should kinda look like an explosion
          setTimeout(function() { window.bdub.randPixels(); }, 1000);
          setTimeout(function() { window.bdub.randPixels(); }, 2000);
          setTimeout(function() { 
            window.bdub.placeStickers(window.bdub.loser); // Place loser graphics
          }, 3000); // Delay it 3 seconds so the randPixels() has time to sink in
          window.bdub.pm("Sorry, you died. Let someone else have a turn and try again later.", window.bdub.curPlayer.userid);
          if(window.bdub.speakGame) window.bdub.speak("Sorry @"+window.bdub.curPlayer.name+", you died. Let someone else have a turn and try again later.");
          window.bdub.curPlayer = {"name":"joe blow","userid":null,"start":0,"end":0,"time":0,"moves":0};
          window.bdub.gamestate = 0; // Reset
        }
        else if(window.bdub.cherryCnt >= 13) {
          console.log("GAME WON!");
          window.bdub.resetSnake();
          window.bdub.placeStickers(window.bdub.winner); // Place winner graphics
          window.bdub.curPlayer.end = Date.now();
          console.log("[ TIME 1 ] ");
          window.bdub.curPlayer.time = window.bdub.curPlayer.end - window.bdub.curPlayer.start;
          //console.log("[ ADD ] : "+JSON.stringify(window.bdub.curPlayer,null,' '));
          var addUser = true; // assume they need to be added, unless they are already in there with a better time
          if(window.bdub.winners.length) {
            var length = window.bdub.winners.length; // snapshot this so it doesn't grow as we splice in elements :S
            for(var i = 0; i < length; i++) {
              // Is user already in the winners list?
              if( window.bdub.curPlayer.userid == window.bdub.winners[i].userid ) {
                // Remove their old time if new time is less than old time
                console.log("[ TIME 2 ] ");
                if( window.bdub.curPlayer.time < window.bdub.winners[i].time ) {
                  window.bdub.winners.splice(i,1); // remove old time
                  console.log("[ REMOVED ] : "+window.bdub.curPlayer.name);
                }               
                else {
                  addUser = false;
                  console.log("[ LONGER ] : "+window.bdub.curPlayer.name);
                }
                break;
              }
            }
            if(addUser) {
              if(window.bdub.winners.length) {
                var length = window.bdub.winners.length; // snapshot this so it doesn't grow as we splice in elements :S
                for(var i = 0; i < length; i++) {
                  console.log("[ TIME 3 ] ");
                  if( window.bdub.curPlayer.time < window.bdub.winners[i].time )  {
                    console.log("[ SPLICED ] : "+window.bdub.curPlayer.time+" "+window.bdub.winners[i].time+" "+i+" "+window.bdub.winners.length);
                    window.bdub.winners.splice(i,0,window.bdub.curPlayer);                
                    break;
                  }
                }
                if( i == length ) { // if curPlayer has the largest time
                  window.bdub.winners.push(window.bdub.curPlayer); // push this onto the end
                }
              }
              else {
                window.bdub.winners.push(window.bdub.curPlayer);
                console.log("[ NEW ] : "+window.bdub.winners.length);
              }
            }
          }
          else {
            window.bdub.winners.push(window.bdub.curPlayer);
            console.log("[ NEW ] : "+window.bdub.winners.length);
          }
          console.log("[ WIN ] : "+JSON.stringify(window.bdub.winners));
          window.bdub.minutes = Math.floor(window.bdub.curPlayer.time / 60000);
          window.bdub.seconds = (window.bdub.curPlayer.time % 60000 ) / 1000;
          if(window.bdub.seconds<10) window.bdub.seconds = "0"+window.bdub.seconds.toString();
          window.bdub.pm("Congrats you finished the game with a time of "+window.bdub.minutes+":"+window.bdub.seconds+" in "+window.bdub.curPlayer.moves+" moves.", window.bdub.curPlayer.userid);
          if(window.bdub.speakGame) window.bdub.speak("Congrats @"+window.bdub.curPlayer.name+", you finished the game with a time of "+window.bdub.minutes+":"+window.bdub.seconds+" in "+window.bdub.curPlayer.moves+" moves.");
          window.bdub.curPlayer = {"name":"joe blow","userid":null,"start":0,"end":0,"time":0,"moves":0};
          window.bdub.gamestate = 0; // Reset
          console.log(JSON.stringify(window.bdub.winners,null,' '));
        }
        else {
          window.bdub.placeStickers(window.bdub.seg);
        }
      }

    },
    resetSnake: function() {
      if(window.bdub.snakeTimer) { clearInterval(window.bdub.snakeTimer); window.bdub.snakeTimer = null; }
    },
    //check if array a value
    contains: function(sArray, sElement) { // check if sElement is in sArray
      var i = sArray.length;
      while (i--) {
        if (sArray[i] == sElement) {
            return true;
        }
      }
      return false;
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
      if(d.command == 'registered') { 
        //A new user just joined the room, add them to the user list
        for(var i=0; i < d.user.length; i++) {
          window.bdub.usersList[d.user[i].userid] = d.user[i];
          console.log("[ REGISTERED ] : " + d.user[i].name +" "+ d.user[i].userid);
        }
      }
      else if(d.command == 'deregistered') { 
        //Someone left the room, remove them from the user list
        console.log("[ DE-REGISTERED ] : " + d.user[i].name +" "+ d.user[i].userid);
        delete window.bdub.usersList[d.userid];
      }
      //
      //  .d8888b.  8888888b.  8888888888        d8888 888    d8P  
      // d88P  Y88b 888   Y88b 888              d88888 888   d8P   
      // Y88b.      888    888 888             d88P888 888  d8P    
      //  "Y888b.   888   d88P 8888888        d88P 888 888d88K     
      //     "Y88b. 8888888P"  888           d88P  888 8888888b    
      //       "888 888        888          d88P   888 888  Y88b   
      // Y88b  d88P 888        888         d8888888888 888   Y88b  
      //  "Y8888P"  888        8888888888 d88P     888 888    Y88b 
      //
      else if(d.command === 'speak') {
        //Respond to the things said in the chat
        d.text = d.text.trim(); //Get rid of any surrounding whitespace
     
        if (d.text.match(/^play$/i) && (d.userid === window.turntable.user.id)) { // START SNAKE GAME
          // Only for admin
          if(window.bdub.usersList[d.userid] === undefined) {
            window.bdub.pm("Don't you think you need to be in the room to play the game? :-P",d.userid);
            return;
          }
          if(!window.bdub.curPlayer.userid) {
            window.bdub.curPlayer = {"name":window.bdub.usersList[d.userid].name,"userid":d.userid,"start":Date.now(),"end":0,"time":0,"moves":0};
            if(window.bdub.speakGame) window.bdub.speak("@"+window.bdub.curPlayer.name+", started playing a game of Snake on B^Dub's laptop.");
            window.bdub.cache.keyCode[0] = 0;
            window.bdub.cache.keyCode[1] = 37; // Go left by default
            setTimeout( function() { window.bdub.snakeTimer = setInterval(window.bdub.snakeGame, 1000); },5000);
          }
          else {
            window.bdub.pm("Please try again after "+window.bdub.curPlayer.name+" is done playing.",d.userid);
            if(window.bdub.speakGame) window.bdub.speak("@"+window.bdub.usersList[d.userid].name+", please try again after "+window.bdub.curPlayer.name+" is done playing.");
          }
        }

      }
      else if(d.command === 'pmmed') {
        d.text = d.text.trim(); //Get rid of any surrounding whitespace
        if (d.text.match(/^w$/i) && window.bdub.curPlayer.userid === d.senderid) { // UP
          window.bdub.cache.keyCode[0] = 0;
          window.bdub.cache.keyCode[1] = 38;
          window.bdub.curPlayer.moves = window.bdub.curPlayer.moves + 1;
        } // End Up
        else if (d.text.match(/^s$/i) && window.bdub.curPlayer.userid === d.senderid) { // DOWN
          window.bdub.cache.keyCode[0] = 0;
          window.bdub.cache.keyCode[1] = 40;
          window.bdub.curPlayer.moves = window.bdub.curPlayer.moves + 1;
        } // End Down
        else if (d.text.match(/^a$/i) && window.bdub.curPlayer.userid === d.senderid) { // LEFT
          window.bdub.cache.keyCode[0] = 0;
          window.bdub.cache.keyCode[1] = 37;
          window.bdub.curPlayer.moves = window.bdub.curPlayer.moves + 1;
        } // End Left
        else if (d.text.match(/^d$/i) && window.bdub.curPlayer.userid === d.senderid) { // RIGHT
          window.bdub.cache.keyCode[0] = 0;
          window.bdub.cache.keyCode[1] = 39;
          window.bdub.curPlayer.moves = window.bdub.curPlayer.moves + 1;
        } // End Right
        else if (d.text.match(/^snake$/i) ) { // SNAKE GAME INSTRUCTIONS
          window.bdub.pm("Welcome to B^Dub's Snake game! Object of the game is to control your snake and eat all 13 cherries. If you hit the orange wall or wrap onto yourself you will die. You can go through the borders of the laptop, and pop out on the other side. Type 'a','w','s' or 'd' and press ENTER in the PM window to control the snake. 'a'=left 'w'=up 's'=down 'd'=right. Left hand on AWSD keys and right hand on ENTER key, watch B^Dub's laptop! Type \"stats\" to see current leaders. Ready? Type \"play\" and press ENTER to start the game! Confused? Watch this http://bit.ly/playsnake",d.senderid);
        } // End snake
        else if (d.text.match(/^play$/i) ) { // START SNAKE GAME
          //Whoever is first, grabs a seat and starts the game
          if(window.bdub.usersList[d.senderid] === undefined) {
            window.bdub.pm("Don't you think you need to be in the room to play the game? :-P",d.senderid);
            return;
          }
          if(!window.bdub.curPlayer.userid) {
            window.bdub.curPlayer = {"name":window.bdub.usersList[d.senderid].name,"userid":d.senderid,"start":Date.now(),"end":0,"time":0,"moves":0};
            if(window.bdub.speakGame) window.bdub.speak("@"+window.bdub.curPlayer.name+", started playing a game of Snake on B^Dub's laptop.");
            window.bdub.cache.keyCode[0] = 0;
            window.bdub.cache.keyCode[1] = 37; // Go left by default
            setTimeout( function() { window.bdub.snakeTimer = setInterval(window.bdub.snakeGame, 1000); },5000);
          }
          else {
            window.bdub.pm("Please try again after "+window.bdub.curPlayer.name+" is done playing.",d.senderid);
            if(window.bdub.speakGame) window.bdub.speak("@"+window.bdub.usersList[d.senderid].name+", please try again after "+window.bdub.curPlayer.name+" is done playing.");
          }
        } // End play
        else if (d.text.match(/^stats$/i) ) { // SNAKE GAME INSTRUCTIONS
          var digit = [':zero:',':one:',':two:',':three:',':four:',':five:',':six:',':seven:',':eight:',':nine:',':one::zero:'];
          var tempstr = '';
          var length = window.bdub.winners.length;
          if(length > 10) length = 10;
          tempstr = "Leaders: ";
          for(var i=0; i < length; i++) {
            window.bdub.minutes = Math.floor(window.bdub.winners[i].time / 60000);
            window.bdub.seconds = (window.bdub.winners[i].time % 60000 ) / 1000;
            if(window.bdub.seconds<10) window.bdub.seconds = "0"+window.bdub.seconds.toString();
            tempstr += digit[i+1]+" ";
            tempstr += window.bdub.winners[i].name+" "+window.bdub.minutes+":"+window.bdub.seconds+" ";
          }
          window.bdub.pm(tempstr,d.senderid);
        } // End stats
      }
    },
    init: function() {
      $('.roomView').ready(function() {
        window.bdub.ttObj = window.turntable.buddyList.room;
        if(window.bdub.ttObj === null) {
          alert('Could not find turntable.fm objects. You should refresh your page and try again.');
          return;
        }
        turntable.addEventListener("message", window.bdub.listener);

        window.bdub.offMessage =          $('<div id="off-message">B^Dub\'s Snake Game. <span style="font-style: italic;"></span> <a href="#" style="text-decoration: none; color: #00F0FF; font-weight: bold;">Turn off</a></div>');
        window.bdub.offMessage.css({      position: 'absolute', color: '#ADADAD', top: '-1px', zIndex: '5000', textAlign: 'left', paddingLeft: '100px', paddingTop: '30px', paddingRight: '2px', paddingBottom: '2px', fontSize: '10px', fontFace: 'Verdana'});
        $('div.header-content').append(window.bdub.offMessage);
        window.bdub.offMessage.find('a').click(function(msg1) {
          msg1.preventDefault();
          window.bdub.destruct();
          window.turntable.removeEventListener("message", window.bdub.listener);
          window.bdub = null;
        });

        // Timer for resetting Turntable's AFK Timers
        // Runs every 60 seconds
        window.bdub.botResetAFKTimer = setInterval(function() {
          $(window).focus();
        }, 60000);

        // listen for key press, store keycode
        bdub.cache.keyCode = [0,0];
        document.onkeydown = function(e){
          keycode = (e == null) ? event.keyCode : e.which;
          switch(keycode) {         
            case 37 : 
            case 38 : 
            case 39 : 
            case 40 :
              window.bdub.curPlayer.moves = window.bdub.curPlayer.moves + 1;
              // preventing default event behaviour causes issues with IE
              !$.browser.msie && e.preventDefault(); 
              bdub.cache.keyCode[0] = bdub.cache.keyCode[1]; 
              bdub.cache.keyCode[1] = keycode;         
              break;
            default : break;
          }
        };  

        // Init some variables
        window.bdub.roomInfo(false, function(data) { 
           for(var y=0; y<data.users.length; y++) { //Grab this DJ's points and name, this is very inefficient
            window.bdub.usersList[data.users[y].userid] = data.users[y]; // Store all users in the room
          }
        }); //End roomInfo()

      });
    },
    destruct: function() {
      clearInterval(window.bdub.botResetAFKTimer);
      window.bdub.offMessage.remove();
    }
  });
  
  window.bdub.init();
  
});