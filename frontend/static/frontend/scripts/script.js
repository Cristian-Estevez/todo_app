buildList();

var activeItem = null;

// from django docs, how to pass csrftoken with ajax
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
};
const csrftoken = getCookie('csrftoken');

// populate front end with DDBB data
function buildList(){
    var todoList = document.getElementById('todo-list');
    var url = 'http://127.0.0.1:8000/api/task-list/';
    todoList.innerHTML = '';
    fetch(url)
    .then((resp) => resp.json())
    .then(function(data){
        console.log('Data: ', data);

        // Creates item for each task in DDBB and adds it to innerHTML
        for (var i in data) {

            var item = `
                <div id="task-${i}" class="todo-list flex-wrapper">
                    <div style="flex:7">
                        <span class="title">${data[i].title}</span>
                    </div>
                    <div style="flex:1">
                        <button class="edit">Edit</button>
                    </div>
                </div>
            `
            todoList.innerHTML += item;
        };

        // Activates Edit function for each task
        for (var i in data){
            var editBtn = document.getElementsByClassName('edit')[i];
            editBtn.addEventListener('click', (function(item){
                return function(){
                    editItem(item);
                };
            })(data[i]))
        };
    });
};

// Add/update task
var form = document.getElementById('form-wrapper');
form.addEventListener('submit', function(e){
    e.preventDefault(); // prevents auto-submission
    var url = "http://127.0.0.1:8000/api/task-create/";
    var title = document.getElementById('title').value;
    // Check if this is an update or add (if activeItem == null it is an add)
    if (activeItem != null){
        var url = `http://127.0.0.1:8000/api/task-update/${activeItem.id}/`;
        activeItem = null;
    }

    // Sends post request to backend to add/update task
    fetch(url, {
        method:'POST',
        headers:{
            'Content-type': 'application/json',
            'X-CSRFToken': csrftoken,
        },
        body:JSON.stringify({'title': title})
    }
    // Refreshes task list and cleans the add form
    ).then(function(response){
        buildList();
        document.getElementById('form').reset();
    })
});

// Edit existing task
function editItem(item){
    console.log('clicked', item);
    // Populate add form with existing task info
    activeItem = item;
    document.getElementById('title').value = activeItem.title;
};