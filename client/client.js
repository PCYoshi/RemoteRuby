// Generated by CoffeeScript 1.4.0
(function() {
  var RR_AppendText, RR_BindEventListener, RR_LoadJQuerry, RR_Main, RR_RunEvent, RR_StdinEvent, RR_StopEvent, socket;

  socket = void 0;

  RR_Main = function() {
    console.log("jQuerry loaded");
    socket = io.connect('http://localhost:8080');
    RR_BindEventListener();
    socket.on('stdout', function(output) {
      return RR_AppendText(output);
    });
    socket.on('stderr', function(output) {
      return RR_AppendText(output);
    });
    return socket.on('terminated', function(message) {
      return RR_AppendText(message, true);
    });
  };

  RR_LoadJQuerry = function() {
    var headTag, jqTag;
    headTag = document.getElementsByTagName("head")[0];
    jqTag = document.createElement('script');
    jqTag.type = 'text/javascript';
    jqTag.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js';
    jqTag.onload = function() {
      return $(RR_Main);
    };
    return headTag.appendChild(jqTag);
  };

  if (typeof jQuery === 'undefined') {
    RR_LoadJQuerry();
  } else {
    $(RR_Main);
  }

  RR_AppendText = function(txt, newline) {
    var msg;
    msg = $('.RR_Stdout').html() + txt;
    if (newline === true) {
      msg += '\n';
    }
    $('.RR_Stdout').html(msg);
    return $('.RR_Stdin').val("");
  };

  RR_BindEventListener = function() {
    $('.RR_RunButton').click(RR_RunEvent);
    $('.RR_StopButton').click(RR_StopEvent);
    $('.RR_Stdin').keydown(function(e) {
      if (e.keyCode === 13) {
        RR_StdinEvent();
        return RR_AppendText($('.RR_Stdin').val(), true);
      }
    });
    return $('.RR_ClearButton').click(function() {
      return $('.RR_Stdout').html('');
    });
  };

  RR_RunEvent = function() {
    return socket.emit('run', $('.RR_RubyCode').text());
  };

  RR_StopEvent = function() {
    return socket.emit('stop');
  };

  RR_StdinEvent = function() {
    return socket.emit('stdin', $('.RR_Stdin').val());
  };

}).call(this);
