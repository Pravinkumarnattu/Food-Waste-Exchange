import Header from "./Header/Header";
import HeroSection from "./HeroSection/index";
import Stats from "./Stats/index"
import "./home.css";

const Home = () => {
  return (
    <>
      <Header />
      <hr />
      <HeroSection />
      <Stats />
    </>
  );
};

export default Home;
