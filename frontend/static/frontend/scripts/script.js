buildFolderList();

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

function buildFolderList() {
    buildFolderForm();
    var todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';

    var appTitle = document.getElementById('app-title');
    appTitle.innerHTML = '';
    appTitle.innerHTML = "Folders";

    var url = 'http://127.0.0.1:8000/api/folder-list/';
    fetch(url)
    .then((resp) => resp.json())
    .then(function(data){

        for (var i in data) {

            var folderItem = `
                <div id="folder-${i}" class="todo-list flex-wrapper">
                    <div style="flex:7">
                        <span class="title">  -  ${data[i].name}      </span>
                    </div>
                    <div style="flex:2">
                        <a href="#" class="view-items">View items</a>
                    </div>
                    <div style="flex:1">
                        <a href="#" class="remove">Remove</a>
                    </div>
                </div>
            `
            todoList.innerHTML += folderItem;
        }

        for (var i in data) {
            //add remove folder functionality
            var deleteFolderBtn = document.getElementsByClassName('remove')[i];
            deleteFolderBtn.addEventListener('click', (function(folderItem){
                return function() {
                    removeFolder(folderItem);
                };
            })(data[i]));

            // add View items functionality
            var viewItemsBtn = document.getElementsByClassName('view-items')[i];
            viewItemsBtn.addEventListener('click', (function(folderItem){
                return function() {
                    viewItems(folderItem);
                };
            })(data[i]));


        };

        
    }
    )
};

function viewItems(folderItem) {
    console.log('View Items clicked');
    buildTaskList(folderItem);
};

var currentFolder = null;

function buildTaskList(folder) {
    currentFolder = folder;
    var todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';
    buildTaskForm(folder.name);
    var url = `http://127.0.0.1:8000/api/folder/${folder.id}/task-list/`
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
                
            
        };

        // add task
        var form = document.getElementById('form');
        form.addEventListener('submit', function(e){
            e.preventDefault(); // prevents auto-submission
            var url = `http://127.0.0.1:8000/api/folder/${currentFolder.id}/task-create/`;
            var title = document.getElementById('title').value;
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
                buildTaskList(currentFolder);
                document.getElementById('form').reset();
            })
        });




    });
};

function editItem(item){
    var container = document.getElementById('todo-list');
    container.innerHTML = '';
       
    buildEditForm();
    var editTitle = document.getElementById('app-title');
    editTitle.innerHTML = `Editing Task: "${item.title}"`;

    document.getElementById('form-inputbox-a').value = item.title;

    var identifier = item.id
    var saveBtn = document.getElementById('save');
    saveBtn.addEventListener('click', function(){
        executeUpdate(item);}, false);
    
      
};

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

function executeUpdate(item){
    
    var url = `http://127.0.0.1:8000/api/folder/${currentFolder.id}/task-update/${item.id}/`;
    var title = document.getElementById('form-inputbox-a').value;
    console.log(title)
    fetch(url, {
        method:'POST',
        headers:{
            'Content-type': 'application/json',
            'X-CSRFToken': csrftoken,
        },
        body:JSON.stringify({'title': title})
    });
    buildTaskList(currentFolder);
};

function buildTaskForm(folderName) {
    var taskForm =`
            <div class="form-row " style="justify-content: space-between;">
                <div class="form-group form-md-9" style="width: 85%;" id="form-inputbox">
                    <input id="title" class="form-control" type="text" name="title" placeholder="New Task">
                </div>
                <div class="form-group form-md-3">
                    <input id="submit" class="btn btn-primary border-secondary form-control" type="submit" value="Add">
                </div>
            </div>
    `;
    document.getElementById('form').innerHTML = taskForm;
    var editTitle = document.getElementById('app-title');
    
    editTitle.innerHTML = `<p><a href="" style="text-decoration: none; color:black;" id="back-to-folders" type="link" value="">Folders </a>> ${folderName}</p>`;
};

function buildFolderForm(){
    var folderForm =`
            <div class="form-row " style="justify-content: space-between;">
                <div class="form-group form-md-9" style="width: 85%;" id="form-inputbox">
                    <input id="folder-name" class="form-control" type="text" name="title" placeholder="New Folder">
                </div>
                <div class="form-group form-md-3">
                    <input id="add-folder" class="btn btn-primary border-secondary form-control" type="submit" value="Add">
                </div>
            </div>
            `
    var dform = document.getElementById('form');
    dform.innerHTML = '';
    dform.innerHTML = folderForm;
    var addFolderBtn = document.getElementById('add-folder');
    addFolderBtn.addEventListener('click', function(e){
        e.preventDefault();
        var url = `http://127.0.0.1:8000/api/folder-create/`;
        var name = document.getElementById('folder-name').value;

        fetch(url,{
            method:'POST',
            headers:{
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body:JSON.stringify({"name": name})
        }).then(function(response){
            buildFolderList();
            document.getElementById('form').reset();
        });
        });
};

function removeFolder(folderItem) {
    console.log('Remove Folder clicked');
    fetch(`http://127.0.0.1:8000/api/folder-delete/${folderItem.id}/`, {
        method:'DELETE', 
        headers:{
            'Content-type':'application/json',
            'X-CSRFToken':csrftoken,
        }
    }).then((response) => {
      buildFolderList();  
    });
};