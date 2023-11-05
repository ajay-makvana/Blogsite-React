import React from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const authStatus = useSelector((state) => state.userAuthenticated);

  const navigate = useNavigate();
  const navItems = [
    {
      name: "Home",
      url: "/",
      active: true,
    },
    {
      name: "Login",
      url: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      url: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      url: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      url: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <>
      <header className="py-3 shadow bg-gray-500">
        <Container>
          <nav className="flex">
            {/* Logo */}
            <div className="mr-4">
              <Link to="/">
                <Logo width="70px" />
              </Link>
            </div>

            {/* Loop unordered list of above mentioned navItems */}
            <ul className="flex ml-auto">
              {navItems.map((item) => {
                return item.active ? (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.url)}
                      className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                    >
                      {item.name}
                    </button>
                  </li>
                ) : null;
              })}

              {/* Logout button  */}
              {authStatus && (
                <li>
                  <LogoutBtn />
                </li>
              )}
            </ul>
          </nav>
        </Container>
      </header>
    </>
  );
}

export default Header;
