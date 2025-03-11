import { useParams } from "react-router";
import { useNotesApi } from "../api/useNotesApi";
import { useEffect } from "react";
import { NavLink } from "react-router";

export const SubFolder = () => {
  const { folderId, isFavorite, isArchived, isDeleted } = useParams();
  const {
    notes,
    loading,
    fetchNotes,
    fetchFavorites,
    fetchArchived,
    fetchDeleted,
  } = useNotesApi();

  useEffect(() => {
    if (isFavorite) {
      fetchFavorites();
    } else if (isArchived) {
      fetchArchived();
      console.log(isArchived);
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
      <div className="bg-lightBlack pl-5 pr-8 pt-8 w-1/4 flex flex-col gap-5 overflow-y-scroll custom-scrollbar h-screen">
        {filteredNotes.length > 0 ? (
          <>
            <h1 className="font-semibold text-2xl">
              {isFavorite
                ? "Favorites"
                : isArchived
                ? "Archived"
                : isDeleted
                ? "Trash"
                : filteredNotes[0].folder.name}
            </h1>

            {filteredNotes.map((note) => (
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
                <h1 className="font-semibold p-5 text-xl">{note.title}</h1>

                <div className="flex justify-between p-5 pb-5">
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
            ))}
          </>
        ) : (
          <h1 className="text-gray-400 font-medium text-lg">
            Nothing to show here
          </h1>
        )}
      </div>
    </>
  );
};
