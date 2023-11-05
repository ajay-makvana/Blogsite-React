import { useEffect, useState } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth_service";
import { login, logout } from "./store/authSlice";
import { Header, Footer } from "./components/index";
import { Outlet } from "react-router-dom";

function App() {
  // current state is loading or not
  // if loading show loading Icon, else Data
  const [loading, setLoading] = useState(true);

  // dispatch
  const dispatch = useDispatch();

  // as app start check for user loggedIn or not
  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <>
      <Header />
      <main>
        {/* <Outlet/> */}
        <Outlet />
      </main>
      <Footer />
    </>
  ) : (
    <>
      <div className="text-2xl">Loading ...</div>
    </>
  );
}

export default App;
