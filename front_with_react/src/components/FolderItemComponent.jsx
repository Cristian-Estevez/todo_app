export default function FolderItemComponent({
  folder,
  removeFolder,
  viewFolderDetail
}) {
  const displayTaskDetail = async (folderId) => {
    viewFolderDetail(folder);
  };

  return (
    <div className='todo-list flex-wrapper'>
      <div style={{ flex: 7 }}>
        <span
          className='title'
          name='folder-name'
        >
          {' '}
          - {folder.name}
        </span>
      </div>
      <div style={{ flex: 2 }}>
        <a
          href='#'
          onClick={() => {
            displayTaskDetail(folder.id);
          }}
          className='view-items'
        >
          View items
        </a>
      </div>
      <div style={{ flex: 1 }}>
        <a
          href='#'
          onClick={removeFolder}
          className='remove'
        >
          Remove
        </a>
      </div>
    </div>
  );
}
