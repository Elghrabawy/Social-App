import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <>
      <div className=" bg-primary-50 min-h-[100vh]">
        <Navbar />
        <div className="container ">
          <Outlet />
        </div>
      </div>
    </>
  );
}
