function HomePage() {
	
};

HomePage.prototype.init = function() {
	log('init: HomePage');
	$.get("views/home/HomePage.html", function(htmlText){
		// Append to main container
		$(Constants.MAIN_CONTENT).html(htmlText);
	});
};