
/***************************Kamera*************************************/
function enableCamera() {
	var video = document.querySelector("#video");

	// Ensure cross-browser functionality.
	navigator.mediaDevices.getUserMedia({ video: true, audio: true })
		.then(stream => video.srcObject = stream)
		.catch(e => document.querySelector('#camera').innerHTML = "<p>Sie haben den Zugriff auf die Kamera blockiert.</p>");
}
  
  
// Trigger photo take
document.getElementById("snap").addEventListener("click", function() {
	document.querySelector('#noPic').innerHTML = "<canvas id='canvas' width='640' height='480'></canvas>";
	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');
	var video = document.getElementById('video');
	var city = document.getElementById('p_city').innerHTML;
	context.drawImage(video, 0, 0, 640, 480);
	context.font = "bold 60px Arial";
	context.textAlign = "right";
	context.fillStyle = "#fff";
	context.strokeStyle = "#506070";
	context.lineWidth = 2;
	context.fillText(city, 600, 420);
	context.strokeText(city, 600, 420); 
});





/*************************Location******************************************/


var x = document.getElementById("p_geoloc");
var y = document.getElementById("p_city");

function getLocation() {
	var options = {
        enableHighAccuracy: true,
    };
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError, options);
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    x.innerHTML = "Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude;
	requestApi(position);
}

function requestApi(position){
	var request = new XMLHttpRequest();
	var method = 'GET';
    var url = 'https://geocode.xyz/'+position.coords.latitude+','+position.coords.longitude+'?geoit=json';
    var async = true;

    request.open(method, url, async);
	y.innerHTML = "api request sending...";
    request.onreadystatechange = function(){
        if(request.readyState == 4){
			if(request.status == 200) {
				var data = JSON.parse(request.responseText);
				y.innerHTML = data.city;
			} else {
				y.innerHTML = "waiting for api respond...";
				requestApi(position);
			}
		}
    };
    request.send();
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }
}