function Layout() {
	
};

Layout.prototype.init = function() {
	log('init: Layout');
	$.get("views/layout/Layout.html", function(htmlText){
		// Append to main container
		$(Constants.BODY).html(htmlText);
	});
};
