import { AiOutlineArrowRight } from "react-icons/ai";
import pollf from "../../assets/pollf.jpg";
import { Link } from "react-router-dom";

export default function Feature2() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <section className="flex justify-center lg:py-12 lg:mt-5 lg:ml-14">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-x-[30px]">
          <div
            className="flex-1 order-1 lg:order-1"
            data-aos="fade-down"
            data-aos-offset="300"
          >
            <img
              className="max-lg:mb-3  rounded-2xl"
              src={pollf}
              alt="rating"
            />
          </div>
          <div
            className="flex-1 order-2 lg:order-2"
            data-aos="fade-down"
            data-aos-offset="400"
          >
            <h2 className="text-6xl lg:text-8xl mx-3 mb-6 font-bold text-center">
              Anonymous Poll
            </h2>
            <p className="text-2xl text-light font-normal mb-4 mx-5 max-w-3xl">
              With our anonymous poll attendance feature, you can participate in
              polls without revealing your identity. This ensures your privacy
              and allows you to express your honest opinions without any fear of
              judgment. Join the conversation and have your voice heard without
              compromising your anonymity.
            </p>
            {!user ? (
              <Link to="/login">
                <button className="text-[#8b5cf6] max-lg:mb-3 mb-3 text-xl mx-5 lg:text-2xl flex items-end gap-x-1 hover:gap-x-2 transition-all">
                  Learn more
                  <AiOutlineArrowRight className="flex items-end w-[18px]" />
                </button>
              </Link>
            ) : (
              <Link to="/dashboard">
                <button className="text-[#8b5cf6] max-lg:mb-3 text-xl mx-5 lg:text-2xl flex items-end gap-x-1 hover:gap-x-2 transition-all">
                  Learn more
                  <AiOutlineArrowRight className="flex items-end w-[18px]" />
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
