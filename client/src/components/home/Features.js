import Cards from "./Cards";

export default function Features() {
  return (
    <section className="py-8 lg:py-[142px]">
      <div className="container mx-auto">
        <div className="flex flex-col lg:mb-20 sm:mb-10">
          <h2
            className="text-6xl max-lg:mb-3 lg:text-7xl  ml-4 font-bold"
            data-aos="fade-down"
            data-aos-offset="400"
            data-aos-delay="300"
          >
            The Features We Offer
          </h2>
        </div>
        <Cards />
      </div>
    </section>
  );
}
