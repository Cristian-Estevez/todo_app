import getCookie from '../utils/cookieUtils';

const GET_TASKS_URL = 'http://127.0.0.1:8000/api/folder/task-list/';
const SAVE_TASK_URL = 'http://127.0.0.1:8000/api/folder/task-create/';
const DELETE_TASK_URL = 'http://127.0.0.1:8000/api/folder/task-delete/';
const UPDATE_TASK_URL = 'http://127.0.0.1:8000/api/folder/task-update/';

const saveTask = async ({ folderId, task }) => {
  const csrftoken = getCookie('csrftoken');

  try {
    const data = {
      folder: folderId,
      title: task.name
    };

    if (task.id) {
      data.id = task.id;
    }

    const response = await fetch(SAVE_TASK_URL, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'X-CSRFToken': csrftoken
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error('Failed to create task');
    }

    return response.json();
  } catch (error) {
    console.log('ERROR:', error);
  }
};

const getTasks = async ({ folderId }) => {
  try {
    const response = await fetch(GET_TASKS_URL, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ folderId: folderId })
    });

    if (!response.ok) {
      throw new Error('Failed to get tasks.');
    }

    return response.json();
  } catch (error) {
    console.log('ERROR:', error);
  }
};

const removeTask = async (_body) => {
  const csrftoken = getCookie('csrftoken');

  try {
    const response = await fetch(DELETE_TASK_URL, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        'X-CSRFToken': csrftoken
      },
      body: JSON.stringify(_body)
    });

    if (!response.ok) {
      throw new Error(`Failed to remove task id: [${_body.taskId}].`);
    }

    return response.json();
  } catch (error) {
    console.error('ERROR:', error);
  }
};

const toggleTaskCheck = async ({ folderId, task }) => {
  task.completed = !task.completed;
  await updateTask({ folderId, task });
};

const updateTask = async ({ folderId, task }) => {
  const csrftoken = getCookie('csrftoken');
  try {
    const response = await fetch(UPDATE_TASK_URL, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'X-CSRFToken': csrftoken
      },
      body: JSON.stringify({ folderId: folderId, task: task })
    });

    if (!response.ok) {
      throw new Error(`Failed to update task id: [${task.id}].`);
    }

    return response.json();
  } catch (error) {
    console.error('ERROR:', error);
  }
};

export { getTasks, saveTask, removeTask, toggleTaskCheck, updateTask };
