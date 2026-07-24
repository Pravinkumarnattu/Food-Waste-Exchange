import { useState, useEffect } from "react";
import api from "../../api/axiosInstance";

const AddFood = () => {
  const [foodDetails, setFoodDetails] = useState({
    foodName: "",
    foodType: "",
    quantity: "",
    dateTime: "",
    pickupAddress: "",
    foodImage: "",
  });

  useEffect(() => {
    const getAddress = async () => {
      const responseAddress = await api.get("/donorAddress");
      setFoodDetails((prev) => ({
        ...prev,
        pickupAddress: responseAddress?.data?.address,
      }));
    };
    getAddress();
  }, []);

  const addFoodForm = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <form onSubmit={addFoodForm}>
        <label htmlFor="food_name">Food Name</label>
        <input
          type="text"
          id="food_name"
          placeholder="Enter Foode name"
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
          <option value="bakery">Bakery</option>
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

        <label id="food_image">Food Image</label>
        <input type="file" id="food_image" />

        <button type="submit">Add Food</button>
      </form>
    </div>
  );
};

export default AddFood;
