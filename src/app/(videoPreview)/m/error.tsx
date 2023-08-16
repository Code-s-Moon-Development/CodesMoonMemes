"use client";

import Image from "next/image";
import { useEffect } from "react";

import ErrorIcon from "../../../../public/svgs/error.svg";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="flex max-h-screen w-full animate-pulse items-center justify-center bg-[#131313] cursor-pointer" onClick={() => reset()}>
            <Image src={ErrorIcon} alt="Error" />
        </div>
    );
}
