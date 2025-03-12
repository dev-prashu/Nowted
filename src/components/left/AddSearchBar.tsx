import searchIcon from "../../assets/searchIcon.png";
import logo from "../../assets/logo.png";
import { useNavigate, useParams } from "react-router";
import { Note } from "../../api/useNotesApi";
import { useContext, useState } from "react";
import SearchBox from "../left/SearchBox";
import { useNotesApi } from "../../api/useNotesApi";
import { NoteContext } from "../../context/NoteContext";

const AddSearchBar = () => {
  const { folderId, isFavorite, isArchive, isDeleted } = useParams();
  const { createNote } = useNotesApi();
  const navigate = useNavigate();
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const context=useContext(NoteContext);
  const handleCreateNewNote = async () => {
    const newNote: Partial<Note> = {
      folderId: folderId!,
      title: "Untitled Note",
      content: "No Content to Show!!",
      isFavorite: false,
      isArchived: false,
    };
    if (isFavorite || isArchive || isDeleted) {
      alert("Select any folder to create");
    } else {
      const id = await createNote(newNote);
      context?.setIsChange(prev=>!prev);
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
