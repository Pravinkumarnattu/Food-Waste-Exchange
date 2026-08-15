import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaUserCircle, FaClipboardCheck} from "react-icons/fa";
import { MdDashboard, MdLogout, MdLocalShipping } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import Cookies from "js-cookie";
import "./VolunteerSidebar.css"

const VolunteerSidebar = () => {
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

        <button className="menu-btn" onClick={() => setShowMenu(!showMenu)}>
          <RxHamburgerMenu size={25} />
        </button>
      </div>

      <aside className={`volunteer-sidebar ${showMenu ? "show" : ""}`}>
        <img src="/logo_white.png" alt="logo" className="sidebar-logo" />

        <NavLink
          to="/volunteer/dashboard"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
          onClick={() => setShowMenu(false)}
        >
          <MdDashboard size={22} />
          Dashboard
        </NavLink>

        <NavLink
          to="/volunteer/pickup-requests"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
          onClick={() => setShowMenu(false)}
        >
          <MdLocalShipping size={22} />
          Pickup Requests
        </NavLink>

        <NavLink
          to="/volunteer/my-deliveries"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
          onClick={() => setShowMenu(false)}
        >
          <FaClipboardCheck size={22} />
          My Deliveries
        </NavLink>

        <NavLink
          to="/volunteer/profile"
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

export default VolunteerSidebar;