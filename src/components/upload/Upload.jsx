import { supabase } from "../../lib/supabaseClient";
import React, { useState, useRef, useEffect } from "react";
import { ReactComponent as UploadSvg } from "../../assets/Upload.svg";
import styled from "styled-components";

import { fileTypes } from "./FileTypes";
import UploadModal from "./UploadModal";
import Confirm from "./Confirm";

const UploadWrap = styled.section`
    height: 20vh;
    min-height: 8rem;
    max-width: 1850px;
    border: dashed 2px rgba(255, 207, 0, 0.3);
    background: linear-gradient(35deg, rgba(0, 0, 0, 0.2) 60%, rgba(0, 0, 0, 0.3));
    border-radius: 12px;
    padding: 1.2rem 0 0 0;
    margin: 0 auto 4rem auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
    box-shadow: 0 30px 50px rgba(0, 0, 0, 0.4), inset 0 -20px 35px rgba(255, 207, 0, 0.04);
    &:hover {
        background-color: rgba(0, 0, 0, 0.3);
    }
`;

const HeroUpload = styled.h4`
    color: #d4d4d4;
    font-weight: 600;
    font-size: calc(0.7rem + 0.5vw);
`;

const UploadInput = styled.input`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    height: 100%;
    width: 100%;
    opacity: 0;
    cursor: pointer;
`;

const UploadIcon = styled(UploadSvg)`
    height: 45px;
`;

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
            <UploadWrap>
                {uploaded ? (
                    <React.Fragment onClick={() => setUploaded(false)}>
                        <Confirm />
                        <HeroUpload>Upload Completo.</HeroUpload>
                    </React.Fragment>
                ) : (
                    <>
                        <UploadInput ref={input} type="file" accept="video/*" multiple onChange={handleFile}></UploadInput>
                        <UploadIcon />
                        <HeroUpload>Clique ou Arraste aqui para subir um video</HeroUpload>
                    </>
                )}
            </UploadWrap>
            {modalState ? <UploadModal files={files} close={closeModal} open={() => input.current.click()} remove={removeFile} /> : null}
        </form>
    );
}

export default Upload;
