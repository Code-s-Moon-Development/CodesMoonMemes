import CloseSvg from "../../../public/svgs/Close.svg";
import UploadSvg from "../../../public/svgs/Upload.svg";

import Image from "next/image";
import classNames from "classnames";

function UploadModal({ files, close, open, remove }) {
    return (
        <>
            <div className="absolute overflow-hidden inset-0 bg-black/10 w-full h-full" onClick={close} />
            <div className="absolute overflow-hidden rounded-2xl flex justify-center items-center flex-col p-2 md:p-4 z-10 w-[70%] h-5/6 bg-[#181818] left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2">
                <div className="w-full h-full flex items-center justify-center flex-col">
                    <Image src={UploadSvg} height={45} alt="" />

                    {!files || files.length === 0 ? (
                        <>
                            <h3>Nenhum arquivo selecionado para o upload</h3>
                        </>
                    ) : (
                        Object.values(files).map((file, i) => (
                            <div className="w-full flex items-center justify-center gap-4 md:gap-8" key={i}>
                                <h5 className="text-base">{file.name}</h5>
                                <sup className="text-sm">{file.size}</sup>
                                <button onClick={() => remove(file.file)}>
                                    <Image src={CloseSvg} width={30} alt="" />
                                </button>
                            </div>
                        ))
                    )}

                    {files.length <= 5 ? (
                        <button className="mb-4 transition-colors rounded-3xl px-4 py-6 font-bold text-white hover:bg-white/10" type="button" onClick={() => open()}>
                            Adicionar arquivo
                        </button>
                    ) : null}
                </div>
                <button
                    type="submit"
                    className={classNames("px-6 py-4 rounded-3xl text-white outline-none border-none", {
                        "bg-[#222222] cursor-default": files.length === 0,
                        "bg-[#31be7c]": files.length > 0
                    })}
                    disabled={files.length === 0}
                >
                    Upload
                </button>
            </div>
        </>
    );
}

export default UploadModal;
