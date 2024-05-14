import { Helmet } from "react-helmet-async";
import Banner from "../components/Banner";
import VolunteerNeedsNow from "../components/VolunteerNeedsNow";
import AboutUs from "../components/AboutUs";
import Opportunities from "../components/Opportunities";
import { Fade, Slide } from "react-awesome-reveal";
const Home = () => {
  return (
    <>
      <Helmet>
        <title>Volunize Hub | Home</title>
      </Helmet>
      <Fade>
        <Banner />
      </Fade>
      <Slide>
        <Opportunities />
      </Slide>
      <Fade>
        <VolunteerNeedsNow />
      </Fade>
      <Slide>
        <AboutUs />
      </Slide>
    </>
  );
};

export default Home;
