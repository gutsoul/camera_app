var destinationType;
document.addEventListener("deviceready",onDeviceReady,false);
function onDeviceReady() {
	destinationType=navigator.camera.DestinationType;
};
function onSuccessDataAndUpload(imageData) {
  var SnapImage = document.getElementById('SnapImage');
  var AdjustImage = document.getElementById('AdjustImage');
  SnapImage.src = imageData;
  AdjustImage.src = imageData;
	
	var d = new Date();
	var filename = d.getTime();	
	var email = document.getElementById('email').value;		
	var uploadOptions = new FileUploadOptions();
	uploadOptions.fileKey = 'file';
	uploadOptions.fileName = filename+'.png';
	uploadOptions.mimeType = 'image/png';
	uploadOptions.params = {email: email};
	
	var fileTransfer = new FileTransfer();
	fileTransfer.upload(imageData, 'http://aseanin.com/android_upload.php', uploadSuccess, uploadFail, uploadOptions);
};

function uploadSuccess(result){
	alert('上傳成功 :D ' + result.bytesSent + 'bytes ' + result.response);
};

function uploadFail(error){
	alert('上傳失敗 :(' + error.code);
};

function onSuccessDataURI(imageData) {
  var SnapImage = document.getElementById('SnapImage');
  var AdjustImage = document.getElementById('AdjustImage');
  SnapImage.src = imageData;
  AdjustImage.src = imageData;
};

function SnapPictureAndSave() {
    navigator.camera.getPicture(onSuccessDataURI, onFail, { 
    	quality: 50,
    	destinationType: destinationType.FILE_URI,
    	encodingType: navigator.camera.EncodingType.JPEG,
    	targetWidth:300, 
    	targetHeight:500, 
    	correctOrientation: true, 
    	saveToPhotoAlbum: true 
    	});
};

function SnapPictureAndUpload() {
	if(document.getElementById('email').value == ''){
		alert('Need Email需要您的伊媚兒');
		return false;
	};
	navigator.camera.getPicture(onSuccessDataAndUpload, onFail, { 
		quality: 50,
		destinationType: destinationType.FILE_URI,
		targetWidth:100, 
		targetHeight:100, 
		});
};

function getPhoto() {
	if(document.getElementById('email').value == ''){
		alert('Need Email需要您的伊媚兒');
		return false;
	};
    navigator.camera.getPicture(onSuccessDataAndUpload, onFail, { 
    	quality: 50,
    	destinationType: destinationType.FILE_URI,
    	sourceType: navigator.camera.PictureSourceType.SAVEDPHOTOALBUM 
    	});
};

function onFail(message) {
  alert('呼叫失敗, 原因(登愣~~~): ' + message);
};

