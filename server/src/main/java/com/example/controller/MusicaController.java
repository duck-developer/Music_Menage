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

import com.example.modules.MusicaModules;
import com.example.services.MusicaServices;

@RestController
@RequestMapping("/musica")
@CrossOrigin(origins = "http://localhost:5173")
public class MusicaController {

    private final MusicaServices musica;

    public MusicaController(MusicaServices musica){
        this.musica = musica; 
    }

    @GetMapping
    public List<MusicaModules> getAllMusica(){
        return musica.getAllMusica();
    }

    @PostMapping
    public MusicaModules createMusica(@RequestBody MusicaModules novaMusica){
        return musica.createMusica(novaMusica);
    }
    @DeleteMapping("/{id}")
    public String deleteMusica(@PathVariable Long id){
        boolean removed = musica.deleteMusica(id);
        return removed ? "Musica deletado com sucesso" : "Musica não encontrado";

    }

}
