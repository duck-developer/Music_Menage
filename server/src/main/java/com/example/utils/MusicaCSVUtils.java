package com.example.utils;

import com.example.modules.*;

import org.apache.commons.csv.*;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.*;
import java.util.*;

public class MusicaCSVUtils {

    private static final String FILE_PATH = "musicas.csv";

    public static void salvarMusicas(List<MusicaModules> musicas) {
        try (BufferedWriter writer = Files.newBufferedWriter(Paths.get(FILE_PATH), StandardCharsets.UTF_8);
             CSVPrinter csvPrinter = new CSVPrinter(writer, CSVFormat.DEFAULT.withHeader(
                     "id", "titulo", "duracao", "mp3", "image",
                     "ano", "artista_id", "artista_nome",
                     "album_id", "album_nome", "genero_id", "genero_nome"))) {

            for (MusicaModules m : musicas) {
                csvPrinter.printRecord(
                        m.getId(),
                        m.getTitulo(),
                        m.getDuracao(),
                        m.getMp3(),
                        m.getImage(),
                        m.getAno(),
                        m.getArtista() != null ? m.getArtista().getId() : "",
                        m.getArtista() != null ? m.getArtista().getNome() : "",
                        m.getAlbum() != null ? m.getAlbum().getId() : "",
                        m.getAlbum() != null ? m.getAlbum().getNome() : "",
                        m.getGenero() != null ? m.getGenero().getId() : "",
                        m.getGenero() != null ? m.getGenero().getNome() : ""
                );
            }
            csvPrinter.flush();
        } catch (IOException e) {
            System.err.println("Erro ao salvar musicas CSV: " + e.getMessage());
            e.printStackTrace();
        }
    }

    public static List<MusicaModules> carregarMusicas() {
        List<MusicaModules> musicas = new ArrayList<>();
        Path path = Paths.get(FILE_PATH);
        if (!Files.exists(path)) {
            return musicas; 
        }

        try (Reader reader = Files.newBufferedReader(path, StandardCharsets.UTF_8);
             CSVParser csvParser = new CSVParser(reader, CSVFormat.DEFAULT
                     .withHeader("id", "titulo", "duracao", "mp3", "image",
                             "ano", "artista_id", "artista_nome",
                             "album_id", "album_nome", "genero_id", "genero_nome")
                     .withFirstRecordAsHeader()
                     .withTrim())) {

            for (CSVRecord record : csvParser) {
                try {
                    MusicaModules m = new MusicaModules();

                    m.setId(parseLongSafe(record.get("id")));
                    m.setTitulo(record.get("titulo"));
                    m.setDuracao(parseIntSafe(record.get("duracao")));
                    m.setMp3(record.get("mp3"));
                    m.setImage(record.get("image"));
                    m.setAno(parseLongSafe(record.get("ano")));

                    ArtistaModules artista = new ArtistaModules();
                    artista.setId(parseLongSafe(record.get("artista_id")));
                    artista.setNome(record.get("artista_nome"));

                    AlbumModules album = new AlbumModules();
                    album.setId(parseLongSafe(record.get("album_id")));
                    album.setNome(record.get("album_nome"));

                    GeneroModules genero = new GeneroModules();
                    genero.setId(parseLongSafe(record.get("genero_id")));
                    genero.setNome(record.get("genero_nome"));

                    m.setArtista(artista);
                    m.setAlbum(album);
                    m.setGenero(genero);

                    musicas.add(m);
                } catch (Exception e) {
                    System.err.println("Erro ao ler linha CSV: " + record.toString());
                    e.printStackTrace();
                }
            }

        } catch (IOException e) {
            System.err.println("Erro ao carregar musicas CSV: " + e.getMessage());
            e.printStackTrace();
        }
        return musicas;
    }

    private static Long parseLongSafe(String valor) {
        try {
            return (valor == null || valor.isEmpty()) ? null : Long.parseLong(valor);
        } catch (NumberFormatException e) {
            return null;
        }
    }

    private static Integer parseIntSafe(String valor) {
        try {
            return (valor == null || valor.isEmpty()) ? null : Integer.parseInt(valor);
        } catch (NumberFormatException e) {
            return null;
        }
    }
}
