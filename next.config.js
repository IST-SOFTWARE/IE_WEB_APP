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

    config.module.rules.push({
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
    });

    return config
  }
}
