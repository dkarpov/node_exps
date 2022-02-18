const withCSS = require("@zeit/next-css");
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  withCSS,
};

module.exports = nextConfig;
