import VideoArraySkeleton from "../components/VideoArraySkeleton";

export default function Loading() {
    return (
        <div className="flex h-full w-full flex-col items-center justify-center">
            <section className="m-2 flex flex-wrap items-center justify-center gap-4">
                <VideoArraySkeleton />
            </section>
        </div>
    );
}
