function Authenticator() {
	
};

Authenticator.getCurrentUser = function(){
	var authenUser = Cookie.readCookie(Constants.AUTHENUSER);
	var tokenKey = Cookie.readCookie(Constants.TOKENKEY);
	return { 
			authenUser: authenUser,
			tokenKey: tokenKey
			};
};

Authenticator.isValid = function(successCallback, errorCallback) {
	if ((typeof Authenticator.getCurrentUser().authenUser !== "undefined") && (typeof Authenticator.getCurrentUser().tokenKey !== "undefined")) {
		Transporter.sendPOST(Constants.SERVICE_VALIDATE, Authenticator.getCurrentUser(), successCallback, errorCallback);
	} else {
		if (typeof errorCallback !== "undefined") {
			errorCallback('User not login');
			return;
		}
	}
};

Authenticator.login = function(authenUser, password, successCallback, errorCallback) {
	var data = JSON.stringify({ 
		authenUser: authenUser,
		password: password
	});
	
	$.ajax({
		url: Constants.SERVER_HOST + '/' + Constants.SERVICE_LOGIN,
		data: data,
		dataType: 'json',
		type: 'POST',
		contentType: 'application/json',
		success: function (response) {
			if (response.status == 0) {
				Cookie.createCookie(Constants.AUTHENUSER, response.authenUser, 1);
				Cookie.createCookie(Constants.TOKENKEY, response.tokenKey, 1);
				if (typeof successCallback !== "undefined") {
					successCallback(response);
				}
			} else {
				if (typeof errorCallback !== "undefined") {
					errorCallback(response);
				}
			}
		},
		error: function(xhr, statusText, error) {
			if (typeof errorCallback !== "undefined") {
				errorCallback(error);
			}
		}
	});
};

Authenticator.logout = function() {
	Cookie.eraseCookie(Constants.AUTHENUSER);
	Cookie.eraseCookie(Constants.TOKENKEY);
};