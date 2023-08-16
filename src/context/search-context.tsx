"use client";

import type { ReactNode } from "react";
import { useState, createContext, useContext, useMemo } from "react";

export interface ISearchContextProps {
    search: string | undefined;
    setSearch: (string?: string) => void;
}

const InitialSearchValue: ISearchContextProps = {
    search: undefined,
    setSearch: () => undefined,
};

export const SearchContext = createContext<ISearchContextProps>(InitialSearchValue);

export function SearchProvider({ children }: { children: ReactNode }) {
    const [search, setSearch] = useState<string | undefined>(undefined);

    const searchContextValue: ISearchContextProps = useMemo(
        () => ({
            search,
            setSearch,
        }),
        [search]
    );

    return <SearchContext.Provider value={searchContextValue}>{children}</SearchContext.Provider>;
}

export function useSearch() {
    return useContext(SearchContext);
}
