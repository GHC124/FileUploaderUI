/**
 * 
 */

function Transporter() {
	
};

Transporter.sendPOST = function(service, data, successCallback, errorCallback) {
	$.ajax({
		url: Constants.SERVER_HOST + "/" + service,
		data: JSON.stringify(data),
		asyns: false,
		dataType: "json",
		type: "POST",
		contentType: 'application/json',
		success: function (response) {
			if (typeof successCallback !== "undefined") {
				successCallback(response);
			}
		},
		error: function(xhr, statusText, error) {
			if (typeof errorCallback !== "undefined") {
				errorCallback(error);
			}
		}
	});
};

Transporter.sendGET = function(service, data, successCallback, errorCallback) {
	$.ajax({
		url: Constants.SERVER_HOST + "/" + service,
		data: JSON.stringify(data),
		asyns: false,
		dataType: "json",
		type: "GET",
		contentType: 'application/json',
		success: function (response) {
			if (typeof successCallback !== "undefined") {
				successCallback(response);
			}
		},
		error: function(xhr, statusText, error) {
			if (typeof errorCallback !== "undefined") {
				errorCallback(error);
			}
		}
	});
};