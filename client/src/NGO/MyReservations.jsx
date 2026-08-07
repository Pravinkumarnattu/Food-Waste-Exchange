import { useState, useEffect } from "react";
import api from "../api/axiosInstance";

const views = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  loading: "LOADING",
};

const MyReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [currView, setCurrView] = useState(views.initial);
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
  }, []);
  return <div>Reservations</div>;
};

export default MyReservations;
