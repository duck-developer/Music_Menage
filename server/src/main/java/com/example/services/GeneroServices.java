package com.example.services;

import java.util.List;
import java.util.Objects;

import org.springframework.stereotype.Service;

import com.example.modules.GeneroModules;
import com.example.utils.GeneroCSVUtils;

@Service
public class GeneroServices {

    private final List<GeneroModules> generos;
    private long id;

    public GeneroServices() {
        this.generos = GeneroCSVUtils.carregarGeneros();
        this.id = generos.stream()
                         .map(GeneroModules::getId)
                         .filter(Objects::nonNull)
                         .max(Long::compare)
                         .map(maxId -> maxId + 1)
                         .orElse(0L);
    }

    public List<GeneroModules> getAllGenero() {
        return generos;
    }

    public GeneroModules createGenero(GeneroModules genero) {
        genero.setId(id);
        if (genero.getImage() == null || genero.getImage().isEmpty()) {
            genero.setImage("https://t.scdn.co/images/728ed47fc1674feb95f7ac20236eb6d7.jpeg");
        }
        generos.add(genero);
        id++;
        GeneroCSVUtils.salvarGeneros(generos);
        return genero;
    }

    public boolean deleteGenero(Long id) {
        boolean removed = generos.removeIf(g -> g.getId().equals(id));
        if (removed) {
            GeneroCSVUtils.salvarGeneros(generos);
        }
        return removed;
    }
}
