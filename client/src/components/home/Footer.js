import { BsGithub, BsTelegram, BsInstagram } from "react-icons/bs";

export default function Footer() {
  return (
    <footer
      className="footer footer-center py-3 border-t "
      data-aos="fade-right"
      data-aos-offset="0"
      data-aos-delay="200"
    >
      <div>
        <p className="font-bold">Speak up! Ltd.</p>
        <p>Copyright © 2023 - All right reserved</p>
      </div>
      <div>
        <div className="grid grid-flow-col gap-4">
          <a href="https://github.com/Mohammad-Javad-Ameri">
            <BsGithub className="w-[24px] h-[24px]" />
          </a>
          <a href="#">
            <BsTelegram className="w-[24px] h-[24px]" />
          </a>
          <a href="#">
            <BsInstagram className="w-[24px] h-[24px]" />
          </a>
        </div>
      </div>
    </footer>
  );
}
