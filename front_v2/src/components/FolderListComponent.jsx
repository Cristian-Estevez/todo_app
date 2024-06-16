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
      <table className='w-full my-4'>
        <thead>
          <tr>
            <th className='text-start w-10/12'>Name</th>
            <th className='text-center w-1/12'>Delete</th>
          </tr>
        </thead>
        <tbody>
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
        </tbody>
      </table>

      <OneInputFormComponent
        inputValue={newFolderName}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        placeHolder={'New Folder'}
      />
    </>
  );
}
