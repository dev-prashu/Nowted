import searchIcon from "../assets/searchIcon.png";
import logo from "../assets/logo.png";
import { useNavigate, useParams } from "react-router";
import { useNotesApi } from "../api/useNotesApi";
import { Note } from "../api/useNotesApi";
import { useState } from "react";
import SearchBox from "./SearchBox";

const AddSearchBar = () => {
  const { folderId, isFavorite, isArchive, isDeleted } = useParams();
  const { createNote } = useNotesApi();
  const navigate = useNavigate();
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const handleCreateNewNote = async () => {
    const newNote: Partial<Note> = {
      folderId: folderId!,
      title: "",
      content: "",
      isFavorite: false,
      isArchived: false,
    };
    if (isFavorite || isArchive || isDeleted) {
      alert("Select any folder to create");
    } else {
      const id = await createNote(newNote);
      navigate(`/folder/${folderId}/notes/${id}`);
    }
  };

  return (
    <>
      <div className="">
        <div className="flex justify-between items-center">
          <img src={logo} alt="Logo" />
          <img
            className=""
            src={searchIcon}
            alt="Search"
            onClick={() => setIsSearch((prev) => !prev)}
          />
        </div>
        <div className="py-6">
          {isSearch ? (
            <SearchBox />
          ) : (
            <button
              className="bg-gray-700 text-white w-full h-10 rounded-sm hover:bg-gray-700 transition"
              onClick={handleCreateNewNote}
            >
              + New Note
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default AddSearchBar;
