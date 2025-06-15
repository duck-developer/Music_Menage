package com.example.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.modules.MusicaModules;
import com.example.utils.MusicaCSVUtils;


@Service
public class MusicaServices {

    private List<MusicaModules> musicas = new ArrayList<>();
    private long id;

    public MusicaServices() {
        this.musicas = MusicaCSVUtils.carregarMusicas();
        this.id = musicas.stream()
                         .mapToLong(MusicaModules::getId)
                         .max()
                         .orElse(0) + 1;
    }

    public List<MusicaModules> getAllMusica(){
        return musicas;
    }

    public MusicaModules createMusica(MusicaModules musica){
        musica.setId(id++);
        musicas.add(musica);
        MusicaCSVUtils.salvarMusicas(musicas); 
        return musica;
    }

    public boolean deleteMusica(long id){
        boolean removed = musicas.removeIf(musica -> musica.getId().equals(id));
        if (removed) {
            MusicaCSVUtils.salvarMusicas(musicas);
        }
        return removed;
    }
}

