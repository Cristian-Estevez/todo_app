import IconButton from "./buttons/IconButton";

export default function FolderItemComponent({
  folder,
  removeFolder,
  viewFolderDetail
}) {
  const displayTaskDetail = async (folderId) => {
    viewFolderDetail(folder);
  };

  return (
    <tr className="h-10">
      <td
        onClick={() => {
          displayTaskDetail(folder.id);
        }}
        className="text-start capitalize cursor-pointer hover:font-semibold"
      >
        {folder.name}
      </td>
      <td className="text-center">
        <IconButton 
          onClick={removeFolder}
          className="text-red-600"
          icon="delete"
          type="button"
        />
      </td>
    </tr>
  );
}
