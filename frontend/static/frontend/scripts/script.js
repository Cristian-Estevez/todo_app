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

        
    }
    )
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
