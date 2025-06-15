import { Logo } from "../../assets";
import { IconActive } from "../ui";
import { House, MagnifyingGlass, MusicNotesPlus } from "phosphor-react";
import { useContext } from "react";
import { Context } from "../../context/Context";

const Header = () => {
  const { setIsOpenForm, isOpenForm, setPlayListActive } = useContext(Context);
  return (
    <header className="flex flex-row items-center justify-between h-[4rem] py-4 px-4 bg-black ">
      <img className="w-16" src={Logo} alt="Logo" />
      <div className=" w-full px-4 flex flex-row justify-center items-center gap-7">
        <div
          onClick={() => setPlayListActive(null)}
          className="bg-[#1f1f1f]  hover:bg-[#292929] hover:scale-110 transition-colors ease-in-out  cursor-pointer w-10 h-10 items-center justify-center inline-flex rounded-full group"
        >
          <IconActive
            className=" group-hover:scale-110"
            active={false}
            size={25}
            icon={House}
            color="rgba(255, 255, 255, 0.5)"
          />
        </div>

        <div className="relative w-[22rem]">
          <IconActive
            icon={MagnifyingGlass}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 w-7 h-7"
            color="#b3b3b3"
            active={false}
          />

          <input
            type="search"
            placeholder="O que você quer ouvir?"
            className="w-full pl-12 pr-4 py-2 bg-[#121212] text-white placeholder-[#b3b3b3] rounded-full outline-none focus:ring-2 focus:ring-white transition-all"
          />
        </div>
        <button
          onClick={() => setIsOpenForm(!isOpenForm)}
          className="cursor-pointer w-12 h-12 rounded-full flex items-center justify-center transition-colors ease-in-out  hover:bg-green-500"
        >
          <IconActive
            icon={MusicNotesPlus}
            active={true}
            color="white"
            size={28}
          />
        </button>
      </div>
    </header>
  );
};

export default Header;
