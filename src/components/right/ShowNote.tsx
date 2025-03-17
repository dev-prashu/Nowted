import { useParams } from "react-router";
import { Note, useNotesApi } from "../../api/useNotesApi";
import { useEffect, useState, useRef } from "react";

import calenderIcon from "../../assets/calendarIcon.png";
import folderIcon from "../../assets/folderIcon.png";
import Dropdown from "../right/Dropdown";
import Restore from "../right/Restore";
import { FolderDropdown } from "./FolderDropdown";

export const ShowNote = () => {
  const { noteid } = useParams();

  const { fetchNoteById, updateNote } = useNotesApi();
  const [note, setNote] = useState<Note>();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const debounceTimer = useRef<number | null>(null);
  const [isDeleted, setIsDeleted] = useState<boolean>(
    note?.deletedAt ? true : false
  );

  useEffect(() => {
    if (noteid) {
      fetchNoteById(noteid).then((data) => {
        if (data && data.length > 0) {
          setNote(data[0]);
          setTitle(data[0].title);
          setContent(data[0].content);
          setIsDeleted(data[0].deletedAt ? true : false);
        }
      });
    }
  }, [noteid, fetchNoteById]);
  const handleUpdate = (updatedTitle: string, updatedContent: string) => {
    setTitle(updatedTitle);
    setContent(updatedContent);

    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    debounceTimer.current = setTimeout(() => {
      updateNote(noteid!, { title: updatedTitle, content: updatedContent });
      //context?.setIsChange(prev=>!prev);
    }, 2000);
  };

  if (isDeleted) return <Restore setIsDeleted={setIsDeleted} />;

  return (
    <>
      {note! ? (
        <div className="w-1/2 flex flex-col h-full">
          <div className="flex items-center justify-between p-10  ">
            <input
              type="text"
              className="font-semibold text-3xl bg-black focus:outline-none w-full"
              value={title}
              onChange={(e) => handleUpdate(e.target.value, content)}
              placeholder="Untitled Note"
            />
            <Dropdown setIsDeleted={setIsDeleted} />
          </div>
          <div className=" flex justify-between items-center  pl-10 p-5">
            <div className="flex justify-between items-center w-1/8 gap-5  ">
              <img src={calenderIcon} alt="" />
              <h1 className="text-gray-400 text-lg">Date</h1>
              <h1 className="text-white text-lg  ">
                {Intl.DateTimeFormat("en-GB").format(new Date(note.createdAt))}
              </h1>
            </div>
          </div>
          <div className=" flex justify-between items-center  pl-10 p-5 ">
            <div className=" flex justify-between items-center w-1/8 gap-5">
              <img src={folderIcon} alt="" />
              <h1 className=" text-gray-400 text-lg">Folder</h1>
              <span className="relative text-white text-lg ">
                <FolderDropdown folderName={note.folder.name} />
              </span>
            </div>
          </div>
          <textarea
            className="p-10  text-white bg-black h-full text-2xl font-medium focus:outline-none overflow-y-auto custom-scrollbar "
            rows={10}
            value={content}
            onChange={(e) => handleUpdate(title, e.target.value)}
            placeholder="Write Your Content Here"
          />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
