import { Fragment } from "react";
import Placeholder from "./Video/Placeholder";

export default function VideoArraySkeleton() {
    return (
        <>
            {[...Array(26)].map((e, i) => (
                <Fragment key={i}>
                    <Placeholder />
                </Fragment>
            ))}
        </>
    );
}
