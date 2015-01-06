function MainPage() {

};

MainPage.prototype._currentPageId = null;

MainPage.prototype._pages = null;

MainPage.prototype.loggedin = false;

MainPage.prototype.header = new Header();
MainPage.prototype.footer = new Footer();

MainPage.prototype.homePage = new HomePage();
MainPage.prototype.loginPage = new LoginPage();
MainPage.prototype.uploadPage = new UploadPage();

MainPage.prototype.init = function() {
	log('init-MainPage');
	
	this._pages = new Array();	
	this._pages.push(this.homePage);
	this._pages.push(this.uploadPage);
	
	return this;
};

MainPage.prototype.setLogin = function(loggedin) {	
	this.loggedin = loggedin;
		
	if (this.loggedin == false) {
		// show login page
		this.loginPage.init();
	}
	
	return this;
};

MainPage.prototype.setCurrentPage = function(pageId) {
	if (this.loggedin == false) {
		this.loginPage.init();
		return false;
	}
	
	if (this._currentPageId == null) {
		var layout = new Layout();
		layout.init();
	}else if (this._currentPageId == pageId) {
		return false;
	}

	this.header.init(this.loggedin);
	this.footer.init(this.loggedin);
	
	this._currentPageId = pageId;
	
	this._pages[pageId].init();
};