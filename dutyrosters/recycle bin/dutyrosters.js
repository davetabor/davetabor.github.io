// *******
// dutyrosters.js
// *******
var jsonData = "";

main();
// *******
// Main Sequence
// *******
function main() {
    addHeaders("thursday");
    addHeaders("friday");
    addHeaders("saturday");
    addHeaders("sunday");

    createBaseBoxes("thursday", 21, 3);
    createBaseBoxes("friday", 8, 16);
    createBaseBoxes("saturday", 7, 17);
    createBaseBoxes("sunday", 9, 2);

    getRoster();
    satEve();
}

// *******
// Create boxes for starting and ending times, as well as all posible schedule cells 
// *******
function createBaseBoxes(dow, startHr, rows) {
    for (var i = 0; i < rows; i++) {
        var row = i + 1;
        var cont = document.getElementById(dow + 'Cont');
        var rowDiv = document.createElement('div');
        rowDiv.setAttribute('class', 'row display-flex');
        rowDiv.setAttribute('id', 'row' + row);
        cont.appendChild(rowDiv);

        // START TIME BOX
        var box = document.createElement('div');
        box.setAttribute('class', 'col-xs-1 hourCells');
        var hour = startHr + i;
        box.innerText = getTimeStr(hour);
        rowDiv.appendChild(box);

        // END TIME BOX
        box = document.createElement('div');
        box.setAttribute('class', 'col-xs-1 hourCells');
        hour = startHr + 1 + i;
        box.innerText = getTimeStr(hour);
        rowDiv.appendChild(box);

        for (var j = 0; j < 10; j++) {
            var boxHr = startHr + i;
            var id = getDay(dow) + "-" + boxHr + "-" + getLoc(j);
            var partId = getDay(dow) + "-" + boxHr;

            if (partId == "S-18" && j > 0) {
                // do nothing
            } else {
                box = document.createElement('div');
                box.setAttribute('id', id);
                if (id == "S-18-C") {
                    box.setAttribute('class', 'col-xs-10 cell hideit');
                } else {
                    box.setAttribute('class', 'col-xs-1 cell hideit');
                }
                // box.innerText = id;
                rowDiv.appendChild(box);
            }
        }
    }
}

// *******
// Take hour number and create formated time
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
// Create header row with location labels
// *******
function addHeaders(dow) {
    var headers = [
        {
            class: "startTime",
            text: "Start"
        },
        {
            class: "stopTime",
            text: "Stop"
        },
        {
            class: "gate",
            text: "Gate"
        },
        {
            class: "clubhouse",
            text: "Clubhouse"
        },
        {
            class: "turret",
            text: "Turret"
        },
        {
            class: "simoni",
            text: "Simoni"
        },
        {
            class: "mcgregor",
            text: "McGregor"
        },
        {
            class: "breuning",
            text: "Breuning"
        },
        {
            class: "demo",
            text: "Grind Demo"
        },
        {
            class: "sales",
            text: "T-Shirts"
        },
        {
            class: "raffle",
            text: "Raffle"
        },
        {
            class: "icecream",
            text: "Ice-Cream"
        }
    ];

    var box = document.getElementById(dow);
    var containerDiv = document.createElement('div');
    containerDiv.setAttribute('class', 'container-fluid');
    containerDiv.setAttribute('id', dow + 'Cont');
    box.appendChild(containerDiv);
    var rowDiv = document.createElement('div');
    rowDiv.setAttribute('class', 'row display-flex hdr');
    rowDiv.setAttribute('id', dow + 'Hdr');
    containerDiv.appendChild(rowDiv);

    var rowBox = document.getElementById(dow + "Hdr");

    for (var i = 0; i < headers.length; i++) {
        var hdrBox = document.createElement('div');
        if (i < 1) {
            hdrBox.setAttribute('class', 'col-xs-1 col-xs-1-offset headers');
        } else {
            hdrBox.setAttribute('class', 'col-xs-1 headers');
        }
        hdrBox.innerText = headers[i].text;
        rowBox.appendChild(hdrBox);
    }

}

