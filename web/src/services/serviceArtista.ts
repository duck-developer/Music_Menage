import { useEffect, useState } from 'react';
import { api } from '../server/api';
import { Artista } from '../types/AllAplication';

const useServiceArtista = () => {
    const [Artistas, setArtistas] = useState<Artista[]>([]);

    // Get Artista
    const getArtistas = async () => {
        try {
            const response = await api.get("/artista");
            setArtistas(response.data);
        } catch (error) {
            console.error("Erro ao buscar artistas", error);
        }
    };

    //POST Artista
    const createArtista = async (novoGenero:string) => {
        try {
            const response = await api.post("/artista", {nome:novoGenero});
            setArtistas((prev) => [...prev, response.data]); // Atualiza o estado
        } catch (error) {
            console.error("Erro ao criar artista", error);
        }
    };


    useEffect(() => {
        getArtistas();
    }, []);

    return {
        Artistas,
        createArtista,
        // deleteGenero,
        // updatePlaylist
    };
};

export default useServiceArtista;

