/*using vanilla JS to manage the element manipulation rather than jQuery (for learning purposes only)*/

/*get elements by ID */
var plannerContainer = document.getElementById("time-block-container");
var tDate = document.getElementById("currentDay");

/*using moment to get the date*/
tDate.innerHTML = moment().format("dddd, MMMM Do");

/*creating some HTML for row and col divs*/
var hourCol =  "<div class='col-2 hour' ></div>";
var inputCol = "<div class='col-8'><textarea class='description'> </textarea></div>";
var saveCol =  "<div class= 'col-2'> <button class='saveBtn' > <i class='far fa-save'> </i> </button> <button class='trashBtn' > <i class='far fa-trash-alt'> </i> </button>";
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


// trigger each time user clicks save button
 for (let i = 0; i < cbox.length; i++) 
 {
     cbox[i].addEventListener("click", function(event) 
     {
        
        let dataToSave = ctext[i].value
        if(dataToSave != " ") //seems to be the default string of these textareas

        {
        localStorage.setItem(i,dataToSave);
        saveIcon(i,true);
        }
        event.stopPropagation();
     });
}

//trigger each time user changes the value in plan event
for (let i = 0; i < ctext.length; i++) 
{
    ctext[i].addEventListener("input", function(event) 
    {
        saveIcon(i,false);
        
    });
}

//handle save icon on button isSave true if save false is data change.
function saveIcon(id, isSave)
{
    if(!isSave)
    {
        cbox[id].innerHTML = "<i class='far fa-save'> </i>"
        return;
    }

    cbox[id].innerHTML = "<i class='fas fa-save'> </i>"
}


function readPlannerData()
{
    let dayEvent;

    for (let i = 0; i < 9; i++) 
    {
       dayEvent = localStorage.getItem(i)
       console.log("item ", i, " is: ", dayEvent)
        if(!!dayEvent) 
        {
            ctext[i].value = dayEvent;
            saveIcon(i, true);
        }
        else
        {
            
            saveIcon(i, false);
            
        }

    }
}



readPlannerData();

function colorAssignment(sHour)
{
    var id = plannerContainer.children;
    var curHour = new Date().getHours();
    sHour = 16;

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

