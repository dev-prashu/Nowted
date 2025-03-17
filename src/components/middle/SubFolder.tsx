import { NoteList } from "./NoteList";

export const SubFolder = () => {
  return (
    <>
      <div className="pl-5 pr-8 pt-8 w-1/4 h-fullflex flex-col gap-5 overflow-y-scroll custom-scrollbar">
        <NoteList />
      </div>
    </>
  );
};
