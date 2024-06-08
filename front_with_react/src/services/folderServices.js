import getCookie from '../utils/cookieUtils';

const FOLDER_LIST_URL = 'http://127.0.0.1:8000/api/folder-list/';
const CREATE_FOLDER_URL = 'http://127.0.0.1:8000/api/folder-create/';
const DELETE_FOLDER_URL = 'http://127.0.0.1:8000/api/folder-delete/';

// !!!!csrfs are not working if it sends null it workas anyway

const getFolders = async () => {
  try {
    const response = await fetch(FOLDER_LIST_URL);

    if (!response.ok) {
      throw new Error('Failed to get folders');
    }

    return response.json();
  } catch (error) {
    console.log('ERROR:', error);
  }
};

const createFolder = async (newFolderName) => {
  const csrfToken = getCookie('csrftoken');

  try {
    const response = await fetch(CREATE_FOLDER_URL, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'X-CSRFToken': csrfToken
      },
      body: JSON.stringify({ name: newFolderName })
    });

    if (!response.ok) {
      throw new Error('Failed to create folder');
    }

    return response.json();
  } catch (error) {
    console.log('ERROR:', error);
  }
};

const deleteFolder = async (folder) => {
  const csrfToken = getCookie('csrftoken');

  try {
    const response = await fetch(DELETE_FOLDER_URL, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        'X-CSRFToken': csrfToken
      },
      body: JSON.stringify(folder)
    });

    if (!response.ok) {
      throw new Error('Failed to delete folder');
    }

    return response.json();
  } catch (error) {
    console.log('ERROR:', error);
  }
};

export { getFolders, createFolder, deleteFolder };
