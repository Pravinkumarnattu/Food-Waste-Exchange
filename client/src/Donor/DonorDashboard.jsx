import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axiosInstance";
import "./DonorDashboard.css";

const views = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  loading: "LOADING",
};

const DonorDashboard = () => {
  const [businessName, setBusinessName] = useState("");
  const [donations, setDonations] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [currView, setCurrView] = useState(views.initial);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setCurrView(views.loading);
        const [res1, res2] = await Promise.all([
          api.get("/auth/me"),
          api.get("/dashboard/donor/my-donations"),
        ]);
        setBusinessName(res1?.data?.donor?.businessName);
        setDonations(res2?.data);
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
    const total = donations.length;
    const active = donations.filter((d) => d.status === "active").length;
    const completed = donations.filter((d) => d.status === "completed").length;
    const reserved = donations.filter((d) => d.status === "reserved").length;

    const recent = donations.slice(0, 5);
    return (
      <div className="dashboard-container">
        <h1 id="welcome-back-head">Welcome back, {businessName}</h1>
        <h1>Overview</h1>
        <div className="stat-card">
          <div className="dashboard-card">
            <p>{total}</p>
            <p>Total Foods Count</p>
          </div>
          <div className="dashboard-card">
            <p>{active}</p>
            <p>Active Foods</p>
          </div>
          <div className="dashboard-card">
            <p>{reserved}</p>
            <p>Reserved Foods</p>
          </div>
          <div className="dashboard-card">
            <p>{completed}</p>
            <p>Completed Foods</p>
          </div>
        </div>

        {donations.length !== 0 && (
          <>
            <div className="recent-foods">
              <h1>Recent Foods</h1>
              <Link to="/donor/my-donations">View All Foods</Link>
            </div>
            <div className="dashboard-donations-container">
              <table className="dashboard-donations-table">
                <thead>
                  <tr>
                    <th>Food Name</th>
                    <th>Quantity</th>
                    <th>Expiry Time</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recent.map((food) => {
                    const { foodName, quantity, expiryTime, status } = food;
                    const time = new Date(expiryTime).toLocaleString();
                    return (
                      <tr key={food._id}>
                        <td>{foodName}</td>
                        <td>{quantity}</td>
                        <td>{time}</td>
                        <td>
                          <span className={`status ${status.toLowerCase()}`}>
                            {status}
                          </span>
                        </td>
                        <td>
                          <button className="view-btn">View</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}

        <h1>Add more foods to donate</h1>
        <div className="dashboard-add-food">
          <Link to="/donor/add-food">Add Food</Link>
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

export default DonorDashboard;
