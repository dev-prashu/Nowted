import { useNavigate, useParams } from "react-router";
import clock from "../assets/clock.png";
import { Note, useNotesApi } from "../api/useNotesApi";
import { useEffect, useState } from "react";


function Restore({ setIsDeleted }: { setIsDeleted: (value: boolean) => void  }) {
  const { noteid } = useParams();
  const [note, setNote] = useState<Note>();
  const { restoreNote, fetchNoteById } = useNotesApi();
  const navigate=useNavigate();
  useEffect(() => {
    fetchNoteById(noteid!).then((data) => {
      if (data) {
        setNote(data[0]);
      }
    });
  }, [fetchNoteById, noteid]);

  const handleRestore = () => {
    restoreNote(noteid!);
    setIsDeleted(false);
    navigate(`/folder/${note!.folderId}/notes/${noteid}`);
    
  };
  return (
    <div className="flex flex-col justify-center items-center gap-2 w-1/2 ">
      <img src={clock} alt="" />
      <h1 className="text-3xl font-semibold">
        Restore <span>{noteid ? `“${note?.title}”` : ""}</span>
      </h1>
      <h1 className="text-xl w-1/2 text-gray-600 p-2">
        Don't want to lose this note? It's not too late! Just click the
        'Restore' button and it will be added back to your list. It's that
        simple.
      </h1>
      <button
        className="bg-blue-800 text-white font-medium text-xl rounded-md p-3 w-40 "
        onClick={handleRestore}
      >
        Restore
      </button>
    </div>
  );
}

export default Restore;
