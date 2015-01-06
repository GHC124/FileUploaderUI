/**
 * 
 */

$.urlParam = function(name){
    var results = new RegExp('[\?&amp;]' + name + '=([^&amp;#]*)').exec(window.location.href);
    if (results !== null) {
    	return results[1] || 0;
    } else {
    	return false;
    }
};

function log(message){
	console.log(message);
}