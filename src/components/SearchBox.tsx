import { useEffect, useState } from "react";
import { useNotesApi } from "../api/useNotesApi";
import { useNavigate } from "react-router";

function SearchBox() {
  const [query, setQuery] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const { notes, searchQuery } = useNotesApi();
  const navigate=useNavigate();

  useEffect(() => {
    searchQuery(query);
  }, [searchQuery, query]);

  return (
    <div className="relative w-full">
      <input
        type="text"
        className="bg-lightBlack text-white w-full h-10 rounded-sm p-5 focus:outline-none"
        placeholder="Search Here"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setShowDropdown(e.target.value.length > 0);
        }}
        onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
        onFocus={() => setShowDropdown(query.length > 0)}
      />

      {showDropdown && (
        <ul className="absolute left-0 right-0 bg-black text-white rounded-sm  max-h-50 overflow-auto custom-scrollbar">
          {notes.length > 0 ? (
            notes.map((note) => (
              <li
                key={note.id}
                className="p-2 hover:bg-blue-500 cursor-pointer"
                onClick={()=>navigate(`/folder/${note.folderId}/notes/${note.id}`)}
              >
                {note.title}
              </li>
            ))
          ) : (
            <li className="p-2 text-gray-500">No results found</li>
          )}
        </ul>
      )}
    </div>
  );
}

export default SearchBox;
