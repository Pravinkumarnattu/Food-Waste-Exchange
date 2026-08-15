import { Outlet } from "react-router-dom";
import VolunteerSidebar from "./VolunteerSidebar";
import VolunteerTopbar from "./VolunteerTopbar";
import "./VolunteerLayout.css"

const VolunteerLayout = () => {
  return (
    <div className="volunteer-layout">
      <VolunteerSidebar />
      <main className="volunteer-main">
        <VolunteerTopbar />
        <Outlet />
      </main>
    </div>
  );
};

export default VolunteerLayout;
