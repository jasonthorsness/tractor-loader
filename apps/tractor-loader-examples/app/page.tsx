import Image, { StaticImageData } from "next/image";
import Prism from "../prism";
import img_z from "./cat.jpg";
import img_0 from "./cat.jpg?crop=200,750,400,1100&tractor";
import img_1 from "./cat.jpg?myrotate=145&crop=o-300,o-300,o300,o300&tractor";
import img_2 from "./cat.jpg?aspect=16:9;position:left&tractor";
import img_3 from "./cat.jpg?mybanner&tractor";
import img_4 from "./cat.jpg?crop=0,400,0,400&tractor";
import img_5 from "./cat.jpg?crop=20%,40%,w200,h150&tractor";
import img_6 from "./cat.jpg?crop=-90,-90,-90,-90;background:rgb(0,80,0)&tractor";
import img_7 from "./cat.jpg?crop=o-110,o-55,o110,o55,r56%,44%&tractor";
import img_8 from "./cat.jpg?height=100&tractor";
import img_9 from "./cat.jpg?width=120;kernel:nearest&tractor";

import Nav from "./nav";

// peer/example0
// peer-checked/example0:block
const ExampleImages_0 = () => {
  return (
    <ImageComparison
      i="0"
      a={img_z}
      b={img_0}
      t="crop=200,750,400,1100"
      e="Check the box to view live examples."
    />
  );
};

// peer/example1
// peer-checked/example1:block
const ExampleImages_1 = () => {
  return (
    <ImageComparison
      i="1"
      a={img_z}
      b={img_1}
      t="myrotate=145&crop=o-300,o-300,o300,o300"
      e="Rotate 145 degrees then crop to a 600 by 600 centered region"
    />
  );
};

// peer/example2
// peer-checked/example2:block
const ExampleImages_2 = () => {
  return (
    <ImageComparison
      i="2"
      a={img_z}
      b={img_2}
      t="aspect=16:9;position:left"
      e="Apply a 16:9 aspect ratio aligned to the left side"
    />
  );
};

// peer/example3
// peer-checked/example3:block
const ExampleImages_3 = () => {
  return (
    <ImageComparison
      i="3"
      a={img_z}
      b={img_3}
      t="./cat.jpg?mybanner&tractor"
      e="Apply the mybanner preset"
    />
  );
};

// peer/example4
// peer-checked/example4:block
const ExampleImages_4 = () => {
  return (
    <ImageComparison
      i="4"
      a={img_z}
      b={img_4}
      t="crop=0,400,0,400"
      e="Crop 400 pixels from the top and bottom."
    />
  );
};

// peer/example5
// peer-checked/example5:block
const ExampleImages_5 = () => {
  return (
    <ImageComparison
      i="5"
      a={img_z}
      b={img_5}
      t="crop=20%,40%,w200,h150"
      e="Crop to a 200 by 150 region offset 20% from the left and 40% from the top."
    />
  );
};

// peer/example6
// peer-checked/example6:block
const ExampleImages_6 = () => {
  return (
    <ImageComparison
      i="6"
      a={img_z}
      b={img_6}
      t="crop=-90,-90,-90,-90;background:rgb(0,80,0)"
      e="Crop to a region 90 px greater than the image size in all directions, filling with green."
    />
  );
};

// peer/example7
// peer-checked/example7:block
const ExampleImages_7 = () => {
  return (
    <ImageComparison
      i="7"
      a={img_z}
      b={img_7}
      t="crop=o-110,o-55,o110,o55,r56%,44%"
      e="Crop to a 220 by 110 region offset 56% from the right and 44% from the top."
    />
  );
};

// peer/example8
// peer-checked/example8:block
const ExampleImages_8 = () => {
  return <ImageComparison i="8" a={img_z} b={img_8} t="height=100" e="Resize to 100 pixels high" />;
};

