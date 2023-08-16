import type { IFetchOptionsProps } from "../types";

export const FETCH_OFFSET = 16;

export const defaultFetchOptions: IFetchOptionsProps = {
    limit: FETCH_OFFSET,
    offset: 0,
    order: {
        column: "created_at",
        options: {
            ascending: false,
        },
    },
};

export const hoverTimeUntilPlay = 100; // ms

export const FILE_SIZE_UPLOAD_LIMIT = 1048576 * 40; // 40 mb