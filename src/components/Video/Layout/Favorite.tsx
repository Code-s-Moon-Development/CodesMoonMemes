"use client";

import classNames from "classnames";
import { useFavorites } from "../../../context/favorites-context";

import type { IVideoParams } from "../../../types";

export default function Favorite({ video }: { video: IVideoParams }) {
    const { favorites, addFavorite, removeFavorite } = useFavorites();

    const isFavorite = favorites?.some((fav) => fav.id === video.id);

    return (
        <button
            onClick={() => (isFavorite ? removeFavorite(video) : addFavorite(video))}
            className="absolute left-0 top-0 m-1 cursor-default rounded-md p-1 text-xs text-white/75 opacity-0 transition-[opacity,transform] focus:scale-110 focus:bg-white/10 group-focus-within:opacity-75 group-hover:opacity-75 group-focus:opacity-75 hover:bg-white/10 hover:opacity-100 active:scale-110"
            title="Adicionar aos favoritos"
        >
            <svg
                className={classNames("fill-white shadow transition-colors", {
                    "fill-[#ffc00f]": isFavorite,
                })}
                aria-label="Favorite Icon"
                width={18}
                height={18}
                viewBox="-5.5 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="m0 2.089v21.912l6.546-6.26 6.545 6.26v-21.912c-.012-1.156-.952-2.089-2.109-2.089-.026 0-.051 0-.077.001h.004-8.726c-.022-.001-.047-.001-.073-.001-1.158 0-2.098.933-2.109 2.088v.001z" />
            </svg>
        </button>
    );
}
