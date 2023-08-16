"use client";

import { useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";

import ShareIcon from "../../../../public/svgs/share.svg";
import CloseIcon from "../../../../public/svgs/Close.svg";
import Spinner from "../../../../public/svgs/spinner.svg";

import type { IVideoParams } from "../../../types";
import { downloadBlob } from "../../../lib/download";

export default function Share({ video }: { video: IVideoParams }) {
    const [isDownloading, setIsDownloading] = useState(false);

    const handleDownload = async () => {
        setIsDownloading(true);
        try {
            const { data, error } = await supabase.storage.from("cmemes").download(video.name);
            if (error) throw new Error(error.message);
            downloadBlob(data, video.name);
        } catch (error) {
            // handle error
            console.error(error);
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <button
                    className="absolute top-0 right-0 m-1 rounded-md p-1 opacity-0 transition-opacity hover:bg-white/10 hover:opacity-100 group-hover:opacity-75 group-focus:opacity-75 group-focus-within:opacity-75 focus:bg-white/10"
                    title="Compartilhar"
                >
                    <Image className="shadow" src={ShareIcon} height={14} width={14} alt="Compartilhar" />
                </button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50" />
                <Dialog.Content className="fixed top-1/2 left-1/2 z-50 max-h-[85vh] w-11/12 max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 text-[#202020] shadow-lg focus:outline-none">
                    <Dialog.Title className="mb-4 text-xl font-semibold">Compartilhar</Dialog.Title>
                    <fieldset className="mb-4 flex items-center gap-6">
                        <label className="text-right text-base" htmlFor="link">
                            Copiar Link
                        </label>
                        <input
                            className="inline-flex w-full flex-1 items-center justify-center rounded-sm py-2 text-sm ring-[#ffcc0f] focus:shadow-lg focus-visible:shadow-lg"
                            id="link"
                            defaultValue={video.url}
                        />
                    </fieldset>
                    <p className="mb-4 w-full text-center">ou</p>
                    <div className="mb-4 flex w-full items-center justify-center">
                        <button className="inline-flex rounded-sm bg-black/10 py-2 px-4 text-base shadow" onClick={handleDownload}>
                            {isDownloading ? <Image className="animate-spin" src={Spinner} height={32} width={32} alt="" /> : "Download"}
                        </button>
                    </div>
                    <Dialog.Close asChild>
                        <button
                            className="absolute top-0 right-0 m-1 inline-flex items-center justify-center rounded-full p-1 hover:bg-white/10 focus:shadow"
                            aria-label="Fechar"
                        >
                            <Image src={CloseIcon} height={24} width={24} alt="Fechar" />
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
