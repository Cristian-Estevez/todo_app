import { useState } from 'react';

import FolderItemComponent from './FolderItemComponent';
import { createFolder, deleteFolder } from '../services/folderServices';
import OneInputFormComponent from './OneInputFormComponent';

export default function FolderListComponent({
  folders,
  viewFolderDetail,
  refreshFolderList
}) {
  const [newFolderName, setNewFolderName] = useState('');

  const handleChange = (e) => {
    setNewFolderName(e.target.value);
  };

  const clearForm = () => {
    setNewFolderName('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newFolderName.trim()) {
      console.log('Folder name can not be empty.');
      return;
    }

    createFolder(newFolderName)
      .then((response) => {
        clearForm();
        refreshFolderList({ folder: response, action: 'add' });
      })
      .catch((error) => {
        console.error('Failed to delete folder:', error);
      });
  };

  const removeFolder = (folder) => {
    deleteFolder(folder)
      .then(() => {
        clearForm();
        refreshFolderList({ folder: folder, action: 'delete' });
      })
      .catch((error) => {
        console.error('Failed to delete folder:', error);
      });
  };

  return (
    <>
      <section id='todo-list'>
        {folders.map(function (folder) {
          return (
            <FolderItemComponent
              key={folder.id}
              folder={folder}
              removeFolder={() => removeFolder(folder)}
              viewFolderDetail={() => {
                viewFolderDetail(folder);
              }}
            />
          );
        })}
      </section>

      <OneInputFormComponent
        inputValue={newFolderName}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        placeHolder={'New Folder'}
      />
    </>
  );
}
