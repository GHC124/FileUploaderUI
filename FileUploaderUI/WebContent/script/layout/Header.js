function Header() {
	
};

Header.prototype._selectedPage = null;

Header.prototype.init = function(loggedin) {
	log('init: Header');
	var that = this;
	$.get("views/layout/Header.html", function(htmlText){
		$(Constants.HEADER_BAR).html(htmlText);
		if (loggedin) {
			that.initUserControl();
			that.initNavigator();
		} else {
			
		}
	});
};

Header.prototype.initUserControl = function(){
	log('init: UserControl');
	var currentUser = Authenticator.getCurrentUser();
	var headerBarUserControl = $(Constants.HEADER_BAR_USER_CONTROL);
	headerBarUserControl.find('#userControl_userName').text(currentUser.authenUser);
	headerBarUserControl.find('#userControl_logout').click(function(){
		Authenticator.logout();
		page.setLogin(false);
	});	
};

Header.prototype.initNavigator = function(){
	log('init: Navigator');
	var that = this;
	var navigator = $(Constants.HEADER_BAR_NAVIGATOR);
	navigator.find('#navigator_home').click(function(){
		that._selectedPage = Constants.PAGES.HOME_PAGE;
		Authenticator.isValid(function(response){
			that.successHandler(response, that._selectedPage);
		}, that.errorHandler);
	});	
	navigator.find('#navigator_upload').click(function(){
		that._selectedPage = Constants.PAGES.UPLOAD_PAGE;
		Authenticator.isValid(function(response){
			that.successHandler(response, that._selectedPage);
		}, that.errorHandler);
	});
};

Header.prototype.successHandler = function(response, pageId) {
	if (response.status == 0) {
		page.setLogin(true);
		page.setCurrentPage(pageId);
	} else {
		page.setLogin(false);
	}
};

Header.prototype.errorHandler = function(error) {
	page.loginPage.init();
};