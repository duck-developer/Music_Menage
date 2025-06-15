package com.example.services;

import java.util.List;
import java.util.Objects;

import org.springframework.stereotype.Service;

import com.example.modules.AlbumModules;
import com.example.utils.AlbumCSVUtils;

@Service
public class AlbumServices {
    private final List<AlbumModules> albuns;
    private long id;

    public AlbumServices() {
        this.albuns = AlbumCSVUtils.carregarAlbuns();

        this.id = albuns.stream()
                        .map(AlbumModules::getId)
                        .filter(Objects::nonNull)
                        .max(Long::compare)
                        .map(maxId -> maxId + 1)
                        .orElse(0L);
    }

    public List<AlbumModules> getAllAlbum() {
        return albuns;
    }

    public AlbumModules createAlbum(AlbumModules album) {
        album.setId(id);
        albuns.add(album);
        id++;

        AlbumCSVUtils.salvarAlbuns(albuns); 
        return album;
    }

    public boolean deleteAlbum(long id) {
        boolean removed = albuns.removeIf(album -> album.getId().equals(id));
        if (removed) {
            AlbumCSVUtils.salvarAlbuns(albuns);
        }
        return removed;
    }
}
