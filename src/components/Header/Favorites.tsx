"use client";

import Image from "next/image";
import { Fragment } from "react";
import * as Popover from "@radix-ui/react-popover";

import { useFavorites } from "../../context/favorites-context";

import Video from "../Video/Video";

import FavoritesIcon from "../../../public/svgs/favorite.svg";

export default function Favorites() {
    const { favorites } = useFavorites();

    return (
        <Popover.Root>
            <Popover.Trigger asChild>
                <button
                    className="inline-flex space-x-2 items-center justify-center rounded-md p-1 hover:bg-white/10"
                    aria-label="Abrir lista de favoritos"
                    title="Favoritos"
                >
                    <Image src={FavoritesIcon} height={32} width={32} alt="" />
                    <span className="hidden 2xl:inline-block text-sm font-semibold">Favoritos</span>
                </button>
            </Popover.Trigger>
            <Popover.PopoverPortal>
                <Popover.Content
                    sideOffset={10}
                    align="end"
                    className="z-50 flex max-h-[36rem] w-96 max-w-sm flex-col space-y-4 rounded-lg bg-[#131313] py-6 px-2 opacity-0 shadow transition-opacity will-change-transform focus:shadow-md data-[state=open]:opacity-100 md:px-8"
                >
                    <h4 className="text-lg font-semibold">Favoritos</h4>
                    {favorites?.length > 0 ? (
                        <>
                            {favorites.map((video, i) => (
                                <Fragment key={i}>
                                    <Video video={video} grow frameSize="w-64" />
                                </Fragment>
                            ))}
                        </>
                    ) : (
                        <div className="">
                            <h4>Sua lista de favoritos está vazia, comece a adicionar alguns memes!</h4>
                        </div>
                    )}
                </Popover.Content>
            </Popover.PopoverPortal>
        </Popover.Root>
    );
}
