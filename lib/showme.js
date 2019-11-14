var jsonData = "";
var memList = [];
// Validator - var selectedMember = "";
// Validator - var mySchedule = [];

getJSON();
buildRoster();

// *******
// Creates html list items
// *******
function createList() {
	var myUL = document.getElementById("myUL");
	for (var i = 0; i < memList.length; i++) {
		// <li><a href="#">Adele</a></li>
		var liTag = document.createElement('li');
		liTag.setAttribute("class", "memLI");
		var aTag = document.createElement('a');
		var memNameSearch = memList[i].replace(/ /g, "+");
		aTag.setAttribute("href", "myschedule.html?name=" + memNameSearch);
		aTag.innerText = memList[i];
		liTag.appendChild(aTag);
		myUL.appendChild(liTag);
	}
}


// *******
// Day of Week Number
// *******
// Validator - function getDowNum(dow){
// Validator - var dowNum = 7;
// Validator - switch(dow) {
// Validator - case "M":
// Validator - dowNum = 1;
// Validator - break;
// Validator - case "T":
// Validator - dowNum = 2;
// Validator - break;
// Validator - case "W":
// Validator - dowNum = 3;
// Validator - break;
// Validator - case "H":
// Validator - dowNum = 4;
// Validator - break;
// Validator - case "F":
// Validator - dowNum = 5;
// Validator - break;
// Validator - case "S":
// Validator - dowNum = 6;
// Validator - break;
// Validator - case "D":
// Validator - dowNum = 0;
// Validator - break;
// Validator - default:
// Validator - dowNum = 7;
// Validator - break;
// Validator - }
// Validator - return dowNum;
// Validator - }

// *******
// Select Names From Search
// *******
// Validator - function selectNames() {
// Validator - // Declare variables
// Validator - var input, filter, ul, li, a, i, txtValue;
// Validator - input = document.getElementById('myInput');
// Validator - filter = input.value.toUpperCase();
// Validator - ul = document.getElementById("myUL");
// Validator - li = ul.getElementsByTagName('li');
// Validator - // Loop through all list items, and hide those who don't match the search query
// Validator - for (i = 0; i < li.length; i++) {
// Validator - a = li[i].getElementsByTagName("a")[0];
// Validator - txtValue = a.textContent || a.innerText;
// Validator - console.log(txtValue);
// Validator - if (txtValue.toUpperCase().indexOf(filter) > -1) 
// Validator - {
// Validator - li[i].style.display = "";
// Validator - } else {
// Validator - li[i].style.display = "none";
// Validator - }
// Validator - }
// Validator - }

// *******
// Create schedule cells from JSON file
// *******
function buildRoster() {
	for (var j = 0; j < jsonData.length; j++) {
		var guts = jsonData[j];
		var memberName1 = guts.memberName1;
		var memberName2 = guts.memberName2;
		var mnLoc;

		if (memberName1 !== undefined && memberName1 !== "") {
			memberName1 = properName(memberName1);
			memberName1 = memberName1.trim();
			mnLoc = memList.indexOf(memberName1);
			if (mnLoc == -1) {
				if (memList[0] === "") {
					memList[0] = memberName1;
				} else {
					memList.push(memberName1);
				}
			}
		}
		if (memberName2 !== undefined && memberName2 !== "") {
			memberName2 = properName(memberName2);
			memberName2 = memberName2.trim();
			mnLoc = memList.indexOf(memberName2);
			if (mnLoc == -1) {
				if (memList[0] === "") {
					memList[0] = memberName2;
				} else {
					memList.push(memberName2);
				}
			}
		}
	}
	memList.sort();
	createList();
}

// *******
// Get length of name and truncate 2nd, 3rd, etc names to initial if needed
// *******
// Validator - function checkNameLength(name) {
// Validator - if (name.length > 12) {
// Validator - var parts = name.split(" ", 99);
// Validator - var newName = parts[0];
// Validator - for (var p = 1; p < parts.length; p++) {
// Validator - newName = newName + " " + parts[p].substr(0, 1);
// Validator - }
// Validator - name = newName;
// Validator - }
// Validator - return name;
// Validator - }

// *******
// Read JSON file - via getJSON.php
// *******
function getJSON() {
	$.ajax({
		url: 'getJSON.php',
		type: 'GET',
		success: function(data) {
			jsonData = data;
			jsonData = JSON.parse(jsonData);
			buildRoster();
		},
		error: function(e) {
			console.log(e.message);
		}
	});
}

// *******
// Format name properly
// *******
function properName(name) {
	name = name.replace(/ +(?= )/g, '');
	return ("" + name.replace(/[^\s\-\']+[\s\-\']*/g, function(word) {
		return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
	}).replace(/\b(Van|De|Der|Da|Von)\b/g, function(nobiliaryParticle) {
		return nobiliaryParticle.toLowerCase();
	}).replace(/Mc(.)/g, function(match, letter3) {
		return 'Mc' + letter3.toUpperCase();
	}));
}