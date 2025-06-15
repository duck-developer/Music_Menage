import React from 'react'
import { Musica } from '../../types/AllAplication'
import { MusicasFilter, MusicasFilterYear } from '../../utils/utilsMusicFilter';


interface HomeYeAlArFilterProps {
    filterKey: keyof Musica,
    musicas:Musica[]
}
const HomeYeAlArFilter = ({ filterKey,musicas }: HomeYeAlArFilterProps) => {
    let MusicasUnicas;

    if (filterKey === "ano") {
        MusicasUnicas = MusicasFilterYear(musicas);
    } else {
        MusicasUnicas = MusicasFilter(musicas, filterKey);
    }
    return (
        <>
            {filterKey == "genero" ?

                <div>
                    <div className='mt-6 px-10'>
                        <div className='grid grid-cols-3 gap-4'>
                            {MusicasUnicas.map((item) => (
                                <div key={item.genero.id} className="text-lg flex flex-col cursor-pointer hover:bg-[#1F1F1F] p-3 rounded-md">
                                    <img src={item.genero.image} className="rounded-md" alt="" />
                                    <p>{item.genero.nome}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
                :

                <div className='mt-6 px-10'>
                    <div className='grid grid-cols-4 gap-4 text-center'>
                        {MusicasUnicas.map((musica: Musica) => (
                            <div key={musica.id} className='text-lg border-[1px] w-40 border-[#898989] flex flex-col cursor-pointer hover:bg-[#1F1F1F] p-3 rounded-md'>
                               {filterKey == 'ano' ?    
                               <p>{String(musica[filterKey])}</p>
                               : <p>{String(musica[filterKey].nome)}</p>}
                            </div>
                        ))}
                    </div>
                </div>
            }
        </>


    )
}

export default HomeYeAlArFilter