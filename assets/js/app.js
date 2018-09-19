$(document).ready(function() {
  $("#fullpage").fullpage({
    //options here
    autoScrolling: true,
    scrollHorizontally: true
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
});
