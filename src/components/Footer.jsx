import {
  FaFacebook,
  FaInbox,
  FaInstagram,
  FaLinkedin,
  FaLocationArrow,
  FaPhone,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-base-200 mt-20">
      <div className="flex flex-col pt-10 pb-10 md:flex-row w-4/5 mx-auto items-center">
        <div className="space-y-3 md:w-1/2">
          <h3 className="font-rancho text-3xl font-bold gradient-text">
            <span className="text-pink-500">Volunize</span> Hub
          </h3>
          <p>
            Always ready to be your friend. Come & Contact with us to share your
            memorable moments, to share with your best companion.
          </p>

          <div className="flex gap-3 text-3xl">
            <FaFacebook />
            <FaTwitter />
            <FaInstagram />
            <FaLinkedin />
          </div>
        </div>
        <div className="flex flex-col py-6 space-y-6 md:py-0 md:px-6 w-full md:w-1/2">
          <h3 className="font-rancho text-3xl font-bold gradient-text">
            <span className="text-pink-500">Get</span> in Touch
          </h3>

          <div>
            <p className="flex items-center">
              <FaPhone /> +88 01533 333 333
            </p>
            <p className="flex items-center">
              <FaInbox /> info@gmail.com
            </p>
            <p className="flex items-center">
              <FaLocationArrow /> 72, Wall street, King Road, Dhaka
            </p>
          </div>
        </div>
      </div>

      <div className="footer footer-center p-2 font-rancho text-white bg-pink-500 ">
        <aside>
          <p>Copyright Crafty Gallery ! All Rights Reserved</p>
        </aside>
      </div>
    </div>
  );
};

export default Footer;
