function saveData(obj){
	$.ajax({
		url: '/save',
		type: 'POST',
		contentType: 'application/json',
		data: JSON.stringify(obj),
		error: function(resp){
			console.log("Oh no...");
			console.log(resp);
		},
		success: function(resp){
			console.log('WooHoo!');
			console.log(resp);
			var htmlString = '<li>' + obj.user + ' : ' + obj.word + '</li>';
			$('ol').append(htmlString);
		}
	});
}

$(document).ready(function(){

	$('#happy-button').click(function(){
		var userEmotion = "happy";
			var timeStamp = new Date();
			//Create data object to be saved
			var data = {
				emotion: userEmotion,
				date: timeStamp
		};
		console.log(data);
		saveData(data);
		$("#header2").fadeOut(1500);
		$("#header3").fadeIn(1500);
	});

	$('#sad-button').click(function(){
		var userEmotion = "sad";
			var timeStamp = new Date();
			//Create data object to be saved
			var data = {
				emotion: userEmotion,
				date: timeStamp
		};
		console.log(data);
		saveData(data);
		$("#header2").fadeOut(1500);
		$("#header3").fadeIn(1500);
	});

	$("#header").fadeIn(3000).delay(1000).fadeOut(1500, function(){
		$("#header2").fadeIn(1500);
	});
	
});