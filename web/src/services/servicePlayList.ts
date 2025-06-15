import { useEffect, useState } from "react";
import { api } from "../server/api";
import { Playlist } from "../types/AllAplication";

const useServicePlayList = () => {
  const [Playlists, setPlaylists] = useState<Playlist[]>([]);

  const getPlaylists = async () => {
    try {
      const response = await api.get("/playlist");
      setPlaylists(response.data);
    } catch (error) {
      console.error("Erro ao buscar playlists", error);
    }
  };

  const createPlaylist = async () => {
    try {
      const response = await api.post("/playlist", {});
      setPlaylists((prev) => [...prev, response.data]); // Atualiza o estado
    } catch (error) {
      console.error("Erro ao criar playlist", error);
    }
  };

  const deletePlaylist = async (id: number) => {
    try {
      await api.delete(`/playlist/${id}`, {});

      setPlaylists((prev) => prev.filter((playlist) => playlist.id !== id));
    } catch (error) {
      console.error("Error ao deletar playlist", error);
    }
  };

  const updatePlaylist = async (id: number, novoNome: string) => {
    try {
      await api.put(`/playlist/${id}`, { nome: novoNome });
      setPlaylists((prev) =>
        prev.map((playlist) =>
          playlist.id === id ? { ...playlist, nome: novoNome } : playlist
        )
      );
    } catch (error) {
      console.error("Erro ao atualizar playlist", error);
    }
  };

  async function adicionarMusicaNaPlaylist(
    playlistId: number,
    musicaId: number
  ) {
    try {
      const response = await api.put(
        `/playlist/${playlistId}/add-musica/${musicaId}`
      );
      const playlistAtualizada = response.data;

      setPlaylists((prev) =>
        prev.map((playlist) =>
          playlist.id === playlistId ? playlistAtualizada : playlist
        )
      );
    } catch (error) {
      console.error("Erro ao adicionar música na playlist", error);
    }
  }
  const ordenarPlaylist = async (playlistId: number, criterio: string) => {
    try {
      const response = await api.put(
        `/playlist/${playlistId}/ordenar/${criterio}`
      );
      const playlistOrdenada = response.data;

      setPlaylists((prev) =>
        prev.map((playlist) =>
          playlist.id === playlistId ? playlistOrdenada : playlist
        )
      );
    } catch (error) {
      console.error("Erro ao ordenar músicas da playlist", error);
    }
  };

  useEffect(() => {
    getPlaylists();
  }, []);

  return {
    Playlists,
    createPlaylist,
    deletePlaylist,
    updatePlaylist,
    adicionarMusicaNaPlaylist,
    ordenarPlaylist,
  };
};

export default useServicePlayList;
