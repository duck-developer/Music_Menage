import React, { useContext, useState } from "react";
import IconActive from "./IconActive";
import { PlusCircle, CheckCircle } from "phosphor-react";
import { Context } from "../../context/Context";
import useServicePlayList from "../../services/servicePlayList";
import { Playlist } from "../../types/AllAplication";

const Logo = () => {
  const { activePlaying } = useContext(Context);

  const [isAddPlayList, setIsAddPlayList] = useState<boolean>(false);

  const { Playlists, adicionarMusicaNaPlaylist } = useServicePlayList();

  const handleAdd = async (playlist: Playlist) => {
    if (playlist.musicas.some((m) => m.id === activePlaying?.id)) {
      alert("Música já está na playlist.");
      setIsAddPlayList(false);
      return;
    }

    await adicionarMusicaNaPlaylist(playlist.id, activePlaying?.id);

    setIsAddPlayList(false);
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };
  return (
    <div className="flex gap-2 h-full w-[30%] items-center text-start">
      <img className="h-14 w-auto" src={activePlaying?.image} alt="" />
      <div className="ml-2">
        <h6 className="hover:underline cursor-pointer font-bold text-white text-[0.9rem]">
          {activePlaying?.titulo}
        </h6>
        <p className="hover:underline cursor-pointer hover:text-white font-medium text-[0.75rem] text-[#b3b3b3]">
          {activePlaying?.artista.nome}
        </p>
      </div>

      <button type="button" onClick={() => setIsAddPlayList(!isAddPlayList)}>
        <IconActive
          className=" transition-colors ease-in-out cursor-pointer hover:text-white text-[#b3b3b3]"
          icon={PlusCircle}
          active={false}
          size={25}
        />
      </button>

      {isAddPlayList && (
        <div className=" bottom-[100%]  z-50 left-[20%] absolute mt-2 w-64 bg-zinc-900 overflow-hidden border  h-[300px]   border-zinc-700 rounded-xl shadow-xl p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white text-sm">Selecionar uma playlist:</span>
            <button onClick={() => setIsAddPlayList(false)}>
              <IconActive
                className="hover:scale-110 cursor-pointer text-green-500"
                icon={CheckCircle}
                active={true}
                size={20}
              />
            </button>
          </div>

          {Playlists.length === 0 ? (
            <p className="text-zinc-400 text-sm">
              Nenhuma playlist disponível.
            </p>
          ) : (
            <ul className="space-y-2 max-h-[300px] custom-scrollbar  overflow-y-auto  ">
              {Playlists.map((playlist) => (
                <li
                  key={playlist.id}
                  className="cursor-pointer px-3 py-2 rounded-lg hover:bg-zinc-800 text-white text-sm border border-zinc-800"
                  onClick={() => handleAdd(playlist)}
                >
                  {playlist.nome}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Logo;
