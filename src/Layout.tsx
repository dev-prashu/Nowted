import React from "react";
import { Outlet } from "react-router";
import { Navbar } from "./components/Navbar";
import { SubFolder } from "./components/SubFolder";

export const Layout: React.FC = () => {
  return (
    <>
      <div className="flex">
      <Navbar/>
      <SubFolder/>
      <Outlet />
      </div>
      
    </>
  );
};
