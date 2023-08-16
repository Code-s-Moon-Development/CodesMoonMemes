"use client";

import { useState, createContext, useEffect, useMemo, useContext, useCallback } from "react";
import type { ReactNode } from "react";
import type { IVideoParams } from "../types";

export interface IFavoritesContextProps {
    favorites: IVideoParams[];
    addFavorite: (video: IVideoParams) => void;
    removeFavorite: (video: IVideoParams) => void;
}

const InitialFavoritesValue: IFavoritesContextProps = {
    favorites: [],
    addFavorite: () => undefined,
    removeFavorite: () => undefined,
};

export const Favorites = createContext<IFavoritesContextProps>(InitialFavoritesValue);

const saveStringifiedFavorites = (favorites: IVideoParams[]) => {
    localStorage.setItem("favoriteVideos", JSON.stringify(favorites));
};

const getStoreFavorites = (): IVideoParams[] => {
    return JSON.parse(localStorage.getItem("favoriteVideos") ?? "[]"); // make sure it always returns an array
};

export function FavoritesProvider({ children }: { children: ReactNode }) {
    const [favorites, addFavorite] = useState<IVideoParams[]>(InitialFavoritesValue.favorites);

    useEffect(() => {
        // sync app favorites state with localStorage on launch
        addFavorite(getStoreFavorites());
    }, []);

    useEffect(() => {
        // sync app favorites state with localStorage on changes
        const storedFavorites: IVideoParams[] = getStoreFavorites();
        const storedFavoritesIsEmpty = storedFavorites.length === 0;

        if (storedFavoritesIsEmpty || favorites?.length !== storedFavorites?.length) {
            saveStringifiedFavorites(favorites);
        }
    }, [favorites]);

    const handleAddToFavorites = useCallback((video: IVideoParams) => {
        addFavorite((lastVideos) => [...lastVideos, video]);
    }, []);

    const handleRemoveFromFavorites = useCallback(
        (video: IVideoParams) => {
            const newVideos = favorites?.filter((fav) => fav.id !== video.id);
            addFavorite(newVideos);
        },
        [favorites]
    );

    const favoritesContextValue: IFavoritesContextProps = useMemo(
        () => ({
            favorites: favorites,
            addFavorite: handleAddToFavorites,
            removeFavorite: handleRemoveFromFavorites,
        }),
        [favorites, handleAddToFavorites, handleRemoveFromFavorites]
    );

    return <Favorites.Provider value={favoritesContextValue}>{children}</Favorites.Provider>;
}

export function useFavorites() {
    return useContext(Favorites);
}
