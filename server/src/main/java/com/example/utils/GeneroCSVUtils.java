package com.example.utils;

import com.example.modules.GeneroModules;
import org.apache.commons.csv.*;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.*;
import java.util.*;

public class GeneroCSVUtils {

    private static final String FILE_PATH = "generos.csv";

    public static void salvarGeneros(List<GeneroModules> generos) {
        try (BufferedWriter writer = Files.newBufferedWriter(Paths.get(FILE_PATH), StandardCharsets.UTF_8);
             CSVPrinter csvPrinter = new CSVPrinter(writer, CSVFormat.DEFAULT.withHeader("id", "nome", "image"))) {

            for (GeneroModules genero : generos) {
                csvPrinter.printRecord(
                        genero.getId(),
                        genero.getNome(),
                        genero.getImage()
                );
            }

            csvPrinter.flush();
        } catch (IOException e) {
            System.err.println("Erro ao salvar generos CSV: " + e.getMessage());
            e.printStackTrace();
        }
    }

    public static List<GeneroModules> carregarGeneros() {
        List<GeneroModules> generos = new ArrayList<>();
        Path path = Paths.get(FILE_PATH);
        if (!Files.exists(path)) {
            return generos;
        }

        try (Reader reader = Files.newBufferedReader(path, StandardCharsets.UTF_8);
             CSVParser csvParser = new CSVParser(reader, CSVFormat.DEFAULT
                     .withHeader("id", "nome", "image")
                     .withFirstRecordAsHeader()
                     .withTrim())) {

            for (CSVRecord record : csvParser) {
                GeneroModules genero = new GeneroModules();
                genero.setId(parseLongSafe(record.get("id")));
                genero.setNome(record.get("nome"));
                genero.setImage(record.get("image"));
                generos.add(genero);
            }

        } catch (IOException e) {
            System.err.println("Erro ao carregar generos CSV: " + e.getMessage());
            e.printStackTrace();
        }

        return generos;
    }

    private static Long parseLongSafe(String valor) {
        try {
            return (valor == null || valor.isEmpty()) ? null : Long.parseLong(valor);
        } catch (NumberFormatException e) {
            return null;
        }
    }
}
