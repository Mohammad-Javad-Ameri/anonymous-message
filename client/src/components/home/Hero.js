import { HiOutlineChevronDown } from "react-icons/hi";
import hero from "../../assets/hero.jpg";
import { Link } from "react-router-dom";
export default function Hero() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div>
      <section className=" flex justify-center lg:py-12 lg:mt-5 lg:ml-14 ">
        <div className="container mx-auto  flex justify-center items-center">
          <div className="flex flex-col lg:gap-x-[30px] gap-y-8 lg:gap-y-0 lg:flex-row items-center justify-center text-center lg:text-left">
            <div className=" flex-1">
              <img
                className="lg:max-w-lg object-cover  rounded-2xl"
                src={hero}
                alt="hero"
                data-aos="fade-down"
                data-aos-delay="800"
              />
            </div>
            <div className="flex-1">
              <h1
                className=" text-6xl lg:text-8xl mb-2 font-bold  lg:mb-5 "
                data-aos="fade-down"
                data-aos-delay="500"
              >
                Speak Up!
              </h1>
              <p
                className=" text-2xl font-normal mb-6  lg:mb-10 "
                data-aos="fade-down"
                data-aos-delay="600"
              >
                Share your opinions, participate in polls, and rate others'
                opinions without any fear of judgment.
              </p>
              <div
                className="flex items-center max-lg:justify-center  max-w-sm lg:max-w-full mx-auto lg:mx-0 gap-x-2 lg:gap-x-6"
                data-aos="fade-down"
                data-aos-delay="700"
              >
                {!user ? (
                  <Link to="login">
                    <button className="btn btn-md lg:btn-lg max-lg:mb-5 mb-5   hover:bg-[#8b5cf6] bg-[#8b5cf6] hover:border-[#8b5cf6] border-[#8b5cf6] btn-outline flex justify-center items-center lg:gap-x-4">
                      Try Free
                      <HiOutlineChevronDown />
                    </button>
                  </Link>
                ) : (
                  <Link to="dashboard">
                    <button className="btn btn-md lg:btn-lg max-lg:mb-5   hover:bg-[#8b5cf6] bg-[#8b5cf6] hover:border-[#8b5cf6] border-[#8b5cf6] btn-outline flex justify-center items-center lg:gap-x-4">
                      Try Free
                      <HiOutlineChevronDown />
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
