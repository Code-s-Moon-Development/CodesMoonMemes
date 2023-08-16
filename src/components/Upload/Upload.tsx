"use client";

import Image from "next/image";

import { supabase } from "../../lib/supabaseClient";
import { fileTypes } from "./AllowedFileTypes";

import * as Popover from "@radix-ui/react-popover";
import UploadPopover from "./UploadPopover";

import UploadIcon from "../../../public/svgs/upload-alternate.svg";
import { FILE_SIZE_UPLOAD_LIMIT } from "../../config";

export const isValidFileVideoType = (file: File) => {
    if (file) return fileTypes.includes(file.type);
};

const getFileSize = (size: number) => {
    if (size < 1024) {
        return size + " bytes";
    } else if (size >= 1024 && size < 1048576) {
        return (size / 1024).toFixed(1) + " KB";
    } else if (size >= 1048576) {
        return (size / 1048576).toFixed(1) + " MB";
    }
};

async function uploadFile(file: File, altText: string) {
    if (file.size > FILE_SIZE_UPLOAD_LIMIT) {
        return { data: null, error: new Error(`Tamanho de arquivo máximo: ${getFileSize(FILE_SIZE_UPLOAD_LIMIT)}`) };
    }

    if (!isValidFileVideoType(file)) {
        return { data: null, error: new Error(`Arquivo de video inválido`) };
    }

    const { data, error } = await supabase.storage
        .from("cmemes")
        .upload(file.name, file, {
            cacheControl: "14400",
            upsert: false,
        })
        .finally(() => {
            const urlData = supabase.storage.from("cmemes").getPublicUrl(file.name);
            const { publicUrl } = urlData.data;
            // const test = supabase.storage.from("cmemes").list(undefined, {
            //     limit: 1,
            //     offset: 0,
            //     search: file.name,
            // });

            async function uploadToDb(url: string) {
                const { data, error } = await supabase.from("memes_data").insert({
                    name: file.name,
                    url: url,
                    altText: altText.toString().length > 0 ? altText.toString() : "",
                });
                if (error) throw new Error(error?.message);
                console.log(data);
            }

            uploadToDb(publicUrl);
        });

    return { data, error };
}

export default function Upload() {
    const handleUpload = (files: FileList | undefined | null, altText: string) => {
        if (!files) return;

        Object.values(files).forEach(async (file) => {
            const { data, error } = await uploadFile(file, altText);
            if (error) throw new Error(error.message);
            console.log(data.path);
        });
    };

    return (
        <Popover.Root>
            <Popover.Trigger asChild>
                <button className="flex items-center justify-center space-x-2" title="Clique para expandir" aria-label="Upload Button">
                    <Image className="py-0.5" src={UploadIcon} height={20} width={20} alt="Upload" />
                    <span className="block w-full text-left text-xs font-medium text-white 2xl:text-sm">Publicar um video</span>
                </button>
            </Popover.Trigger>
            <Popover.Portal>
                <Popover.Content
                    sideOffset={10}
                    align="end"
                    className="z-50 flex w-screen flex-col space-y-4 rounded-lg bg-[#131313] py-6 px-2 opacity-0 shadow transition-opacity will-change-transform focus:shadow-md data-[state=open]:opacity-100 xs:max-w-sm md:px-8"
                    forceMount
                >
                    <UploadPopover handleUpload={handleUpload} />
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    );
}
