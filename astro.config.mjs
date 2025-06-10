import { defineConfig } from 'astro/config';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkToc from 'remark-toc';
import remarkCollapse from 'remark-collapse';
import { rehypeHeadingIds } from '@astrojs/markdown-remark';
import customTheme from "./src/utils/custom_shiki_theme.json";
import { visit } from 'unist-util-visit';

// needed for Jupyter Notebook outputs to fix image paths 
// (for when im lazy and dont want to use <Figure> tags) 
const remarkFixImagePaths = () => {
  return (tree) => {
    visit(tree, 'image', (node) => {
      if (node.url && node.url.startsWith('output_') && node.url.endsWith('.png')) {
        node.url = `/images/${node.url}`;
      }
    });
  };
};



export default defineConfig({
  markdown: {
    shikiConfig: {
      theme: customTheme,
      wrap: false,
      langs: ['python', 'javascript', 'typescript', 'bash', 'markdown','c', 'cpp', 'java', 'html', 'css'],
    },
    remarkPlugins: [
      remarkMath,
      remarkToc,
      [remarkCollapse, { test: "Table of contents" }],
      remarkFixImagePaths, // added this to fix image paths when using jpyter notebook outputs
    ],
    rehypePlugins: [rehypeHeadingIds, rehypeKatex],
  },
});