package com.example.services;

import java.util.List;
import java.util.Objects;

import org.springframework.stereotype.Service;

import com.example.modules.ArtistaModules;
import com.example.utils.ArtistaCSVUtils;

@Service
public class ArtistaServices {

    private final List<ArtistaModules> artistas;
    private long id;

    public ArtistaServices() {
        this.artistas = ArtistaCSVUtils.carregarArtistas();
        this.id = artistas.stream()
                          .map(ArtistaModules::getId)
                          .filter(Objects::nonNull)
                          .max(Long::compare)
                          .map(maxId -> maxId + 1)
                          .orElse(0L);
    }

    public List<ArtistaModules> getAllArtista() {
        return artistas;
    }

    public ArtistaModules createArtista(ArtistaModules artista) {
        artista.setId(id);
        artistas.add(artista);
        id++;
        ArtistaCSVUtils.salvarArtistas(artistas);
        return artista;
    }

    public boolean deleteArtista(Long id) {
        boolean removed = artistas.removeIf(a -> a.getId().equals(id));
        if (removed) {
            ArtistaCSVUtils.salvarArtistas(artistas);
        }
        return removed;
    }
}
