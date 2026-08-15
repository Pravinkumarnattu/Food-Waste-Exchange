import { useEffect, useState } from "react";
import api from "../api/axiosInstance";


const views = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  loading: "LOADING",
};

const VolunteerProfile = () => {
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
        <strong>Full Name:</strong> {userDetails?.volunteer?.fullName}
      </p>
      <p>
        <strong>Mode Of Transport:</strong> {userDetails?.volunteer?.modeOfTransport}
      </p>
      <p>
        <strong>Address:</strong> {userDetails?.volunteer?.volunteerAddress}
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

export default VolunteerProfile;



