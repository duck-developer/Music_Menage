
package com.example.utils;

import com.example.modules.*;

import org.apache.commons.csv.*;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;

public class PlaylistPersistence {

    private static final String FILE_PATH = "playlists.csv";

    public static void salvar(List<PlaylistModules> playlists) {
        try (BufferedWriter writer = Files.newBufferedWriter(Paths.get(FILE_PATH));
             CSVPrinter csvPrinter = new CSVPrinter(writer, CSVFormat.DEFAULT
                     .withHeader("playlist_id", "playlist_nome", "musica_id", "musica_titulo",
                             "musica_duracao", "musica_mp3", "musica_image",
                             "artista_id", "artista_nome",
                             "album_id", "album_nome",
                             "genero_id", "genero_nome",
                             "musica_ano"))) {

            for (PlaylistModules playlist : playlists) {
                if (playlist.getMusicas() == null || playlist.getMusicas().isEmpty()) {
                    csvPrinter.printRecord(
                            playlist.getId(),
                            playlist.getNome(),
                            "", "", "", "", "",
                            "", "",
                            "", "",
                            "", "",
                            ""
                    );
                } else {
                    for (MusicaModules musica : playlist.getMusicas()) {
                        csvPrinter.printRecord(
                                playlist.getId(),
                                playlist.getNome(),
                                musica.getId() != null ? musica.getId() : "",
                                musica.getTitulo() != null ? musica.getTitulo() : "",
                                musica.getDuracao() != null ? musica.getDuracao() : "",
                                musica.getMp3() != null ? musica.getMp3() : "",
                                musica.getImage() != null ? musica.getImage() : "",
                                musica.getArtista() != null && musica.getArtista().getId() != null ? musica.getArtista().getId() : "",
                                musica.getArtista() != null && musica.getArtista().getNome() != null ? musica.getArtista().getNome() : "",
                                musica.getAlbum() != null && musica.getAlbum().getId() != null ? musica.getAlbum().getId() : "",
                                musica.getAlbum() != null && musica.getAlbum().getNome() != null ? musica.getAlbum().getNome() : "",
                                musica.getGenero() != null && musica.getGenero().getId() != null ? musica.getGenero().getId() : "",
                                musica.getGenero() != null && musica.getGenero().getNome() != null ? musica.getGenero().getNome() : "",
                                musica.getAno() != null ? musica.getAno() : ""
                        );
                    }
                }
            }

            csvPrinter.flush();
        } catch (IOException e) {
            System.err.println("Erro ao salvar playlists CSV: " + e.getMessage());
        }
    }

    public static List<PlaylistModules> carregar() {
        List<PlaylistModules> playlists = new ArrayList<>();
        Map<Long, PlaylistModules> mapPlaylists = new HashMap<>();

        try (Reader reader = Files.newBufferedReader(Paths.get(FILE_PATH));
             CSVParser csvParser = new CSVParser(reader, CSVFormat.DEFAULT.withFirstRecordAsHeader())) {

            for (CSVRecord record : csvParser) {
                Long playlistId = parseLongSafe(record.get("playlist_id"));
                String playlistNome = record.get("playlist_nome");

                if (playlistId == null) {
                    continue;
                }

                PlaylistModules playlist = mapPlaylists.get(playlistId);
                if (playlist == null) {
                    playlist = new PlaylistModules();
                    playlist.setId(playlistId);
                    playlist.setNome(playlistNome);
                    playlist.setMusicas(new ArrayList<>());
                    mapPlaylists.put(playlistId, playlist);
                }

                String musicaIdStr = record.get("musica_id");
                if (musicaIdStr != null && !musicaIdStr.isEmpty()) {
                    MusicaModules musica = new MusicaModules();
                    musica.setId(parseLongSafe(musicaIdStr));
                    musica.setTitulo(record.get("musica_titulo"));
                    musica.setDuracao(parseIntSafe(record.get("musica_duracao")));
                    musica.setMp3(record.get("musica_mp3"));
                    musica.setImage(record.get("musica_image"));

                    // Artista
                    String artistaIdStr = record.get("artista_id");
                    if (artistaIdStr != null && !artistaIdStr.isEmpty()) {
                        ArtistaModules artista = new ArtistaModules();
                        artista.setId(parseLongSafe(artistaIdStr));
                        artista.setNome(record.get("artista_nome"));
                        musica.setArtista(artista);
                    }

                    // Album
                    String albumIdStr = record.get("album_id");
                    if (albumIdStr != null && !albumIdStr.isEmpty()) {
                        AlbumModules album = new AlbumModules();
                        album.setId(parseLongSafe(albumIdStr));
                        album.setNome(record.get("album_nome"));
                        musica.setAlbum(album);
                    }

                    // Genero
                    String generoIdStr = record.get("genero_id");
                    if (generoIdStr != null && !generoIdStr.isEmpty()) {
                        GeneroModules genero = new GeneroModules();
                        genero.setId(parseLongSafe(generoIdStr));
                        genero.setNome(record.get("genero_nome"));
                        musica.setGenero(genero);
                    }

                    musica.setAno(parseLongSafe(record.get("musica_ano")));

                    playlist.getMusicas().add(musica);
                }
            }

        } catch (IOException e) {
            System.err.println("Erro ao carregar playlists: " + e.getMessage());
        }

        playlists.addAll(mapPlaylists.values());
        return playlists;
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