import { useState} from "react";   
import {useNavigate} from 'react-router-dom'
import { RxHamburgerMenu } from "react-icons/rx";
import "./index.css";

const Header = () => {
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();
  const navItems = () => {
    return (
      <div className="nav-auth">
        <ul className="nav-links">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/">About</a>
          </li>
          <li>
            <a href="/">Contact</a>
          </li>
          <li>
            <a href="/">Services</a>
          </li>
        </ul>
        <div className="auth-buttons">
          <button onClick={() => navigate("/login")}>Login</button>
          <button onClick={() => navigate("/choose-goal")}>Sign Up</button>
        </div>
      </div>
    );
  };
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <img src="/logo.png" alt="Logo" />
        </div>
        <div className="hamburger-menu" onClick={() => setToggle(!toggle)}>
          <RxHamburgerMenu />
        </div>
        <div className="nav-container">{navItems()}</div>
      </div>
      {toggle && <div className="nav-container-responsive">{navItems()}</div>}
    </header>
  );
};

export default Header;
