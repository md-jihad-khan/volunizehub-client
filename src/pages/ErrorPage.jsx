import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import animation from "../assets/animation-cat-404.json";
import { Helmet } from "react-helmet-async";

const ErrorPage = () => {
  return (
    <section className="flex items-center h-[100vh]  text-gray-800">
      <Helmet>
        <title>Volunize Hub | Error</title>
      </Helmet>
      <div className="container flex flex-col items-center justify-center mx-auto">
        <div className="max-w-md text-center">
          <div>
            <Lottie className="" animationData={animation} loop={true} />
          </div>
          <p className="text-2xl font-semibold md:text-3xl">
            Sorry, we could not find this page.
          </p>
          <Link
            to={"/"}
            className="btn mt-4 font-semibold bg-pink-500 text-gray-50"
          >
            Back to homepage
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
