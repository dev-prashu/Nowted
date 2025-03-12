import { useParams } from "react-router";
import { useNotesApi } from "../../api/useNotesApi";
import { useContext, useEffect } from "react";
import { NavLink } from "react-router";
import { NoteContext } from "../../context/NoteContext";

export const NoteList = () => {
  const { folderId, isFavorite, isArchived, isDeleted } = useParams();
  const {
    notes,
    loading,
    fetchNotes,
    fetchFavorites,
    fetchArchived,
    fetchDeleted,
  } = useNotesApi();
  const context = useContext(NoteContext);

  useEffect(() => {
    if (isFavorite) {
      fetchFavorites();
    } else if (isArchived) {
      fetchArchived();
    } else if (isDeleted) {
      fetchDeleted();
    } else {
      fetchNotes();
    }
  }, [
    fetchNotes,
    fetchFavorites,
    fetchArchived,
    fetchDeleted,
    isDeleted,
    isFavorite,
    isArchived,
    context?.change,
  ]);

  if (loading) {
    return <p>Loading...</p>;
  }
  const filteredNotes =
    isFavorite || isArchived || isDeleted
      ? notes
      : notes.filter((note) => note.folderId === folderId);

  return (
    <>
      <div>
        {filteredNotes.length > 0 ? (
          <>
            <h1 className="font-semibold text-2xl pb-4">
              {isFavorite
                ? "Favorites"
                : isArchived
                ? "Archived"
                : isDeleted
                ? "Trash"
                : filteredNotes[0].folder.name}
            </h1>
              

           <div className="flex flex-col gap-4"> {filteredNotes.map((note) => (
              <NavLink
                key={note.id}
                to={
                  isFavorite
                    ? `/favorites/${isFavorite}/notes/${note.id}`
                    : isArchived
                    ? `/archive/${isArchived}/notes/${note.id}`
                    : isDeleted
                    ? `/trash/${isDeleted}/notes/${note.id}`
                    : `/folder/${folderId}/notes/${note.id}`
                }
                className="border-2 rounded-sm block"
              >
                <h1 className="font-semibold p-2 text-xl">{note.title}</h1>

                <div className="flex justify-between p-2">
                  <h1 className="text-gray-400 w-1/2 font-medium text-lg">
                    {Intl.DateTimeFormat("en-GB").format(
                      new Date(note.createdAt)
                    )}
                  </h1>

                  <p className="text-gray-400 text-right w-1/2 font-medium text-lg">
                    {note.preview}...
                  </p>
                </div>
              </NavLink>
            ))}</div>
          </>
        ) : (
          <h1 className="text-gray-400  font-medium text-lg flex flex-col justify-center items-center">
            Nothing to show here
          </h1>
        )}
      </div>
    </>
  );
};
