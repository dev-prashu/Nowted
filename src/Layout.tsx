import React from "react";
import { Outlet } from "react-router";
import { Navbar } from "./components/left/Navbar";
import { SubFolder } from "./components/middle/SubFolder";
import { NoteContextProvider } from "./context/NoteContextProvider";

export const Layout: React.FC = () => {
  return (
    <>
      <NoteContextProvider>
        <div className="flex h-screen">
          <Navbar />
          <SubFolder />
          <Outlet />
        </div>
      </NoteContextProvider>
    </>
  );
};
