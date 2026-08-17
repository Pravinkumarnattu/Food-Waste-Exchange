import { useState, useEffect } from "react";
import api from "../api/axiosInstance";
import "./MyDeliveries.css";

const views = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  loading: "LOADING",
};

const MyDeliveries = () => {
  const [errMsg, setErrMsg] = useState("");
  const [currView, setCurrView] = useState(views.initial);
  const [orders, setOrders] = useState([]);
  const [pickupId, setPickupId] = useState(null);
  const [deliveredId, setDeliveredId] = useState(null);

  const fetchOrders = async () => {
    try {
      setCurrView(views.loading);
      const response = await api.get("/dashboard/volunteer/my-deliveries");
      setOrders(response?.data);
      setCurrView(views.success);
    } catch (err) {
      setCurrView(views.failure);
      setErrMsg(err?.response?.data?.message);
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrders();
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

  const markPickedUp = async (orderId) => {
    try {
      setPickupId(orderId);
      const pickedup = await api.patch(
        `/dashboard/volunteer/mark-pickedup/${orderId}`,
      );
      if (pickedup.status === 200) {
        const updatedList = orders.map((order) => {
          if (order._id === orderId) {
            return {
              ...order,
              status: "pickedup",
              pickupTime: new Date().toISOString(),
            };
          }
          return order;
        });
        setOrders(updatedList);
        setErrMsg("");
      }
    } catch (err) {
      setErrMsg(
        err?.response?.data?.message || "An error occurred while picking food.",
      );
      if (err?.response?.status === 409) {
        fetchOrders();
      }
    } finally {
      setPickupId(null);
    }
  };

  const markDelivered = async (orderId) => {
    try {
      setDeliveredId(orderId);
      const delivered = await api.patch(
        `/dashboard/volunteer/mark-delivered/${orderId}`,
      );
      if (delivered.status === 200) {
        const updatedList = orders.map((order) => {
          if (order._id === orderId) {
            return {
              ...order,
              status: "delivered",
              deliveryTime: new Date().toISOString(),
            };
          }
          return order;
        });
        setOrders(updatedList);
        setErrMsg("");
      }
    } catch (err) {
      setErrMsg(
        err?.response?.data?.message ||
          "An error occurred while delivering food.",
      );
      if (err?.response?.status === 409) {
        fetchOrders();
      }
    } finally {
      setDeliveredId(null);
    }
  };

  const orderDetails = () => {
    const acceptedFoods = orders.filter((order) => order.status !== "reserved");
    return acceptedFoods.length !== 0 ? (
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
            {acceptedFoods.map((order) => {
              const { status, _id, pickupTime, deliveryTime } = order;
              const { foodName, image, donorId } = order.foodId;
              const businessName = donorId?.donor?.businessName;
              const donorAddress = donorId?.donor?.donorAddress;
              const organizationName = order.ngoId?.ngo?.organizationName;
              const organizationAddress = order.ngoId?.ngo?.organizationAddress;
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
                    <span><strong>Name:</strong> {businessName}</span>{" "}
                    <span><strong>Address:</strong> {donorAddress}</span>
                  </td>
                  <td className="ngo-details">
                    <span><strong>Name:</strong> {organizationName}</span>{" "}
                    <span><strong>Address:</strong> {organizationAddress}</span>
                  </td>
                  <td className="pickup-time">
                    {pickupTime ? formatTime(pickupTime) : "Pending"}
                  </td>
                  <td className="delivery-time">
                    {deliveryTime ? formatTime(deliveryTime) : "Pending"}
                  </td>
                  <td className="status-cell">
                    {status === "accepted" && (
                      <button
                        type="button"
                        className="pickup-btn"
                        disabled={pickupId === _id}
                        onClick={() => markPickedUp(_id)}
                      >
                        {pickupId === _id
                          ? "Marking as picked up..."
                          : "Mark Picked Up"}
                      </button>
                    )}
                    {status === "pickedup" && (
                      <button
                        type="button"
                        className="delivery-btn"
                        disabled={deliveredId === _id}
                        onClick={() => markDelivered(_id)}
                      >
                        {deliveredId === _id
                          ? "Marking as delivered..."
                          : "Mark Delivered"}
                      </button>
                    )}
                    {status === "delivered" && (
                      <div className="delivered">Delivered</div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    ) : (
      <div className="no-foods-accepted">No foods are accept to deliver</div>
    );
  };

  const failureView = () => <div className="failure-view">{errMsg}</div>;

  const render = () => {
    switch (currView) {
      case views.loading:
        return loadingView();
      case views.success:
        return (
          <div className="my-deliveries-container">
            <h1 className="orders-head">My Orders</h1>
            {orderDetails()}
          </div>
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
