import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axiosInstance";
import "./NgoDashboard.css";

const views = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  loading: "LOADING",
};

const NgoDashboard = () => {
  const [organizationName, setOrganizationName] = useState("");
  const [reservations, setReservations] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [currView, setCurrView] = useState(views.initial);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setCurrView(views.loading);
        const [res1, res2] = await Promise.all([
          api.get("/auth/me"),
          api.get("/dashboard/ngo/my-reservations"),
        ]);
        setOrganizationName(res1?.data?.ngo?.organizationName);
        setReservations(res2?.data);
        setCurrView(views.success);
      } catch (err) {
        setCurrView(views.failure);
        setErrMsg(err?.response?.data?.message);
        console.error(err);
      }
    };
    fetchDetails();
  }, []);

  const loadingView = () => <div className="loading-view">Loading...</div>;

  const dashboardDetails = () => {
    const total = reservations.length;
    const delivered = reservations.filter(
      (d) => d.status === "delivered",
    ).length;
    const pickedup = reservations.filter((d) => d.status === "pickedup").length;
    const reserved = reservations.filter((d) => d.status === "reserved").length;

    const recent = reservations.slice(0, 5);
    return (
      <div className="dashboard-container">
        <h1 id="welcome-back-head">Welcome back, {organizationName}</h1>
        <h1>Overview</h1>
        <div className="stat-card">
          <div className="dashboard-card">
            <p>{total}</p>
            <p>Total Foods Count</p>
          </div>
          <div className="dashboard-card">
            <p>{reserved}</p>
            <p>Reserved Foods</p>
          </div>
          <div className="dashboard-card">
            <p>{pickedup}</p>
            <p>Picked Up Foods</p>
          </div>
          <div className="dashboard-card">
            <p>{delivered}</p>
            <p>Delivered Foods</p>
          </div>
        </div>

        {reservations.length !== 0 && (
          <>
            <div className="recent-foods">
              <h1>Recent Reserved Foods</h1>
              <Link to="/ngo/my-reservations">View All Foods</Link>
            </div>
            <div className="dashboard-reserved-container">
              <table className="dashboard-reservations-table">
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
                  {recent.map((reservation) => {
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
                            alt="food-image"
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
                          <span
                            className={`status-badge ${status.toLowerCase()}`}
                          >
                            {status[0].toUpperCase() + status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}

        <h1>Reserve more foods</h1>
        <div className="dashboard-reserve-food">
          <Link to="/ngo/available-foods">Reserve Food</Link>
        </div>
      </div>
    );
  };

  const failureView = () => <div className="failure-view">{errMsg}</div>;

  const render = () => {
    switch (currView) {
      case views.loading:
        return loadingView();
      case views.success:
        return dashboardDetails();
      case views.failure:
        return failureView();
      default:
        return <></>;
    }
  };

  return <>{render()}</>;
};

export default NgoDashboard;
