import { useEffect } from "react";
import api from "../api/axiosInstance";

const MyReservations = () => {
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await api.get("/dashboard/ngo/my-reservations");
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    };
    fetchReservations();
  });
  return <div>Reservations</div>;
};

export default MyReservations;
