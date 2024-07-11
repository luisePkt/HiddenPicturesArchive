import { useEffect, useRef, useState } from "react";
import Home from "../pages/Home";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  // show and hide navBar:
  const [showNavBar, setShowNavBar] = useState(false);

  // reference navMenu to hide mobile nav-menu while selecting category:
  const navMenuRef = useRef(null);

  // reference faBars to check if click is on menuIcon or outside:
  const menuIconRef = useRef(null);

  // routes
  const routes = [
    { id: 1, name: "home", to: "/", element: <Home /> }, // test
    // { id: 1, name: "login", to: "/login", element },
    // { id: 2, name: "register", to: "/register", element },
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
    <div>
      {/* title */}
      <div>
        <p>Hidden pictures</p>
      </div>

      {/* bars */}
      <div>
        <img src="../assets/bars-solid.svg" onClick={handleShowNavBar} />
      </div>

      {/* nav */}
      <div ref={navMenuRef} onClick={closeNavClickOutside}>
        <ul onClick={handleCloseNavMenu}>
          {routes.map((route) => (
            <div key={route.id}>
              <li>
                <NavLink to={route.to}>{route.name}</NavLink>
              </li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navigation;
