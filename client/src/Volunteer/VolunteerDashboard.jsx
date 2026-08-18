import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axiosInstance";
import "./VolunteerDashboard.css"

const views = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  loading: "LOADING",
};

const VolunteerDashboard = () => {
  const [name, setName] = useState("");
  const [foods, setReservedFoods] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [currView, setCurrView] = useState(views.initial);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setCurrView(views.loading);
        const [res1, res2] = await Promise.all([
          api.get("/auth/me"),
          api.get("/dashboard/volunteer/my-deliveries"),
        ]);
        setName(res1?.data?.volunteer?.fullName);
        setReservedFoods(res2?.data);
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

  const formatTime = (time) => {
    return new Date(time).toLocaleString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const dashboardDetails = () => {
    const acceptedFoods = foods.filter((order) => order.status !== "reserved");
    const total = acceptedFoods.length;
    const delivered = acceptedFoods.filter(
      (d) => d.status === "delivered",
    ).length;
    const pickedup = acceptedFoods.filter(
      (d) => d.status === "pickedup",
    ).length;
    const accepted = acceptedFoods.filter(
      (d) => d.status === "accepted",
    ).length;

    const recent = acceptedFoods.slice(0, 5);
    return (
      <div className="dashboard-container">
        <h1 id="welcome-back-head">Welcome back, {name}</h1>
        <h1>Overview</h1>
        <div className="stat-card">
          <div className="dashboard-card">
            <p>{total}</p>
            <p>Total Foods</p>
          </div>
          <div className="dashboard-card">
            <p>{accepted}</p>
            <p>Accepted Foods</p>
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

        {acceptedFoods.length !== 0 && (
          <>
            <div className="recent-foods">
              <h1>Recent Foods</h1>
              <Link to="/volunteer/my-deliveries">View All Foods</Link>
            </div>
            <div className="order-container">
              <table className="orders-table">
                <thead>
                  <tr>
                    <th>Food Name</th>
                    <th>Donor Details</th>
                    <th>To(NGO)</th>
                    <th>Pickup time</th>
                    <th>Delivered Time</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recent.map((order) => {
                    const { status, _id, pickupTime, deliveryTime } = order;
                    const { foodName, image, donorId } = order.foodId;
                    const businessName = donorId?.donor?.businessName;
                    const donorAddress = donorId?.donor?.donorAddress;
                    const organizationName = order.ngoId?.ngo?.organizationName;
                    const organizationAddress =
                      order.ngoId?.ngo?.organizationAddress;
                    return (
                      <tr key={_id}>
                        <td className="food-details">
                          <img
                            src={image ?? "/home_image.png"}
                            className="food-image"
                            alt="order-food-image"
                          />
                          <span>{foodName}</span>
                        </td>
                        <td className="donor-details">
                          <span>
                            <strong>Name:</strong> {businessName}
                          </span>
                          <span>
                            <strong>Address:</strong> {donorAddress}
                          </span>
                        </td>
                        <td className="ngo-details">
                          <span>
                            <strong>Name:</strong> {organizationName}
                          </span>
                          <span>
                            <strong>Address:</strong> {organizationAddress}
                          </span>
                        </td>
                        <td className="pickup-time">
                          {pickupTime ? formatTime(pickupTime) : "Pending"}
                        </td>
                        <td className="delivery-time">
                          {deliveryTime ? formatTime(deliveryTime) : "Pending"}
                        </td>
                        <td className="status-cell">
                          {status === "delivered" && (
                            <div className="delivered">Delivered</div>
                          )}
                          {status === "pickedup" && (
                            <div className="pickedup">Pickedup</div>
                          )}
                          {status === "accepted" && (
                            <div className="accepted">Accepted</div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}

        <h1>Accept more foods</h1>
        <div className="dashboard-accept-food">
          <Link to="/volunteer/pickup-requests">Accept Food</Link>
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

export default VolunteerDashboard;
