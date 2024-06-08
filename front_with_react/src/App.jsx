import React, { useEffect, useState } from 'react';

import './App.css';

import TitleComponent from './components/TitleComponent';
import FolderListComponent from './components/FolderListComponent';
import FolderDetailComponent from './components/FolderDetailComponent';
import { useFolders } from './hooks/useFolders';

export default function App() {
  const {
    activeFolder,
    setActiveFolder,
    folders,
    viewFolderDetail,
    refreshFolderList
  } = useFolders();

  const viewFolderList = () => {
    setActiveFolder();
  };

  return (
    <main
      id='container'
      className='container'
    >
      <TitleComponent
        viewFolderList={viewFolderList}
        activeFolder={activeFolder}
      />
      {activeFolder ? (
        <FolderDetailComponent activeFolder={activeFolder} />
      ) : (
        <FolderListComponent
          folders={folders}
          viewFolderDetail={viewFolderDetail}
          refreshFolderList={refreshFolderList}
        />
      )}
    </main>
  );
}
