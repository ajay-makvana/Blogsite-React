import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth_service";
import { logout } from "../../store/authSlice";

function LogoutBtn() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    authService
      .logout()
      .then(() => {
        dispatch(logout());
      })
      .catch((error) => {
        console.log("Header :: LogoutBtn.jsx :: error ", error);
      });
  };

  return (
    <>
      <button
        onClick={logoutHandler}
        className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
      >
        Logout
      </button>
    </>
  );
}

export default LogoutBtn;
