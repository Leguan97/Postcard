function saveImage(){
	if (typeof(Storage) !== "undefined") {
		var dataURL = canvas.toDataURL("image/png");
		imgData = dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
		var date = new Date();
		var key = (date.getMonth() + 1).toString() + date.getDate().toString() +date.getTime().toString();
		localStorage.setItem(key, imgData);
		
	} else {
	}
}