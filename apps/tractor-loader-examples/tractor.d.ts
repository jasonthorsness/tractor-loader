declare module "*&tractor" {
  // StaticImageData from "next/image";
  const contents: {
    src: string;
    height: number;
    width: number;
    blurDataURL?: string;
    blurWidth?: number;
    blurHeight?: number;
  };
  export = contents;
}