// *******
// Create schedule cells from JSON file
// *******
function buildRoster() {
    for (var j = 0; j < jsonData.length; j++) {
        var guts = jsonData[j];
        var day = guts.dow;
        var tm = guts.startHour;
        var loc = guts.location;
        var id = day + "-" + tm + "-" + loc;
        var schedBox = document.getElementById(id);
        var innrTxt = "";
        var memberName1 = guts.memberName1;
        var memberName2 = guts.memberName2;

        if (memberName1 !== undefined && memberName1 !== "") {
            memberName1 = checkNameLength(memberName1);
            innrTxt = '<div id="';
            if (guts.hours === "1") {
                innrTxt = innrTxt + "nameClickSmall";
            } else {
                innrTxt = innrTxt + "nameClick";
            }
            innrTxt = innrTxt + '" class="schedBox" data-toggle="modal" data-target="#delModal" data-name="' + memberName1 + '" data-id="' + id + '-1">' + properName(memberName1) + '</div>';
        } else {
            innrTxt = '<div class="';
            if (guts.hours === "1") {
                innrTxt = innrTxt + "clickHereSmall";
            } else {
                innrTxt = innrTxt + "clickHere";
            }
            innrTxt = innrTxt + '" class="schedBox" data-toggle="modal" data-target="#addModal" data-name="" data-id="' + id + '-A">CLICK HERE!</div>';
        }

        if (guts.members == 2) {
            if (memberName2 !== undefined && memberName2 !== "") {
                memberName2 = checkNameLength(memberName2);
                innrTxt = innrTxt + '<div id="';
                if (guts.hours === "1") {
                    innrTxt = innrTxt + "nameClickSmall";
                } else {
                    innrTxt = innrTxt + "nameClick";
                }
                innrTxt = innrTxt + '" class="schedBox" data-toggle="modal" data-target="#delModal" data-name="' + memberName2 + '" data-id="' + id + '-2">' + properName(memberName2) + '</div>';
            } else {
                innrTxt = innrTxt + '<div class="';
                if (guts.hours === "1") {
                    innrTxt = innrTxt + "clickHereSmall";
                } else {
                    innrTxt = innrTxt + "clickHere";
                }
                innrTxt = innrTxt + '" class="schedBox" data-toggle="modal" data-target="#addModal" data-name="" data-id="' + id + '-B">CLICK HERE!</div>';
            }
        }
        schedBox.classList.remove("hideit");
        if (guts.hours === "1") {
            schedBox.classList.add("unitBoxSmall");
            schedBox.classList.add("single");
        } else {
            schedBox.classList.add("unitBox");
            if (guts.hours === "2") {
                schedBox.classList.add("double");
            }
            if (guts.hours === "3") {
                schedBox.classList.add("triple");
            }
        }
        schedBox.classList.add("my-auto");
        schedBox.innerHTML = innrTxt;
    }
}

// *******
// Read JSON and create schedue
// *******
function getRoster() {
    getJSON();
    buildRoster();
}

// *******
// Read JSON file - via getJSON.php
// *******
function getJSON() {
    $.ajax({
        url: 'http://taborvt.com/stellafane/dutyrosters/getJSON.php',
        type: 'GET',
        success: function (data) {
            jsonData = data;
            jsonData = JSON.parse(jsonData);
            buildRoster();
            addOnClicks();
        },
        error: function (e) {
            console.log(e.message);
        }
    });
}


// *******
// Get DOW code for day name
// *******
function getDay(dow) {
    var day = "";
    switch (dow) {
        case "thursday":
            day = "H";
            break;
        case "friday":
            day = "F";
            break;
        case "saturday":
            day = "S";
            break;
        case "sunday":
            day = "D";
            break;
        default:
            day = "X";
    }
    return day;
}

// *******
// Get Location code from 
// *******
function getLoc(location) {
    var code = "";
    switch (location) {
        case 0:
            code = "G";
            break;
        case 1:
            code = "C";
            break;
        case 2:
            code = "T";
            break;
        case 3:
            code = "S";
            break;
        case 4:
            code = "M";
            break;
        case 5:
            code = "A";
            break;
        case 6:
            code = "D";
            break;
        case 7:
            code = "V";
            break;
        case 8:
            code = "R";
            break;
        case 9:
            code = "I";
            break;
        default:
            code = "X";
    }
    return code;
}

// *******
// Format name properly
// *******
function properName(name) {
    return ("" + name.replace(/[^\s\-\']+[\s\-\']*/g, function (word) {
        return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
    }).replace(/\b(Van|De|Der|Da|Von)\b/g, function (nobiliaryParticle) {
        return nobiliaryParticle.toLowerCase();
    }).replace(/Mc(.)/g, function (match, letter3) {
        return 'Mc' + letter3.toUpperCase();
    }));
}

