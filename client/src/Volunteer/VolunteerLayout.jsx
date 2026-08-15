import { Outlet } from "react-router-dom";
import VolunteerSidebar from "./VolunteerSidebar";
import VolunteerTopbar from "./VolunteerTopbar";

const VolunteerLayout = () => {
  return (
    <div>
      <VolunteerSidebar />
      <main>
        <VolunteerTopbar />
        <Outlet />
      </main>
    </div>
  );
};

export default VolunteerLayout;
