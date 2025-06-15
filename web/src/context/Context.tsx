import React, { createContext, ReactNode, useState } from "react";
import { Musica, Playlist } from "../types/AllAplication";

interface InterfaceContext {
  isOpenForm: boolean;
  setIsOpenForm: (newState: boolean) => void;
  activeSpinner: boolean;
  setActiveSpinner: (newState: boolean) => void;

  activePlaying: Musica | null;
  setActivePlaying: (newState: Musica) => void;

  playListActive: Playlist | null;
  setPlayListActive: (newState: Playlist | null) => void;
}

type ContextProps = {
  children: ReactNode;
};

const initialValue = {
  isOpenForm: false,
  setIsOpenForm: () => {},
  activeSpinner: false,
  setActiveSpinner: () => {},
  activePlaying: null,
  setActivePlaying: () => {},

  playListActive: null,
  setPlayListActive: () => {},
};

export const Context = createContext<InterfaceContext>(initialValue);

export const ContextProvider = ({ children }: ContextProps) => {
  const [isOpenForm, setIsOpenForm] = useState(initialValue.isOpenForm);
  const [activeSpinner, setActiveSpinner] = useState(
    initialValue.activeSpinner
  );
  const [activePlaying, setActivePlaying] = useState<Musica | null>(null);

  const [playListActive, setPlayListActive] = useState<Playlist | null>(null);

  return (
    <Context.Provider
      value={{
        activePlaying,
        setActivePlaying,
        isOpenForm,
        setIsOpenForm,
        activeSpinner,
        setActiveSpinner,
        playListActive,
        setPlayListActive,
      }}
    >
      {children}
    </Context.Provider>
  );
};
