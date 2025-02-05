import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import { logout } from "../Redux/Slices/AuthSlice";
const HomeLayout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state.auth?.isLoggedIn);
  const role = useSelector((state) => state.auth?.role);

  const changeWidth = () => {
    const drawerSide = document.getElementsByClassName("drawer-side");
    drawerSide[0].style.width = "auto";
  };

  const handelDrawer = () => {
    const element = document.getElementsByClassName("drawer-toggle");
    element[0].checked = false;
    const drawerSide = document.getElementsByClassName("drawer-side");
    drawerSide[0].style.width = 0;
  };


  const handleLogout = async (event) => {
    event.preventDefault();

    // calling logout action
    const res = await dispatch(logout());

    // redirect to home page if true
    if (res?.payload?.success) navigate("/");
  };

  return (
    <div className="min-h-[90vh ">
      <div className="drawer absolute left-0 z-50 w-fit ">
        <input className="drawer-toggle" id="my-drawer" type="checkbox" />
        <div className="drawer-content">
          <label htmlFor="my-drawer">
            <FiMenu
              onClick={changeWidth}
              size={"32px"}
              className="font-bold text-white m-4"
            />
          </label>
        </div>
        <div className="drawer-side w-0">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>

          <ul className="menu p-4 w-48 sm:w-80 h-[100%] bg-base-200 text-base-content relative">
            <li className="w-fit absolute right-2 z-50">
              <button onClick={handelDrawer}>
                <AiFillCloseCircle size={24} />
              </button>
            </li>
            <li>
              <Link to="/">Home</Link>
            </li>

            {isLoggedIn && role == "ADMIN" && (
              <li>
                <Link to="admin/dashboard">Admin Dashboard</Link>
              </li>
            )}
            <li>
              <Link to="/courses">All Courses</Link>
            </li>
            <li>
              <Link to="/cotact">Contact Us</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            {!isLoggedIn && (
              <div className="absolute bottom-4 w-[90%]">
                <div className="w-full gap-4  flex items-center justify-center">
                  <button className="btn-primary transition-all ease-in-out delay-150 bg-green-600 hover:bg-green-800 px-4 py-1 text-white font-semibold rounded-md w-full">
                    <Link to="/login">Login</Link>
                  </button>
                  <button className="btn-secondary transition-all ease-in-out delay-150 bg-blue-600 hover:bg-blue-800 px-4 py-1 text-white font-semibold rounded-md w-full">
                    <Link to="/signup">Signup</Link>
                  </button>
                </div>
              </div>
            )}

            {isLoggedIn && (
              <div className="absolute bottom-4  w-[90%]">
                <div className="w-full flex gap-4 items-center justify-center">
                  <button className="btn-primary px-4  text-white py-1 font-semibold bg-slate-600 rounded-md w-full">
                    <Link to="/user/profile">Profile</Link>
                  </button>
                  <button className="btn-secondary px-4 bg-red-600 text-white  hover:bg-red-500 py-1 font-semibold rounded-md w-full">
                    <Link onClick={handleLogout}>Logout</Link>
                  </button>
                </div>
              </div>
            )}
          </ul>
        </div>
      </div>
      {children}

      <Footer />
    </div>
  );
};

export default HomeLayout;
