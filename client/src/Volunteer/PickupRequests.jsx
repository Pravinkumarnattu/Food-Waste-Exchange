import { useState, useEffect } from "react";
import api from "../api/axiosInstance";
import "./PickupRequests.css"

const views = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  loading: "LOADING",
};

const PickupRequests = () => {
  const [errMsg, setErrMsg] = useState("");
  const [currView, setCurrView] = useState(views.initial);
  const [reservedFoods, setReservedFoods] = useState([]);
  const [acceptOrderId, setAcceptOrderId] = useState(null);

  const fetchReservedFoods = async () => {
    try {
      setCurrView(views.loading);
      const response = await api.get("/dashboard/volunteer/pickup-requests");
      setReservedFoods(response?.data);
      setCurrView(views.success);
    } catch (err) {
      setCurrView(views.failure);
      setErrMsg(err?.response?.data?.message);
      console.error(err);
    }
  };

  useEffect(() => {
    fetchReservedFoods();
  }, []);

  const loadingView = () => <div className="loading-view">Loading...</div>;

  const acceptFood = async (orderId) => {
    try {
      setAcceptOrderId(orderId);
      const reserved = await api.post(
        `/dashboard/volunteer/accept-food/${orderId}`,
      );
      if (reserved.status === 201) {
        const updatedFoods = reservedFoods.filter(
          (food) => food._id !== orderId,
        );
        setReservedFoods(updatedFoods);
        setErrMsg("");
      }
    } catch (err) {
      setErrMsg(
        err?.response?.data?.message ||
          "An error occurred while accepting food.",
      );
      if (err?.response?.status === 409) {
        fetchReservedFoods();
      }
    } finally {
      setAcceptOrderId(null);
    }
  };

  const reservedFoodDetails = () => {
    return reservedFoods.length !== 0 ? (
      <div className="reserved-foods-container">
        <h1 className="reserved-foods-tittle">Pickup Requests</h1>
        <p className="accept-error">{errMsg}</p>
        {reservedFoods.map((food) => {
          const { foodName, pickupAddress, image, donorId, expiryTime } =
            food.foodId;
          const timeDiff = new Date(expiryTime) - new Date();
          const hour = Math.floor(timeDiff / (1000 * 60 * 60));
          const minute = Math.floor((timeDiff / (1000 * 60)) % 60);
          const reservedTime = new Date(food.createdAt).toLocaleString(
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
            new Date(expiryTime) >= new Date() && (
              <div key={food._id} className="reserved-food-card">
                <div className="reserved-food-info">
                  <img
                    src={image ?? "/home_image.png"}
                    alt="food"
                    className="reserved-food-image"
                  />
                  <div className="reserved-food-details">
                    <h3>{foodName}</h3>
                    <p>From: {donorId?.donor?.businessName}</p>
                    <p className="pickup-address">
                      Pickup Address: {pickupAddress}
                    </p>
                  </div>
                </div>

                <h3 className="reserved-expiry-time">
                  Expires in {hour} hours {minute} minutes
                </h3>

                <div className="reserved-time">
                  <h1>NGO Reserved Time</h1>
                  <p>{reservedTime}</p>
                </div>

                <button
                  type="button"
                  className="accept-btn"
                  onClick={() => acceptFood(food._id)}
                  disabled={acceptOrderId === food._id}
                >
                  {acceptOrderId === food._id ? "Accepting..." : "Accept"}
                </button>
              </div>
            )
          );
        })}
      </div>
    ) : (
      <div className="no-reserved-foods">No available foods at the moment.</div>
    );
  };
  const failureView = () => <div className="failure-view">{errMsg}</div>;

  const render = () => {
    switch (currView) {
      case views.loading:
        return loadingView();
      case views.success:
        return reservedFoodDetails();
      case views.failure:
        return failureView();
      default:
        return <></>;
    }
  };

  return <>{render()}</>;
};

export default PickupRequests;
