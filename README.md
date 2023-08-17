# 🚜🌱 Tractor Loader

A webpack loader to help you with your crops (and other image adjustments).

This loader performs edits to images based on an inline URL syntax. It integrates cleanly with the
NextJS optimized image loader and works well with `next dev`.

For example, to crop 100 pixels off the top and bottom of an image:

```tsx
import cat from "./cat.jpg?crop=0,100,0,100&tractor";
```

The functionality is documented in
[tractor-loader/apps/tractor-loader-examples](tractor-loader/apps/tractor-loader-examples)
