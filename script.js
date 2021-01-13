var date;
var time;
var appointText = "";
var appointTime = "";
var currentContainer;
var temporayArray = [];
var storedApps;
var returnedApps;

$(window).on("load", function () {
    date = moment().format("dddd MMM Do YYYY, h:mm a");
    $("#currentDay").append(date);
    time = moment().format("H");
    function renderAppointments() {
        storedApps = JSON.parse(localStorage.getItem("appointments"));
        if (storedApps !== null) {
            for (i = 0; i < storedApps.length; i++) {
                returnedApps = storedApps[i];
                details = returnedApps.details;
                timeIndex = returnedApps.time;
                timeIndex = timeIndex.replace(":00", '');
                if (details !== null) {
                    $("#" + timeIndex).children('div').children('div').children('textarea').val(details);
                }
            }
        }
    }
    renderAppointments();
    for (i = 0; i <= 23; i++) {
        CurrentContainer = i;
        if (time == i) {
            $('#' + CurrentContainer).addClass("present");
            $('#' + CurrentContainer).children('div').children('div').children("textarea").addClass("present");
        }
        else if (time > i) {
            $('#' + CurrentContainer).addClass("past");
            $('#' + CurrentContainer).children('div').children('div').children("textarea").addClass("past");
        }
        else {
            $('#' + CurrentContainer).addClass("future");
            $('#' + CurrentContainer).children('div').children('div').children("textarea").addClass("future");
        }
    }
})
$(".saveBtn").click(function () {
    appointText = $(this).parent('div').children('div').children('textarea').val();
    appointTime = $(this).parent('div').parent().attr("id");
    appointment = {
        time: appointTime,
        details: appointText
    }
    temporayArray = JSON.parse(localStorage.getItem("appointments"));
    if (temporayArray === null) {
        localStorage.setItem('appointments', JSON.stringify([{ time: appointTime, details: appointText }]));
    }
    else {
        temporayArray.push(appointment);
        localStorage.setItem("appointments", JSON.stringify(temporayArray));

    }
    $(this).parent('div').children('div').children('textarea').replaceWith($('<textarea>' + appointText.addClass("textarea") + '</textarea>'));
})