// *******
// Get length of name and truncate 2nd, 3rd, etc names to initial if needed
// *******
function checkNameLength(name) {
    if (name.length > 12) {
        var parts = name.split(" ", 99);
        var newName = parts[0];
        for (var p = 1; p < parts.length; p++) {
            newName = newName + " " + parts[p].substr(0, 1);
        }
        name = newName;
    }
    return name;
}

// *******
// Add yellow message box to Saturday at 6pm
// *******
function satEve() {
    var id = "S-18-G";
    var schedBox = document.getElementById(id);
    schedBox.classList.remove("hideit");
    schedBox.classList.remove("cell");
    schedBox.classList.remove("col-xs-1");
    schedBox.classList.add("col-xs-10");
    schedBox.classList.add("satEve");
    schedBox.classList.add("triple");
    schedBox.innerHTML = "Everyone to Amphitheater or Pavilion - Program Set Up";
}

function addOnClicks() {

    // *******
    // Add click listener to member names
    // *******
    $(document).on("click", "#nameClick", function () {
        var memberName = $(this).data('name');
        var id = $(this).data("id");

        $(".modal-body h1").text(memberName.toUpperCase());
        $(".modal-body span").text(properName(memberName));
        $(".modal-body input").val(id);
    });
    $(document).on("click", "#nameClickSmall", function () {
        var memberName = $(this).data('name');
        var id = $(this).data("id");

        $(".modal-body h1").text(memberName.toUpperCase());
        $(".modal-body span").text(properName(memberName));
        $(".modal-body input").val(id);
    });

    // *******
    // Add click listener to CLICK HERE! buttons
    // *******
    $(document).on("click", ".clickHere", function () {
        var id = $(this).data("id");
        $("#addId").text(id);
    });
    $(document).on("click", ".clickHereSmall", function () {
        var id = $(this).data("id");
        $("#addId").text(id);
    });

    // *******
    // Add click listener to for the Select/Write-In
    // *******
    $(document).on("click", ".selectWriteIn", function () {
        $(".clickHere").toggleClass("yellow");
        $(".clickHere").toggleClass("clickHere");
    });

    // *******
    // Process deletion in delModel if okay-button is clicked
    // *******
    $('#delModal .okay-button').click(function () {
        var id = $('.modal-body input').val();
        var idparts = id.split("-");
        var boxIdText = idparts[0] + "-" + idparts[1] + "-" + idparts[2];
        var memNum = idparts[3];

        for (var j = 0; j < jsonData.length; j++) {
            var guts = jsonData[j];
            if (guts.dow == idparts[0] && guts.startHour == idparts[1] && guts.location == idparts[2]) {
                if (memNum == "1") {
                    guts.memberName1 = "";
                    guts.memberCell1 = "";
                    guts.memberEmail1 = "";
                } else {
                    guts.memberName2 = "";
                    guts.memberCell2 = "";
                    guts.memberEmail2 = "";
                }

                updateSchedBox(boxIdText, guts.memberName1, guts.memberName2, guts.members);
            }
        }

        $.ajax({
            type: "POST",
            url: "http://taborvt.com/stellafane/dutyrosters/saveJSON.php",
            data: { "jsonDTA": jsonData },
            success: function () {
                $('#delModal').modal('hide');
            },
            error: function (xhr, status, error) {
                console.log(error);
                $('#delModal').modal('hide');
            }
        });
        resetModals();
    });

    // *******
    // Hide delModal if go-back-button is clicked
    // *******
    $('#delModal .go-back-button').click(function () {
        $('#delModal').modal('hide');
        resetModals();
    });

    // *******
    // Process addition in addModel if okay-button is clicked
    // *******
    $('#addModal .add-okay-button').click(function () {
        var id = $("#addId").text();
        var name = $("#new-member-name").val();
        var idparts = id.split("-");
        var boxIdText = idparts[0] + "-" + idparts[1] + "-" + idparts[2];
        var memNum = idparts[3];

        for (var j = 0; j < jsonData.length; j++) {
            var guts = jsonData[j];
            if (guts.dow == idparts[0] && guts.startHour == idparts[1] && guts.location == idparts[2]) {
                if (memNum == "A") {
                    guts.memberName1 = name;
                } else {
                    guts.memberName2 = name;
                }

                updateSchedBox(boxIdText, guts.memberName1, guts.memberName2, guts.members);
            }
        }

        $.ajax({
            type: "POST",
            url: "http://taborvt.com/stellafane/dutyrosters/    .php",
            data: { "jsonDTA": jsonData },
            success: function () {
                $('#addModal').modal('hide');
            },
            error: function (xhr, status, error) {
                console.log(error);
                $('#addModal').modal('hide');
            }
        });
        resetModals();
    });

    // *******
    // Hide addModal if go-back-button is clicked
    // *******
    $('#addModal .add-back-button').click(function () {
        $('#addModal').modal('hide');
        resetModals();
    });
}

