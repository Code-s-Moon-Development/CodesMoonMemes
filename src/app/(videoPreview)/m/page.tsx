import { supabaseServer } from "../../../lib/supabaseServer";
import { notFound, redirect } from "next/navigation";

import MetaUpdater from "../../../components/MetaUpdater";
import Video from "../../../components/Video/Video";
import type { IVideoParams } from "../../../types";

const BUCKET = "cmemes";

export const revalidate = 60;

async function getVideoByObjectName(objectName: string): Promise<IVideoParams | null> {
    const { data: urlData } = supabaseServer.storage.from(BUCKET).getPublicUrl(objectName);
    const res = await fetch(urlData.publicUrl, { method: "HEAD" });
    if (!res.ok) return null;
    return {
        id: objectName,
        name: objectName,
        url: urlData.publicUrl,
        altText: "",
        created_at: "",
        viewCount: 0,
    };
}

export default async function Page(props: {
    params?: Record<string, string | string[]>;
    searchParams?: Record<string, string | string[] | undefined>;
}) {
    const searchParams = props.searchParams ?? {};
    const v = typeof searchParams.v === "string" ? searchParams.v : searchParams.v?.[0];
    const objectName = v?.trim();
    if (!objectName) redirect("/");

    const video = await getVideoByObjectName(objectName);
    if (!video) notFound();

    return (
        <>
            <MetaUpdater url={video.url} />
            <Video frameSize="w-full max-h-[80vh] group" video={video} />
        </>
    );
}
