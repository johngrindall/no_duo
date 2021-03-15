function register_key(){

	//Select the element and retreive the entered key
	var text_field = document.getElementById("text_field");
	var entered_link = text_feild.value;

	//Begin the registration process to retrieve a key
	var url_host = ("api-" + entered_link.split("/")[2].split("-")[1])
	var url_code = entered_link.split("/")[1][1]

}