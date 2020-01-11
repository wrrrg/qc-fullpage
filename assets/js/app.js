// events ajax to songkick
const songkick = "io09K9l3ebJxmxe2";
const skQuietCompanyId = "582111";

eventSearch = function () {
  $("#events-div").empty();
  $.ajax({
    url: "https://api.songkick.com/api/3.0/artists/" +
      skQuietCompanyId +
      "/calendar.json?apikey=" +
      songkick,
    method: "GET"
  }).then(function (res) {
    console.log(res);
    const result = res["resultsPage"]["results"]["event"];
    console.log(result);
    console.log(result.length);

    for (i = 0; i < result.length; i++) {
      const displayName = result[i]["venue"]["displayName"];
      const location = result[i]["location"]["city"];
      const date = result[i]["start"]["date"];
      const uri = result[i]["uri"];

      const eventDiv = $("<div class='event-div'>");
      const eventName = $("<span class='event-name'>").html(displayName);
      const eventLocation = $("<span class='event-location'>").html(location);
      const spacer = $("<span class='spacer'>").html(" - ");
      const eventStart = $("<span class='event-start'>").html(date);
      const eventUri = $("<span class='event-uri'>").html(
        "<a href=" + uri + ">Tickets</a>"
      );

      eventDiv.append(
        eventStart,
        // "<span class='spacer'> - </span>",
        eventName,
        // "<span class='spacer'> - </span>",
        eventLocation,
        // spacer,
        eventUri
      );

      $("#events-div").append(eventDiv);
      console.log(`${displayName} - ${location} ${date}, ${uri}`);
    }
  });
};

eventFromJSON = function () {
  $("#event-list").empty();
  for (i = 0; i < showlist.length; i++) {
    console.log(showlist[i]);

    const venue = showlist[i]["venue"];
    const location = showlist[i]["city"];
    const date = showlist[i]["date"];
    const tickets = showlist[i]["tickets"];
    const facebook = showlist[i]["facebook"];

    const eventName = '<span class="event-name">' + venue + "</span>";
    const eventLocation = $("<span class='event-location'>").html(location);
    console.log(eventName);
    const spacer = $("<span class='spacer'>").html(" - ");
    const eventStart = $("<span class='event-start'>").html(date);

    let eventUri;
    if (showlist[i]["freeShow"]) {
      eventUri = $("<span class='event-uri'>").html(
        "<a href=" + facebook + ">Free</a>"
      );
    } else {
      eventUri = $("<span class='event-uri'>").html(
        "<a href=" + tickets + " target='_blank'>Tickets</a>"
      );
    }
    let eventFB = $("<span class='event-fb'>").html(
      "<a href=" +
      facebook +
      " target='_blank'><i class='fab fa-facebook-f'></i></a>"
    );

    if (showlist[i]["tickets"] === false) {
      // $(eventUri).css({
      //   display: "none"
      // });
      eventURI = $("<span class='event-uri'>").empty();

    }
    if (showlist[i]["facebook"] === false) {
      // $(eventFB).css({
      //   display: "none"
      // });
      eventFB = $("<span class='event-fb'>").empty();
    }

    const eventLi = $("<li class='event-li'>");

    $(eventLi).append(
      eventStart,
      // "<span class='spacer'> - </span>",
      eventName,
      // "<span class='spacer'> - </span>",
      eventLocation,
      // spacer,
      eventUri,
      //
      eventFB
    );
    // console.log(".text()" + eventName)
    // const eventLi = '<li class="event-li">' + eventStart + eventName + eventLocation + eventUri + eventFB + '</li>';
    // console.log(eventLi, eventName, eventLocation, eventStart, eventUri, eventFB);
    $("#event-list").append(eventLi);
  }
};
$(document).ready(function () {
  eventFromJSON();
  let filtered = "false";

  // $('.albums-only').on('click', function(){
  // 	if (filtered ==false) {
  // 		$('.')
  // 	}
  // });

  $("#fullpage").fullpage({
    //options here
    anchors: ['landing', 'shows', 'store', 'about'],
    autoScrolling: false,
    fitToSection: false,

    // scrollHorizontally: true,
    css3: true,
    continuousVertical: false
    // autoScrolling: false
    // afterRender: function() {
    //   $("#header").css("opacity", 0);
    // }
    // afterLoad: function(index, nextIndex) {
    //   if (index !== 0) {
    //     $("#header").css("opacity", 1);
    //   } else if (index === 0) {
    //     $("#header").css("opacity", 0);
    //   }
    // }
    // onLeave: function(index, nextIndex, direction) {
    //   if (index === 0) {
    //     $("#header").css("opacity", 0);
    //   } else {
    //     $("#header").css("opacity", 1);
    //   }
    // }
  });

  $(".store-carousel").slick({
    slidesToShow: 3,
    speed: 300,
    infinite: true,
    dots: true,
    arrows: true,
    adaptiveHeight: true,
    responsive: [{
        breakpoint: 1440,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false
        }
      }
    ]
  });
  //methods
  $.fn.fullpage.setAllowScrolling(true);

  var audio = $("audio")[0];

  $("#play-pause").on("click", function () {
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
  audio.onTimeUpdate = function () {
    $("#progress").css("width", (current_time / length) * 100 + "%");
  };

  //   eventSearch();

  // $(window).scroll(function() {
  //   if ($(this).scrollTop() > 100) {
  //   } else {
  //     $("#header").hide();
  //   }
  // });
});