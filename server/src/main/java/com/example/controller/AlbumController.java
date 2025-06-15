package com.example.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.modules.AlbumModules;
import com.example.services.AlbumServices;

@RestController
@RequestMapping("/album")
@CrossOrigin(origins="http://localhost:5173")
public class AlbumController {
    private final AlbumServices album;

    public AlbumController(AlbumServices album){
        this.album = album;
    }

    @GetMapping
    public List<AlbumModules> getAllAlbum(){
        return album.getAllAlbum();
    }

    @PostMapping
    public AlbumModules createAlbum(@RequestBody AlbumModules novoAlbum){
        return album.createAlbum(novoAlbum);
    }

    @DeleteMapping("/{id}")
    public String deleteAlbum(@PathVariable Long id){
        boolean removed = album.deleteAlbum(id);
        return removed ? "Album deletado com sucesso" : "Album não encontrado";

    }

}
