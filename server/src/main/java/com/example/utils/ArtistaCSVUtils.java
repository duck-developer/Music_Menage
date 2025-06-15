package com.example.utils;

import com.example.modules.ArtistaModules;
import org.apache.commons.csv.*;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.*;
import java.util.*;

public class ArtistaCSVUtils {

    private static final String FILE_PATH = "artistas.csv";

    public static void salvarArtistas(List<ArtistaModules> artistas) {
        try (BufferedWriter writer = Files.newBufferedWriter(Paths.get(FILE_PATH), StandardCharsets.UTF_8);
             CSVPrinter csvPrinter = new CSVPrinter(writer, CSVFormat.DEFAULT.withHeader("id", "nome"))) {

            for (ArtistaModules artista : artistas) {
                csvPrinter.printRecord(
                        artista.getId(),
                        artista.getNome()
                );
            }

            csvPrinter.flush();
        } catch (IOException e) {
            System.err.println("Erro ao salvar artistas CSV: " + e.getMessage());
            e.printStackTrace();
        }
    }

    public static List<ArtistaModules> carregarArtistas() {
        List<ArtistaModules> artistas = new ArrayList<>();
        Path path = Paths.get(FILE_PATH);
        if (!Files.exists(path)) {
            return artistas;
        }

        try (Reader reader = Files.newBufferedReader(path, StandardCharsets.UTF_8);
             CSVParser csvParser = new CSVParser(reader, CSVFormat.DEFAULT
                     .withHeader("id", "nome")
                     .withFirstRecordAsHeader()
                     .withTrim())) {

            for (CSVRecord record : csvParser) {
                ArtistaModules artista = new ArtistaModules();
                artista.setId(parseLongSafe(record.get("id")));
                artista.setNome(record.get("nome"));
                artistas.add(artista);
            }

        } catch (IOException e) {
            System.err.println("Erro ao carregar artistas CSV: " + e.getMessage());
            e.printStackTrace();
        }

        return artistas;
    }

    private static Long parseLongSafe(String valor) {
        try {
            return (valor == null || valor.isEmpty()) ? null : Long.parseLong(valor);
        } catch (NumberFormatException e) {
            return null;
        }
    }
}
