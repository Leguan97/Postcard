loadImages();

function removeImage(key){
	localStorage.removeItem(key);
	loadImages();
}

function loadImages(){
	document.querySelector('#gallery').innerHTML = "";
	var keys = Object.keys(localStorage);
	var i = keys.length;
	
	while(i--) {
		var currentImage = localStorage.getItem( keys[i] );
		document.querySelector('#gallery').innerHTML = document.querySelector('#gallery').innerHTML.
		concat("<div class='deletable'><img src='' id='" + keys[i] + "'></img>" +
		"<input type='image' class='delete' src='delete.png' alt='delete' onclick='removeImage(" + keys[i] + ")'></div>");
		
		document.getElementById(keys[i]).src = "data:image/png;base64," + currentImage;
	}
}