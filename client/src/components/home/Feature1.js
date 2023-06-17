import { AiOutlineArrowRight } from "react-icons/ai";
import messagef from "../../assets/messagef.jpg";
import { Link } from "react-router-dom";
export default function Feature1() {
  return (
    <section className="flex justify-center lg:py-12 lg:mt-5 lg:ml-14">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-x-[30px]">
          <div className="flex-1" data-aos="fade-right" data-aos-offset="400">
            <h2 className="text-6xl lg:text-8xl mb-6 font-bold">
              Anonymous Messaging
            </h2>
            <p className="text-2xl text-light font-normal mb-6 max-w-3xl">
              Our anonymous messaging feature lets you communicate with others
              without revealing your identity. Whether you want to ask a
              sensitive question or share a personal story.
            </p>
            <Link to="/login">
              <button className="text-[#8b5cf6] max-lg:mb-3 text-xl lg:text-2xl flex items-end gap-x-1 hover:gap-x-2 transition-all">
                Learn more
                <AiOutlineArrowRight className="flex items-end w-[18px]" />
              </button>
            </Link>
          </div>
          <div className="flex-1" data-aos="fade-left" data-aos-offset="300">
            <img
              className="max-lg:mb-3  rounded-2xl"
              src={messagef}
              alt="rating"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
