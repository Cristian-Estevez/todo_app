import React from 'react';
import './App.css';


global.activeFolderVar = {
  id: null,
  name: "",
};

class App extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      folderList: [],
      taskList: [],
      activeFolder:{
        id:null,
        name:"",
      },
      activeItem:{
        id:null,
        title:"",
        completed: false,
        folder: null,
      },
      editing:false,
      viewingItems:false,
    }
    this.fetchFolders = this.fetchFolders.bind(this);
    this.fetchTasks = this.fetchTasks.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getCookie = this.getCookie.bind(this);
    this.viewItems = this.viewItems.bind(this);
    this.removeFolder = this.removeFolder.bind(this);
    this.markUnmark = this.markUnmark.bind(this);
    this.removeTask = this.removeTask.bind(this);
    this.handleTaskSubmit = this.handleTaskSubmit.bind(this);
    this.handleTaskChange = this.handleTaskChange.bind(this);
  };

  // For Django  postmethod interaction
  getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string restart with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
  };

  componentWillMount(){
    if (this.state.viewingItems === false){
      this.fetchFolders()
    } else {
      this.fetchTasks()
    }    
  };  

  fetchFolders(){
    console.log("Fetching folders");
    fetch('http://127.0.0.1:8000/api/folder-list/')
    .then(response => response.json())
    .then(data =>
      this.setState({
        folderList: data,
      })
      )    
  };

  // handles folder name typing
  handleChange(e){
    var name = e.target.name
    var value = e.target.value
    console.log("Name:" , name, "Value: ", value)
    this.setState({
      activeFolder:{
        ...this.state.activeFolder,
        name : value,
      }
    })
  }

  handleTaskChange(e){
    var value = e.target.value
    this.setState({
      activeItem:{
        ...this.state.activeItem,
        title : value
      }
    })
  }

  // Handles folder submit
  handleSubmit(e){
    e.preventDefault();

    var csrftoken = this.getCookie('csrftoken');
    var url = 'http://127.0.0.1:8000/api/folder-create/';

    fetch(url,{
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'X-CSRFToken': csrftoken,
      },
      body: JSON.stringify(this.state.activeFolder)
    }).then((response) => {
      this.fetchFolders()
      this.setState({
        activeFolder: {
          id: null,
          name: '',
        }
      })
    }).catch(function(error){
      console.log("ERROR:", error)
    })
  }

  handleTaskSubmit(e){
    e.preventDefault();
    var csrftoken = this.getCookie('csrftoken');
    var url = `http://127.0.0.1:8000/api/folder/${this.state.activeItem.folder}/task-update/${this.state.activeItem.id}/`;
    if (this.state.editing === false){
      var url = `http://127.0.0.1:8000/api/folder/${this.state.activeFolder.id}/task-create/`
    }
    
    fetch(url,{
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'X-CSRFToken': csrftoken,
      },
      body: JSON.stringify(this.state.activeItem)
    }).then((response) => {
      this.fetchTasks()
      this.setState({
        activeItem: {
          id: null,
          title: '',
          folder: null,
        }
      })
    }).catch(function(error){
      console.log("ERROR:", error)
    })
  }

  removeFolder(folder){
    var csrftoken = this.getCookie('csrftoken');

    var url = `http://127.0.0.1:8000/api/folder-delete/${this.state.activeFolder.id}`

    fetch(url,{
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'X-CSRFToken': csrftoken,
      },
      body: JSON.stringify(this.state.activeFolder)
    }).then((response) => {
      this.fetchFolders()
      this.setState({
        activeFolder: {
          id: null,
          name: '',
        }
      })
    }).catch(function(error){
      console.log("ERROR:", error)
    })

  }

  viewItems(e){
    var f_id = e.id;
    var f_name = e.name;        
    global.activeFolderVar = {
      id: f_id,
      name: f_name,
    }
    this.setState({
        activeFolder: {          
          ...this.state.activeFolder,
          id: f_id,
          name : f_name
        },
        viewingItems: true,
    },)
    this.fetchTasks(f_id);
    
  }

  fetchTasks(f_id){
    this.setState({
      editing: false,
    })
    console.log("Fetching tasks");
    fetch(`http://127.0.0.1:8000/api/folder/${global.activeFolderVar.id}/task-list/`)
    .then(response => response.json())
    .then(data =>
      this.setState({
        taskList: data,
      })
      )    
  };

  removeFolder(folder){
    console.log("Removing Folder")
    var csrftoken = this.getCookie('csrftoken');
    var url = `http://127.0.0.1:8000/api/folder-delete/${folder.id}/`

    fetch(url,{
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        'X-CSRFToken': csrftoken,
      },
      body: JSON.stringify(this.state.activeFolder)
    }).then((response) => {
      this.fetchFolders()
      this.setState({
        activeFolder: {
          id: null,
          name: '',
        }
      })
    })
  };

  markUnmark(task){
    console.log("Mark Unmark clicked")
    task.completed = !task.completed
    var csrftoken = this.getCookie('csrftoken')
    var url = `http://127.0.0.1:8000/api/folder/${this.state.activeFolder.id}/task-update/${task.id}/`
    fetch(url, {
      method:'POST',
      headers:{
        'Content-type':'application/json',
        'X-CSRFToken':csrftoken,
      },
      body:JSON.stringify({'completed': task.completed, 'title':task.title})
    }).then(() => {
      this.fetchTasks()
    })
  };

  restart(){
    this.setState({
      viewingItems: false,
      editing:false,
    })
  };

  removeTask(task){
    console.log("Removing Task")
    var csrftoken = this.getCookie('csrftoken');
    var url = `http://127.0.0.1:8000/api/folder/${global.activeFolderVar.id}/task-delete/${task.id}/`

    fetch(url,{
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        'X-CSRFToken': csrftoken,
      },
      body: JSON.stringify(this.state.activeItem)
    }).then((response) => {
      this.fetchTasks()
      this.setState({
        activeItem: {
          id: null,
          title: '',
          folder: this.state.activeItem.folder,
        }
      })
    })
  };

  // sets active item for editing 
  startEdit(task){
    console.log(task)
    this.setState({
      activeItem: task,
      editing: true,
    })
  };

  render(){
    var folders = this.state.folderList
    var self = this

    
    if (this.state.viewingItems === false){
      var appTitle = 'Folders'
      return(
          <div id="container" className="container">
              <br></br>
              <p id="app-title" styles="font-weight: bold;">{appTitle}</p>

              <div id="todo-list">

                {folders.map(function(folder, index){
                  return(
                    <div key={index} className="todo-list flex-wrapper">
                      <div style={{flex:7}}>
                          <span className="title" name="folder-name">  -  {folders[index].name}</span>
                      </div>
                      <div style={{flex:2}}>
                          <a href="#" onClick={() => self.viewItems(folder)} className="view-items">View items</a>
                      </div>
                      <div style={{flex:1}}>
                          <a href="#" onClick={() => self.removeFolder(folder)} className="remove">Remove</a>
                      </div>
                    </div>
                  )
                })}

              </div>
              <br></br>
              <form id="form" onSubmit={this.handleSubmit} styles="text-alignt: center;">
                <div className="form-row" styles=" width: 95%;">
                    <div className="form-group"  id="form-inputbox">
                        <input onChange={this.handleChange} id="folder-name" className="form-control" type="text" name="title" placeholder="New Folder" value={this.state.activeFolder.name} ></input>
                    </div>
                    <div className="form-group form-md-3">
                        <input id="add-folder" className="btn btn-primary border-secondary form-control" type="submit" value="Add"></input>
                    </div>
                </div>
              </form>
          </div>
      )
    } 
    else if (this.state.viewingItems === true && this.state.editing === false){
      var appTitle = this.state.activeFolder.name
      var tasks = this.state.taskList
      return (
        <div id="container" className="container">
              <br></br>
              

              <p  styles="font-weight: bold;"><a href="#" className="a-decor_none" onClick={() => this.restart()} type="link">Folders </a> > {appTitle}</p>

              <div id="todo-list">

                {tasks.map(function(task, index){
                  
                  return(
                    <div key={index} className="todo-list flex-wrapper">
                      <div className="checkbox-orange"  onClick={() => self.markUnmark(task)}>
                        {task.completed == false ? (
                          <span className="checkbox-gray" ><i className="far fa-square" styles="color: rgb(131, 130, 130) !important;"></i></span>
                        ):(
                          <span className="checkbox-orange" ><i className="fas fa-check-square" ></i></span>
                        )}
                      </div>
                      <div style={{flex:7}}>
                          <span className="title" name="folder-name">  -  {tasks[index].title}</span>
                      </div>
                      <div style={{flex:2}}>
                          <a href="#" onClick={() => self.startEdit(task)} className="view-items">Edit</a>
                      </div>
                      <div style={{flex:1}}>
                          <a href="#" onClick={() => self.removeTask(task)} className="remove">Del</a>
                      </div>
                    </div>
                  )
                })}

              </div>
              <br></br>
              <form id="form" onSubmit={this.handleTaskSubmit}>
                <div className="form-row " styles="justify-content: space-between;">
                    <div className="form-group form-md-9" styles="width: 85%;" id="form-inputbox">
                        <input onChange={this.handleTaskChange} id="folder-name" value={this.state.activeItem.title} className="form-control" type="text" name="title" placeholder="New Task"></input>
                    </div>
                    <div className="form-group form-md-3">
                        <input id="add-folder" className="btn btn-primary border-secondary form-control" type="submit" value="Add"></input>
                    </div>
                </div>
              </form>
          </div>
      )
    } 
    else if (this.state.viewingItems === true && this.state.editing === true){
      var appTitle = this.state.activeItem.title
      return (
        <div id="container" className="container">
            <br></br>
            <p  styles="font-weight: bold;">Editing Task: "{appTitle}"</p>
            <form id="form" onSubmit={this.handleTaskSubmit}>
              <div  styles="justify-content: space-between;">
                  <div className="form-group form-md-9" styles="width: 85%;" id="form-inputbox">
                      <input id="form-inputbox-a" onChange={this.handleTaskChange} className="form-control" type="text" name="title" value={this.state.activeItem.title}></input>
                  </div>
                  <div className="input-group">
                      <div className="input-group-btn">
                          <input id="save" className="btn btn-primary border-secondary form-control" type="submit" value="Save"></input>
                      </div>
                      <div class="input-group-btn">
                          <input id="cancel" className="btn btn-primary border-secondary form-control" type="submit" value="Cancel"></input>
                      </div>
                  </div>
              </div>
            </form>
        </div>
      )
    }
  }
};
export default App;