const locales_var = process.env.NEXT_PUBLIC_LOCALES_VAR


module.exports = {
  i18n: {
    locales: ['default' ,'en-US', 'ru-RU', 'de-DE'],
    defaultLocale:'default',
    localeDetection: false
  },
  trailingSlash: true,

  reactStrictMode: true,
  images:{
    domains: ['res.cloudinary.com']
  },

  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false
    }

    return config
  }
}
