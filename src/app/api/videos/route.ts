import type { NextRequest } from "next/server";
import { defaultFetchOptions } from "../../../config";
import getVideos from "../../../lib/getVideos";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const offset = Number(searchParams.get("offset")) || defaultFetchOptions.offset;
    const limit = Number(searchParams.get("limit")) || defaultFetchOptions.limit;
    const column = searchParams.get("orderColumn") ?? defaultFetchOptions.order.column;
    const ascending = searchParams.get("orderAsc") !== "false";
    const search = searchParams.get("search") ?? undefined;

    const options = {
        offset,
        limit,
        order: { column, options: { ascending } },
    };

    const { videos, endReached } = await getVideos(options, search);
    return new Response(JSON.stringify({ videos, endReached }), {
        headers: { "Content-Type": "application/json" },
    });
}
