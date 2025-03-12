import { useParams } from "react-router";
import calenderIcon from "../../assets/calendarIcon.png";
import folderIcon from "../../assets/folderIcon.png";
import { Folder, useFolderApi } from "../../api/useFolderApi";
import { useEffect } from "react";

export const NewNote = () => {
  const { folderId } = useParams();
  const { folders, fetchFolders } = useFolderApi();
  

  const folder  = folders.filter((f:Folder) => f.id === folderId)[0];
 
  useEffect(() => {
    fetchFolders();
  },[fetchFolders]);
  return (
    <>
      <div className="p-12 w-1/2">
        <input
          className="h-16 w-[400px] bg-black text-white font-semibold text-3xl p-5"
          type="text"
          placeholder="Initial Note Heading"
        />

        <div className="flex gap-10 items-center w-16 p-5 underline">
          <img src={calenderIcon} alt="" />
          <h1 className="text-gray-400 text-lg">
            {" "}
            {Intl.DateTimeFormat("en-GB").format(new Date())}
          </h1>
        </div>

        <div className="flex gap-10 items-center p-5 underline">
          <img src={folderIcon} alt="" />
          <h1 className="text-gray-400 text-lg">{folder ? folder.name : ""}</h1>

        </div>
        <div>
          <textarea
            rows={10}
            className=" p-5 w-full  text-white bg-black text-2xl font-medium focus:outline-none focus:border-none"
            placeholder="Start Writing Your Content Here..."
          ></textarea>
        </div>
      </div>
    </>
  );
};
