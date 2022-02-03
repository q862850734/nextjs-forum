/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['avatars.githubusercontent.com','uploadstatic.mihoyo.com','patchwiki.biligame.com','raw.githubusercontent.com'],
  },
}

module.exports = nextConfig
