// @ts-check
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env/server.mjs"));

/** @type {import("next").NextConfig} */
const config = {
    reactStrictMode: true,
    swcMinify: true,
    experimental: {
        appDir: true,
    },
    i18n: {
        locales: ["pt-BR"],
        defaultLocale: "pt-BR",
    },
    async redirects() {
        return [
            {
                source: "/:path+/",
                destination: "/:path+",
                permanent: true,
            },
        ];
    },
    async headers() {
        return [
            {
                source: "/(.*)?", // Matches all pages
                headers: [
                    {
                        key: "strict-transport-security",
                        value: "max-age=63072000; includeSubdomains; preload",
                    },
                    {
                        key: "x-content-type-options",
                        value: "nosniff",
                    },
                    {
                        key: "x-xss-protection",
                        value: "1; mode=block",
                    },
                ],
            },
        ];
    },
};

export default config;
