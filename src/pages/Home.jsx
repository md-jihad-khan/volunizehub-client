import { Helmet } from "react-helmet-async";
import Banner from "../components/Banner";
import VolunteerNeedsNow from "../components/VolunteerNeedsNow";
import AboutUs from "../components/AboutUs";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Volunize Hub | Home</title>
      </Helmet>
      <Banner />
      <VolunteerNeedsNow />
      <AboutUs />
    </>
  );
};

export default Home;
