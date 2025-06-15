package com.example.utils;

import com.example.modules.MusicaModules;
import java.util.Comparator;

public class MusicaComparators {
    public static Comparator<MusicaModules> porTitulo() {
        return Comparator.comparing(MusicaModules::getTitulo, String.CASE_INSENSITIVE_ORDER);
    }

    public static Comparator<MusicaModules> porArtista() {
        return Comparator.comparing(m -> m.getArtista().getNome(), String.CASE_INSENSITIVE_ORDER);
    }

    public static Comparator<MusicaModules> porDuracao() {
        return Comparator.comparingInt(MusicaModules::getDuracao);
    }
}
