import { useContext } from "react";
import { FooterMusic, FooterPlayerControls } from "../ui";
import { Context } from "../../context/Context";

const Footer = () => {
  const { activePlaying } = useContext(Context);
  return (
    <footer
      className={` ${
        activePlaying == null ? "hidden" : "block"
      }  absolute  bottom-0  flex items-center justify-between px-4 bg-black h-[6rem] w-full`}
    >
      <FooterMusic />
      <FooterPlayerControls />
    </footer>
  );
};

export default Footer;
