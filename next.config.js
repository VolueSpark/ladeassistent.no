/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    i18n: {
        locales: ['default', 'nb', 'en'],
        defaultLocale: 'default',
        localeDetection: false,
    },
}

module.exports = nextConfig
