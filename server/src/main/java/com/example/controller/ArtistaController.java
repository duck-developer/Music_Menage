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

import com.example.modules.ArtistaModules;
import com.example.services.ArtistaServices;


@RestController
@RequestMapping("/artista")
@CrossOrigin(origins="http://localhost:5173")
public class ArtistaController {
    private final ArtistaServices artista;

    public ArtistaController(ArtistaServices artista){
        this.artista = artista;
    }

    @GetMapping
        public List<ArtistaModules> getAllArtista(){
        return artista.getAllArtista();
    }

    @PostMapping
    public ArtistaModules createArtista(@RequestBody ArtistaModules novoArtista){
        return artista.createArtista(novoArtista);
    }


    @DeleteMapping("/{id}")
    public String deleteArtista(@PathVariable Long id){
        boolean removed = artista.deleteArtista(id);
        return removed ? "Artista deletado com sucesso" : "Artista não encontrado";

    }
}
