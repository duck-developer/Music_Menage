package com.example.utils;

import com.example.modules.AlbumModules;
import org.apache.commons.csv.*;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.*;
import java.util.*;

public class AlbumCSVUtils {

    private static final String FILE_PATH = "albuns.csv";

    // Salva a lista de álbuns no arquivo CSV
    public static void salvarAlbuns(List<AlbumModules> albuns) {
        try (BufferedWriter writer = Files.newBufferedWriter(Paths.get(FILE_PATH), StandardCharsets.UTF_8);
             CSVPrinter csvPrinter = new CSVPrinter(writer, CSVFormat.DEFAULT.withHeader("id", "nome"))) {

            for (AlbumModules album : albuns) {
                csvPrinter.printRecord(
                        album.getId(),
                        album.getNome()
                );
            }

            csvPrinter.flush();
        } catch (IOException e) {
            System.err.println("Erro ao salvar albuns CSV: " + e.getMessage());
            e.printStackTrace();
        }
    }

    // Carrega a lista de álbuns do arquivo CSV
    public static List<AlbumModules> carregarAlbuns() {
        List<AlbumModules> albuns = new ArrayList<>();
        Path path = Paths.get(FILE_PATH);
        if (!Files.exists(path)) {
            return albuns; // Retorna lista vazia se arquivo não existe
        }

        try (Reader reader = Files.newBufferedReader(path, StandardCharsets.UTF_8);
             CSVParser csvParser = new CSVParser(reader, CSVFormat.DEFAULT
                     .withHeader("id", "nome")
                     .withFirstRecordAsHeader()
                     .withTrim())) {

            for (CSVRecord record : csvParser) {
                try {
                    AlbumModules album = new AlbumModules();
                    album.setId(parseLongSafe(record.get("id")));
                    album.setNome(record.get("nome"));
                    albuns.add(album);
                } catch (Exception e) {
                    System.err.println("Erro ao ler linha CSV: " + record.toString());
                    e.printStackTrace();
                }
            }

        } catch (IOException e) {
            System.err.println("Erro ao carregar albuns CSV: " + e.getMessage());
            e.printStackTrace();
        }

        return albuns;
    }

    // Conversão segura para Long
    private static Long parseLongSafe(String valor) {
        try {
            return (valor == null || valor.isEmpty()) ? null : Long.parseLong(valor);
        } catch (NumberFormatException e) {
            return null;
        }
    }
}
