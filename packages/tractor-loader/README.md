# 🚜 Tractor Loader

Tractor Loader is a webpack loader to help you with your crops and other image adjustments.

This loader performs edits to images based on an inline URL syntax. It integrates cleanly with the
NextJS optimized image loader and works well with `next dev`. All transformations are performed at
build time and have no impact on runtime performance.

For example, to crop 100 pixels off the top and bottom of an image:

```tsx
import cat from "./cat.jpg?crop=0,100,0,100&tractor";
```

Documentation and examples are deployed to Vercel:
[https://tractor-loader.vercel.app/](https://tractor-loader.vercel.app/)

The source code is available [here](https://github.com/jasonthorsness/tractor-loader).
