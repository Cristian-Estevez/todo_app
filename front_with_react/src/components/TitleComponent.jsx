export default function TitleComponent({ viewFolderList, activeFolder }) {
  return (
    <h1
      id='app-title'
      className='pointer'
    >
      <span onClick={viewFolderList}>Folders</span> &gt; {activeFolder?.name}
    </h1>
  );
}
