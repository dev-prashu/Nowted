import { useEffect, useState } from "react";
import option from "../assets/options.png";
import bin from "../assets/whitebin.png";
import fav from "../assets/whiteStar.png";
import archive from "../assets/whitearchive.png";
import { useNavigate, useParams } from "react-router";
import { Note, useNotesApi } from "../api/useNotesApi";

const Dropdown = ({
  setIsDeleted,
}: {
  setIsDeleted: (value: boolean) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { fetchNoteById, deleteNoteById, updateNote } = useNotesApi();
  const { noteid } = useParams();
  const [note, setNote] = useState<Note>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async () => {
      const noteData = await fetchNoteById(noteid!);
      if (noteData) {
        setNote(noteData[0]);
      }
    };
    fetchNote();
  }, [noteid, fetchNoteById]);

  const handleDelete = () => {
    deleteNoteById(noteid!);
    setIsDeleted(true);
  };

  const handleFavorite = () => {
    if (note) {
      const updatedNote = { ...note, isFavorite: !note.isFavorite };
      updateNote(noteid!, updatedNote);
      setNote(updatedNote);
    }
  };

  const handleArchive = () => {
    if (note) {
      const updatedNote = { ...note, isArchived: !note.isArchived };
      updateNote(noteid!, updatedNote);
      setNote(updatedNote);
      navigate(`/archive/${true}`);
    }
  };

  return (
    <div className="relative inline-block">
      <img
        src={option}
        onClick={() => setIsOpen(!isOpen)}
        alt="Options"
        className="cursor-pointer"
      />

      {isOpen && (
        <div className="absolute right-3 w-40 z-10 border rounded-md shadow-lg">
          <ul className="p-1">
            <li
              className="flex p-3 pl-5 gap-4 items-center  hover:bg-blue-400 cursor-pointer"
              onClick={handleDelete}
            >
              <img src={bin} alt="" />
              <p className="font-semibold text-white text-lg">Delete</p>
            </li>
            <li
              className="flex p-3 pl-5 gap-4 items-center  hover:bg-blue-400 cursor-pointer"
              onClick={handleFavorite}
            >
              <img src={fav} alt="" />
              <p className="font-semibold text-white text-lg">
                {note!.isFavorite
                  ? "Remove From Favorites"
                  : "Add to Favorites"}
              </p>
            </li>
            <li
              className="flex p-3 pl-5 gap-4 items-center  hover:bg-blue-400 cursor-pointer"
              onClick={handleArchive}
            >
              <img src={archive} alt="" />
              <p className="font-semibold text-white text-lg">
                {note!.isArchived ? "Remove from Archive" : "Add to Archive"}
              </p>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
