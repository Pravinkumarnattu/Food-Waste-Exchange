import { Outlet } from "react-router-dom";
import DonorSidebar from "./DonorSidebar";
import DonorTopbar from "./DonorTopbar";
import "./DonorLayout.css";

const DonorLayout = () => {
  return (
    <div className="donor-layout">
      <DonorSidebar />
      <div className="donor-content">
        <DonorTopbar />
        <Outlet />
      </div>
    </div>
  );
};

export default DonorLayout;
