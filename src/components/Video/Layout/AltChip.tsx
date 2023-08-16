import * as HoverCard from "@radix-ui/react-hover-card";

export default function AltChip({ content }: { content: string }) {
    return content.length > 0 ? (
        <HoverCard.Root openDelay={250}>
            <HoverCard.Trigger asChild>
                <span className="absolute left-0 bottom-0 m-1 cursor-default rounded-md bg-[#161618] px-1.5 py-0.5 text-xs text-white/75 opacity-0 transition-opacity group-focus-within:opacity-75 group-hover:opacity-100 group-focus:opacity-75">
                    Alt
                </span>
            </HoverCard.Trigger>
            <HoverCard.Portal>
                <HoverCard.Content
                    sideOffset={16}
                    hideWhenDetached
                    className="w-64 rounded-lg bg-[#161618]/95 p-3 transition will-change-auto group-hover:will-change-transform"
                >
                    <p className="text-sm font-semibold text-gray-600">Descrição:</p>
                    <p className="text-base">{content}</p>
                    <HoverCard.Arrow className="fill-[#161618]/95" />
                </HoverCard.Content>
            </HoverCard.Portal>
        </HoverCard.Root>
    ) : null;
}
