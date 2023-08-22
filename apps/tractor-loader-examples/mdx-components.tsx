import type { MDXComponents } from "mdx/types";
import Image from "next/image";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    TractorLoaderImage: (props) => {
      return (
        <Image
          {...props}
          alt={props.alt || ""}
          className="my-0"
          sizes="(max-width: 56rem) 50vw, 28rem"
        />
      );
    },
    ...components,
  };
}
