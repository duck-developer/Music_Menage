import { useEffect, useState } from 'react';
import { api } from '../server/api';
import { Musica } from '../types/AllAplication';

const useServiceMusica = () => {
    const [Musica, setMusicas] = useState<Musica[]>([]);

    // Get Musica
    const getMusica = async () => {
        try {
            const response = await api.get("/musica");
            setMusicas(response.data);
        } catch (error) {
            console.error("Erro ao buscar musica", error);
        }
    };

    //POST Musica
    const createMusica = async (novaMusica: Musica) => {
        try {
            const response = await api.post("/musica", {
                titulo: novaMusica.titulo,
                duracao: novaMusica.duracao,
                mp3: novaMusica.mp3,
                image: novaMusica.image,
                artista:novaMusica.artista,
                album: novaMusica.album,
                genero: novaMusica.genero,
                ano:novaMusica.ano
            });
            setMusicas((prev) => [...prev, response.data]);
        } catch (error) {
            console.error("Erro ao criar musica", error);
        }
    };


    useEffect(() => {
        getMusica();
    }, []);

    return {
        Musica,
        createMusica,
    };
};

export default useServiceMusica;

