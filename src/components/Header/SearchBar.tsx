"use client";

import { useRouter } from "next/navigation";
import type { FormEvent } from "react";

import { useSearch } from "../../context/search-context";

export default function SearchBar() {
    const router = useRouter();
    const { setSearch } = useSearch();

    const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.push("/");
    };

    return (
        <form className="flex items-center" onSubmit={handleSearchSubmit}>
            <label htmlFor="search" className="sr-only">
                Search
            </label>
            <div className="relative w-full">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg className="h-5 w-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path
                            fillRule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
                <input
                    type="text"
                    id="search"
                    className="block w-full rounded-lg border border-white/10 bg-[#202020] p-2.5 pl-10 text-sm text-gray-400 caret-gray-400 focus:border-[#ffcf00] focus:ring-[#ffcf00]"
                    placeholder="Desabilitado temporariamente"
                    disabled
                    required
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
        </form>
    );
}
