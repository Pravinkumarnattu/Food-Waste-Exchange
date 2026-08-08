import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api/axiosInstance";
import "./MyReservations.css";

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
        setCurrView(views.loading);
        const response = await api.get("/dashboard/ngo/my-reservations");
        setReservations(response.data);
        setCurrView(views.success);
      } catch (err) {
        setCurrView(views.failure);
        setErrMsg(err?.response?.data?.message);
        console.error(err);
      }
    };
    fetchReservations();
  }, []);

  const loadingView = () => <div className="loading-view">Loading...</div>;

  const reservedFoods = () => {
    return (
      <div className="my-reservations-container">
        {reservations.length !== 0 ? (
          <table className="reservations-table">
            <thead>
              <tr>
                <th>Food Name</th>
                <th>Donor</th>
                <th>Quantity</th>
                <th>Reserved On</th>
                <th>Pickup Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation) => {
                const { createdAt, pickupTime, status, _id } = reservation;
                const { foodName, quantity, donorId, image } =
                  reservation.foodId;
                const reservedTime = new Date(createdAt).toLocaleString(
                  "en-US",
                  {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  },
                );

                return (
                  <tr key={_id}>
                    <td>
                      <img
                        src={image ?? "/home_image.png"}
                        className="reserved-food-image"
                      />
                      <span>{foodName}</span>
                    </td>
                    <td>{donorId?.donor?.businessName}</td>
                    <td>{quantity}</td>
                    <td>{reservedTime}</td>
                    <td>
                      {pickupTime
                        ? new Date(pickupTime).toLocaleString("en-US", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true,
                          })
                        : "Pending"}
                    </td>
                    <td>
                      <span className={`status-badge ${status.toLowerCase()}`}>
                        {status[0].toUpperCase() + status.slice(1)}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="no-reservations">
            <p>You haven't made any reservations yet.</p>
            <Link to="/ngo/available-foods">Reserve Food</Link>
          </div>
        )}
      </div>
    );
  };

  const failureView = () => <div className="failure-view">{errMsg}</div>;

  const render = () => {
    switch (currView) {
      case views.loading:
        return loadingView();
      case views.success:
        return (
          <>
            <h1 className="reservations-head">My Reservations</h1>
            {reservedFoods()}
          </>
        );
      case views.failure:
        return failureView();
      default:
        return <></>;
    }
  };

  return <>{render()}</>;
};

export default MyReservations;
