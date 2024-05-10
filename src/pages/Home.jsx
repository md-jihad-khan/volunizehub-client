import { Helmet } from "react-helmet-async";
import Banner from "../components/Banner";
import VolunteerNeedsNow from "../components/VolunteerNeedsNow";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Volunize Hub | Home</title>
      </Helmet>
      <Banner />
      <VolunteerNeedsNow />
    </>
  );
};

export default Home;
