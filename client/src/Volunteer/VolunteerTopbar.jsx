import { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import { Link } from "react-router-dom";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";
import Cookies from "js-cookie";
import "./VolunteerTopbar.css"

const VolunteerTopbar = () => {
  const [name, setName] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await api.get("/auth/me");
      setName(response?.data?.volunteer?.fullName);
    };
    fetchUser();
  }, []);

  return (
    <div className="volunteer-topbar">
      <button onClick={() => setDropdownOpen(!dropdownOpen)}>
        <MdAccountCircle size={24} color="#15803D" />
        {name}
        {dropdownOpen ? <IoChevronUp size={20} /> : <IoChevronDown size={20} />}
      </button>
      {dropdownOpen && (
        <div
          className="volunteer-topbar-dropdown"
          onClick={() => setDropdownOpen(false)}
        >
          <Link to="/volunteer/profile">Profile</Link>
          <Link
            to="/login"
            replace
            onClick={() => {
              Cookies.remove("jwt_token");
              Cookies.remove("role");
            }}
          >
            Logout
          </Link>
        </div>
      )}
    </div>
  );
};

export default VolunteerTopbar;