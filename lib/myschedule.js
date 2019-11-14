var jsonData = "";
// Validator - var mySchedule = [];
var param_array = window.location.href.split('?')[1];
var params = param_array.split('=');
var searchName = params[1].replace("+", " ");

var nameHeader = document.getElementById("memberName");
nameHeader.innerText = searchName;

getJSON();

// *******
// Build schedule of signups
// *******
function buildSchedule() {
	var mySchedule = [];
	mySchedule[0] = "6-18-I-1-Saturday Program Prep";
	for (var j = 0; j < jsonData.length; j++) {
		var guts = jsonData[j];
		var location = guts.location;
		var startTime = guts.startHour;
		var hours = guts.hours;
		var dow = getDowNum(guts.dow);
		var thisKey = dow + "-" + startTime + "-" + location + "-" + hours;
		var memberName1 = "";
		if (guts.memberName1 !== undefined) {
			memberName1 = properName(guts.memberName1);
		}
		var memberName2 = "";
		if (guts.memberName2 !== undefined) {
			memberName2 = properName(guts.memberName2);
		}

		if (memberName1 == searchName) {
			if (memberName2.trim() !== "") {
				thisKey = thisKey + "-" + memberName2;
			}
			if (mySchedule.length === 1 && mySchedule[0] === "") {
				mySchedule[0] = thisKey;
			} else {
				mySchedule.push(thisKey);
			}
		}

		if (memberName2 == searchName) {
			if (memberName1 !== undefined) {
				thisKey = thisKey + "-" + memberName1;
			}
			if (mySchedule.length === 1 && mySchedule[0] === "") {
				mySchedule[0] = thisKey;
			} else {
				mySchedule.push(thisKey);
			}
		}

	}
	mySchedule.sort();
	displaySchedule(mySchedule);
}

// *******
// Display shedule in page
// *******
function displaySchedule(mySchedule) {
	var schedDiv = document.getElementById('sched');
	var code = schedDiv.innerHTML;
	code = code + '<div class="row">';
	for (var i = 0; i < mySchedule.length; i++) {
		var pieces = mySchedule[i].split("-");
		code = code + '<div class="col-xs-2 memberRow">' + getDow(pieces[0]) + '</div>';
		code = code + '<div class="col-xs-4 memberRow">' + getStart(pieces[1], pieces[3]) + '</div>';
		if (pieces[0] == 6 && pieces[1] == 18 && pieces[2] == "I") {
			code = code + '<div class="col-xs-3 memberRow">Pavilion</div>';
		} else {
			code = code + '<div class="col-xs-3 memberRow">' + getLoc(pieces[2]) + '</div>';
		}
		code = code + '<div class="col-xs-3 memberRow">' + getWith(pieces[4]) + '</div>';
	}
	code = code + '</div>';
	schedDiv.innerHTML = code;
}

// *******
// Locations
// *******
function getLoc(loc) {
	switch (loc) {
		case "G":
			loc = "Gate";
			break;

		case "C":
			loc = "Clubhouse";
			break;

		case "T":
			loc = "Turret";
			break;

		case "S":
			loc = "Simoni";
			break;

		case "M":
			loc = "McGregor";
			break;

		case "A":
			loc = "Breuning";
			break;

		case "D":
			loc = "Demo Tent";
			break;

		case "V":
			loc = "T-Shirts";
			break;

		case "R":
			loc = "Raffle";
			break;

		case "I":
			loc = "Ice Cream";
			break;

		default:
			loc = "Unknown";
			break;

	}
	return loc;
}

// *******
// Who With
// *******
function getWith(who) {
	if (who === undefined || who === "undefined") {
		who = "";
	}
	return who;
}

// *******
// Start/End Times
// *******
function getStart(start, hours) {
	var times = getTimeStr(start) + " to ";
	var ending = parseInt(start) + parseInt(hours);
	times = times + getTimeStr(ending);
	return times;
}

// *******
// Format time
// *******
function getTimeStr(hour) {
	var ap = "AM";
	if (hour > 11) {
		ap = "PM";
	}
	if (hour > 12) {
		hour = hour - 12;
	}
	var time = hour + ":00 " + ap;
	// var time = hour + " " + ap;
	return time;
}

// *******
// Day of Week
// *******
function getDow(dowNum) {
	var dow = "";
	switch (dowNum) {
		case "0":
			dow = "Sunday";
			break;
		case "1":
			dow = "Monday";
			break;
		case "2":
			dow = "Tuesday";
			break;
		case "3":
			dow = "Wednesday";
			break;
		case "4":
			dow = "Thursday";
			break;
		case "5":
			dow = "Friday";
			break;
		case "6":
			dow = "Saturday";
			break;
		default:
			dow = "Undefined";
			break;
	}
	return dow;
}

// *******
// Day of Week Number
// *******
function getDowNum(dow) {
	var dowNum = 7;
	switch (dow) {
		case "M":
			dowNum = 1;
			break;
		case "T":
			dowNum = 2;
			break;
		case "W":
			dowNum = 3;
			break;
		case "H":
			dowNum = 4;
			break;
		case "F":
			dowNum = 5;
			break;
		case "S":
			dowNum = 6;
			break;
		case "D":
			dowNum = 0;
			break;
		default:
			dowNum = 7;
			break;
	}
	return dowNum;
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
			buildSchedule();
		},
		error: function() {
			// console.log(e.message);
		}
	});
}

// *******
// Format name properly
// *******
function properName(name) {
	if (name === undefined) {
		return "undefined";
	} else {
		name = name.replace(/ +(?= )/g, '');
		return ("" + name.replace(/[^\s\-\']+[\s\-\']*/g, function(word) {
			return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
		}).replace(/\b(Van|De|Der|Da|Von)\b/g, function(nobiliaryParticle) {
			return nobiliaryParticle.toLowerCase();
		}).replace(/Mc(.)/g, function(match, letter3) {
			return 'Mc' + letter3.toUpperCase();
		}));
	}
}