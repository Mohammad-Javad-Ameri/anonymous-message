import { useState } from "react";
import Polls from "../../assets/polls.png";
import messages from "../../assets/messages.png";
import rates from "../../assets/rates.png";

const product = {
  cards: [
    {
      icon: messages,
      title: "Send Message",
      subtitle: "Share your thoughts anonymously and see what others think",
      delay: 200,
    },
    {
      icon: Polls,
      title: "Polls",
      subtitle:
        "Create and participate in polls anonymously and discover what people really think",
      delay: 400,
    },
    {
      icon: rates,
      title: "Rate",
      subtitle: "rate opinions without being identified",
      delay: 600,
    },
  ],
};
export default function Cards() {
  const [index, setIndex] = useState(1);
  const { cards } = product;
  return (
    <div className="flex flex-col gap-y-[30px] justify-center items-center lg:flex-row lg:gap-x-[30px] ">
      {cards.map((card, cardIndex) => {
        const { icon, title, subtitle, delay } = card;
        return (
          <div
            key={cardIndex}
            data-aos="zoom-out"
            data-aos-offset="300"
            data-aos-delay={delay}
          >
            <div
              onClick={() => setIndex(cardIndex)}
              className={`${
                index === cardIndex && "bg-white shadow-2xl"
              }  border sm:w-[350px] sm:h-[350px] flex flex-col justify-center items-center max-sm:px-3 mx-auto p-[65px] text-center rounded-[12px] cursor-pointer transition-all`}
            >
              <div className="mb-6  w-16">
                <img src={icon} alt={cardIndex} />
              </div>
              <div className="mb-3 text-[30px] font-medium">{title}</div>
              <p className="mb-6 ">{subtitle}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
