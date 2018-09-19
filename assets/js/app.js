$(document).ready(function() {
  $("#fullpage").fullpage({
    //options here
    autoScrolling: true,
    scrollHorizontally: true,
    afterRender: function() {
      $("#header").css("opacity", 0);
    },
    // afterLoad: function(index, nextIndex) {
    //   if (index !== 0) {
    //     $("#header").css("opacity", 1);
    //   } else if (index === 0) {
    //     $("#header").css("opacity", 0);
    //   }
    // }
    onLeave: function(index, nextIndex, direction) {
      if (index === 0) {
        $("#header").css("opacity", 0);
      } else {
        $("#header").css("opacity", 1);
      }
    }
  });

  //methods
  $.fn.fullpage.setAllowScrolling(false);

  var audio = $("audio")[0];

  $("#play-pause").on("click", function() {
    if (audio.paused) {
      audio.play();
      $("#play-pause").text("Pause");
    } else {
      audio.pause();
      $("#play-pause").text("Listen");
    }
  });

  var length = audio.duration;
  var current_time = audio.currentTime;
  audio.onTimeUpdate = function() {
    $("#progress").css("width", (current_time / length) * 100 + "%");
  };

  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
    } else {
      $("#header").hide();
    }
  });
});
