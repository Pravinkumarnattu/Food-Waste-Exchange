import { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import "./NgoProfile.css";

const views = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  loading: "LOADING",
};

const NgoProfile = () => {
  const [errMsg, setErrMsg] = useState("");
  const [currView, setCurrView] = useState(views.initial);
  const [userDetails, setuserDetails] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setCurrView(views.loading);
        const response = await api.get("/auth/me");
        setuserDetails(response?.data);
        setCurrView(views.success);
      } catch (err) {
        setCurrView(views.failure);
        setErrMsg(err?.response?.data?.message);
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const loadingView = () => <div className="loading-view">Loading...</div>;

  const profile = () => (
    <div className="profile-container">
      <h1>My Profile</h1>
      <p>
        <strong>Email:</strong> {userDetails?.email}
      </p>
      <p>
        <strong>Phone:</strong> {userDetails?.phone}
      </p>
      <p>
        <strong>Organization Name:</strong> {userDetails?.ngo?.organizationName}
      </p>
      <p>
        <strong>Registration Number:</strong> {userDetails?.ngo?.ngoRegistrationNumber}
      </p>
      <p>
        <strong>Address:</strong> {userDetails?.ngo?.organizationAddress}
      </p>
    </div>
  );

  const failureView = () => <div className="failure-view">{errMsg}</div>;

  const render = () => {
    switch (currView) {
      case views.loading:
        return loadingView();
      case views.success:
        return profile();
      case views.failure:
        return failureView();
      default:
        return <></>;
    }
  };

  return <>{render()}</>;
};

export default NgoProfile;
