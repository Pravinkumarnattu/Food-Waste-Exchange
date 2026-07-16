import { useNavigate } from "react-router-dom";
import "./index.css";

const HeroSection = () => {
  const navigate = useNavigate()
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title1">Share Food.</h1>
        <h1 className="hero-title">Reduce Waste.</h1>
        <h1 className="hero-title">Feed Hope.</h1>
        <p className="hero-description">
          A platform that connects food donors with NGOs and volunteers to
          reduce food waste and fight hunger.
        </p>
        <div className="hero-buttons">
          <button
            className="hero-button"
            onClick={() => navigate("/choose-goal")}
          >
            Get Started
          </button>
          <button className="hero-button2">Learn More</button>
        </div>
      </div>
      <img src="/home_image.png" alt="Hero" className="hero-image" />
    </section>
  );
};

export default HeroSection;
