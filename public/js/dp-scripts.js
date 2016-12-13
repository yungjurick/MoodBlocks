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

var audio1 = document.getElementById('audio-file');
audio1.loop = true;

$(document).ready(function(){
	if (page === 'good to go!') {

		audio1.play();

		getAllData();

		$('body').fadeIn(3000);

		$("#one").fadeIn(1500).delay(3000).fadeOut(1500, function(){
			$("#two").fadeIn(1500).delay(3000).fadeOut(1500, function(){
				$("#three").fadeIn(1500).delay(3000).fadeOut(1500, function(){
					$("#four").fadeIn(1500).delay(3000).fadeOut(1500, function(){
						$("#five").fadeIn(1500).delay(3000).fadeOut(1500, function(){
							init();
							animate();
						});
					});
				});
			});
		});

	}
});