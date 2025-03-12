import { NoteList } from "./NoteList";

export const SubFolder = () => {
  
     return (
    <>
     
      <div className="bg-lightBlack pl-5 pr-8 pt-8 w-1/4 flex flex-col gap-5 overflow-y-scroll custom-scrollbar h-screen">
        <NoteList />
      </div>
    </>
  );
};
