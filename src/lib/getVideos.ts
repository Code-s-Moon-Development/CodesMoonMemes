import { cache } from "react";
import { supabase } from "./supabaseClient";
import type { IVideoParams, IFetchOptionsProps } from "../types";

const getVideos = cache(
    async (fetchOptions: IFetchOptionsProps, searchParams?: string): Promise<{ videos: IVideoParams[]; endReached: boolean }> => {
        const { offset, limit, order } = fetchOptions;
        const { column, options } = order;

        let query = supabase
            .from("memes_data")
            .select()
            .range(offset, offset + limit)
            .order(column, options);

        if (searchParams) {
            query = query.textSearch("altText", `${searchParams}`, {
                type: "websearch",
            });
        }

        const { data: videos, error } = await query;
        if (error) throw new Error(error.message);

        const endReached = videos.length === 0;

        return { videos, endReached };
    }
);

export default getVideos;
