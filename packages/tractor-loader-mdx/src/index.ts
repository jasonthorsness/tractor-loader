import { visit } from "unist-util-visit";
import { remark } from "remark";
import remarkMDX from "remark-mdx";

import * as mdast from "mdast";
import type * as unified from "unified";

export const plugin: unified.Plugin<[], mdast.Root> = () => {
  return (tree) => {
    const imports: mdast.Content[] = [];
    let counter = 0;
    visit(tree, "image", (node, index, parent) => {
      if (parent == null || index == null || !/\?.+&tractor$/.test(node.url)) {
        return;
      }

      counter++;

      const sanitizedURL = JSON.stringify(node.url);

      const parsedRoot = remark()
        .use(remarkMDX)
        .parse(
          `import img${counter} from ${sanitizedURL};\n\n<TractorLoaderImage src={img${counter}} />`,
        );

      if (parsedRoot.children.length !== 2) {
        throw new Error("Internal error");
      }

      const importNode = parsedRoot.children[0];
      const imageNode = parsedRoot.children[1];

      parent.children[index] = imageNode;
      imports.push(importNode);
    });

    tree.children.unshift(...imports);
  };
};

export default plugin;
