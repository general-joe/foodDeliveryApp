import React from "react";
import { Outlet } from "react-router-dom";
import { AdminNavbar, MobileNavbar } from "../../components/Navbar/Navbar";

function AdminLayout() {
  return (
    <main className="w-screen h-screen flex p-0 max-[999px]:flex-col">
      {/* Navbar */}
      <div className="max-[999px]:hidden">
        <AdminNavbar />
      </div>
      {/* Mobile Nav */}
      <div className="min-[999px]:hidden">
        <MobileNavbar />
      </div>
      {/* Outlet */}
      <div className="flex-1 max-[999px]:rounded-none flex-col  overflow-y-scroll overflow-hidden">
        <div className="h-full">
          <Outlet />
        </div>
      </div>
    </main>
  );
}

export default AdminLayout;
