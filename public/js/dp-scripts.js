var countHappy = 0;
var countSad = 0;

function countEmotions(object){
	for (var i = 0; i < object.length; i++) {
		cEmotion = object[i].doc.emotion;
		if (cEmotion === 'happy') {
			countHappy += 1;
		} else if (cEmotion === 'sad') {
			countSad += 1;
		}
	}

	console.log("Happy: " + countHappy);
	console.log("Sad: " + countSad);

	$('#happy-val').html(countHappy);
	$('#happy-val').css({
		"font-size": "20vmin",
		"color": "green"
		});

	$('#sad-val').html(countSad);
	$('#sad-val').css({
		"font-size": "20vmin",
		"color": "red"
		});
}

function getAllData(){
	$.ajax({
		url: '/api/all',
		type: 'GET',
		dataType: 'json',
		error: function(data){
			console.log(data);
			alert("Oh No! Try a refresh?");
		},
		success: function(data){
			console.log("We have data");
			console.log(data);

			countEmotions(data);

		}
	});
}

var audioFile_dp = document.getElementById('audio-file-dp');
audioFile_dp.loop = true;

$(document).ready(function(){
	if (page === 'good to go!') {

		audioFile_dp.play();

		getAllData();

		$('body').fadeIn(2000);

		$("#one").fadeIn(1500).delay(2000).fadeOut(1500, function(){
			$("#two").fadeIn(1500).delay(2000).fadeOut(1500, function(){
				$("#three").fadeIn(1500).delay(2000).fadeOut(1500, function(){
					$("#four").fadeIn(1500).delay(2000).fadeOut(1500, function(){
						$("#five").fadeIn(1500).delay(3000).fadeOut(1500, function(){
							init();
							animate();
							$('#q').fadeIn(1000);
							$('#info-page').fadeIn(1000);
						});
					});
				});
			});
		});

	}

	// $('#q-mark').on('click', function(event){
	// 	$('html, body').animate({
	// 		scrollTop: $()
	// 	})
	// }))
});
