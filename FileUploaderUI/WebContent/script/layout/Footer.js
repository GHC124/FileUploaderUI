function Footer() {
	
};

Footer.prototype.init = function(loggedin) {
	log('init: Footer');
	$.get("views/layout/Footer.html", function(htmlText){
		// Append to main container
		$(Constants.FOOTER_BAR).html(htmlText);
	});
};