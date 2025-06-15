package com.example.modules;

import java.io.Serializable;

public class MusicaModules  implements Serializable {
    private Long id;
    private String titulo;
    private Integer duracao;
    private String mp3;
    private String image;
    private ArtistaModules artista;
    private AlbumModules album;
    private GeneroModules genero;
    private long ano;

    public MusicaModules() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public Long getAno() {
        return ano;
    }

    public void setAno(Long ano) {
        this.ano = ano;
    }



        
    public Integer getDuracao() {
        return duracao;
    }
    
    public void setDuracao(Integer duracao) {
        this.duracao = duracao;
    }
    public String getMp3() {
        return mp3;
    }

    public void setMp3(String mp3) {
        this.mp3 = mp3;
    }
    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public ArtistaModules getArtista() {
        return artista;
    }

    public void setArtista(ArtistaModules artista) {
        this.artista = artista;
    }

    public AlbumModules getAlbum() {
        return album;
    }

    public void setAlbum(AlbumModules album) {
        this.album = album;
    }

    public GeneroModules getGenero() {
        return genero;
    }

    public void setGenero(GeneroModules genero) {
        this.genero = genero;
    }



    
}
