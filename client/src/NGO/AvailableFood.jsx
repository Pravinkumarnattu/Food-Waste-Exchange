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
  const [reservedFoodId, setReservedFoodId] = useState(null);

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

  useEffect(() => {
    fetchAvailableFoods();
  }, []);

  const reserveFood = async (foodId) => {
    try {
      setReservedFoodId(foodId);
      const response = await api.post(`/dashboard/ngo/reserve-food/${foodId}`);
      if (response.status === 201) {
        const updatedFoods = availableFoods.filter(
          (food) => food._id !== foodId,
        );
        setAvailableFoods(updatedFoods);
        setErrMsg("");
      }
    } catch (err) {
      setErrMsg(
        err?.response?.data?.message ||
          "An error occurred while reserving food.",
      );
      console.error(err);
      if(err?.response?.status === 409) {
        fetchAvailableFoods();
      }
    } finally {
      setReservedFoodId(null);
    }
  };
  const loadingView = () => <div className="loading-view">Loading...</div>;

  const foodDetails = () => {
    return availableFoods.length !== 0 ? (
      <div className="foods-container">
        <h1 className="foods-tittle">Available Foods</h1>
        <p className="reserve-error">{errMsg}</p>
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
                <h3>Food Name: {foodName}</h3>
                <p className="pickup-address">Address: {pickupAddress}</p>
              </div>
              <p className="food-quantity">{quantity} Left</p>
              <h3 className="expiry-time">
                Expires in {hour} hours {minute} minutes
              </h3>
              <button
                type="button"
                className="reserve-btn"
                onClick={() => reserveFood(_id)}
                disabled={reservedFoodId === _id}
              >
                {reservedFoodId === _id ? "Reserving..." : "Reserve"}
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
