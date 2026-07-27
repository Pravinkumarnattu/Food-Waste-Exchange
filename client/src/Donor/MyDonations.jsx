import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api/axiosInstance";
import "./MyDonations.css";

const views = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  loading: "LOADING",
};
const MyDonations = () => {
  const [donations, setDonations] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [currView, setCurrView] = useState(views.initial);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setCurrView(views.loading);
        const response = await api.get("/dashboard/donor/my-donations");
        setDonations(response?.data);
        setCurrView(views.success);
      } catch (err) {
        setCurrView(views.failure);
        setErrMsg(err?.response?.data?.message);
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const loadingView = () => <div>Loading</div>;

  const foodsList = () => {
    return donations.length !== 0 ? (
      <div className="donations-container">
        <table className="donations-table">
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
            {donations.map((food) => {
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
    ) : (
      <div className="no-donations">
        <p>You haven't added any donations yet.</p>
        <Link to="/dashboard/donor/add-food">Add Food</Link>
      </div>
    );
  };

  const failureView = () => <div>{errMsg}</div>;

  const render = () => {
    switch (currView) {
      case views.loading:
        return loadingView();
      case views.success:
        return (
          <div>
            <h1 className="donations-head">My Donations</h1>
            {foodsList()}
          </div>
        );
      case views.failure:
        return failureView();
      default:
        return <></>;
    }
  };

  return <div>{render()}</div>;
};

export default MyDonations;
