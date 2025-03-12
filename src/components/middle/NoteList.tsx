import { useParams } from "react-router";
import { Note, useNotesApi } from "../../api/useNotesApi";
import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router";
import { NoteContext } from "../../context/NoteContext";
import { pageParam } from "../../types/pageParam";

export const NoteList = () => {
  const { folderId, isFavorite, isArchived, isDeleted } = useParams();
  const { loading, fetchNotes } = useNotesApi();
  const context = useContext(NoteContext);

  const [notes, setNotes] = useState<Note[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [filters, setFilters] = useState<pageParam>({
    page: 1,
    limit: 10,
  });

  useEffect(() => {
    const fetchInitialNotes = async () => {
      const params: pageParam = {
        page: 1,
        limit: 10,
      };

      setNotes([]);
      setPage(1);

      if (isFavorite) {
        params.favorite = true;
      } else if (isArchived) {
        params.archived = true;
      } else if (isDeleted) {
        params.deleted = true;
      } else if (folderId) {
        params.folderId = folderId;
      }

      setFilters(params);

      const response = await fetchNotes(params);
      setNotes(response);
      setHasMore(response.length === params.limit);
    };

    fetchInitialNotes();
  }, [
    isFavorite,
    isArchived,
    isDeleted,
    folderId,
    fetchNotes,
    context?.change,
  ]);

  const loadMoreNotes = async () => {
    const nextPage = page + 1;
    const params = { ...filters, page: nextPage };

    const response = await fetchNotes(params);

    setNotes((prev) => [...(prev || []), ...response]);
    setPage(nextPage);
    setHasMore(response.length === filters.limit);
  };

  if (loading && notes.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {notes.length > 0 ? (
        <>
          <h1 className="font-semibold text-2xl pb-4">
            {isFavorite
              ? "Favorites"
              : isArchived
              ? "Archived"
              : isDeleted
              ? "Trash"
              : notes[0]?.folder?.name || "Notes"}
          </h1>

          <div className="flex flex-col gap-4">
            {notes.map((note) => (
              <NavLink
                key={note.id}
                to={
                  isFavorite
                    ? `/${isFavorite}/notes/${note.id}`
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
            ))}
          </div>

          {hasMore && (
            <div className="flex justify-center mt-4">
              <button
                onClick={loadMoreNotes}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Load More
              </button>
            </div>
          )}
        </>
      ) : (
        <h1 className="text-gray-400 font-medium text-lg flex flex-col justify-center items-center">
          Nothing to show here
        </h1>
      )}
    </div>
  );
};
