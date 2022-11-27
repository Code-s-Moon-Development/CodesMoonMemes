"use client"
import Image from "next/image";

import { supabase } from "../../lib/supabaseClient";
import React, { useState, useRef, useEffect } from "react";
import UploadSvg from "../../../public/svgs/Upload.svg";

import { fileTypes } from "./FileTypes";
import UploadModal from "./UploadModal";
// import Confirm from "./Confirm";

function Upload() {
    const [modalState, setModalState] = useState(false);
    const [tempFiles, setTempFiles] = useState([]);
    const [files, setFiles] = useState([]);
    const [uploaded, setUploaded] = useState(false);

    const input = useRef();

    const closeModal = () => {
        setModalState(false);
    };

    const clearFiles = () => {
        input.current?.val("");
        setTempFiles([]);
        setFiles([]);
    };

    const handleUpload = (e) => {
        e.preventDefault();
        if (tempFiles) {
            tempFiles.forEach((file) => {
                const upload = async () => {
                    // eslint-disable-next-line no-unused-vars
                    const { data, error } = await supabase.storage.from("cmemes").upload(file.name, file, {
                        cacheControl: "3600",
                        upsert: false,
                    });
                    if (error) throw new Error(error);
                    closeModal();
                    setUploaded(true);
                    clearFiles();
                    setTimeout(() => {
                        setUploaded(false);
                    }, 5000);
                };
                upload();
            });
        }
    };

    const handleFile = () => {
        setModalState(true);

        if (tempFiles.length < 5 && input.current.files[0]) {
            setTempFiles((oldFiles) => [...oldFiles, input.current.files[0]]);
        }
    };

    const removeFile = (file) => {
        setTempFiles((currFiles) => currFiles.filter((oldFile) => oldFile !== file));
    };

    const validFileType = (file) => {
        if (file) return fileTypes.includes(file.type);
    };

    const getFileSize = (number) => {
        if (number < 1024) {
            return number + "bytes";
        } else if (number >= 1024 && number < 1048576) {
            return (number / 1024).toFixed(1) + "KB";
        } else if (number >= 1048576) {
            return (number / 1048576).toFixed(1) + "MB";
        }
    };

    useEffect(() => {
        setFiles([]);
        tempFiles.forEach((file) => {
            if (validFileType(file)) {
                setFiles((oldFiles) => [
                    ...oldFiles,
                    {
                        name: file.name,
                        size: getFileSize(file.size),
                        file: file,
                    },
                ]);
            }
        });
    }, [tempFiles]);

    return (
        <form method="post" onSubmit={handleUpload}>
            <section className="max-w-7xl border-2 border-[rgba(255, 207, 0, 0.3)] bg-black/20 rounded-xl pt-5 mx-auto mb-16 flex justify-center items-center flex-col relative shadow-lg hover:bg-black/30">
                {uploaded ? (
                    <React.Fragment onClick={() => setUploaded(false)}>
                        {/* <Confirm /> */}
                        <h4 className="font-semibold text-base text-[#d4d4d4]">Upload Completo.</h4>
                    </React.Fragment>
                ) : (
                    <>
                        <input className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 h-full w-full opacity-0 cursor-pointer" ref={input} type="file" accept="video/*" multiple onChange={handleFile} />
                        <Image src={UploadSvg} height={45} width={45} alt="" />
                        <h4 className="font-semibold text-base text-[#d4d4d4]">Clique ou Arraste aqui para subir um video</h4>
                    </>
                )}
            </section>
            {modalState ? <UploadModal files={files} close={closeModal} open={() => input.current.click()} remove={removeFile} /> : null}
        </form>
    );
}

export default Upload;
