import { useEffect } from "react";
import api from "../../api/axiosInstance";

const Donor = () => {
  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get("/dashboard/donor");
      console.log(res);
    };
    fetchData();
  });

  return <div>Pravin</div>;
};

export default Donor;
