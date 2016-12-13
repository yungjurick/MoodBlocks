function showFunction(id, param) {
	$(id).fadeIn(param);
}

function hideFunction(id, param) {
	$(id).fadeOut(param);
}

$(document).ready(function(){
	if (page === 'good to go!'){
		$("#title").animate({
			opacity: 1
			}, {
			duration: 4000,
			done: function(){
				$("#info").animate({opacity:1}, {duration: 3000}).delay(4000);
				$("#myName").animate({
					opacity: 1
					}, {
					duration: 3000,
					done: function(){
						hideFunction("#header", 2500);
						showFunction("#header2", 2000);
						showFunction(".device-img", 2000);
						$("#header2").animate({
							opacity: 1
							}, {
							duration: 3000,
							});
						$(".device-img").animate({
							opacity: 1
							},{
							duration: 3000
							});
						}
					}
				).delay(4000);
			}
		});

		$("#proceed-button").click(function(event){
			event.preventDefault();

			$('body').fadeOut(1000, function(){
				window.open('/dataPage','_self');
			});
		});
	};
});