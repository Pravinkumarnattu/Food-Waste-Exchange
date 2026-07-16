import { useNavigate } from "react-router-dom";
import { FaStore, FaUsers, FaUser, FaLeaf } from "react-icons/fa";
import "./index.css";

const ChooseYourGoal = () => {
  const navigate = useNavigate();
  return (
    <div className="choose-your-goal-container">
      <div>
        <h1 className="goal-head">Choose Your Goal</h1>
        <p className="goal-para">Join as a donor, NGO or volunteer</p>
      </div>
      <div className="cards">
        <div className="card">
          <FaStore size={50} color="#F97316" />
          <h2>Donor</h2>
          <p>Restaurants, bakeries, hotels, supermarkets, event organizers.</p>
          <button
            className="goal-buttons"
            onClick={() => navigate("/register?role=donor")}
          >
            Join as Donor
          </button>
        </div>
        <div className="card">
          <FaUsers size={50} color="#16A34A" />
          <h2>NGO / Charity</h2>
          <p>Browse available food, reserve donations, track pickups.</p>
          <button
            className="goal-buttons"
            onClick={() => navigate("/register?role=ngo")}
          >
            Join as NGO
          </button>
        </div>
        <div className="card">
          <FaUser size={50} color="#2563EB" />
          <h2>Volunteer</h2>
          <p>Accept delivery requests, pick up food, deliver to NGOs.</p>
          <button
            className="goal-buttons"
            onClick={() => navigate("/register?role=volunteer")}
          >
            Join as Volunteer
          </button>
        </div>
      </div>
      <footer className="goal-footer">
        <FaLeaf size={25} color="#16A34A" />
        <h2>Together, we can reduce waste and feed lives.</h2>
      </footer>
    </div>
  );
};

export default ChooseYourGoal;
