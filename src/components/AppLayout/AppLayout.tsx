import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../Header/Header";

const AppLayout = () => {
  return (
    <main>
      <Header />
      <div className="mt-8 md:mx-12 mx-5">
        <Outlet />
      </div>
      <ToastContainer hideProgressBar autoClose={1000} />
    </main>
  );
};

export default AppLayout;
