import { useState } from 'react';

import OneInputFormComponent from './OneInputFormComponent';
import {
  saveTask,
  removeTask,
  toggleTaskCheck,
  updateTask
} from '../services/taskServices';
import { useTasks } from '../hooks/useTasks';
import IconButton from './buttons/IconButton';

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
      <table className='w-full my-4'>
        <thead>
          <tr>
            <th className='text-start w-1/12'>Completed</th>
            <th className='text-start w-9/12'>Name</th>
            <th className='text-center w-2/12'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks?.map(function (task, index) {
            return (
              <tr
                key={index}
              >
                <td
                  className='checkbox-orange'
                  onClick={() => toggleTaskDone({ task })}
                >
                  {task.completed == false ? (
                    <IconButton
                      icon="check_box_outline_blank"
                      className="text-gray-600"
                    />
                  ) : (
                    <IconButton 
                      icon="check_box"
                      className="text-yellow-700"
                    />
                  )}
                </td>
                <td 
                  className='text-start'
                >
                  {tasks[index].title}
                </td>
                <td>
                  <IconButton
                    onClick={() => {
                      setNewTaskName(task.title);
                      setEditingTask({ task });
                    }}
                    icon="edit"
                  />
                  <IconButton
                    href='#'
                    onClick={() => deleteTask({ taskId: task.id })}
                    className='text-red-600'
                    icon="delete"
                  />
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>

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
