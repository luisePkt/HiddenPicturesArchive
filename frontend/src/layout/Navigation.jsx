import { useEffect, useRef, useState } from "react";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import Userdata from "../pages/Userdata";
import { Link, NavLink } from "react-router-dom";
import style from "../styles/Navigation.module.css";
import { useUserContext } from "../utils/Provider";
import IconSandwich from "../assets/icons/bars-solid.svg";

const Navigation = () => {
  const { activeUser, setActiveUser, port } = useUserContext();

  // show and hide navBar:
  const [showNavBar, setShowNavBar] = useState(false);
  const [error, setError] = useState(null);

  // reference navMenu to hide mobile nav-menu while selecting category:
  const navMenuRef = useRef(null);

  // reference faBars to check if click is on menuIcon or outside:
  const menuIconRef = useRef(null);

  // routes
  const routes = [
    // { id: 1, name: "home", to: "/", element: <Home /> }, // test
    { id: 1, name: "register", to: "/register", element: <Register /> },
    { id: 2, name: "login", to: "/login", element: <Login /> },
    { id: 3, name: "logout", to: "/logout", element: <Logout /> },
    { id: 4, name: "my userdata", to: "/user", element: <Userdata /> },
  ];

  // show/hide navMenu:
  const handleShowNavBar = () => {
    setShowNavBar(!showNavBar);
  };

  // hide mobile nav-menu while selcting category:
  const handleCloseNavMenu = () => {
    setShowNavBar(false);
  };

  // hide nav-menu, while clicking outside of nav:
  const closeNavClickOutside = (event) => {
    if (
      navMenuRef.current &&
      !navMenuRef.current.contains(event.target) &&
      !menuIconRef.current.contains(event.target)
    ) {
      setShowNavBar(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeNavClickOutside);
    return () => {
      document.removeEventListener("mousedown", closeNavClickOutside);
    };
  }, []); // NOTICE: wie könnte ich das mit useRef machen?

// Logout:
  const handleLogout = async () => {
    try {
      const response = await fetch(`http://localhost:${port}/user/logout`, {
        method: "POST",
        credentials: "include",
      });
      console.log({ user: response.user });
      setActiveUser(response.user);
    } catch (error) {}
  };

  return (
    <nav>
      {/* title */}
      <Link to="/">
        <div className={style.logo}>
          <p>Hidden pictures</p>
        </div>
      </Link>

      {/* bars */}
      <div className={style.bars} ref={menuIconRef}>
        <img
          src={IconSandwich}
          onClick={handleShowNavBar}
          className={style.barsIcon}
        />
      </div>

      {/* nav */}
      <div
        ref={navMenuRef}
        onClick={closeNavClickOutside}
        className={`${style.navElements} ${showNavBar && style.active}`}
      >
        {!activeUser ? (
          <ul onClick={handleCloseNavMenu}>
            {routes.slice(0, 2).map((route) => (
              <div key={route.id} className={style.linkContainer}>
                <li>
                  <NavLink
                    to={route.to}
                    style={({ isActive }) => {
                      return isActive
                        ? { textDecoration: "underline" }
                        : undefined;
                    }}
                    className={style.navLink}
                  >
                    {route.name}
                  </NavLink>
                </li>
              </div>
            ))}
          </ul>
        ) : (
          <ul onClick={handleCloseNavMenu}>
            {/* {routes.slice(2).map((route) => (
              <div key={route.id} className={style.linkContainer}> */}
            <li>
              {/* <NavLink
                    to={route.to}
                    style={({ isActive }) => {
                      return isActive
                        ? { textDecoration: "underline" }
                        : undefined;
                    }}
                    className={style.navLink}
                    onClick={handleLogout}
                  >
                    {route.name}
                  </NavLink> */}
              <div key={3} className={style.linkContainer}>
                <NavLink
                  to={"/logout"}
                  style={({ isActive }) => {
                    return isActive
                      ? { textDecoration: "underline" }
                      : undefined;
                  }}
                  className={style.navLink}
                  onClick={handleLogout}
                >
                  {"logout"}
                </NavLink>
              </div>
            </li>
            <li>
              {" "}
              <div key={4} className={style.linkContainer}>
                <NavLink
                  to={"/user"}
                  style={({ isActive }) => {
                    return isActive
                      ? { textDecoration: "underline" }
                      : undefined;
                  }}
                  className={style.navLink}
                >
                  {"my userdata"}
                </NavLink>{" "}
              </div>
            </li>

            {/* </div>
            ))} */}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navigation;

// ALT handle logout:
// const handleLogout = async () => {
//   try {
//     console.log("test");
//     const response = await fetch(`http://localhost:${port}/user/logout`, {
//       method: "POST",
//       credentials: "include",
//     });
//     console.log("response: ", response);
//     if (!response.ok) {
//       throw new Error("Network response not okay");
//     }
//     console.log("logged out");
//     setActiveUser(false);
//     console.log(activeUser);
//   } catch (error) {
//     console.error("Problem with fetching: ", error);
//     setError({ message: error.message });
//   }
// };
