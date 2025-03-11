import { useEffect } from "react";
import docicon from "../assets/docicon.png";
import { NavLink } from "react-router";

import { useNotesApi } from "../api/useNotesApi";

export const Recents: React.FC = () => {
  const { notes, loading, fetchRecentNotes } = useNotesApi();

  useEffect(() => {
    fetchRecentNotes();
  }, [fetchRecentNotes]);
  if (loading) {
    <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col">
      <h1 className="font-semibold text-gray-500">Recents</h1>

      {notes.map((note) => (
        <div key={note.id} className="flex gap-4 pt-3 pb-3 pl-5 pr-5">
          <img className="h-5 w-5" src={docicon} alt="Document Icon" />
          <NavLink
            to={`/folder/${note.folderId}/notes/${note.id}`}
            className="font-semibold text-white hover:text-blue-500"
          >
            {note.title}
          </NavLink>
        </div>
      ))}
    </div>
  );
};
