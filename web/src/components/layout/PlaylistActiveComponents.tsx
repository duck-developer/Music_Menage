import { useContext } from "react";
import { Playlist } from "../../types/AllAplication";
import { Context } from "../../context/Context";
import { IconActive } from "../ui";
import { Clock } from "phosphor-react";
import useMusicControls from "../../utils/utilsMusicControls";
import useServicePlayList from "../../services/servicePlayList";

type Props = {
  playListActive: Playlist;
};
const PlaylistActiveComponents = ({ playListActive }: Props) => {
  const { setPlayListActive, setActivePlaying } = useContext(Context);
  const { FormatTime } = useMusicControls();
  const { ordenarPlaylist } = useServicePlayList();
  return (
    <div className="mt-8 px-10 z-20 custom-scrollbar overflow-y-auto">
      {playListActive!.musicas.length > 0 ? (
        <>
          <div className="grid grid-cols-12 gap-4 border-b-2 pb-2 border-[#dddd] mb-6">
            <p className="col-span-1">#</p>
            <p
              onClick={() => {
                ordenarPlaylist(playListActive.id, "titulo");
                setTimeout(() => {
                  window.location.reload();
                }, 500);
              }}
              className=" cursor-pointer col-span-5"
            >
              Título
            </p>
            <p
              onClick={() => {
                ordenarPlaylist(playListActive.id, "artista");
                setTimeout(() => {
                  window.location.reload();
                }, 500);
              }}
              className=" cursor-pointer col-span-4"
            >
              Artista
            </p>
            <p
              onClick={() => {
                ordenarPlaylist(playListActive.id, "duracao");

                setTimeout(() => {
                  window.location.reload();
                }, 500);
              }}
              className=" cursor-pointer col-span-2"
            >
              <IconActive icon={Clock} active={false} size={20} />
            </p>
          </div>

          {playListActive.musicas.map((musica, index) => (
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
                      <p className="font-bold text-[0.95rem]">
                        {musica.titulo}
                      </p>
                      <p className="text-[#dddd] text-[0.8rem]">
                        {musica.album.nome}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-span-4">
                  <p className="">{musica.artista.nome}</p>
                </div>

                <div className="col-span-2">
                  <p>{FormatTime(musica.duracao)}</p>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="flex mt-[20%]  flex-col items-center">
          <h1 className="text-2xl font-bold">Nenhuma Música Encontrada</h1>
          <p className="text-gray-400 mt-2">
            Adicione e gerencie suas músicas favoritas
          </p>

          <button
            onClick={() => setPlayListActive(null)}
            className="mt-4 cursor-pointer  bg-green-500 px-4 py-2 rounded text-white hover:bg-green-600 transition"
          >
            Cadastrar Música
          </button>
        </div>
      )}
    </div>
  );
};

export default PlaylistActiveComponents;
