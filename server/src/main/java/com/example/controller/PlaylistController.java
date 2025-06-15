package com.example.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.modules.PlaylistModules;
import com.example.services.PlaylistServices;


@RestController
@RequestMapping("/playlist")
@CrossOrigin(origins = "http://localhost:5173")
public class PlaylistController {
    private final PlaylistServices playlist;


    //Constructor
    public PlaylistController(PlaylistServices playlist){
        this.playlist = playlist;
    }

    @GetMapping
    public List<PlaylistModules> getAllPlaylist(){
        return playlist.getAllPlaylist();
    }

    @PostMapping
    public PlaylistModules createPlaylist(@RequestBody PlaylistModules novaplaylist){
        return playlist.createPlaylist(novaplaylist);
    }

    @DeleteMapping("/{id}")
    public String deletePlaylist(@PathVariable Long id) {
        boolean removed = playlist.deletePlaylist(id);
        return removed ? "Playlist deletado com sucesso!" : "Playlist não encontrado!";
    }

    @PutMapping("/{id}")
    public PlaylistModules updatePlaylist(@PathVariable Long id, @RequestBody PlaylistModules newPlaylist){
        return playlist.updatePlaylist(id, newPlaylist);
    }

    @PutMapping("/{playlistId}/add-musica/{musicaId}")
    public PlaylistModules adicionarMusica(
    @PathVariable Long playlistId,
    @PathVariable Long musicaId
    ) {
    return playlist.adicionarMusicaNaPlaylist(playlistId, musicaId);
}

@PutMapping("/{id}/ordenar/{criterio}")
public PlaylistModules ordenarMusicas(
    @PathVariable Long id,
    @PathVariable String criterio
) {
    return playlist.ordenarMusicas(id, criterio);
}

}

