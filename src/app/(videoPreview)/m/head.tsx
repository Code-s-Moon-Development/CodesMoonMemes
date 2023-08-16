import { env } from "../../../env/server.mjs";

export default function Head({ params, searchParams }: { params: { slug: string }; searchParams: { v: string } }) {
    return (
        <>
            <meta property="og:type" content="video.other" />
            <meta property="og:video:type" content="text/html" />
            {/* <meta property="og:video" content={`${env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/cmemes/${searchParams.v}`} /> */}
            {/* <meta property="og:video:url" content={`${env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/cmemes/${searchParams.v}`} /> */}
            {/* <meta property="og:video:secure_url" content={`${env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/cmemes/${searchParams.v}`} /> */}
            <meta property="og:video:tag" content="memes" />
            <meta property="og:image:width" content="1280" />
            <meta property="og:image:height" content="720" />
            {/* <meta property="twitter:player" content={`${env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/cmemes/${searchParams.v}`} /> */}
            <meta name="twitter:card" content="player" />
            <meta name="twitter:player:width" content="1280" />
            <meta name="twitter:player:height" content="720" />
        </>
    );
}
