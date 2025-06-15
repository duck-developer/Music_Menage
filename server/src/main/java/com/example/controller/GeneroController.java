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

import com.example.modules.GeneroModules;
import com.example.services.GeneroServices;

@RestController
@RequestMapping("/genero")
@CrossOrigin(origins = "http://localhost:5173")
public class GeneroController{

    private final GeneroServices genero;

    public GeneroController(GeneroServices genero){
        this.genero = genero;
    }

    @GetMapping
    public List<GeneroModules> getAllGenero(){
        return genero.getAllGenero();
    }

    @PostMapping
    public GeneroModules createGenero(@RequestBody GeneroModules novoGenero){
        return genero.createGenero(novoGenero);
    }

    @DeleteMapping("/{id}")
    public String deleteGenero(@PathVariable Long id){
        boolean removed = genero.deleteGenero(id);
        return removed ? "Genero deletado com sucesso" : "Genero não encontrado";

    }

}
