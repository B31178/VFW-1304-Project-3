// Travis Pochintesta
// VFW 1304
// Project 2
// main.js

/* Wait for DOM */
window.addEventListener("DOMContentLoaded", function() {

/* Create Variables */

	var genderType = "Unknown";
	var radios = [$("male"), $("female")]
	
	var titleList = ["--Choose A Title--", "Mr.", "Ms.", "Mrs.", "Dr.", "Sir"];
	
	var friendCheck = "no";
	var familyCheck = "no";
	var schoolCheck = "no";
	var workCheck = "no";
	var acquaintanceCheck = "no";
	
	var storeContact = $("submit");
	var displayContact = $("displayContact");
	var clearContacts = $("clearContacts");

/* Declare Functions */

	// Get Element from HTML
	function $(x){
		var selectElement = document.getElementById(x);
		return selectElement;
	}
	
	// Get Radio Value
	function whichRadio(){
		var radioButtons = document.forms[0].gender;
		for(i=0; i<radios.length; i++){
			if(radios[i].checked){
				genderType = radios[i].value;
			}
		}
	}
	
	// Get Checkbox Value
	function isFriend(){
		if($("catFriend").checked){
			friendCheck = $("catFriend").value;
		}else{
			friendCheck = "N/A"
		}
	}
	function isFamily(){
		if($("catFamily").checked){
			familyCheck = $("catFamily").value;
		}else{
			familyCheck = "N/A"
		}
	}
	function isSchool(){
		if($("catSchool").checked){
			schoolCheck = $("catSchool").value;
		}else{
			schoolCheck = "N/A"
		}
	}
	function isWork(){
		if($("catWork").checked){
			workCheck = $("catWork").value;
		}else{
			workCheck = "N/A"
		}
	}
	function isAcquaintance(){
		if($("catAcquaintance").checked){
			acquaintanceCheck = $("catAcquaintance").value;
		}else{
			acquaintanceCheck = "N/A"
		}
	}
	
	// Toggle Contact Input/Storage Display	
	function toggleDisplay(t){
		switch(t){
			case "on":
				$("critterForm").style.display = "none";
				$("clearContacts").style.display = "inline";
				$("displayContact").style.display = "none";
				$("addNew").style.display = "inline";
				break;
			case "off":
				$("critterForm").style.display = "block";
				$("clearContacts").style.display = "inline";
				$("displayContact").style.display = "inline";
				$("addNew").style.display = "none";
				$("items").style.display = "none";
				break;
			default:
				return false;
		}	
	} 
	
/* Create Titles */

	function makeTitles(){
		var targetForm = document.getElementsByTagName("form");
		var selectLi = $("title");
		var makeTitleList = document.createElement("select");
			makeTitleList.setAttribute("id", "titles");
		for(var i=0, j=titleList.length; i<j; i++){
			var makeTitle = document.createElement("option");
			var titleText = titleList[i];
				makeTitle.setAttribute("value", titleText);
				makeTitle.innerHTML = titleText;
				makeTitleList.appendChild(makeTitle);
		}
		selectLi.appendChild(makeTitleList);
	}
	
	makeTitles();
	
/* Collect Form Values */

	function saveData(){
		var key				= Math.floor(Math.random()*10000001); /* What if the same # is randomly generated twice?  Should I buy a lotto ticket? */
		whichRadio();
		isFriend();
		isFamily();
		isSchool();
		isWork();
		isAcquaintance();
		var contact					= {};
			contact.fname			= ["First Name:", $("fname").value];
			contact.lname			= ["Last Name:", $("lname").value];
			contact.phone			= ["Phone:", $("phone").value];
			contact.address			= ["Address:", $("address").value];
			contact.email			= ["Email:", $("email").value];			
		 	contact.gender			= ["Gender:", genderType];
			contact.title			= ["Title:", $("titles").value];
			contact.friend			= ["Friend", friendCheck];
			contact.family			= ["Family", familyCheck];
			contact.school			= ["School", schoolCheck];
			contact.work			= ["Work", workCheck];
			contact.acquaintance	= ["Acquaintance", acquaintanceCheck];
			contact.birthday		= ["Birthday:", $("birthday").value];
			contact.bestyrating		= ["Besty Rating:", $("bestyrating").value];
			contact.notes			= ["Notes:", $("notes").value];
		
		localStorage.setItem(key, JSON.stringify(contact));
		alert("Critter Captured!");
	}
	
/* Display Contact */
	
	function getContact(){
		toggleDisplay("on");
		if(localStorage.length === 0){
			alert("No critters captured yet.");
		}
		var makeContactList = document.createElement("div");
		makeContactList.setAttribute("id", "items");
		var makeContact = document.createElement("ul");
		makeContactList.appendChild(makeContact);
		document.body.appendChild(makeContactList);
		$("items").style.display = "block";
		for(var i=0, len=localStorage.length; i<len; i++){
			var addContact = document.createElement("li");
			makeContact.appendChild(addContact);
			var key = localStorage.key(i);
			var props = localStorage.getItem(key);
			var contact = JSON.parse(props);
			var addProperties = document.createElement("li");
			addContact.appendChild(addProperties);
			for(var a in contact){
				var addSubProp = document.createElement("li");
				addProperties.appendChild(addSubProp);
				var optSubText = contact[a][0]+" "+contact[a][1]; // ?
				addSubProp.innerHTML = optSubText;
			}
		}
	}
	
/* Clear Local Storage */

	function clearStorage(){
		if(localStorage.length === 0){
		alert("Nothing to clear.")
	}else{
		localStorage.clear();
		alert("Critters Released!");
		window.location.reload();
		return false; // ?
		}
	}

/* Main Code */	
	
	storeContact.addEventListener("click", saveData);
	
	displayContact.addEventListener("click", getContact);
	
	clearContacts.addEventListener("click", clearStorage);
		
});
