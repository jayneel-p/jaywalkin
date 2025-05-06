import { defineConfig } from 'astro/config';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkToc from 'remark-toc';
import remarkCollapse from 'remark-collapse';

export default defineConfig({
  // other configs
  markdown: {
    remarkPlugins: [
      remarkMath, // <- new plugin
      remarkToc,
      [remarkCollapse, { test: "Table of contents" }],
    ],
    rehypePlugins: [rehypeKatex], // <- new plugin
    shikiConfig: {
      // For more themes, visit https://shiki.style/themes
      themes: { light: "min-light", dark: "night-owl" },
      wrap: true,
    },
  },
  // other configs
});