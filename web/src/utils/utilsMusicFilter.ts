import { Musica } from "../types/AllAplication";  


export const MusicasFilter=<T extends keyof Musica>(musicas: Musica[],chave:T): Musica[] => {
    return musicas.filter((musica, index, self) =>
        index === self.findIndex((m) => m[chave].nome === musica[chave].nome)
    )
}

export const YearFilter=<T extends keyof Musica>(musicas: Musica[],chave:T): Musica[] => {
    return musicas.filter((musica, index, self) =>
        index === self.findIndex((m) => m[chave] === musica[chave])
    )
}

export const MusicasFilterYear = (musicas: Musica[]): Musica[] => {
    return YearFilter(musicas,"ano").sort((a, b) => a.ano - b.ano); 
};

