import React from "react";
import { Outlet, useNavigation } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ToastContainer } from "react-toastify";
import Loading from "../pages/Loading";

const MainLayout = () => {
  const { state } = useNavigation();
  return (
    <div>
      <Navbar></Navbar>
      <div className="mx-auto">
        {state == "loading" ? <Loading></Loading> : <Outlet></Outlet>}
      </div>
      <Footer></Footer>
      <ToastContainer />
    </div>
  );
};

export default MainLayout;
