import { useState } from 'react';

import OneInputFormComponent from './OneInputFormComponent';
import {
  saveTask,
  removeTask,
  toggleTaskCheck,
  updateTask
} from '../services/taskServices';
import { useTasks } from '../hooks/useTasks';

export default function FolderDetailComponent({ activeFolder }) {
  const [newTaskName, setNewTaskName] = useState('');
  const [editingTask, setEditingTask] = useState();
  const { fetchTasks, tasks } = useTasks();

  const getTasks = () => {
    fetchTasks({ folderId: activeFolder.id });
  };

  useState(() => {
    getTasks();
  }, []);

  const handleChange = (e) => {
    setNewTaskName(e.target.value);
  };

  const clearForm = () => {
    setNewTaskName('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTaskName.trim()) {
      console.log('Task name cannot be empty.');
      return;
    }

    if (editingTask) {
      editTask(editingTask);
    } else {
      saveTask({
        folderId: activeFolder.id,
        task: { id: null, name: newTaskName }
      }).then(() => {
        clearForm();
        getTasks();
      });
    }
  };

  const deleteTask = ({ taskId }) => {
    removeTask({
      folderId: activeFolder.id,
      taskId: taskId
    }).then(() => {
      getTasks();
    });
  };

  const editTask = ({ task }) => {
    task.title = newTaskName;
    updateTask({
      folderId: activeFolder.id,
      task: task
    }).then(() => {
      setEditingTask();
      setNewTaskName('');
      getTasks();
    });
  };

  const toggleTaskDone = ({ task }) => {
    toggleTaskCheck({
      folderId: activeFolder.id,
      task: task
    }).then(() => {
      getTasks();
    });
  };

  return (
    <>
      <div id='todo-list'>
        {tasks?.map(function (task, index) {
          return (
            <div
              key={index}
              className='todo-list flex-wrapper'
            >
              <div
                className='checkbox-orange'
                onClick={() => toggleTaskDone({ task })}
              >
                {task.completed == false ? (
                  <span className='checkbox-gray'>
                    <i
                      className='far fa-square'
                      styles='color: rgb(131, 130, 130) !important;'
                    ></i>
                  </span>
                ) : (
                  <span className='checkbox-orange'>
                    <i className='fas fa-check-square'></i>
                  </span>
                )}
              </div>
              <div style={{ flex: 7 }}>
                <span
                  className='title'
                  name='folder-name'
                >
                  {' '}
                  - {tasks[index].title}
                </span>
              </div>
              <div style={{ flex: 2 }}>
                <a
                  href='#'
                  onClick={() => {
                    setNewTaskName(task.title);
                    setEditingTask({ task });
                  }}
                  className='view-items'
                >
                  Edit
                </a>
              </div>
              <div style={{ flex: 1 }}>
                <a
                  href='#'
                  onClick={() => deleteTask({ taskId: task.id })}
                  className='remove'
                >
                  Del
                </a>
              </div>
            </div>
          );
        })}
      </div>

      <OneInputFormComponent
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        inputValue={newTaskName}
        editingTask={editingTask}
        placeHolder={'New Task'}
      />
    </>
  );
}
