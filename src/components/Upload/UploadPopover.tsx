"use client";

import { useState, useRef, useCallback } from "react";

import RemoveIcon from "../../../public/svgs/Close.svg";
import UploadIcon from "../../../public/svgs/Upload.svg";

import Image from "next/image";
import classNames from "classnames";

import { isValidFileVideoType } from "./Upload";

interface IUploadPopoverProps {
    handleUpload: (files: FileList | undefined | null, altText: string) => void;
}

const getFileSize = (size: number) => {
    if (size < 1024) {
        return size + "bytes";
    } else if (size >= 1024 && size < 1048576) {
        return (size / 1024).toFixed(1) + "KB";
    } else if (size >= 1048576) {
        return (size / 1048576).toFixed(1) + "MB";
    }
};

export default function UploadPopover({ handleUpload }: IUploadPopoverProps) {
    const fileInput = useRef<HTMLInputElement | null>(null);

    const [files, setFiles] = useState(() => fileInput?.current?.files);
    const [altText, setAltText] = useState("");
    const [step, setStep] = useState(0);
    
    const noFiles = (files?.length ?? 0) === 0;

    const handleAddFiles = (fileList: FileList | null) => {
        if (!fileList) return;

        if (Object.values(FileList).find((f: File) => !isValidFileVideoType(f))) return;

        setFiles(fileList);
    };

    const handleRemoveFile = useCallback(
        (index: number) => {
            if (!files || !noFiles) return;
            const dt = new DataTransfer();

            for (let i = 0; i < files.length; i++) {
                const file = files[i] as File;
                if (index !== i) dt.items.add(file); // exclude file
            }

            const newFiles = ((fileInput.current as HTMLInputElement).files = dt.files);
            setFiles(newFiles);
        },
        [files, noFiles]
    );

    const handleStep = useCallback(() => {
        if (step === 0) {
            setStep(1);
            return;
        }
        handleUpload(files, altText)
    }, [altText, files, handleUpload, step]);

    const FileUploadStep = () => {
        return (
            <>
                {!files || (files && files.length === 0) ? (
                    <h2>Nenhum arquivo selecionado para o upload.</h2>
                ) : (
                    Object.values(files).map((file, i) => (
                        <div className="flex w-full flex-col items-center justify-center gap-4" key={i}>
                            <h5 className="w-full break-all text-left text-base">{file.name}</h5>
                            <div className="flex w-full items-center justify-between">
                                <sup className="text-sm">{getFileSize(file.size)}</sup>
                                <button type="button" onClick={() => handleRemoveFile(i)}>
                                    <Image src={RemoveIcon} width={30} alt="" />
                                </button>
                            </div>
                        </div>
                    ))
                )}

                {!files || files?.length <= 5 ? (
                    <button type="button" className="flex w-full flex-col items-center justify-center">
                        <label
                            htmlFor="dropzone-file"
                            className="mx-auto flex w-full max-w-lg cursor-pointer flex-col items-center rounded-xl border-2 border-dashed border-[#ffcc0f] px-2 py-4 text-center md:px-4 md:py-6"
                        >
                            <h3 className="my-4 font-semibold text-white">Clique ou arraste aqui para adicionar um arquivo</h3>
                            <p className="mb-2 tracking-wide"></p>
                            <input
                                ref={fileInput}
                                id="dropzone-file"
                                type="file"
                                className="hidden"
                                multiple
                                onChange={(e) => handleAddFiles(e.target.files)}
                            />
                        </label>
                    </button>
                ) : null}
            </>
        );
    };

    return (
        <form
            className="h-full w-full overflow-y-auto pr-2 scrollbar-thin scrollbar-track-black/10 scrollbar-thumb-gray-400 scrollbar-thumb-rounded-md hover:scrollbar-thumb-gray-200 xs:pr-4"
            method="post"
            onSubmit={(e) => e.preventDefault()}
        >
            <div className="flex h-full max-h-64 w-full flex-col items-center justify-between gap-6 md:max-h-80">
                <Image src={UploadIcon} height={32} alt="" />

                {step === 0 ? (
                    <FileUploadStep />
                ) : (
                    <div className="flex flex-col items-center justify-center space-y-2 px-2">
                        <h2>Faça uma breve descrição sobre o que está acontecendo nesse meme (opcional)</h2>
                        <textarea
                            className="h-28 w-full rounded-md border border-white/10 bg-[#202020]"
                            onChange={(e) => setAltText(e.target.value)}
                        ></textarea>
                    </div>
                )}

                <div className="flex w-full justify-end">
                    <button
                        type={step === 0 ? "button" : "submit"}
                        className={classNames("rounded-lg border-white/10 py-1 px-4 hover:opacity-90", {
                            "cursor-not-allowed bg-[#222222]": noFiles,
                            "bg-[#31be7c]": !noFiles,
                        })}
                        disabled={noFiles}
                        onClick={handleStep}
                    >
                        Upload
                    </button>
                </div>
            </div>
        </form>
    );
}
