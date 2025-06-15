import { IconActive } from "../components/ui";
import { DotsThreeVertical, MusicNotesSimple, Plus, X } from "phosphor-react";
import { Icon } from "../assets";
import { servicePlaylist } from "../services";
import { useContext, useState } from "react";
import { Context } from "../context/Context";

const PlayList = () => {
  const { setPlayListActive } = useContext(Context);
  const { Playlists, createPlaylist, deletePlaylist, updatePlaylist } =
    servicePlaylist();

  const [ActivePlayListEdit, setActivePlayListEdit] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState<{
    id: number;
    nome: string;
  } | null>(null);

  // Abre o modal e define a playlist selecionada
  const handleOpenModal = (playlist: { id: number; nome: string }) => {
    setSelectedPlaylist(playlist);
    setActivePlayListEdit(true);
  };

  // Fecha o modal
  const handleCloseModal = () => {
    setActivePlayListEdit(false);
    setSelectedPlaylist(null);
  };

  return (
    <div className="bg-[#121212] w-[40%] pt-4  items-center  flex flex-col rounded-lg text-white h-[30.6rem]">
      <div className="flex items-center justify-between w-full px-4">
        <div className="flex">
          <Icon color="white" width={25} height={25} />
          <h1 className="ml-2 font-bold text-[#DCDCDC]">Sua Biblioteca</h1>
        </div>
        <button onClick={() => createPlaylist()} type="button">
          <IconActive
            className=" cursor-pointer hover:bg-[#3a3737] transition-colors ease-in-out rounded-full p-1"
            icon={Plus}
            color="white"
            active
            size={35}
          />
        </button>
      </div>

      {Playlists.length == 0 ? (
        <div className=" h-full flex  pt-[60%]">
          <h1 className=" font-semibold text-[#b3b3b3]">
            Você não Criou Nenhum Playlist
          </h1>
        </div>
      ) : (
        <div className=" custom-scrollbar w-full h-full overflow-y-auto mt-7 pl-4 custom-scr">
          {Playlists.map((item, index) => (
            <div
              key={index}
              onClick={() => setPlayListActive(item)}
              className="  flex justify-between transition-colors ease-in-out hover:bg-[#1F1F1F] mt-1 rounded-md items-center p-2  cursor-pointer"
            >
              <div className="flex gap-2 items-center">
                <div className="bg-[#282828] p-1 rounded-sm w-12 h-12 items-center flex justify-center">
                  <IconActive
                    icon={MusicNotesSimple}
                    active={false}
                    size={28}
                  />
                </div>
                <div>
                  <h1 className=" font-bold text-[0.95rem]" key={index}>
                    {item.nome}
                  </h1>
                  <p className="text-[0.75rem]">
                    {Playlists[index].musicas.length} Musicas
                  </p>
                </div>
              </div>
              <button
                type="button"
                className=" rounded-full p-1  cursor-pointer hover:bg-[#3a3737] "
                onClick={() => handleOpenModal(item)}
              >
                <IconActive active={true} icon={DotsThreeVertical} size={25} />
              </button>
            </div>
          ))}
        </div>
      )}
      {ActivePlayListEdit && (
        <div
          className="flex items-center justify-center bg-[#000000ad] absolute w-full top-0 left-0 h-full z-50"
          onClick={handleCloseModal}
        >
          <div
            className="bg-[#282828] w-[30rem] h-[15rem] rounded-lg flex flex-col items-center p-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botão de fechar */}
            <button
              className="absolute top-2 right-2 text-white cursor-pointer"
              onClick={handleCloseModal}
            >
              <IconActive icon={X} active={true} size={20} />
            </button>

            <h1 className="text-[1.3rem]">Editar {selectedPlaylist?.nome} </h1>

            <div className="mt-4">
              <label htmlFor="playlistName" className="text-sm">
                Nome:
              </label>
              <input
                type="text"
                id="playlistName"
                defaultValue={selectedPlaylist?.nome}
                onChange={(e) =>
                  setSelectedPlaylist((prev) =>
                    prev ? { ...prev, nome: e.target.value } : null
                  )
                }
                className="bg-[#3E3E3E] text-white px-2 py-1 rounded w-full outline-none mt-1"
              />
            </div>

            <div className="justify-between flex px-[25%] mt-6 w-full">
              <button
                onClick={() => {
                  if (
                    selectedPlaylist?.id !== undefined &&
                    selectedPlaylist.nome !== undefined
                  ) {
                    updatePlaylist(
                      selectedPlaylist?.id,
                      selectedPlaylist?.nome
                    );
                    handleCloseModal();
                  }
                }}
                className="bg-green-500 font-bold cursor-pointer hover:bg-green-700 px-4 text-[0.8rem] py-2 rounded-md"
              >
                Salvar
              </button>
              <button
                onClick={() => {
                  if (selectedPlaylist?.id !== undefined) {
                    deletePlaylist(selectedPlaylist.id);
                    handleCloseModal();
                  }
                }}
                className="bg-red-500 font-bold cursor-pointer hover:bg-red-700 px-4 text-[0.8rem] py-2 rounded-md"
              >
                Deletar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayList;

// import { IconActive } from '../components/ui';
// import { DotsThreeVertical, MusicNotesSimple, Plus, X } from 'phosphor-react';
// import { Icon } from '../assets';
// import usePlayList from '../utils/utilsPlayList';
// import { useState } from 'react';

// const PlayList = () => {
//     const { Playlists, createPlaylist } = usePlayList();

//     // Estado para controlar se o modal está aberto e armazenar a playlist ativa
//     const [activePlayListEdit, setActivePlayListEdit] = useState(false);

//     return (
//         <div className='bg-[#121212] w-[40%] pt-4 items-center flex flex-col rounded-lg text-white h-[30.6rem] relative'>
//             <div className='flex items-center justify-between w-full px-4'>
//                 <div className='flex'>
//                     <Icon color='white' width={25} height={25} />
//                     <h1 className='ml-2 font-bold text-[#DCDCDC]'>Sua Biblioteca</h1>
//                 </div>
//                 <button onClick={createPlaylist} type="button">
//                     <IconActive className='cursor-pointer hover:bg-[#3a3737] transition-colors ease-in-out rounded-full p-1' icon={Plus} color='white' active size={35} />
//                 </button>
//             </div>

//             {Playlists.length === 0 ? (
//                 <div className='h-full flex pt-[60%]'>
//                     <h1 className='font-semibold text-[#b3b3b3]'>Você não criou nenhuma playlist</h1>
//                 </div>
//             ) : (
//                 <div className='custom-scrollbar w-full h-full overflow-y-auto mt-7 pl-4 custom-scr'>
//                     {Playlists.map((item) => (
//                         <div key={item.id} className='flex justify-between transition-colors ease-in-out hover:bg-[#1F1F1F] mt-1 rounded-md items-center p-2 cursor-pointer'>
//                             <div className='flex gap-2 items-center'>
//                                 <div className='bg-[#282828] p-1 rounded-sm w-12 h-12 flex items-center justify-center'>
//                                     <IconActive icon={MusicNotesSimple} active={false} size={28} />
//                                 </div>
//                                 <div>
//                                     <h1 className='font-bold text-[0.95rem]'>{item.nome}</h1>
//                                     <p className='text-[0.75rem]'>{item.musicas.length} Músicas</p>
//                                 </div>
//                             </div>
//                             <button type="button" className='rounded-full p-1 cursor-pointer hover:bg-[#3a3737]' onClick={() => handleOpenModal(item)}>
//                                 <IconActive active={true} icon={DotsThreeVertical} size={25} />
//                             </button>
//                         </div>
//                     ))}
//                 </div>
//             )}

//             {/* Modal de edição da playlist */}
// {activePlayListEdit && selectedPlaylist && (

//             )}
//         </div>
//     );
// };

// export default PlayList;
