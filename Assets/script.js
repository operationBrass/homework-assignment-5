/*using vanilla JS to manage the element manipulation rather than jQuery (for learning purposes only)*/

/*get elements by ID */
var plannerContainer = document.getElementById("time-block-container");
var tDate = document.getElementById("currentDay");

/*using moment to get the date*/
tDate.innerHTML = moment().format("dddd, MMMM Do");

/*creating some HTML for row and col divs*/
var hourCol =  "<div class='col-2 hour' ></div>";
var inputCol = "<div class='col-9'><textarea class='description'> </textarea></div>";
var saveCol =  "<button class='col-1 saveBtn' > <i class='far fa-save'> </i> </button>";
var plannerRow = "<div class='row time-block'>" + hourCol + inputCol + saveCol + "</div>";

for (var i = 9; i < 18; i++) 
{
    plannerContainer.innerHTML +=plannerRow; /* write plannerRow to the plannerContainer */
}

var plannerUpate = document.getElementsByTagName("button");

/*calling some functions*/
colorAssignment(9);
hourAssignment(9);

/*add eventlistner to buttons this is really cool way of managing..*/

const cbox = document.querySelectorAll(".saveBtn");
const ctext = document.querySelectorAll(".description")



 for (let i = 0; i < cbox.length; i++) 
 {
     cbox[i].addEventListener("click", function(event) 
     {
        
        let dataToSave = ctext[i].value
        if(dataToSave != " ") //seems to be the default string of these text areas

        {
        localStorage.setItem(i,dataToSave);
        console.log(localStorage)
        }
        event.stopPropagation();
     });
}

function readPlannerData()
{
    let dayEvent;

    for (let i = 0; i < 9; i++) 
    {
       dayEvent = localStorage.getItem(i)
        if(dayEvent != null) 
        {
            ctext[i].value = dayEvent;
        }
    }
}

readPlannerData();

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
    var id = document.getElementsByClassName("hour");

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

