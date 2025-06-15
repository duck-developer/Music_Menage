import { useEffect, useState } from 'react';
import { api } from '../server/api';
import { Genero } from '../types/AllAplication';

const useServiceGenero = () => {
    const [Generos, setGeneros] = useState<Genero[]>([]);

    // Get Genero
    const getGeneros = async () => {
        try {
            const response = await api.get("/genero");
            setGeneros(response.data);
        } catch (error) {
            console.error("Erro ao buscar generos", error);
        }
    };

    const createGenero = async (novoGenero:string) => {
        try {
            const response = await api.post("/genero", {nome:novoGenero});
            setGeneros((prev) => [...prev, response.data]); // Atualiza o estado
        } catch (error) {
            console.error("Erro ao criar genero", error);
        }
    };

    // const deleteGenero = async (id: number) => {
    //     try {
    //         await api.delete(`/genero/${id}`, {})

    //         setGeneros((prev) => prev.filter((genero) => genero.id !== id));

    //     } catch (error) {
    //         console.error("Error ao deletar genero", error)
    //     }

    // }

    // const updateGenero = async (id: number, novoNome: string) => {
    //     try {
    //         await api.put(`/genero/${id}`, { nome: novoNome });
    //         setGeneros((prev) =>
    //             prev.map((playlist) =>
    //                 playlist.id === id ? { ...playlist, nome: novoNome } : playlist
    //             )
    //         );
    //     } catch (error) {
    //         console.error("Erro ao atualizar playlist", error);
    //     }
    // };

    useEffect(() => {
        getGeneros();
    }, []);

    return {
        Generos,
        createGenero,
        // deleteGenero,
        // updatePlaylist
    };
};

export default useServiceGenero;

