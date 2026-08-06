import { useState, useEffect } from "react";
import api from "../api/axiosInstance";
import "./AvailableFood.css";

const views = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  loading: "LOADING",
};

const AvailableFood = () => {
  const [availableFoods, setAvailableFoods] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [currView, setCurrView] = useState(views.initial);

  useEffect(() => {
    const fetchAvailableFoods = async () => {
      try {
        setCurrView(views.loading);
        const response = await api.get("/dashboard/ngo/available-foods");
        setAvailableFoods(response?.data);
        setCurrView(views.success);
      } catch (err) {
        setCurrView(views.failure);
        setErrMsg(err?.response?.data?.message);
        console.error(err);
      }
    };
    fetchAvailableFoods();
  }, []);

  const reserveFood = async (foodId) => {
    try {
      const response = await api.post(`/dashboard/ngo/reserve-food/${foodId}`);
      console.log(response);
      if(response.status === 201){
        alert(response?.data?.message || "Food reserved successfully.");
        const updatedFoods = availableFoods.filter(food => food._id !== foodId);
        setAvailableFoods(updatedFoods);
      }
    } catch (err) {
      alert(err?.response?.data?.message || "An error occurred while reserving food.");
    }
  };
  const loadingView = () => <div className="loading-view">Loading...</div>;

  const foodDetails = () => {
    return availableFoods.length !== 0 ? (
      <div className="foods-container">
        {availableFoods.map((food) => {
          const { foodName, quantity, expiryTime, pickupAddress, image, _id } =
            food;
          const timeDiff = new Date(expiryTime) - new Date();
          const hour = Math.floor(timeDiff / (1000 * 60 * 60));
          const minute = Math.floor((timeDiff / (1000 * 60)) % 60);
          return (
            <div key={_id} className="food-card">
              <img
                src={image ?? "/home_image.png"}
                alt="food"
                className="food-image"
              />
              <div className="food-details">
                <h3>{foodName}</h3>
                <p className="pickup-address">{pickupAddress}</p>
              </div>
              <p className="food-quantity">{quantity}</p>
              <h3 className="expiry-time">
                Expires in {hour} hours {minute} minutes
              </h3>
              <button
                type="button"
                className="reserve-btn"
                onClick={() =>reserveFood(_id)}
              >
                Reserve
              </button>
            </div>
          );
        })}
      </div>
    ) : (
      <div className="no-foods">No available foods at the moment.</div>
    );
  };

  const failureView = () => <div className="failure-view">{errMsg}</div>;

  const render = () => {
    switch (currView) {
      case views.loading:
        return loadingView();
      case views.success:
        return foodDetails();
      case views.failure:
        return failureView();
      default:
        return <></>;
    }
  };

  return <>{render()}</>;
};

export default AvailableFood;
