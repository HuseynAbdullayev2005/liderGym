  // src/layout/MainLayout.jsx
  import React from "react";
  import { Outlet } from "react-router-dom";
  import Navbar from "./Navbar";


  function MainLayout() {
    return (
      <>
        <Navbar />
        <Outlet />
      </>
    );
  }

  export default MainLayout;
