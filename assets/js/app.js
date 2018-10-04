// events ajax to songkick
const songkick = 'io09K9l3ebJxmxe2';
const skQuietCompanyId = '582111';

eventSearch = function () {
	$('#events-div').empty();
	$.ajax({
		url: 'https://api.songkick.com/api/3.0/artists/' + skQuietCompanyId + '/calendar.json?apikey=' + songkick,
		method: 'GET'
	}).then(function (res) {
		console.log(res);
		const result = res['resultsPage']['results']['event'];
		console.log(result);
		console.log(result.length);

		for (i = 0; i < result.length; i++) {
			const displayName = result[i]['venue']['displayName'];
			const location = result[i]['location']['city'];
			const date = result[i]['start']['date'];
			const uri = result[i]['uri'];

			const eventDiv = $("<div class='event-div'>");
			const eventName = $("<span class='event-name'>").html(displayName);
			const eventLocation = $("<span class='event-location'>").html(location);
			const spacer = $("<span class='spacer'>").html(' - ');
			const eventStart = $("<span class='event-start'>").html(date);
			const eventUri = $("<span class='event-uri'>").html('<a href=' + uri + '>Tickets</a>');

			eventDiv.append(
				eventStart,
				// "<span class='spacer'> - </span>",
				eventName,
				// "<span class='spacer'> - </span>",
				eventLocation,
				// spacer,
				eventUri
			);

			$('#events-div').append(eventDiv);
			console.log(`${displayName} - ${location} ${date}, ${uri}`);
		}
	});
};

$(document).ready(function () {
	let filtered = 'false';

	// $('.albums-only').on('click', function(){
	// 	if (filtered ==false) {
	// 		$('.')
	// 	}
	// });

	$('#fullpage').fullpage({
		//options here
		// anchors: [ 'landing', 'shows', 'store', 'about' ],
		autoScrolling: false,

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

	$('.store-carousel').slick({
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
					dots: true
				}
			},
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					infinite: true,
					dots: true
				}
			},
			{
				breakpoint: 700,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});
	//methods
	$.fn.fullpage.setAllowScrolling(true);

	var audio = $('audio')[0];

	$('#play-pause').on('click', function () {
		if (audio.paused) {
			audio.play();
			$('#play-pause').text('Pause');
		} else {
			audio.pause();
			$('#play-pause').text('Listen');
		}
	});

	var length = audio.duration;
	var current_time = audio.currentTime;
	audio.onTimeUpdate = function () {
		$('#progress').css('width', current_time / length * 100 + '%');
	};

	eventSearch();

	// $(window).scroll(function() {
	//   if ($(this).scrollTop() > 100) {
	//   } else {
	//     $("#header").hide();
	//   }
	// });
});