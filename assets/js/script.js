/*Wrap all code that interacts with the DOM in a call to jQuery to ensure that the code isn't run until the browser has finished rendering all the elements in the html.*/
$(document).ready(function() { 

/*TODO: Add a listener for click events on the save button. This code should use the id in the containing time-block as a key to save the user input in local storage. HINT: What does `this` reference in the click listener function? How can DOM traversal be used to get the "hour-x" id of the time-block containing the button that was clicked? How might the id be useful when saving the description in local storage?*/
$(".saveBtn").on("click", function () {
  const userInput = $(this).siblings(".description").val();
  const timeBlockId = $(this).closest(".time-block").attr("id");
  localStorage.setItem(timeBlockId, userInput);
});


/*TODO: Add code to apply the past, present, or future class to each time
block by comparing the id to the current hour. HINTS: How can the id
attribute of each time-block be used to conditionally add or remove the
past, present, and future classes? How can Day.js be used to get the current hour in 24-hour time?*/

function updateTimeBlocks() {
  const currentTime = dayjs().hour();

$(".time-block").each(function() {
  const blockHour = parseInt($(this).attr("id").split("-")[1]);


  if (blockHour < currentTime) {
    $(this).removeClass("present future").addClass("past");
  } else if (blockHour === currentTime) {
    $(this).removeClass("past future").addClass("present");
  } else if (blockHour > currentTime) {
    $(this).removeClass("present past").addClass("future");
  }
  });
}

updateTimeBlocks();
setInterval(updateTimeBlocks, 60000);


/*TODO: Add code to get any user input that was saved in localStorage and set the values of the corresponding textarea elements. HINT: How can the id attribute of each time-block be used to do this?*/
function getUserInput (){
  $(".time-block").each(function() {
    const timeBlockId = $(this).attr("id");
    const savedInput = localStorage.getItem(timeBlockId);

    if (savedInput !== null) {
      $(this).find("textarea").val(savedInput);
    }
  });
}

getUserInput();


/*TODO: Add code to display the current date in the header of the page.*/
function getCurrentDate(){
  const currentDate = dayjs().format("MMMM D, YYYY hh:mm A");
  $("#currentDay").text(currentDate);
}

getCurrentDate();

});