import styled from "styled-components";
import { ReactComponent as CloseSvg } from "../../assets/Close.svg";
import { ReactComponent as UploadSvg } from "../../assets/Upload.svg";

const Backdrop = styled.div`
    position: absolute;
    overflow: hidden;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100vh;
    z-index: 1;
`;

const FloatingModal = styled.div`
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    overflow: hidden;
    background: #181818;
    height: 80vh;
    width: 70%;
    padding: 2.5rem;
    border-radius: 1rem;
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    @media (max-width: 600px) {
        width: 85%;
        height: 85vh;
        padding: 1rem;
    }
`;

const ConfirmUpBtn = styled.button`
    padding: 1rem 1.5rem;
    color: #fff;
    border-radius: 30px;
    border: 0 transparent;
    outline: 0 transparent;
    cursor: pointer;
`;

const FileWrap = styled.div`
    width: 100%;
    heigth: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const FileDisplay = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    @media (max-width: 600px) {
        gap: 1rem;
    }
`;

const Filename = styled.h5`
    font-size: calc(0.8rem + 0.5vw);
`;

const Filesize = styled.sup`
    font-size: calc(0.8rem + 0.4vw);
`;

const AddFiles = styled.button`
    margin: 0 0 1rem 0;
    padding: 1rem 1.5rem;
    font-weight: 700;
    background: transparent;
    color: #fff;
    border-radius: 30px;
    border: 0 transparent;
    outline: 0 transparent;
    transition: background 0.2s ease-in;
    &:hover {
        background: rgba(255, 255, 255, 0.1);
    }
`;

const UploadIcon = styled(UploadSvg)`
    height: 45px;
`;

const CloseIcon = styled(CloseSvg)`
    border-radius: 50%;
    cursor: pointer;
    &:hover {
        background: rgba(255, 255, 255, 0.1);
    }
    @media (max-width: 600px) {
        width: 30px;
    }
`;

function UploadModal({ files, close, open, remove }) {
    return (
        <>
            <Backdrop onClick={() => close()} />
            <FloatingModal>
                <FileWrap>
                    <UploadIcon />

                    {!files || files.length === 0 ? (
                        <>
                            <h3>Nenhum arquivo selecionado para o upload</h3>
                        </>
                    ) : (
                        Object.values(files).map((file, i) => (
                            <FileDisplay key={i}>
                                <Filename>{file.name}</Filename>
                                <Filesize>{file.size}</Filesize>
                                <CloseIcon onClick={() => remove(file.file)} />
                            </FileDisplay>
                        ))
                    )}

                    {files.length <= 5 ? (
                        <AddFiles type="button" onClick={() => open()}>
                            Adicionar arquivo
                        </AddFiles>
                    ) : null}
                </FileWrap>
                <ConfirmUpBtn
                    type="submit"
                    style={files.length === 0 ? { background: "#222222", cursor: "default" } : { background: "#31be7c", cursor: "pointer" }}
                    disabled={files.length === 0 ? true : false}
                >
                    Upload
                </ConfirmUpBtn>
            </FloatingModal>
        </>
    );
}

export default UploadModal;
