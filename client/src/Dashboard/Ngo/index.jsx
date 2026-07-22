import { useEffect } from "react";
import api from "../../api/axiosInstance";

const Ngo = () => {
  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get("/dashboard/ngo");
      console.log(res);
    };
    fetchData();
  });

  return <div>Pravin</div>;
};

export default Ngo;
