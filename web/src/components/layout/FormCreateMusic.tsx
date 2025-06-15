import React, { useContext } from 'react'
import { FormInput, FormSelect, IconActive } from '../ui';
import useForm from '../../utils/utils.Form';
import { SpinnerGap } from 'phosphor-react';
import { Context } from '../../context/Context';

const FormCreateMusic = () => {
    const {
        formData, handleChange, handleSubmit,
        novoAlbum, setNovoAlbum, novoArtista, setNovoArtista, novoGenero, setNovoGenero,
        Album, createAlbum, Artistas, createArtista, Generos, createGenero, handleImageChange, handleMusicChange,
    } = useForm();
    const { activeSpinner } = useContext(Context)

    return (
        <div className='flex items-center justify-center bg-[#000000ad] absolute w-full top-0 left-0 h-full z-30'>
            <div className='bg-green-800 w-full h-full rounded-lg flex flex-col items-center px-4 relative'>
                <div className=" py-2 rounded-lg w-full text-white">
                    <h2 className="text-lg font-bold mb-4">Cadastrar Música</h2>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-3">

                        <div className='flex justify-between'>
                            <FormInput label="Nome da Música" name="nome" value={formData.nome} onChange={handleChange} />
                            <FormInput label="Ano" name="ano" type="number" value={formData.ano} onChange={handleChange} />
                        </div>
                        <div className='flex justify-between'>
                            {/* Input para Música */}
                            <label
                                htmlFor="musica"
                                className="bg-blue-500 text-white font-medium px-4 py-2 rounded-md cursor-pointer hover:bg-blue-600 transition"
                            >
                                Selecionar Música
                            </label>
                            <input
                                type="file"
                                name="Musica"
                                id="musica"
                                accept="audio/*"
                                className="hidden"
                                onChange={handleMusicChange}
                            />
                            {/* Input para Imagem */}
                            <label
                                htmlFor="imagem"
                                className="bg-green-500 text-white font-medium px-4 py-2 rounded-md cursor-pointer hover:bg-green-600 transition"
                            >
                                Selecionar Imagem
                            </label>
                            <input
                                type="file"
                                name="Imagem"
                                id="imagem"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageChange}
                            />
                        </div>

                        {/* Select e Adicionar Álbum */}
                        <FormSelect
                            label="Álbum"
                            name="albumId"
                            value={formData.albumId}
                            options={Album}
                            onChange={handleChange}
                            newValue={novoAlbum}
                            setNewValue={setNovoAlbum}
                            onAddNew={() => { if(!novoAlbum || novoAlbum==""){return}else{createAlbum(novoAlbum); setNovoAlbum("");} }}
                        />

                        {/* Select Artista */}
                        <FormSelect
                            label="Artista"
                            name="artistaId"
                            value={formData.artistaId}
                            options={Artistas}
                            onChange={handleChange}
                            newValue={novoArtista}
                            setNewValue={setNovoArtista}
                            onAddNew={() => { createArtista(novoArtista); setNovoArtista(""); }}
                        />


                        {/* Select Genero */}
                        <FormSelect
                            label="Gênero"
                            name="categoriaId"
                            value={formData.categoriaId}
                            options={Generos}
                            onChange={handleChange}
                            newValue={novoGenero}
                            setNewValue={setNovoGenero}
                            onAddNew={() => { createGenero(novoGenero); setNovoGenero(""); }}
                        />

                        <button type="submit" className="bg-blue-600 p-2 text-center h-[2.4rem] items-center justify-center flex rounded text-white font-bold mt-4 hover:bg-blue-700">
                            {activeSpinner ? <IconActive className=' animate-spin ' size={22} active icon={SpinnerGap} /> : "Cadastrar Música"}
                        </button>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default FormCreateMusic