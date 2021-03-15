//Function that determines whether or not
function is_success(){}

//Function that generates the applicable key and inters into the webpage
function generate_key(){

	//Generate a localStorage value for counter if one is not already created
	//Get the value of counter if it does not exist
	chrome.storage.sync.get(['counter'], function(counter) {
		console.log("Counter is currently: " + counter.counter)
		if(isNaN(counter.counter) || counter.counter === null){
			console.log("IS NaN")
			chrome.storage.sync.set({'counter': '0'}, function() {
	      		console.log('Settings saved for counter');
	    	});
		}
	});

	//Retrieve the value of secret from localStorage, set it if it doesn't exist (will be changed later)
	chrome.storage.sync.set({'secret': ''}, function() {
	    console.log('Settings saved for secret');
	});
	

	//Retrieve secret key andset it to a global variable
	chrome.storage.sync.get("secret", function(secret) {
		console.log("Going in: " + secret.secret);
		window.otp = OTP({secret: secret.secret});
	});

	//Retrieve counter and generate access key, set access key to global variable
	chrome.storage.sync.get("counter", function(counter) {
		console.log("Going in: " + counter.counter);
		window.key = otp.hotp(counter.counter);
	});
	
	//Fill in passcode field
	var passcode_input = document.getElementsByClassName("passcode-input")[0];
	if(window.key != undefined){passcode_input.value = window.key;}
	//document.getElementById("passcode").click();

	//Increment the value of counter within chrome storage
	chrome.storage.sync.get("counter", function(counter) {

		//Get the next value of counter
		var nextInt = (parseInt(counter.counter) + 1); 

		chrome.storage.sync.set({'counter': nextInt}, function() {
	  		console.log('Counter Incremented to ' + counter.counter);
	    });

	});

	//Close the window in 10 seconds
	function close(){window.close();}
	setTimeout(close, 2500);
}


function duo_login(){
	//Click passcode button
	document.getElementById("passcode").click();

	//Check remember me radio button
	document.getElementsByName("dampen_choice")[0].checked = true;

	//Generate key
	generate_key();

}

//Open Iframe tab if available
if(document.getElementById("duo_iframe") != null){

	//Get the source attribute from the iframe object
	var acc_url = document.getElementById("duo_iframe").getAttribute("src");

	//Function to refresh page
	function refresh_page(){
		window.location.reload();
	}

	//Only refresh the page if it has not been previosly refreshed
	if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
  		console.info( "This page is reloaded" );
	}else{

		//Open window (by sending message to background.js) and refresh if not reloaded
		//window.open(acc_url);
		var left = (screen.width/2);
  		var top = (screen.height/2);
		window.open(acc_url,'popUpWindow','height=1,width=1,left=10000,top=10000,resizable=no,scrollbars=no,toolbar=no,menubar=no,location=no,directories=no, status=no, visible=none');

		//chrome.runtime.sendMessage({url: acc_url, index: tab.index});
		setTimeout(refresh_page, 5000);

	}
}

window.onload = function(){
	setTimeout(onClickSet, 1500);
	function onClickSet(){

		//If on duo login page
		if(document.getElementById("passcode") != null){
			duo_login();
		}
					
		setTimeout(onClickSet, 1500);

	}
	onClickSet();
};
