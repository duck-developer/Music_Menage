import { useEffect, useState } from 'react';
import { api } from '../server/api';
import { Album } from '../types/AllAplication';

const useServiceAlbum = () => {
    const [Album, setAlbums] = useState<Album[]>([]);

    // Get Album
    const getAlbum = async () => {
        try {
            const response = await api.get("/album");
            setAlbums(response.data);
        } catch (error) {
            console.error("Erro ao buscar album", error);
        }
    };

    //POST Album
    const createAlbum = async (novoAlbum:string) => {
        try {
            const response = await api.post("/album", {nome:novoAlbum});
            setAlbums((prev) => [...prev, response.data]); 
        } catch (error) {
            console.error("Erro ao criar album", error);
        }
    };


    useEffect(() => {
        getAlbum();
    }, []);

    return {
        Album,
        createAlbum,
        // deleteGenero,
        // updatePlaylist
    };
};

export default useServiceAlbum;

