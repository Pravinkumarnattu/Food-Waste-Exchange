import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBoxOpen, FaUserCircle } from "react-icons/fa";
import { MdDashboard, MdLogout } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import Cookies from "js-cookie";
import "./DonorSidebar.css";

const NgoSidebar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    Cookies.remove("jwt_token");
    Cookies.remove("role");
    navigate("/login", { replace: true });
  };

  return (
    <>
      <div className="mobile-header">
        <img src="/logo_white.png" alt="logo" className="mobile-logo" />

        <button
          className="menu-btn"
          onClick={() => setShowMenu(!showMenu)}
        >
          <RxHamburgerMenu size={25} />
        </button>
      </div>

      <aside className={`ngo-sidebar ${showMenu ? "show" : ""}`}>
        <img src="/logo_white.png" alt="logo" className="sidebar-logo" />

        <NavLink
          to="/ngo/dashboard"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
          onClick={() => setShowMenu(false)}
        >
          <MdDashboard size={22} />
          Dashboard
        </NavLink>


        <NavLink
          to="/ngo/profile"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
          onClick={() => setShowMenu(false)}
        >
          <FaUserCircle size={22} />
          Profile
        </NavLink>

        <button onClick={logout} className="sidebar-logout">
          <MdLogout size={22} />
          Logout
        </button>
      </aside>
    </>
  );
};

export default NgoSidebar;