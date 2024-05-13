const AboutUs = () => {
  return (
    <div className="my-14">
      <div
        className="container hero mx-auto mt-7 min-h-[70vh] bg-cover bg-fixed rounded-lg bg-center relative "
        style={{
          backgroundImage:
            "url(https://images.pexels.com/photos/6647026/pexels-photo-6647026.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        }}
      >
        <div className="w-full h-full absolute bg-black opacity-50 rounded-lg z-0"></div>
        <div className=" flex items-center z-10 absolute ">
          <div className="text-center lg:w-1/2 mx-auto text-white md:p-5">
            <div className="text-center ">
              <h1 className="text-2xl md:text-4xl font-bold mb-1">
                About <span className="text-pink-500">US</span>
              </h1>
              <div className="inline-flex items-center justify-center w-full">
                <hr className="w-64  my-4 border-pink-500 border rounded "></hr>
              </div>
            </div>

            <p className="mb-5 text-center text-body-color">
              Our website is designed to connect passionate individuals with
              meaningful volunteer opportunities, making it easier than ever to
              make a difference in your community. Whether you're looking to
              lend a helping hand, gain valuable skills, or simply give back,
              Volunize Hub is here to help you find the perfect volunteer
              opportunity that aligns with your interests and schedule.
            </p>

            <button className="btn bg-pink-500 text-white border-none">
              Explore More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
