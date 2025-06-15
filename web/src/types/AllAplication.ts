// Interface para Gênero
export interface Genero {
  id: number;
  nome: string;
  image: string;
}

export interface Artista {
  id: number;
  nome: string;
}

export interface Album {
  id: number;
  nome: string;
}

// Interface para Música
export interface Musica {
  id: number;
  titulo: string;
  artista: Artista;
  album: Album;
  genero: Genero;
  ano: number;
  duracao: number;
  mp3: string | File | null;
  image: string | File | null;
}

// Interface para Playlist
export interface Playlist {
  id: number;
  nome: string;
  musicas: Musica[] | [];
}
