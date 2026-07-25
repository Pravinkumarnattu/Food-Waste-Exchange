import { useState, useEffect } from "react";
import api from "../../api/axiosInstance";

const AddFood = () => {
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [foodDetails, setFoodDetails] = useState({
    foodName: "",
    foodType: "",
    quantity: "",
    dateTime: "",
    pickupAddress: "",
    foodImage: "",
  });
  const [donorAddress, setDonorAddress] = useState("");

  useEffect(() => {
    const getAddress = async () => {
      const response = await api.get("/auth/me");
      setFoodDetails((prev) => ({
        ...prev,
        pickupAddress: response?.data?.donor?.donorAddress,
      }));
      setDonorAddress(response?.data?.donor?.donorAddress);
    };
    getAddress();
  }, []);

  useEffect(() => {
    if (!successMsg) return;
    const timer = setTimeout(() => {
      setSuccessMsg("");
    }, 3000);
    return () => clearTimeout(timer);
  }, [successMsg]);

  const addFoodForm = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await api.post("/dashboard/donor/add-food", foodDetails);
      setErrMsg("");
      setFoodDetails({
        foodName: "",
        foodType: "",
        quantity: "",
        dateTime: "",
        pickupAddress: donorAddress,
        foodImage: "",
      });
      setSuccessMsg(response?.data?.message);
    } catch (err) {
      console.error(err);
      setErrMsg(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={addFoodForm}>
        <label htmlFor="food_name">Food Name</label>
        <input
          type="text"
          id="food_name"
          placeholder="Enter Food name"
          value={foodDetails.foodName}
          onChange={(e) =>
            setFoodDetails({ ...foodDetails, foodName: e.target.value })
          }
          required
          minLength={2}
          title="Please enter your food name"
        />

        <label htmlFor="food_type">Select Food Type</label>
        <select
          id="food_type"
          value={foodDetails.foodType}
          onChange={(e) =>
            setFoodDetails({ ...foodDetails, foodType: e.target.value })
          }
          required
        >
          <option value="" disabled>
            Select a type
          </option>
          <option value="cooked_food">Cooked Food</option>
          <option value="bakery">Bakery Items</option>
          <option value="fruits_vegetables">Fruits & Vegetables</option>
          <option value="beverages">Beverages</option>
          <option value="others">Others</option>
        </select>

        <label htmlFor="quantity">Quantity</label>
        <input
          type="text"
          id="quantity"
          placeholder="10 kg or 20 packets"
          value={foodDetails.quantity}
          onChange={(e) =>
            setFoodDetails({ ...foodDetails, quantity: e.target.value })
          }
          required
          minLength={2}
          title="Please enter your quantity"
        />

        <label htmlFor="date_time">Expiry Date & Time</label>
        <input
          type="datetime-local"
          id="date_time"
          value={foodDetails.dateTime}
          onChange={(e) =>
            setFoodDetails({ ...foodDetails, dateTime: e.target.value })
          }
          required
        />

        <label htmlFor="pickup_address">Pickup Address</label>
        <textarea
          id="pickup_address"
          placeholder="Enter pickup address..."
          rows={5}
          cols={30}
          value={foodDetails.pickupAddress}
          onChange={(e) =>
            setFoodDetails({ ...foodDetails, pickupAddress: e.target.value })
          }
          required
          minLength={10}
          title="Please enter a complete pickup address"
        />

        <label htmlFor="food_image">Food Image</label>
        <input
          type="file"
          id="food_image"
          accept="image/*"
          onChange={(e) =>
            setFoodDetails({ ...foodDetails, foodImage: e.target.files[0] })
          }
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Adding Food..." : "Add Food"}
        </button>
        {successMsg && <p className="form-success">{successMsg}</p>}
        {errMsg && <p className="form-error">{errMsg}</p>}
      </form>
    </div>
  );
};

export default AddFood;
