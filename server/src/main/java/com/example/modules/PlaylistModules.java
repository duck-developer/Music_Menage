package com.example.modules;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class PlaylistModules  implements Serializable{
    
    private Long id;
    private String nome;
    private List<MusicaModules> musicas;

    public PlaylistModules() {
        this.musicas = new ArrayList<>();
    }

    public Long getId() {
        return id;
    }
    

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public List<MusicaModules> getMusicas() {
        return musicas;
    }

    public void setMusicas(List<MusicaModules> musicas) {
        this.musicas = musicas;
    }

    public void adicionarMusica(MusicaModules musica) {
        this.musicas.add(musica);
    }
    

}
