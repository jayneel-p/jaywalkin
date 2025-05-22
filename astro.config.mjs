import { defineConfig } from 'astro/config';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkToc from 'remark-toc';
import remarkCollapse from 'remark-collapse';
import { rehypeHeadingIds } from '@astrojs/markdown-remark';
import customTheme from "./src/utils/custom_shiki_theme.json";

// Astro ships with a built-in Shiki integration
export default defineConfig({
  markdown: {
    // Enable syntax highlighting for Python and other languages
    shikiConfig: {
      // Choose from Shiki's built-in themes. Find full list at: https://shiki.style/themes
      theme: customTheme,
      // Enable word wrap
      wrap: true,
      // Languages to be loaded
      langs: ['python', 'javascript', 'typescript', 'bash', 'markdown','c', 'cpp', 'java', 'html', 'css'],
    },
    remarkPlugins: [
      remarkMath,
      remarkToc,
      [remarkCollapse, { test: "Table of contents" }],
    ],
    rehypePlugins: [rehypeHeadingIds, rehypeKatex],
  },
});