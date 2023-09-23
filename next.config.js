const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  sassOptions: {
    includePath: [path.join(__dirname, './src/styles')],
    prependData: `@use '@/styles/colors.scss';`,
  },
}

module.exports = nextConfig
