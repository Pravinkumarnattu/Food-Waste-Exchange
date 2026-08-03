import { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import { Link } from "react-router-dom";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";
import "./NgoTopbar.css";

const NgoTopbar = () => {
  const [businessName, setBusinessName] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await api.get("/auth/me");
      setBusinessName(response?.data?.ngo?.businessName);
    };
    fetchUser();
  }, []);

  return (
    <div className="ngo-topbar">
      <button onClick={() => setDropdownOpen(!dropdownOpen)}>
        <MdAccountCircle size={24} color="#15803D" />
        {businessName}
        {dropdownOpen ? <IoChevronUp size={20} /> : <IoChevronDown size={20} />}
      </button>
      {dropdownOpen && (
        <div
          className="ngo-topbar-dropdown"
          onClick={() => setDropdownOpen(false)}
        >
          <Link to="/ngo/profile">Profile</Link>
        </div>
      )}
    </div>
  );
};

export default NgoTopbar;
