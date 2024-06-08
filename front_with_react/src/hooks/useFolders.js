import { useEffect, useState } from 'react';

import { getFolders } from '../services/folderServices';

export function useFolders() {
  const [folders, setFolders] = useState([]);
  const [activeFolder, setActiveFolder] = useState();

  useEffect(() => {
    fetchFolders();
  }, []);

  const fetchFolders = () => {
    getFolders().then((folders) => {
      setFolders(folders);
    });
  };

  const refreshFolderList = ({ folder, action }) => {
    switch (action) {
      case 'delete':
        setFolders(folders.filter((item) => item.id !== folder.id));
        break;
      case 'add':
        folders.push(folder);
        setFolders(folders);
        break;
    }
  };

  const viewFolderDetail = (folder) => {
    setActiveFolder(folder);
  };

  return {
    folders,
    setFolders,
    activeFolder,
    setActiveFolder,
    viewFolderDetail,
    refreshFolderList
  };
}
