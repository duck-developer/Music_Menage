package com.example.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import com.example.utils.MusicaComparators;
import com.example.utils.PlaylistPersistence;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.modules.MusicaModules;
import com.example.modules.PlaylistModules;

@Service
public class PlaylistServices {
    @Autowired
    private MusicaServices musicaServices;

    private final List<PlaylistModules> playlists;
    private Long idCounter = 1L;

    public PlaylistServices() {
        List<PlaylistModules> carregadas;
        try {
            carregadas = PlaylistPersistence.carregar();
        } catch (Exception e) {
            System.err.println("Erro ao carregar playlists: " + e.getMessage());
            carregadas = new ArrayList<>();
        }
        this.playlists = carregadas;

        if (!playlists.isEmpty()) {
            idCounter = playlists.stream()
                    .mapToLong(PlaylistModules::getId)
                    .max()
                    .orElse(0L) + 1;
        }
    }

    private void salvar() {
        try {
            PlaylistPersistence.salvar(playlists);
        } catch (Exception e) {
            System.err.println("Erro ao salvar playlists: " + e.getMessage());
        }
    }

    public List<PlaylistModules> getAllPlaylist() {
        return playlists;
    }

    public PlaylistModules createPlaylist(PlaylistModules playlist) {
        Objects.requireNonNull(playlist, "Playlist não pode ser nula");
        if (playlist.getNome() == null || playlist.getNome().trim().isEmpty()) {
            playlist.setNome("Playlist " + idCounter);
        }
        playlist.setId(idCounter++);
        playlists.add(playlist);
        salvar();
        return playlist;
    }

    public boolean deletePlaylist(Long id) {
        boolean removido = playlists.removeIf(playlist -> playlist.getId().equals(id));
        if (removido) salvar();
        return removido;
    }

    public Optional<PlaylistModules> getItemById(Long id) {
        return playlists.stream().filter(item -> item.getId().equals(id)).findFirst();
    }

    public PlaylistModules updatePlaylist(Long id, PlaylistModules newPlaylist) {
        PlaylistModules existPlaylist = getItemById(id)
                .orElseThrow(() -> new RuntimeException("Playlist não encontrada"));
        if (newPlaylist.getNome() != null && !newPlaylist.getNome().isBlank()) {
            existPlaylist.setNome(newPlaylist.getNome());
        }
        salvar();
        return existPlaylist;
    }

    public PlaylistModules adicionarMusicaNaPlaylist(Long playlistId, Long musicaId) {
        PlaylistModules playlist = getItemById(playlistId)
                .orElseThrow(() -> new RuntimeException("Playlist não encontrada"));

        MusicaModules musica = musicaServices.getAllMusica().stream()
                .filter(m -> m.getId().equals(musicaId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Música não encontrada"));

        boolean jaExiste = playlist.getMusicas().stream()
                .anyMatch(m -> m.getId().equals(musicaId));

        if (jaExiste) {
            throw new RuntimeException("Essa música já está na playlist.");
        }

        playlist.adicionarMusica(musica);
        salvar();
        return playlist;
    }

    public PlaylistModules removerMusicaDaPlaylist(Long playlistId, Long musicaId) {
        PlaylistModules playlist = getItemById(playlistId)
                .orElseThrow(() -> new RuntimeException("Playlist não encontrada"));

        boolean removida = playlist.getMusicas().removeIf(m -> m.getId().equals(musicaId));
        if (!removida) {
            throw new RuntimeException("Música não encontrada na playlist");
        }

        salvar();
        return playlist;
    }

    public PlaylistModules ordenarMusicas(Long playlistId, String criterio) {
        PlaylistModules playlist = getItemById(playlistId)
                .orElseThrow(() -> new RuntimeException("Playlist não encontrada"));

        switch (criterio.toLowerCase()) {
            case "titulo":
                playlist.getMusicas().sort(MusicaComparators.porTitulo());
                break;
            case "artista":
                playlist.getMusicas().sort(MusicaComparators.porArtista());
                break;
            case "duracao":
                playlist.getMusicas().sort(MusicaComparators.porDuracao());
                break;
            default:
                throw new IllegalArgumentException("Critério de ordenação inválido");
        }

        salvar();
        return playlist;
    }
} 
