/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, options) => {
    config.module.rules.forEach((rule) => {
      if (rule.loader === "next-image-loader") {
        rule.use = [
          {
            loader: rule.loader,
            options: rule.options,
          },
          {
            loader: "tractor-loader",
            options: {
              plugins: {
                myrotate: {
                  parse: (v) => Number(v),
                  apply: (v, _, working) => working.rotate(v),
                },
              },
              presets: {
                mybanner: "crop=20%,0,20%,0&aspect=16:9",
              },
            },
          },
        ];
        rule.loader = undefined;
        rule.options = undefined;
      }
    });
    return config;
  },
};

module.exports = nextConfig;
