var navigationVisible = false;

function toggleNavigation(){
	navigationVisible = !navigationVisible;
	if (navigationVisible){
		document.getElementById('navigation').style.width = "auto";
	} else {
		document.getElementById('navigation').style.width = "0rem";
	}
}