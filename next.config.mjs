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
        appDir: true
    },
    i18n: {
        locales: ["pt"],
        defaultLocale: "pt",
    },
};

export default config;
