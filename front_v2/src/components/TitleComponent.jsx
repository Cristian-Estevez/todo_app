export default function TitleComponent({ viewFolderList, activeFolder }) {
  return (
    <h1
      className='flex self-left text-2xl'
    >
      <span
        onClick={viewFolderList}
        className="hover:underline hover:text-slate-700 cursor-pointer"
      >
        Folders
      </span>&nbsp;&gt;&nbsp;
      {activeFolder?.name}
    </h1>
  );
}
