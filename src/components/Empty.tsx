import React from "react";
import Icon from "../assets/DocumentIcon.png";
export const Empty: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-1/2 gap-4">
      <img src={Icon} alt="" />
      <h1 className="font-extrabold text-3xl">Select Note to view</h1>
      <h1 className="font-semibold text-lg text-gray-500">
        Choose a note from the list on the left to view its contents, <br />{" "}
        <span className="pl-16">or create a new note to add to your collection.</span>
      </h1>
    </div>
  );
};
