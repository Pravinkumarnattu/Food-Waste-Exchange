import { useState, useEffect } from "react";
import api from "../api/axiosInstance";

const views = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  loading: "LOADING",
};

const MyDeliveries = () => {
  const [errMsg, setErrMsg] = useState("");
  const [currView, setCurrView] = useState(views.initial);
  const [acceptedfoods, setAcceptedfoods] = useState([]);

  const fetchAcceptedOrders = async () => {
    try {
      setCurrView(views.loading);
      const response = await api.get("/dashboard/volunteer/my-deliveries");
      console.log(response?.data);
      setAcceptedfoods(response?.data);
      setCurrView(views.success);
    } catch (err) {
      setCurrView(views.failure);
      setErrMsg(err?.response?.data?.message);
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAcceptedOrders();
  }, []);

  const loadingView = () => <div className="loading-view">Loading...</div>;

  const markPickedUp = () => {};

  const markDelivered = () => {};

  const orderDetails = () => {
    return acceptedfoods.length !== 0 ? (
      <div className="order-container">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Food Name</th>
              <th>Donor Details</th>
              <th>To(NGO)</th>
              <th>Pickup time</th>
              <th>Delivery Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {acceptedfoods.map((order) => {
              const { status, _id, pickupTime, deliveryTime } = order;
              const { foodName, image, donorId } = order.foodId;
              const { businessName, donorAddress } = donorId.donor;
              const { organizationAddress, organizationName } = order.ngoId.ngo;
              return (
                <tr key={_id}>
                  <td className="food-details">
                    <img
                      src={image ?? "/home_image.png"}
                      className="reserved-food-image"
                      alt="order-food-image"
                    />
                    <span>{foodName}</span>
                  </td>
                  <td className="donor-details">
                    <span>Name: {businessName}</span>{" "}
                    <span>Address: {donorAddress}</span>
                  </td>
                  <td className="ngo-details">
                    <span>Name: {organizationName}</span>{" "}
                    <span>Address: {organizationAddress}</span>
                  </td>
                  <td className="pickup-time">
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
                  <td className="delivery-time">
                    {deliveryTime
                      ? new Date(deliveryTime).toLocaleString("en-US", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        })
                      : "Pending"}
                  </td>
                  <td className="status">
                    {status === "accepted" && (
                      <button type="button" onClick={() => markPickedUp(_id)}>
                        Mark Picked Up
                      </button>
                    )}
                    {status === "pickedup" && (
                      <button type="button">"Mark Delivered</button>
                    )}
                    {status === "delivered" && <div>Delivered</div>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    ) : (
      <div></div>
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
            <h1 className="orders-head">My Orders</h1>
            <p className="order-error">{errMsg}</p>
            {orderDetails()}
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

export default MyDeliveries;
