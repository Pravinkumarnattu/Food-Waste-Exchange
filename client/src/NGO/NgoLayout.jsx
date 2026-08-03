import { Outlet } from "react-router-dom";
import NgoSidebar from "./NgoSidebar";
import NgoTopbar from "./NgoTopbar";
import "./NgoLayout.css";

const NgoLayout = () => {
  return (
    <div className="ngo-layout">
      <NgoSidebar />
      <main className="ngo-main">
        <NgoTopbar />
        <Outlet />
      </main>
    </div>
  );
};

export default NgoLayout;
