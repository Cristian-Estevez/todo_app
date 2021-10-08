buildList();

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

function buildList(){
    var todoList = document.getElementById('todo-list');
    var url = 'http://127.0.0.1:8000/api/task-list/';
    todoList.innerHTML = '';
    fetch(url)
    .then((resp) => resp.json())
    .then(function(data){
        console.log('Data: ', data);

        for (var i in data) {

            var item = `
                <div id="task-${i}" class="todo-list flex-wrapper">
                    <div style="flex:7">
                        <span class="title">${data[i].title}</span>
                    </div>
                    <div style="flex:1">
                        <button class="">Edit</button>
                    </div>
                </div>
            `
            todoList.innerHTML += item;
        }
    });
};

var form = document.getElementById('form-wrapper');
form.addEventListener('submit', function(e){
    e.preventDefault();
    var url = "http://127.0.0.1:8000/api/task-create/";
    var title = document.getElementById('title').value;
    fetch(url, {
        method:'POST',
        headers:{
            'Content-type': 'application/json',
            'X-CSRFToken': csrftoken,
        },
        body:JSON.stringify({'title': title})
    }
    ).then(function(response){
        buildList();
        document.getElementById('form').reset();
    })
});