import { useContext } from "react";
import { Musica } from "../../types/AllAplication";
import useMusicControls from "../../utils/utilsMusicControls";
import IconActive from "./IconActive";
import { Clock } from "phosphor-react";
import { Context } from "../../context/Context";

interface HomeMusicProps {
  musicas: Musica[];
}

const HomeMusic = ({ musicas }: HomeMusicProps) => {
  const { FormatTime } = useMusicControls();

  const { setActivePlaying } = useContext(Context);
  return (
    <div className="mt-6 px-10">
      <div className="grid grid-cols-12 gap-4 border-b-2 pb-2 border-[#dddd] mb-6">
        <p className="col-span-1">#</p>
        <p className="col-span-5">Título</p>
        <p className="col-span-4">Álbum</p>
        <p className="col-span-2">
          <IconActive icon={Clock} active={false} size={20} />
        </p>
      </div>
      {musicas.map((musica, index) => (
        <div
          key={index}
          className="mb-2 "
          onClick={() => {
            setActivePlaying(musica);
          }}
        >
          <div className="grid grid-cols-12 gap-4 mb-8 cursor-pointer hover:shadow-2xl hover:shadow-green-500 hover:bg-[#2D2C32] items-center rounded-md px-4 py-2">
            <p className="col-span-1 text-[1.1rem]">{index + 1}</p>
            <div className="col-span-5 flex items-center gap-4">
              <div className="flex items-center">
                <img
                  src={musica.image}
                  className="rounded-md h-10 w-10"
                  alt=""
                />
                <div className="ml-3">
                  <p className="font-bold text-[0.95rem]">{musica.titulo}</p>
                  <p className="text-[#dddd] text-[0.8rem]">
                    {musica.artista.nome}
                  </p>
                </div>
              </div>
            </div>

            <div className="col-span-4">
              <p className="">{musica.album.nome}</p>
            </div>

            <div className="col-span-2">
              <p>{FormatTime(musica.duracao)}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomeMusic;
