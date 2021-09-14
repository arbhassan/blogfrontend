module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["cdn.sanity.io"],
  },

  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push({
      test: /\.(pdf)$/,
      use: [
        {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
          },
        },
      ],
    }),
      config.resolve.modules.push(__dirname);

    config.resolve.alias = {
      ...config.resolve.alias,
    };

    return config;
  },
};
