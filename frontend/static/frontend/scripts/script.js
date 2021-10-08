buildList();

function buildList(){
    var todoList = document.getElementById('todo-list');
    var url = 'http://127.0.0.1:8000/api/task-list/';

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
}