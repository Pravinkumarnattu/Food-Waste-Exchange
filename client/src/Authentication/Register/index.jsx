import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../../api/axiosInstance";
import "./index.css";

const Register = () => {
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role");
  const navigate = useNavigate();
  const roles = ["donor", "ngo", "volunteer"];
  useEffect(() => {
    if (!role || !roles.includes(role)) {
      navigate("/choose-goal");
    }
  }, [role, navigate]);

  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    role: role,
  });

  const [donorDetails, setDonorDetails] = useState({
    businessName: "",
    businessType: "",
    donorAddress: "",
  });

  const [ngoDetails, setNgoDetails] = useState({
    organizationName: "",
    ngoRegistrationNumber: "",
    organizationAddress: "",
    areaOfOperation: "",
  });

  const [volunteerDetails, setVolunteerDetails] = useState({
    fullName: "",
    volunteerAddress: "",
    modeOfTransport: "",
    availability: "",
  });

  const donor = () => {
    return (
      <>
        <label htmlFor="business_name">Business/Restaurant Name</label>
        <input
          type="text"
          id="business_name"
          name="business_name"
          placeholder="Enter full name"
          value={donorDetails.businessName}
          onChange={(e) =>
            setDonorDetails({ ...donorDetails, businessName: e.target.value })
          }
          required
          minLength={2}
          title="Please enter your business name"
        />
        <label htmlFor="business_type">Business Type</label>
        <select
          id="business_type"
          value={donorDetails.businessType}
          onChange={(e) =>
            setDonorDetails({
              ...donorDetails,
              businessType: e.target.value,
            })
          }
          required
        >
          <option value="" disabled>
            Select your business type
          </option>
          <option value="restaurant">Restaurant</option>
          <option value="bakery">Bakery</option>
          <option value="hotel">Hotel</option>
          <option value="supermarket">Supermarket</option>
          <option value="event_organizer">Event Organizer</option>
        </select>

        <label htmlFor="address">Address</label>
        <textarea
          id="address"
          rows={5}
          cols={30}
          placeholder="Please enter address..."
          value={donorDetails.donorAddress}
          onChange={(e) =>
            setDonorDetails({ ...donorDetails, donorAddress: e.target.value })
          }
          required
          minLength={10}
          title="Please enter a complete pickup address"
        />
      </>
    );
  };

  const ngo = () => {
    return (
      <>
        <label htmlFor="organization_name">Organization Name</label>
        <input
          type="text"
          id="organization_name"
          placeholder="Enter organization name"
          value={ngoDetails.organizationName}
          onChange={(e) =>
            setNgoDetails({
              ...ngoDetails,
              organizationName: e.target.value,
            })
          }
          required
          minLength={2}
          title="Please enter your organization name"
        />
        <label htmlFor="ngo_registration_number">NGO Registration Number</label>
        <input
          type="text"
          id="ngo_registration_number"
          placeholder="Enter registration number"
          value={ngoDetails.ngoRegistrationNumber}
          onChange={(e) =>
            setNgoDetails({
              ...ngoDetails,
              ngoRegistrationNumber: e.target.value,
            })
          }
          required
          title="Please enter your NGO registration number"
        />
        <label htmlFor="address">Organization Address</label>
        <textarea
          id="address"
          rows={5}
          cols={30}
          placeholder="Please enter address..."
          value={ngoDetails.organizationAddress}
          onChange={(e) =>
            setNgoDetails({
              ...ngoDetails,
              organizationAddress: e.target.value,
            })
          }
          required
          minLength={10}
          title="Please enter a complete organization address"
        />

        <label htmlFor="area_of_operation">Area of Operation</label>
        <select
          id="area_of_operation"
          value={ngoDetails.areaOfOperation}
          onChange={(e) =>
            setNgoDetails({ ...ngoDetails, areaOfOperation: e.target.value })
          }
          required
        >
          <option value="" disabled>
            Select your area
          </option>
          <option value="city">City</option>
          <option value="locality">Locality</option>
        </select>
      </>
    );
  };

  const volunteer = () => {
    return (
      <>
        <label htmlFor="full_name">Full Name</label>
        <input
          type="text"
          id="full_name"
          placeholder="Enter full name"
          value={volunteerDetails.fullName}
          onChange={(e) =>
            setVolunteerDetails({
              ...volunteerDetails,
              fullName: e.target.value,
            })
          }
          required
          minLength={2}
          title="Please enter your full name"
        />
        <label htmlFor="address_or_locality">Address/Locality</label>
        <input
          type="text"
          id="address_or_locality"
          placeholder="Enter address/locality"
          value={volunteerDetails.volunteerAddress}
          onChange={(e) =>
            setVolunteerDetails({
              ...volunteerDetails,
              volunteerAddress: e.target.value,
            })
          }
          required
          minLength={5}
          title="Please enter your address or locality"
        />

        <label htmlFor="mode_of_transport">Mode of Transport</label>
        <select
          id="mode_of_transport"
          value={volunteerDetails.modeOfTransport}
          onChange={(e) =>
            setVolunteerDetails({
              ...volunteerDetails,
              modeOfTransport: e.target.value,
            })
          }
          required
        >
          <option value="" disabled>
            Select option
          </option>
          <option value="bike">Bike</option>
          <option value="car">Car</option>
          <option value="On-foot">On foot</option>
        </select>

        <label htmlFor="availability">Availability</label>
        <select
          id="availability"
          value={volunteerDetails.availability}
          onChange={(e) =>
            setVolunteerDetails({
              ...volunteerDetails,
              availability: e.target.value,
            })
          }
          required
        >
          <option value="" disabled>
            Select option
          </option>
          <option value="weekdays">Weekdays</option>
          <option value="weekends">Weekends </option>
          <option value="anytime">Anytime</option>
        </select>
      </>
    );
  };

  const getCurrRole = () => {
    switch (role) {
      case "donor":
        return donorDetails;
      case "ngo":
        return ngoDetails;
      case "volunteer":
        return volunteerDetails;
      default:
        return {};
    }
  };

  const submitForm = async (event) => {
    event.preventDefault();
    const { email, password, confirmPassword, phone, role } = userDetails;
    if (password != confirmPassword) {
      setErrMsg("Invalid Confirm password");
      return;
    } else setErrMsg("");
    const payload = {
      ...userDetails,
      ...getCurrRole(),
    };
    try {
      setLoading(true);
      const response = await api.post("/auth/register", payload);
      console.log(response);
      navigate("/login");
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const renderMatches = () => {
    switch (role) {
      case "donor":
        return donor();
      case "ngo":
        return ngo();
      case "volunteer":
        return volunteer();
      default:
        return null;
    }
  };

  return (
    <form onSubmit={submitForm}>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Enter email"
        title="Please Enter valid email address"
        value={userDetails.email}
        onChange={(e) =>
          setUserDetails({ ...userDetails, email: e.target.value })
        }
        required
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Enter password"
        value={userDetails.password}
        onChange={(e) =>
          setUserDetails({ ...userDetails, password: e.target.value })
        }
        required
        minLength={8}
        title="Password must be at least 8 characters"
      />
      <label htmlFor="confirm_password">Confirm Password</label>
      <input
        type="password"
        id="confirm_password"
        name="confirm_password"
        placeholder="Confirm password"
        value={userDetails.confirmPassword}
        onChange={(e) =>
          setUserDetails({ ...userDetails, confirmPassword: e.target.value })
        }
        required
        minLength={8}
        title="Please re-enter your password"
      />
      <label htmlFor="phone">Phone Number</label>
      <input
        type="tel"
        id="phone"
        name="phone"
        placeholder="Enter phone"
        value={userDetails.phone}
        onChange={(e) =>
          setUserDetails({ ...userDetails, phone: e.target.value })
        }
        required
        pattern="[0-9]{10}"
        maxLength={10}
        title="Please enter a valid 10-digit phone number"
      />
      <label htmlFor="role">Role</label>
      <input
        type="text"
        id="role"
        readOnly
        value={role != null ? role.toUpperCase() : ""}
        disabled
      />
      {renderMatches()}
      <button type="submit" disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </button>
      {errMsg && <p>{errMsg}</p>}
    </form>
  );
};

export default Register;
