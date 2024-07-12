import { useEffect, useRef, useState } from "react";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import { NavLink } from "react-router-dom";
import style from "../styles/Navigation.module.css";

const Navigation = () => {
  // show and hide navBar:
  const [showNavBar, setShowNavBar] = useState(false);

  // reference navMenu to hide mobile nav-menu while selecting category:
  const navMenuRef = useRef(null);

  // reference faBars to check if click is on menuIcon or outside:
  const menuIconRef = useRef(null);

  // routes
  const routes = [
    // { id: 1, name: "home", to: "/", element: <Home /> }, // test
    { id: 1, name: "register", to: "/register", element: <Register /> },
    { id: 2, name: "login", to: "/login", element: <Login /> },
  ];

  // show/hide navMenu:
  const handleShowNavBar = () => {
    setShowNavBar(!showNavBar);
  };

  // hide mobile nav-menu while selcting category:
  const handleCloseNavMenu = () => {
    setShowNavBar(false);
  };

  //  hide nav-menu, while clicking outside of nav:
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
  }, []);

  return (
    <nav>
      {/* title */}
      <div className={style.logo}>
        <p>Hidden pictures</p>
      </div>

      {/* bars */}
      <div className={style.bars}>
        <img src="../assets/bars-solid.svg" onClick={handleShowNavBar} />
      </div>

      {/* nav */}
      <div
        ref={navMenuRef}
        onClick={closeNavClickOutside}
        className={`${style.navElements} ${showNavBar && style.active}`}
      >
        <ul onClick={handleCloseNavMenu}>
          {routes.map((route) => (
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
      </div>
    </nav>
  );
};

export default Navigation;
