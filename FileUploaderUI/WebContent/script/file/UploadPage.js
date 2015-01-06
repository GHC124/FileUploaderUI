function UploadPage() {
	
};

UploadPage.prototype.init = function() {
	log('init: UploadPage');
	$.get("views/file/UploadPage.html", function(htmlText){
		$(Constants.MAIN_CONTENT).html(htmlText);
		
		Transporter.sendGET(Constants.SERVICE_FILE_LIST, null, function(response){
			$.each(response, function (index, file) {
                $("#uploaded-files").append(
                        $('<tr/>')
                        .append($('<td/>').text(file.fileName))
                        .append($('<td/>').text(file.fileSize))
                        .append($('<td/>').text(file.fileType))
                        .append($('<td/>').html("<a href='rest/file/get/"+index+"'>Click</a>"))
                        );
            }); 
		}, function(error){
			log('ERROR get list of file');
		});
		
		$('#fileupload').fileupload({
	        dataType: 'json',
	 
	        done: function (e, data) {
	            $("tr:has(td)").remove();
	            $('#progress .bar').css('width', '0%');
	            $.each(data.result, function (index, file) {
	                $("#uploaded-files").append(
	                        $('<tr/>')
	                        .append($('<td/>').text(file.fileName))
	                        .append($('<td/>').text(file.fileSize))
	                        .append($('<td/>').text(file.fileType))
	                        .append($('<td/>').html("<a href='rest/file/get/"+index+"'>Click</a>"))
	                        );
	            }); 
	        },
	 
	        progressall: function (e, data) {
	            var progress = parseInt(data.loaded / data.total * 100, 10);
	            $('#progress .bar').css(
	                'width',
	                progress + '%'
	            );
	        },
	 
	        dropZone: $('#dropzone')
	    });
	});
};