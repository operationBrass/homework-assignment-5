

/*add a div elements to container*/

/*using vanilla JS to create div element with classes*/

var plannerContainer = document.getElementById("time-block-container");
var hourCol =  "<div class='col-2 hours' ></div>";
var inputCol = "<div class='col-8 description' ><textarea> </textarea></div>";
var saveCol =  "<div class='btn col-2 saveBtn' ></div>";
var plannerRow = "<div class='row time-block'>" + hourCol + inputCol + saveCol + "</div>";


for (var i = 9; i < 18; i++) 
{
    plannerContainer.innerHTML +=plannerRow; /* write plannerRow to the plannerContainer */
}

/* create object collection (array?) of the plannerRows */



colorAssignment(9);
hourAssignment(9);
function colorAssignment(sHour)
{
    var id = plannerContainer.children;
    var curHour = new Date().getHours();
    

    for(i=0; i < id.length; i++)
    {
        if(i+sHour < curHour)
        {
          id[i].classList.add("past")  ;
        }
        else if(i+sHour > curHour)
        {
            id[i].classList.add("future")  ;
        }
        else /*current*/
        {
            id[i].classList.add("present")  ;
        }
    }
}

function hourAssignment(sHour)
{
    var id = document.getElementsByClassName("hours");

    for(i=0; i<id.length; i++)
    {
        if(i+sHour < 12)
            id[i].innerHTML = "<p>" + (i+sHour)  + "AM  </p>";
        else if (i+sHour > 12)
        {
            id[i].innerHTML = "<p>" + (i - (12-sHour))  + "PM  </p>";
        }
        else
        {
            id[i].innerHTML = "<p>" + (i+sHour)  + "PM</p>";
        }

    }

}