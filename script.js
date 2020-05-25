// date setup
const toDate = document.getElementById('todate');

let today = new Date()
const dd = String(today.getDate()).padStart(2, '0');
const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
const yyyy = today.getFullYear();

today = dd + '/' + mm + '/' + yyyy;

const currentDate = () => {
    toDate.textContent = today
}

currentDate();

//adding element li to list
const addBtn = document.getElementById('addBtn');
let input = document.getElementById('input');
const ul = document.getElementById('ul');

//classes names
const CHECK = 'fa-check-circle';
const UNCHECK = 'fa-circle';
const LINE_THROUGH = 'lineThrough';

//Variables
let LIST = []
let id = 0

function addToDo(todo, id, done, trash) {
    let time = new Date();
    const hour = String(time.getHours()).padStart(2, '0');
    const minute = String(time.getMinutes() + 1).padStart(2, '0');
    time = today + " " + hour + ':' + minute

    if (trash) {
        return;
    }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";
    const item = ` <li>
    <div class="cyrcle"> <i class="far ${DONE}" id="${id}" job="complete"></i>
    </div>

    <div class="taskText">
        <p class="task text ${LINE}">${todo}</p>
        <p class="taskDate">${time}</p>
    </div>

   <i class="fas fa-times deleteBtn" id="${id}" job="delete"></i>
    </li>`

    const position = 'beforeend'
    ul.insertAdjacentHTML(position, item)
}

//add by click enter
let addTask = (e) => {
    const ToDo = input.value;
    if (ToDo) {
        addToDo(ToDo, id, false, false);

        LIST.push({
            name: ToDo,
            id: id,
            done: false,
            trash: false
        });

        //add item to local storage()
        localStorage.setItem('TODO', JSON.stringify(LIST));
        id++
    }
    input.value = ""
}

addBtn.addEventListener('click', addTask)
input.addEventListener("keyup", (e) => {
    if (e.keyCode === 13) {
        addTask()
    }
})

//complete todo
function completeToDo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH)
    LIST[element.id].done = LIST[element.id].done ? false : true;
}

//remove 
function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true
}

//target items created dynamicly
ul.addEventListener('click', function (event) {
    const element = event.target // return to click el inside list
    const elementJob = element.attributes.job.value //complete or delete

    if (elementJob == "complete") {
        completeToDo(element)
    } else if (elementJob == "delete") {
        removeToDo(element)
    }

    //add item to local storage()
    localStorage.setItem('TODO', JSON.stringify(LIST));
})

//get item from local storage
let data = localStorage.getItem('TODO')

//check if data is not empty
if (data) {
    LIST = JSON.parse(data);
    id = LIST.length; //set the id to the last one in the list
    loadList(LIST); //load the list to the user interface
} else {
    //if data isn't empty
    LIST = [];
    id = 0;
}

function loadList(array) {
    array.forEach(function (item) {
        addToDo(item.name, item.id, item.done, item.trash)
    })
}