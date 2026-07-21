import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import api from "../../api/axiosInstance";

const Login = () => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitLoginForm = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await api.post("/auth/login", { ...userDetails });
      const { data } = response;
      const { role, token } = data;
      Cookies.set("jwt_token", token, { expires: 7 });
      Cookies.set("role", role, { expires: 7 });
      switch (role) {
        case "donor":
          navigate("/donor/dashboard", { replace: true });
          break;
        case "ngo":
          navigate("/ngo/dashboard", { replace: true });
          break;
        case "volunteer":
          navigate("/volunteer/dashboard", { replace: true });
          break;
        default:
          setErrMsg("Unknown role, please contact support");
          break;
      }
    } catch (err) {
      console.error(err);
      setErrMsg(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={submitLoginForm} className = "">
      <h1>Wecome Back!</h1>
      <p>Login to your account</p>
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
      <button type="submit" disabled={loading}>
        {loading ? "Logging..." : "Login"}
      </button>
      <p>
        Don't have an account? <Link to="/choose-goal">Sign up</Link>
      </p>
      {errMsg && <p>{errMsg}</p>}
    </form>
  );
};

export default Login;
