import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./index.css";

const Register = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const role = searchParams.get("role");
  const [userDeatails, setUserDetails] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    role: role,
    donor: {},
    ngo: {},
    volunteer: {},
  });

  const donor = () => {
    const [donorDetails, setDonorDetails] = useState({
      businessName: "",
      businessType: "",
      donorAddress: "",
    });
    console.log(donorDetails.address);
    return (
      <>
        <label htmlFor="business name">Business/Restaurant Name</label>
        <input
          type="text"
          id="business_name"
          name="business_name"
          placeholder="Enter full name"
          value={donorDetails.businessName}
          onChange={(e) =>
            setDonorDetails({ ...donorDetails, businessName: e.target.value })
          }
        />
        <label htmlFor="business_type">Business Type</label>
        <select
          id="business_type"
          value={donorDetails.businessType}
          onChange={(e) =>
            setBusinessType({
              ...donorDetails,
              businessType: e.target.value,
            })
          }
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
          value={donorDetails.address}
          onChange={(e) =>
            setDonorDetails({ ...donorDetails, address: e.target.value })
          }
        />
      </>
    );
  };

  const ngo = () => {
    const [ngoDetails, setNgoDetails] = useState({
      organizationName: "",
      ngoRegistrationNumber: "",
      organizationAddress: "",
      areaOfOperation: "",
    });
    return (
      <>
        <label htmlFor="organization_name">Organization Name</label>
        <input
          type="text"
          id="organization_name"
          placeholder="Enter organization name"
          value={ngoDetails.ngoRegistrationNumber}
          onChange={(e) =>
            setNgoDetails({
              ...ngoDetails,
              ngoRegistrationNumber: e.target.value,
            })
          }
        />
        <label id="ngo_registration_number">NGO Registration Number</label>
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
        />
        <label htmlFor="address">Organization Address</label>
        <textarea
          id="address"
          rows={5}
          cols={30}
          placeholder="Please enter address..."
          value={ngoDetails.organizationAddress}
          onChange={(e) =>
            setDonorDetails({
              ...ngoDetails,
              organizationAddress: e.target.value,
            })
          }
        />

        <label>Area of Operation</label>
        <select
          id="area_of_operation"
          value={ngoDetails.areaOfOperation}
          onChange={(e) =>
            setNgoDetails({ ...ngoDetails, areaOfOperation: e.target.value })
          }
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
    const [volunteerDetails, setvolunteerDetails] = useState({
      fullName: "",
      volunteerAddress: "",
      modeOfTransport: "",
      availability: "",
    });

    return (
      <>
        <label htmlFor="full_name">Full Name</label>
        <input
          type="text"
          id="full_name"
          placeholder="Enter full name"
          value={volunteerDetails.fullName}
          onChange={() =>
            setvolunteerDetails({
              ...volunteerDetails,
              fullName: e.target.value,
            })
          }
        />
        <label htmlFor="address_or_locality">Address/Locality</label>
        <input
          type="text"
          id="address_or_locality"
          placeholder="Enter address/locality"
          value={volunteerDetails.volunteerAddress}
          onChange={(e) =>
            setvolunteerDetails({
              ...volunteerDetails,
              volunteerAddress: e.target.value,
            })
          }
        />

        <label htmlFor="mode_of_transport">Mode of Transport</label>
        <select
          id="mode_of_transport"
          value={volunteerDetails.modeOfTransport}
          onChange={(e) =>
            setvolunteerDetails({
              ...volunteerDetails,
              modeOfTransport: e.target.value,
            })
          }
        >
          <option value="" disabled>Select option</option>
          <option value="bike">Bike</option>
          <option value="car">Car</option>
          <option value="On-foot">On foot</option>
        </select>

        <label htmlFor="availability">Availability</label>
        <select
          id="availability"
          value={volunteerDetails.Availability}
          onChange={(e) =>
            setvolunteerDetails({
              ...volunteerDetails,
              Availability: e.target.value,
            })
          }
        >
          <option value="" disabled>Select option</option>
          <option value="weekdays">Weekdays</option>
          <option value="weekends">Weekends </option>
          <option value="anytime">Anytime</option>
        </select>
        
      </>
    );
  };

  return (
    <form>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Enter email"
        value={userDeatails.email}
        onChange={(e) =>
          setUserDetails({ ...userDeatails, email: e.target.value })
        }
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Enter password"
        value={userDeatails.password}
        onChange={(e) =>
          setUserDetails({ ...userDeatails, password: e.target.value })
        }
      />
      <label htmlFor="confirm_password">Confirm Password</label>
      <input
        type="password"
        id="confirm_password"
        name="confirm_password"
        placeholder="Confirm password"
        value={userDeatails.confirmPassword}
        onChange={(e) =>
          setUserDetails({ ...userDeatails, confirmPassword: e.target.value })
        }
      />
      <label htmlFor="phone">Phone Number</label>
      <input
        type="tel"
        id="phone"
        name="phone"
        placeholder="Enter phone"
        value={userDeatails.phone}
        onChange={(e) =>
          setUserDetails({ ...userDeatails, phone: e.target.value })
        }
      />
      <label htmlFor="role">Role</label>
      <input
        type="text"
        id="role"
        readOnly
        value={role.toUpperCase()}
        disabled
      />
      {donor()}
    </form>
  );
};

export default Register;
