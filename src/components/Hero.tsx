export default function Hero() {
    return (
        <section className="w-full xs:w-96 md:w-[500px] flex flex-col justify-center px-4 py-8 text-left">
            <a
                className="mb-4 flex w-fit items-center justify-center space-x-1 rounded-2xl border-2 border-solid border-white/10 bg-[#101010] py-1 pr-4 pl-1 text-white"
                href="https://discord.gg/XpTWUy72Cq"
                target="_blank"
                rel="noreferrer"
            >
                <span className="m-0.5 mr-2 flex items-center justify-center rounded-2xl bg-slate-600 px-2 py-0.5 text-xs font-semibold">
                    Nosso Discord
                </span>
                <span className="flex items-center justify-center text-xs font-normal">Junte-se a nossa comunidade</span>
            </a>
            <h1 className="mb-7 text-5xl font-bold">
                A maior biblioteca de memes <span className="bg-underline1 bg-100% bg-left-bottom bg-no-repeat pb-2">do Brasil</span>
            </h1>
            <p className="mb-7 font-normal">Descubra os melhores memes, sem likes, sem comentários, só memes.</p>
        </section>
    );
}
