import { cache } from "react";
import { supabaseServer } from "./supabaseServer";
import type { IVideoParams, IFetchOptionsProps } from "../types";

const BUCKET = "cmemes";

function toVideoParams(
    item: { name: string; id: string | null; created_at: string; metadata?: Record<string, unknown> }
): IVideoParams {
    const { data } = supabaseServer.storage.from(BUCKET).getPublicUrl(item.name);
    const altText = (item.metadata && typeof item.metadata.altText === "string" ? item.metadata.altText : "") ?? "";
    return {
        id: item.id ?? item.name,
        name: item.name,
        url: data.publicUrl,
        altText,
        created_at: item.created_at,
        viewCount: 0,
    };
}

const getVideos = cache(
    async (
        fetchOptions: IFetchOptionsProps,
        searchParams?: string
    ): Promise<{ videos: IVideoParams[]; endReached: boolean }> => {
        const { offset, limit, order } = fetchOptions;
        const ascending = order.options?.ascending ?? false;
        const sortOrder = ascending ? "asc" : "desc";

        const { data: list, error } = await supabaseServer.storage
            .from(BUCKET)
            .list("", {
                limit: limit + 1,
                offset,
                sortBy: { column: order.column === "viewCount" ? "created_at" : order.column, order: sortOrder },
                search: searchParams ?? undefined,
            });

        if (error) throw new Error(error.message);

        const files = (list ?? []).filter((item): item is typeof item & { id: string } => item.id != null);
        const endReached = files.length <= limit;
        const videos = files.slice(0, limit).map(toVideoParams);

        return { videos, endReached };
    }
);

export default getVideos;
