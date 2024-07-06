import { useAuth } from '../hooks/useAuth'
import { useFolders } from '../hooks/useFolders'
import FolderDetailComponent from './FolderDetailComponent'
import FolderListComponent from './FolderListComponent'
import TitleComponent from './TitleComponent'

export default function List() {
  const auth = useAuth()

  const {
    activeFolder,
    setActiveFolder,
    folders,
    viewFolderDetail,
    refreshFolderList
  } = useFolders()

  const viewFolderList = () => {
    setActiveFolder()
  }

  return (
    <>
      <button
        type='button'
        onClick={() => auth.logOut()}
      >
        Logout
      </button>
      <main className='flex flex-col border-2 p-4 border-emerald-500 bg-emerald-500 bg-opacity-50 rounded-lg'>
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
    </>
  )
}
