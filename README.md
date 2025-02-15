# 🚜 Tractor Loader

_Mechanize your image adjustment workflow!_

Nobody likes context-switching to an image editor just to crop or resize an image while developing
or writing an article. **Tractor Loader** puts the power of image editing directly into your
workflow. It’s a webpack loader that lets you crop, resize, and transform images by simply tweaking
the image URL in your import or Markdown. No more context switching or repetitive manual editing –
watch your images update in real-time as you adjust parameters. Tractor Loader integrates seamlessly
with **Next.js** (including MDX), performing all transformations at build time with no runtime cost.

Use it in code

```tsx
import img from "./img.jpg?crop=0,0,0,500&aspect=2.35:1&tractor";
```

Or in markdown

```md
![maple edge](./maple_edge.jpg?rotate=1.5&crop=50,870,50,860&tractor "Maple edge view.")
```

With `next dev` your images update in real time, making it easy to iterate on the adjustments and
get your images perfect.

## Live Documentation

Experience Tractor Loader in action on the
**[live documentation site](https://tractor-loader.vercel.app)**. This interactive documentation
showcases every feature with real examples. Toggle parameters, view before-and-after comparisons,
and get inspired by what you can do with just a tweak in the image URL. The demo covers cropping,
aspect ratio adjustments, resizing, rotation, and more – go check it out!

## Sites Using Tractor Loader

Please submit a PR or let me know if you want your site on this list!

- [jasonthorsness.com](https://www.jasonthorsness.com)

## Questions?

Please submit an issue or reach out to [@JasonThorsness](https://x.com/JasonThorsness) on X.

## Features

- **Inline Image Transformations:** Edit images by URL parameters. Crop, scale, or rotate your
  images directly in your JSX/MDX imports – for example, add `?crop=...&tractor` to an image import
  to crop it on the fly.
- **Seamless Next.js Integration:** Built to work with Next.js static image imports and the
  `<Image />` component. Just plug Tractor Loader into the Next.js image pipeline and you're ready
  to go.
- **No Runtime Overhead:** All edits are done at **build time**. The transformed images are output
  as static files, so your app’s performance remains lightning fast with **no runtime processing**.
- **Powerful Transformations:** Supports useful operations out-of-the-box – **crop** images to focus
  on what's important, enforce an **aspect ratio** (e.g. make an image 16:9 or square) for
  consistent layouts, **resize** by width or height to generate thumbnails or responsive images, and
  **rotate** images (with optional background fill) to straighten or skew as needed.
- **Chain Multiple Edits:** Apply several transformations in one go by chaining operations in the
  URL. Want to crop and then make an image a perfect square? Easy – just combine `crop` and `aspect`
  (and even more) in one import statement.
- **Extensible & Customizable:** Define your own operations or presets! Tractor Loader allows adding
  custom image operations via plugin options – for example, you can register a custom `blur` filter
  or any [Sharp](https://github.com/lovell/sharp)-supported effect with a few lines of config. You
  can also create named **presets** (predefined combos of ops) to reuse common transformations.
- **MDX/Markdown Friendly:** Use it in your content workflow. With the companion MDX plugin, you can
  write Markdown image syntax with Tractor Loader queries (e.g. `![](image.jpg?crop=...&tractor)`)
  and have those images processed automatically when your site builds. Perfect for technical blogs
  and documentation.

## Installation & Setup

Getting started is super simple. Follow these steps to add Tractor Loader to your project:

1. **Install the package:** Add Tractor Loader to your project using your favorite package manager:

   ```bash
   npm install tractor-loader --save-dev
   ```

   _(You can also use `yarn` or `pnpm`.)_ This installs the loader so you can use it in your build
   process.

2. **Configure Next.js (Webpack):** Integrate Tractor Loader into your Next.js image pipeline. In
   your **`next.config.js`**, add Tractor Loader as an additional loader for images:

   ```js
   // next.config.js
   module.exports = {
     webpack: (config) => {
       config.module.rules.forEach((rule) => {
         if (rule.loader === "next-image-loader") {
           rule.use = [
             { loader: rule.loader, options: rule.options },
             { loader: "tractor-loader" },
           ];
           rule.loader = undefined;
           rule.options = undefined;
         }
       });
       return config;
     },
   };
   ```

3. **TypeScript Declaration (if using TypeScript):** If your project uses TypeScript, add a
   declaration so it recognizes the new import syntax. Create a file (e.g. **`tractor.d.ts`** in
   your project root) with:

   ```ts
   declare module "*&tractor" {
     const content: {
       src: string;
       height: number;
       width: number;
       blurDataURL?: string;
       blurWidth?: number;
       blurHeight?: number;
     };
     export = content;
   }
   ```

   This ensures that imports with `&tractor` are typed similar to Next.js's image imports (so you
   get proper types for `src`, `width`, `height`, etc.).

4. **(Optional) MDX Setup:** If you use MDX for content, you can enable Tractor Loader by installing
   `tractor-loader-mdx`:
   ```bash
   npm install tractor-loader-mdx
   ```
   Then update your MDX configuration to use it. For example, with Next.js and `@next/mdx`:
   ```js
   // next.config.mjs (using @next/mdx)
   import { createCompiler } from "@next/mdx";
   import tractorLoaderMDX from "tractor-loader-mdx";
   const withMDX = createCompiler({
     extension: /\.mdx?$/,
     options: {
       remarkPlugins: [tractorLoaderMDX],
     },
   });
   // ... export your Next.js config with withMDX
   ```
   Also, ensure your MDX provider can render Tractor Loader's output. The MDX plugin will convert
   standard MDX image syntax into a special `<TractorLoaderImage>` component. You should map this to
   Next.js's `<Image>` component. For example:
   ```jsx
   // In your MDX provider setup (e.g., _app.js or mdx-components.js)
   import Image from "next/image";
   export const mdxComponents = {
     // ... other MDX component mappings ...
     TractorLoaderImage: (props) => <Image {...props} alt={props.alt || ""} />,
   };
   ```
   After this, any Markdown image that includes `?...&tractor` in its URL will be processed by
   Tractor Loader just like a static import. This is hugely useful for blogs – you can drop in raw
   images in your `.mdx` files and tweak them inline!

That’s it! 🚜 **Start importing images with `&tractor`** in the path, and Tractor Loader will handle
the rest.

## Usage Examples

Once Tractor Loader is set up, using it is as easy as adding a query string to your image path. Here
are some examples of how it can make your life easier:

### Crop Images Without Leaving Your Editor

Want to remove unwanted areas from a photo? Just add a `crop` parameter. For example:

```js
import landscape from "./landscape.jpg?crop=0,100,0,100&tractor";
```

This will crop 100px from the top and bottom of the image automatically. No need to open Photoshop –
adjust the numbers and save to tweak the crop as you write code.

### Resize for Thumbnails or Responsive Images

Need a smaller version of an image? Use the `width` or `height` parameter:

```js
import thumbnail from "./big-picture.png?width=300&tractor";
```

The above import will generate an image that is 300px wide (height auto-adjusted to preserve aspect
ratio). Similarly, `?height=200&tractor` would make it 200px tall. This is perfect for creating
thumbnails or handling responsive images for different screen sizes.

### Enforce a Consistent Aspect Ratio

Ensure all images fit a specific aspect ratio (great for galleries or hero banners). Use
`aspect=<width>:<height>`. For example:

```js
import avatar from "./profile.jpg?aspect=1:1&tractor";
```

This will make the image a perfect square (1:1 aspect ratio) by cropping or padding as needed. By
default it centers the crop, but you can control the focus. For instance,
`aspect=16:9;position:left` would crop to 16:9 while aligning the image to the left. No more
manually cropping each image to the same size – let Tractor Loader do it for you.

### Rotate Images

Need to rotate an image (say to straighten a tilted shot or create a playful tilt)? It’s one query
away:

```js
import tilted from "./building.jpg?rotate=45&tractor";
```

This will rotate the image by 45 degrees. By default, any blank corners from rotation will be
transparent (for PNG) or filled with white for JPEG. You can specify a background color for the
empty areas if needed. For example, `rotate=45;background:rgb(60,60,60)` uses a gray background for
the corners.

### Chain Multiple Transformations

The real magic is doing multiple edits at once! You can chain operations by separating them with `&`
in the URL. The operations apply in order from left to right. For example:

```js
import heroImg from "./hero.jpg?crop=400,0,0,0&aspect=16:9&width=800&tractor";
```

In one line, this takes `hero.jpg`, **crops** 400px from the top, then enforces a **16:9 aspect
ratio**, and finally **resizes** the image to 800px width. The result? A perfectly framed, optimized
hero image ready for your site – all without ever opening an image editor.

### Use in Markdown/MDX (for Content Creators)

Tractor Loader shines for bloggers using MDX. With the MDX plugin set up, you can include images in
Markdown and apply transformations inline. For example, in an `.mdx` file you might write:

```md
![Sunset panorama](./sunset.jpg?crop=0,50,0,50&aspect=21:9&tractor)
```

This will include the `sunset.jpg` image cropped 50px from the top and bottom, and constrained to a
21:9 cinematic aspect ratio – great for a wide banner image. You just write it in Markdown, and
Tractor Loader handles the rest when you build your site. Your writing flow stays focused and your
images come out perfectly scaled and cropped.

_(Tip: You can see more examples of these transformations on the
[live documentation site](https://tractor-loader.vercel.app) as well.)_

## Contribution Guide

If you have ideas for new features, additional image operations, or improvements, please share!

**How to contribute:**

- **Report Issues:** Found a bug or a quirk with an image transformation? Please open an issue on
  GitHub. It helps make the tool more robust for everyone.
- **Submit Pull Requests:** If you're a developer keen to improve Tractor Loader, fork the repo and
  submit a PR. Whether it’s fixing a bug, adding a new operation, or enhancing documentation, all
  contributions are appreciated.
- **Share Ideas:** Have a suggestion for a cool preset or integration? Start a discussion or reach
  out. The project began as a personal tool, and it's growing with community input – your
  suggestions could shape its future!

For local development, the code is organized as a monorepo (with the main `tractor-loader` package
and an `examples` Next.js app for the docs). After cloning the repo, install dependencies (it uses
`pnpm` for workspaces) and you can run the example app to test your changes. The core is written in
TypeScript and uses the **Sharp** library for image processing under the hood, so you have a solid
foundation to build on.

Join in and help make Tractor Loader even more awesome!

## License

**License:** Tractor Loader is open source under the [MIT License](LICENSE). Feel free to use it in
your projects – it’s free to use, modify, and distribute under those terms.

Special thanks to the open-source ecosystem that makes this tool possible – notably the
**[Sharp](https://sharp.pixelplumbing.com/)** image processing library which does the heavy lifting
for transformations behind the scenes.
