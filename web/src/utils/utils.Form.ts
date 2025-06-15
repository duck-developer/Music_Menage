import { useContext, useState } from "react";
import { useServiceAlbum, useServiceArtista, useServiceGenero, useServiceMusica } from "../services";
import { Context } from "../context/Context";



const useForm = () => {

    const { isOpenForm, setIsOpenForm, setActiveSpinner } = useContext(Context)
    const { Generos, createGenero } = useServiceGenero();
    const { Artistas, createArtista } = useServiceArtista();
    const { Album, createAlbum } = useServiceAlbum();
    const { createMusica } = useServiceMusica()


    const [novoAlbum, setNovoAlbum] = useState("");
    const [novoArtista, setNovoArtista] = useState("");
    const [novoGenero, setNovoGenero] = useState("");
    const [duracao, setDuracao] = useState(0);
    const [selectedMusic, setSelectedMusic] = useState<File | null>(null);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    const [formData, setFormData] = useState({
        nome: "",
        albumId: "",
        artistaId: "",
        categoriaId: "",
        ano: 2000,
    });




    const handleMusicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;

        if (!file) return;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const audio = new Audio(reader.result as string);
            audio.onloadedmetadata = () => {
                setSelectedMusic(reader.result as string);

                setDuracao(Math.floor(audio.duration));
            };
        };
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        if (!file) return;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setSelectedImage(reader.result as string);
        };

    };


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();


        if (!selectedMusic || !selectedImage || !formData.ano || !formData.albumId || !formData.artistaId || !formData.categoriaId || !formData.nome) {
            alert("[ERROR] Todos os campos são obrigatórios ");
            return;
        } else {
            setActiveSpinner(true)
            createMusica({
                titulo: formData.nome,
                album: Album[parseInt(formData.albumId)],
                artista: Artistas[parseInt(formData.artistaId)],
                genero: Generos[parseInt(formData.categoriaId)],
                ano: formData.ano,
                image: selectedImage,
                mp3: selectedMusic,
                duracao: duracao
            });

            setTimeout(() => {
                setActiveSpinner(false)
                window.location.reload()
                setIsOpenForm(!isOpenForm)
            }, 3000);
        }

    };

    return {
        formData, handleChange, handleSubmit,
        novoAlbum, setNovoAlbum, novoArtista, setNovoArtista, novoGenero, setNovoGenero,
        selectedMusic, selectedImage, setSelectedMusic, setSelectedImage, setDuracao,
        duracao, Album, createAlbum, Artistas, createArtista, Generos, createGenero, handleMusicChange, handleImageChange,
    };
};

export default useForm;
