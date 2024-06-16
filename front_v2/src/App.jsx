import './App.css'
import 'material-icons/iconfont/filled.css';
import 'material-icons/iconfont/outlined.css';

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
      className='flex flex-col border-2 p-4 border-emerald-500 bg-emerald-500 bg-opacity-50 rounded-lg'
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
