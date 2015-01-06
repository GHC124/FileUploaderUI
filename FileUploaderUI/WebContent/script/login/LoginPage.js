function LoginPage() {
	
};

LoginPage.prototype.init = function() {
	log('init:LoginPage');
	page._currentPageId = null;
	this.initContent();
	return this;
};

LoginPage.prototype.initContent = function() {	
	var that = this;
	
	$.get("views/login/LoginPage.html", function(htmlText){
		// Append to main container
		$(Constants.BODY).html(htmlText);
		
		// Binding event for login page
		$(Constants.BODY).find("button[type=button]").click(that.login);
	});
};

LoginPage.prototype.successHandler = function(response) {
	if (response.status == 0) {			
		page.setLogin(true);
		page.setCurrentPage(Constants.PAGES.HOME_PAGE);
	} else {
		alert(response.message );
	}
};

LoginPage.prototype.errorHandler = function(error) {
	alert('User not found!');
};

LoginPage.prototype.login = function() {
	var loginArea = $("#frmLogin");
	var authenUser = loginArea.find("input[name=username]").val();
	var password = loginArea.find("input[name=password]").val();
	
	Authenticator.login(authenUser, password, LoginPage.prototype.successHandler, LoginPage.prototype.errorHandler);
};