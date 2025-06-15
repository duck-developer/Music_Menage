import { useContext, useEffect, useRef, useState } from "react";
// import { Musica } from "../types/MusicaAllList";
import { HomeYeAlArFilter, HomeMusic } from "../components/ui";
import FormCreateMusic from "../components/layout/FormCreateMusic";
import { useServiceMusica } from "../services";
// import useForm from "../utils/utils.Form";
import { Context } from "../context/Context";
import { PlaylistActiveComponents } from "../components/layout";

const Home = () => {
  const { isOpenForm, setIsOpenForm, playListActive } = useContext(Context);
  // const [Playlist, setPlaylist] = useState(false);
  const [filtro, setFiltro] = useState("Música");
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { Musica } = useServiceMusica();
  const categorias = ["Música", "Artista", "Álbum", "Gênero", "Ano"];

  // Verifica se a rolagem passou de 50px
  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        setIsScrolled(scrollRef.current.scrollTop > 50);
      }
    };
    scrollRef.current?.addEventListener("scroll", handleScroll);
    return () => scrollRef.current?.removeEventListener("scroll", handleScroll);
  }, [scrollRef.current]);

  return (
    <div className="bg-[#121212] relative text-white w-[100%] h-[30.6rem] rounded-lg overflow-hidden flex flex-col">
      <div className="z-10 absolute w-full h-[17rem] from-[#121212] bg-gradient-to-t to-green-500 opacity-80 rounded-t-lg"></div>

      {playListActive ? (
        <PlaylistActiveComponents playListActive={playListActive} />
      ) : (
        <>
          <div
            ref={scrollRef}
            className="z-20 h-full custom-scrollbar overflow-y-auto"
          >
            <div
              className={` ${
                isScrolled ? "backdrop-blur-md" : "backdrop-blur-none"
              } backdrop-blur-md flex gap-4 pt-[5%] px-[40px] absolute   w-full py-4`}
            >
              {categorias.map((categoria) => (
                <button
                  key={categoria}
                  className={`px-3 py-1 rounded-full cursor-pointer text-[0.85rem] font-bold ${
                    filtro === categoria
                      ? "bg-white text-black"
                      : "bg-[#333] text-white"
                  }`}
                  onClick={() => setFiltro(categoria)}
                >
                  {categoria}
                </button>
              ))}
            </div>

            {Musica.length > 0 ? (
              <div className="mt-[12%]">
                {filtro === "Gênero" && (
                  <HomeYeAlArFilter musicas={Musica} filterKey="genero" />
                )}
                {filtro === "Ano" && (
                  <HomeYeAlArFilter musicas={Musica} filterKey="ano" />
                )}
                {filtro === "Álbum" && (
                  <HomeYeAlArFilter musicas={Musica} filterKey="album" />
                )}
                {filtro === "Artista" && (
                  <HomeYeAlArFilter musicas={Musica} filterKey="artista" />
                )}
                {filtro === "Música" && <HomeMusic musicas={Musica} />}
              </div>
            ) : (
              <div className="flex mt-[20%]  flex-col items-center">
                <h1 className="text-2xl font-bold">
                  Nenhuma Música Encontrada
                </h1>
                <p className="text-gray-400 mt-2">
                  Adicione e gerencie suas músicas favoritas
                </p>

                <button
                  onClick={() => setIsOpenForm(true)}
                  className="mt-4 cursor-pointer bg-green-500 px-4 py-2 rounded text-white hover:bg-green-600 transition"
                >
                  Cadastrar Música
                </button>
              </div>
            )}
          </div>
        </>
      )}

      {/* FORM CREATE MUSIC */}
      {isOpenForm && <FormCreateMusic />}
    </div>
  );
};

export default Home;
