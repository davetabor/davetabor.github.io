var jsonData = "";
var memList = [];

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