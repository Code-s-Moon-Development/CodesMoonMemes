import { supabase } from "../../../lib/supabaseClient";
import { notFound, redirect } from "next/navigation";
import { env } from "../../../env/server.mjs";

// import { defaultFetchOptions } from "../../../config";
// import getVideos from "../../../lib/getVideos";

import MetaUpdater from "../../../components/MetaUpdater";
import Video from "../../../components/Video/Video";

export const revalidate = 60;

export default async function Page({ params, searchParams }: { params: { slug: string }; searchParams: { v: string } }) {
    const url = `${env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/cmemes/${searchParams.v}`;

    if (!searchParams.v) {
        redirect("/");
    }

    const { data } = await supabase.from("memes_data").select().match({ url: searchParams.v }).single(); // Workaround to get the right video

    if (!data) {
        notFound();
    }

    return (
        <>
            <MetaUpdater url={url} />
            <Video frameSize="w-full max-h-[80vh] group" video={data} />
        </>
    );
}
