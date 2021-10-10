buildList();

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

// constructs addForm
function buildAddForm() {
    var addForm = `
            <div class="form-row " style="justify-content: space-between;">
                <div class="form-group form-md-9" style="width: 85%;" id="form-inputbox">
                    <input id="title" class="form-control" type="text" name="title" placeholder="New Task">
                </div>
                <div class="form-group form-md-3">
                    <input id="submit" class="btn btn-primary border-secondary form-control" type="submit" value="Add">
                </div>
            </div>
        `;
    document.getElementById('form').innerHTML = addForm;
    var editTitle = document.getElementById('app-title');
    editTitle.innerHTML = `To-Do List`;
}

// render edit form
function buildEditForm() {  
    var editForm =`
            <div class=" " style="justify-content: space-between;">
                <div class="form-group form-md-9" style="width: 85%;" id="form-inputbox">
                    <input id="form-inputbox-a" class="form-control" type="text" placeholder="New Task">
                </div>
                <div class="input-group">
                    <div class="input-group-btn">
                        <input id="save" class="btn btn-primary border-secondary form-control" type="submit" value="Save">
                    </div>
                    <div class="input-group-btn">
                        <input id="cancel" class="btn btn-primary border-secondary form-control" type="submit" value="Cancel">
                    </div>
                </div>
            </div>
            `
    var dform = document.getElementById('form');
    dform.innerHTML = '';
    dform.innerHTML = editForm;
};

// populate front end with DDBB data
function buildList(){   
    buildAddForm();
    var todoList = document.getElementById('todo-list');
    var url = 'http://127.0.0.1:8000/api/task-list/';
    todoList.innerHTML = '';
    fetch(url)
    .then((resp) => resp.json())
    .then(function(data){
        
        // Creates item for each task in DDBB and adds it to innerHTML
        for (var i in data) {

            // Checkmark or square according to task completed or not
            var checkItem = `<span class="checkbox" ><i class="far fa-square" style="color: gray !important;"></i></span>`;
            if (data[i].completed == true){
                checkItem = `<span class="checkbox" ><i class="fas fa-check-square" ></i></span>`;
            };

            var item = `
                <div id="task-${i}" class="todo-list flex-wrapper">
                    <div class="checkbox-orange">
                        ${checkItem}
                    </div>
                    <div style="flex:7">
                        <span class="title">${data[i].title}</span>
                    </div>
                    <div style="flex:1">
                        <a href="#" class="edit">Edit</a>
                    </div>
                    <div style="flex:1">
						<a href="#" class="delete">Del</a>
					</div>
                </div>
            `
            todoList.innerHTML += item;
        };

        // Activates Edit/Delete/Completed function for each task
        for (var i in data){
            
            var editBtn = document.getElementsByClassName('edit')[i];
            editBtn.addEventListener('click', (function(item){
                return function(){
                    editItem(item);
                };
            })(data[i]));
                
            var deleteBtn = document.getElementsByClassName('delete')[i];
            deleteBtn.addEventListener('click', (function(item){
                return function(){
                    deleteItem(item);
                }
            })(data[i]));

            var checkbox = document.getElementsByClassName('checkbox')[i];
            checkbox.addEventListener('click', (function(item){
                return function(){
                    checkUncheck(item);
                }
            })(data[i]));
        };
    });
};

// Add task
var form = document.getElementById('form');
form.addEventListener('submit', function(e){
    e.preventDefault(); // prevents auto-submission
    var url = "http://127.0.0.1:8000/api/task-create/";
    try {
        var title = document.getElementById('title').value;
    } catch {

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
    var container = document.getElementById('todo-list');
    container.innerHTML = '';
       
    buildEditForm(item.title);
    var editTitle = document.getElementById('app-title');
    editTitle.innerHTML = `Editing Task: "${item.title}"`;

    document.getElementById('form-inputbox-a').value = item.title;

    var identifier = item.id
    var saveBtn = document.getElementById('save');
    saveBtn.addEventListener('click', function(){
        executeUpdate(item);}, false);    
};

function executeUpdate(item){
    var url = `http://127.0.0.1:8000/api/task-update/${item.id}/`;
    var title = document.getElementById('form-inputbox-a').value;

    fetch(url, {
        method:'POST',
        headers:{
            'Content-type': 'application/json',
            'X-CSRFToken': csrftoken,
        },
        body:JSON.stringify({'title': title})
    });
}

// Delete task
function deleteItem(item){
    console.log('Delete clicked')
    fetch(`http://127.0.0.1:8000/api/task-delete/${item.id}/`, {
        method:'DELETE', 
        headers:{
            'Content-type':'application/json',
            'X-CSRFToken':csrftoken,
        }
    }).then((response) => {
        buildList();
    });
}
// Mark completed
function checkUncheck(item){
    console.log('Checkmark clicked')

    item.completed = !item.completed
    fetch(`http://127.0.0.1:8000/api/task-update/${item.id}/`, {
        method:'POST', 
        headers:{
            'Content-type':'application/json',
            'X-CSRFToken':csrftoken,
        },
        body:JSON.stringify({'title':item.title, 'completed':item.completed})
    }).then((response) => {
        buildList();
    });
}