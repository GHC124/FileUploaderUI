// create the main module
$(function() {
	Authenticator.isValid(successHandler, errorHandler);	
});

var page = new MainPage();
page.init();

function successHandler(response) {
	if (response.status == 0) {
		page.setLogin(true);
		page.setCurrentPage(Constants.PAGES.HOME_PAGE);
	} else {
		page.setLogin(false);
	}
};

function errorHandler(error) {
	page.loginPage.init();
};