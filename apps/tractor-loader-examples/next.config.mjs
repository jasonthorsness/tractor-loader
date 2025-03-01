import createMDX from "@next/mdx";
import tractorLoaderMDX from "tractor-loader-mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
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
                myblur: {
                  parse: (v) => Number(v),
                  apply: (v, _, working) => working.blur(v),
                },
              },
              presets: {
                mybanner: "crop=20p,0,20p,0&aspect=16:9",
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

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [tractorLoaderMDX],
  },
});

export default withMDX(nextConfig);
