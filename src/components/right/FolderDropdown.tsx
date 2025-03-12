import { useState,useEffect } from "react";
import { useFolderApi } from "../../api/useFolderApi";
import { useNotesApi } from "../../api/useNotesApi";
import { useNavigate, useParams } from "react-router";

export const FolderDropdown = ({ folderName }: { folderName: string }) => {
  const [openDropdown, setopenDropdown] = useState<boolean>(false);
  const { fetchFolders, folders } = useFolderApi();
  const [selectedFolder,setSelectedFolder]=useState<string>(folderName);
  const { updateNote } = useNotesApi();
  const { noteid } = useParams();
  const navigate = useNavigate();

  useEffect(()=>{
    setSelectedFolder(folderName);

  },[folderName]
)

  const updateFolderName = async (folderId: string,folderName:string) => {
    await updateNote(noteid!, { folderId: folderId });
    setSelectedFolder(folderName);
    navigate(`/folder/${folderId}/notes/${noteid}`);
  };

  return (
    <>
      <h1
        onClick={() => {
          setopenDropdown((prev) => !prev);
          fetchFolders();
        }}
        className="cursor-pointer underline"
      >
        {selectedFolder}
      </h1>
      {openDropdown && (
        <div className="absolute  w-48 h-52 bg-navBlack shadow-lg rounded-md pt-2 overflow-y-auto custom-scrollbar">
          {folders.map((folder) => (
            <li
              key={folder.id}
              className="p-2 hover:bg-blue-400 cursor-pointer list-none"
              onClick={() => {updateFolderName(folder.id,folder.name)
                setopenDropdown(prev=>!prev)
              }}
            >
              {folder.name}
            </li>
          ))}
        </div>
      )}
    </>
  );
};
