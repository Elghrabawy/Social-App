import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function AuthLayout() {
  return (
    <>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Navbar />
        <div className="flex flex-1 items-center justify-center">
          <div className="max-w-2xl w-full p-4">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
