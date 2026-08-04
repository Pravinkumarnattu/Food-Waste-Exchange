import { useState, useEffect } from "react";
import api from "../api/axiosInstance";

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

  const loadingView = () => <div className="loading-view">Loading...</div>;

  const foodDetails = () => {
    return availableFoods.length !== 0 ? (
      <div className="foods-container">
        {availableFoods.map((food) => {
          const { foodName, quantity, expiryTime, pickupAddress, image } =
            availableFoods;
          console.log(expiryTime);
          return (
            <div>
              <img src={image} alt="food" />
              <div>
                <h1>{foodName}</h1>
                <p>{pickupAddress}</p>
              </div>
              <p>{quantity}</p>
              <h1>{expiryTime}</h1>
              <button>Reserve</button>
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
