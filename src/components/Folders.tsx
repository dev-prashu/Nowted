import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import addFolderIcon from "../assets/addFoldericon.png";
import closeIcon from "../assets/closeFolder.png";
import openIcon from "../assets/openFolderIcon.png";
import { useFolderApi } from "../api/useFolderApi";
import deleteIcon from "../assets/deleteIcon.png";

export const Folders: React.FC = () => {
  const {
    folders,
    loading,
    fetchFolders,
    createFolder,
    deleteFolder,
    updateFolder,
  } = useFolderApi();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isNew, setIsNew] = useState<boolean>(false);
  const [folderName, setFolderName] = useState<string | null>(null);
  const [editFolderId, setEditFolderId] = useState<string | null>(null);

  useEffect(() => {
    fetchFolders();
  }, [fetchFolders]);

  useEffect(() => {
    if (!loading && folders.length > 0 && window.location.pathname === "/") {
      navigate(`/folder/${folders[0].id}`);
    }
  }, [folders, loading, navigate]);

  const handleDoubleClick = (folderId: string, folderName: string) => {
    setEditFolderId(folderId);
    setFolderName(folderName);
  };

  const handleSaveEdit = (folderId: string, newName: string) => {
    console.log("Updated Folder");
    updateFolder(folderId, newName);
    setEditFolderId(null);
    setFolderName(null);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col pt-5">
      <div className="flex justify-between pr-7">
        <h1 className="font-semibold text-gray-500">Folders</h1>
        <img
          src={addFolderIcon}
          onClick={() => {
            setIsEditing(!isEditing);
            setIsNew(!isNew);
          }}
        />
      </div>

      {isEditing && isNew && (
        <input
          type="text"
          onChange={(e) => setFolderName(e.target.value)}
          className="bg-lightBlack text-white p-3 w-full flex flex-col gap-5"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              createFolder({ name: folderName! });
              setIsEditing(false);
              setIsNew(false);
            }
          }}
          placeholder="New Folder"
        />
      )}

      <ul className="overflow-y-scroll custom-scrollbar h-96 pt-2">
        {folders.map((folder) => (
          <li key={folder.id} className="list-none">
            {editFolderId === folder.id ? (
              <input
                type="text"
                value={folderName || ""}
                onChange={(e) => setFolderName(e.target.value)}
                onBlur={() => handleSaveEdit(folder.id, folderName!)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSaveEdit(folder.id, folderName!);
                  }
                }}
                className="bg-lightBlack text-white p-3 w-full"
              />
            ) : (
              <NavLink to={`/folder/${folder.id}`}>
                {({ isActive }) => (
                  <div
                    className={`flex gap-4 pt-3 pb-3 pl-5 pr-5 items-center  ${
                      isActive
                        ? "text-white font-bold bg-blue-500"
                        : "text-white"
                    }`}
                    onDoubleClick={() =>
                      handleDoubleClick(folder.id, folder.name)
                    }
                  >
                    <img
                      src={isActive ? openIcon : closeIcon}
                      alt="Folder Icon"
                      className="h-5 w-5"
                    />
                    <div className="flex justify-between w-full">
                      <h1 className="font-semibold">{folder.name}</h1>
                      <img
                        src={deleteIcon}
                        alt=""
                        onClick={() => deleteFolder(folder.id)}
                      />
                    </div>
                  </div>
                )}
              </NavLink>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