// peer/example9
// peer-checked/example9:block
const ExampleImages_9 = () => {
  return (
    <ImageComparison
      i="9"
      a={img_z}
      b={img_9}
      t="width=120;kernel:nearest"
      e="Resize to 120 pixels wide with the nearest-neighbor kernel"
    />
  );
};

const ImageComparison = (props: {
  e: string;
  i: string;
  t: string;
  a: StaticImageData;
  b: StaticImageData;
}) => {
  return (
    <div className="-mx-1">
      <p className="ml-1 mb-0 mt-0 pt-2">{props.e}</p>
      <div className="block mb-2 -mt-2 py-1 whitespace-nowrap overflow-x-auto">
        <input
          id={`example${props.i}`}
          type="checkbox"
          className={`align-top mt-1.5 p-2 text-xs ml-1 cursor-pointer peer/example${props.i}`}
        />
        <label
          htmlFor={`example${props.i}`}
          className="ml-2 align-middle p-0 font-mono cursor-pointer bg-transparent"
        >
          {props.t}
        </label>
        <div className={`hidden peer-checked/example${props.i}:block`}>
          <div className="grid-cols-2 gap-1 grid pt-2 text-xs">
            <span>original {`(${props.a.width}x${props.a.height})`}</span>
            <span>modified {`(${props.b.width}x${props.b.height})`}</span>
          </div>
          <div className="grid-cols-2 gap-1 grid pb-2">
            <Image className="my-0" sizes="(max-width: 56rem) 50vw, 28rem" src={props.a} alt="" />
            <Image className="my-0" sizes="(max-width: 56rem) 50vw, 28rem" src={props.b} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

const JavaScript = (props: { t: string }) =>
  CodeBlock({ t: props.t, g: languages.javascript, l: "javascript" });

const TypeScript = (props: { t: string }) =>
  CodeBlock({ t: props.t, g: languages.typescript, l: "typescript" });

const Text = (props: { t: string }) => CodeBlock({ t: props.t, g: languages.text, l: "text" });

const CodeBlock = (props: { t: string; g: any; l: string }) => {
  return (
    <div className="py-0 px-0 not-prose">
      <pre className={`language-${props.l}`}>
        <code
          dangerouslySetInnerHTML={{
            __html: Prism.highlight(props.t, props.g, props.l),
          }}
        ></code>
      </pre>
    </div>
  );
};

type languageType = {
  [key in "tsx" | "jsx" | "javascript" | "typescript" | "shell" | "css" | "text"]: any;
};

const languages: languageType = Prism.languages as any;

export default function Home() {
  return (
    <>
      <main className="max-w-4xl mx-auto prose prose-sm sm:prose-md dark:prose-invert ">
        <article className="px-2 sm:px-4">
          <Nav />
          <p className="mb-2">
            Tractor Loader is a webpack loader to help you with your crops and other image
            adjustments. This loader performs edits to images based on an inline URL syntax. It
            integrates cleanly with the NextJS optimized image loader and works well with next dev.
          </p>
          <ExampleImages_0 />
          <h2 id="section-overview">Overview</h2>
          <h3 id="section-overview-why">Why?</h3>
          <p>
            The NextJS &lt;Image /&gt; documentation recommends using static image imports for local
            images.
          </p>
          <JavaScript t={`import cat from "./cat.jpg";`} />
          <p>This syntax provides a natural location to express image modifications.</p>
          <JavaScript t={`import cat from "./cat.jpg?crop=0,300,0,200&tractor";`} />
          <h3 id="section-overview-installation">Installation</h3>
          <p>Install tractor-loader with your package manager of choice.</p>
          <Text t={`npm install tractor-loader`} />
          <p>Add it to the image pipeline in next.config.js.</p>
          <JavaScript
            t={`/** @type {import('next').NextConfig} */
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
          },
        ];
        rule.loader = undefined;
        rule.options = undefined;
      }
    });
    return config;
  },
};

module.exports = nextConfig;`}
          />
          <p>Add a new file tractor.d.ts to satisfy TypeScript.</p>
          <TypeScript
            t={`declare module "*&tractor" {
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
}`}
          />
          <h3 id="section-overview-application">Application</h3>
          <p>
            Tractor loader can be applied to any static image import by adding a query string ending
            in &tractor, such as in the following example. Here 400 px is cropped from the top of
            the image, then it is coerced to a 16:9 aspect ratio.
          </p>
          <JavaScript t={`import cat from "./cat.jpg?crop=400,0,0,0&aspect=16:9&tractor";`} />
          <p>
            The query string is interpreted as a sequence of operations which are applied from left
            to right. The key of each key-value pair of the query string identifies an operation,
            and the value is operation-specific configuration.
          </p>
          <h3 id="section-overview-conventions">Conventions</h3>
          <h4>Units</h4>
          <p>
            Default units are pixels. If a &apos;%&apos; sign is used, the unit is a percentage of
            width or height depending on context.
          </p>
          <h4>Image Layout</h4>
          <p>
            Tractor loader uses an (x, y) coordinate system where the top-left of the image is (0,
            0) and the bottom-right of the image is (width, height). The following shorthand applies
            to image regions.
          </p>
          <table>
            <thead>
              <tr>
                <th>code</th>
                <th>name</th>
                <th>meaning</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>t</td>
                <td>top</td>
                <td>y coordinate 0</td>
              </tr>
              <tr>
                <td>b</td>
                <td>bottom</td>
                <td>y coordinate equal to image height</td>
              </tr>
              <tr>
                <td>l</td>
                <td>left</td>
                <td>x coordinate 0</td>
              </tr>
              <tr>
                <td>r</td>
                <td>right</td>
                <td>x coordinate equal to image width</td>
              </tr>
              <tr>
                <td>w</td>
                <td>width</td>
                <td>image width</td>
              </tr>
              <tr>
                <td>h</td>
                <td>height</td>
                <td>image height</td>
              </tr>
            </tbody>
          </table>
          <h3 id="section-overview-extension">Extension</h3>
          <p>
            Tractor loader can be extended by defining new operations or by giving reusable preset
            names to sequences of operations.
          </p>
          <h4>New Operations</h4>
          <p>
            New operations must implement a &quot;parse&quot; method that takes the value from the
            query string and returns a parsed value, and an &quot;apply&quot; method that takes that
            value, the <a href="https://sharp.pixelplumbing.com/api-input">sharp metadata</a> for
            the image, and a{" "}
            <a href="https://sharp.pixelplumbing.com/api-constructor">sharp instance</a>{" "}
            representing the image, and returns a new sharp instance.
          </p>
          <JavaScript
            t={`export interface Operation {
  parse: (v: string) => any;
  apply: (
    v: any,
    metadata: sharp.Metadata,
    working: sharp.Sharp,
  ) => sharp.Sharp;
}`}
          />
          <p>
            New operations are registered via loader options. For example, here is a registration
            for an operation to rotate an image.
          </p>
          <JavaScript
            t={`// ... in next.config.js webpack configuration ...
{
  loader: "tractor-loader",
  options: {
    plugins: {
      myrotate: {
        parse: (v) => Number(v),
        apply: (v, _, working) => working.rotate(v),
      }
    }
  }
},`}
          />
          <p>
            A registered operation can be used in the query string together with other operations.
          </p>
          <ExampleImages_1 />
          <p>Registered operations override built-in operations with the same name.</p>
          <h4>Presets</h4>
          <p>
            Common sequences of operations can be named as presets in the webpack configuration.
          </p>
          <JavaScript
            t={`// ... in next.config.js webpack configuration ...
{
  loader: "tractor-loader",
  options: {
    presets: {
      mybanner: "crop=20%,0,20%,0&aspect=16:9",
    }
  }
},`}
          />
          <p>
            Then the preset can be applied in the query string. The preset is expanded to its
            component operations wherever it appears and can be mixed with other presets and
            operations.
          </p>
          <ExampleImages_3 />
          <h2 id="section-operations">Operations</h2>
          <h3 id="section-operations-aspect">Aspect</h3>
          <p>
            Constrains an image to a specific aspect ratio by adjusting one of the image dimensions
            while leaving the other unmodified. Performs the minimum adjustment necessary to achieve
            the desired ratio. See{" "}
            <a href="https://sharp.pixelplumbing.com/api-resize">sharp resize</a> for available
            options.
          </p>
          <h4>Syntax</h4>
          <Text
            t={`aspect=w:h[;option:value]...
w:h      aspect ratio to apply
options  sharp options`}
          />
          <h4>Examples</h4>
          <ExampleImages_2 />
          <h3 id="section-operations-crop">Crop</h3>
          <p>
            Crops an image to a target region. This uses a combination of{" "}
            <a href="https://sharp.pixelplumbing.com/api-resize#extend">extract</a> and{" "}
            <a href="https://sharp.pixelplumbing.com/api-resize#extend">extend</a>.
          </p>
          <h4>Syntax</h4>
          <Text
            t={`crop=l,t,r,b[,ox,oy][;option:value]...
l,t,r,b   left, top, right, bottom
ox,oy     x and y for the 'o' origin
options   sharp options
`}
          />
          <p>
            Each part is provided as an optional origin, followed by a value, followed by an
            optional &apos;%&apos; to use percent units. For example, l20% refers to an edge offset
            20% of the image width from the left, while b100 refers to an edge offset 100 pixels
            from the bottom (offset direction is flipped for r and b origins). When an origin is not
            provided, the default origin for that part is applied.
          </p>
          <p>
            By default the origin &apos;o&apos; is the image center point. If ox and oy are
            provided, they redefine that point.
          </p>
          <table>
            <thead>
              <tr>
                <th>part</th>
                <th>valid origins</th>
                <th>default origin</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>l</td>
                <td>l, r, o</td>
                <td>l</td>
              </tr>
              <tr>
                <td>t</td>
                <td>t, b, o</td>
                <td>t</td>
              </tr>
              <tr>
                <td>r</td>
                <td>l, r, o, w</td>
                <td>r</td>
              </tr>
              <tr>
                <td>b</td>
                <td>t, b, o, h</td>
                <td>b</td>
              </tr>
              <tr>
                <td>ox</td>
                <td>l, r</td>
                <td>l</td>
              </tr>
              <tr>
                <td>oy</td>
                <td>t, b</td>
                <td>t</td>
              </tr>
            </tbody>
          </table>
          <h4>Examples</h4>
          <ExampleImages_4 />
          <ExampleImages_5 />
          <ExampleImages_6 />
          <ExampleImages_7 />
          <h3 id="section-operations-height">Height</h3>
          <p>
            Resizes an image to a height while preserving aspect ratio. See{" "}
            <a href="https://sharp.pixelplumbing.com/api-resize">sharp resize</a> for available
            options.
          </p>
          <h4>Syntax</h4>
          <Text
            t={`height=h[;option:value]...
h        height to apply
options  sharp options`}
          />
          <h4>Examples</h4>
          <ExampleImages_8 />
          <h3 id="section-operations-width">Width</h3>
          <p>
            Resizes an image to a width while preserving aspect ratio. See{" "}
            <a href="https://sharp.pixelplumbing.com/api-resize">sharp resize</a> for available
            options.
          </p>
          <h4>Syntax</h4>
          <Text
            t={`width=w[;option:value]...
w        width to apply
options  sharp options`}
          />
          <h4>Examples</h4>
          <ExampleImages_9 />
          <h3 id="section-image-credits">Image Credits</h3>
          <p>
            Cat Photo by{" "}
            <a href="https://unsplash.com/@miklevasilyev?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
              Mikhail Vasilyev
            </a>{" "}
            on{" "}
            <a href="https://unsplash.com/photos/MEb2jandkbc?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
              Unsplash
            </a>
          </p>
          <div style={{ height: "90vh" }}>&nbsp;</div>
        </article>
      </main>
    </>
  );
}