// *******
// Reset data in all modals
// *******
function resetModals() {
    $("#new-member-name").val("");
    $("#addId").text("");
    $('.modal-body h1').text("");
    $('.modal-body input').val("");
}

// *******
// Update info inside a Schedule Box (div)
// *******
function updateSchedBox(id, memberName1, memberName2, members) {
    var innrTxt = "";
    var idparts = id.split("-");
    var boxIdText = idparts[0] + "-" + idparts[1] + "-" + idparts[2];
    var hours = 1;
    for (var j = 0; j < jsonData.length; j++) {
        var guts = jsonData[j];
        if (guts.dow == idparts[0] && guts.startHour == idparts[1] && guts.location == idparts[2]) {
            hours = guts.hours;
        }
    }

if (memberName1 !== undefined && memberName1 !== "") {
        memberName1 = checkNameLength(memberName1);
        innrTxt = '<div id="';
        if (hours === "1") {
            innrTxt = innrTxt + "nameClickSmall";
        } else {
            innrTxt = innrTxt + "nameClick";
        }
        innrTxt = innrTxt + '" class="schedBox" data-toggle="modal" data-target="#delModal" data-name="' + memberName1 + '" data-id="' + id + '-1">' + properName(memberName1) + '</div>';
    } else {
        innrTxt = '<div class="';
        if (hours === "1") {
            innrTxt = innrTxt + "clickHereSmall";
        } else {
            innrTxt = innrTxt + "clickHere";
        }
        innrTxt = innrTxt + '" class="schedBox" data-toggle="modal" data-target="#addModal" data-name="" data-id="' + id + '-A">CLICK HERE!</div>';
    }

    if (members == 2) {
        if (memberName2 !== undefined && memberName2 !== "") {
            memberName2 = checkNameLength(memberName2);
            innrTxt = innrTxt + '<div id="';
            if (hours === "1") {
                innrTxt = innrTxt + "nameClickSmall";
            } else {
                innrTxt = innrTxt + "nameClick";
            }
            innrTxt = innrTxt + '" class="schedBox" data-toggle="modal" data-target="#delModal" data-name="' + memberName2 + '" data-id="' + id + '-2">' + properName(memberName2) + '</div>';
        } else {
            innrTxt = innrTxt + '<div class="';
            if (hours === "1") {
                innrTxt = innrTxt + "clickHereSmall";
            } else {
                innrTxt = innrTxt + "clickHere";
            }
            innrTxt = innrTxt + '" class="schedBox" data-toggle="modal" data-target="#addModal" data-name="" data-id="' + id + '-B">CLICK HERE!</div>';
        }
    }


    // if (memberName1 !== "" && memberName1 !== undefined) {
    //     memberName1 = checkNameLength(memberName1);
    //     innrTxt = '<div class="schedBox" id="nameClick" data-toggle="modal" data-target="#delModal" data-name="' + memberName1 + '" data-id="' + id + '-1">' + properName(memberName1) + '</div>';
    // } else {
    //     innrTxt = '<div class="clickHere" data-toggle="modal" data-target="#addModal" data-name="" data-id="' + id + '-A">CLICK HERE!!</div>';
    // }

    // if (members == 2) {
    //     if (memberName2 !== "" && memberName2 !== undefined) {
    //         memberName2 = checkNameLength(memberName2);
    //         innrTxt = innrTxt + '<div class="schedBox" id="nameClick" data-toggle="modal" data-target="#delModal" data-name="' + memberName2 + '" data-id="' + id + '-2">' + properName(memberName2) + '</div>';
    //     } else {
    //         innrTxt = innrTxt + '<div class="clickHere mx-0" data-toggle="modal" data-target="#addModal" data-name="" data-id="' + id + '-B">CLICK HERE!!</div>';
    //     }
    // }
    $('#' + id).html(innrTxt);
    addOnClicks();
}

function sortJSON() {
    jsonData.sort(function (a, b) {
        return a.seqNo - b.seqNo;
    });
}