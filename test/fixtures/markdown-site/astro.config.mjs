import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import { remarkEmbed } from '../../../src/index.js';

function remarkExisting() {
  return (tree) => {
    const replaceMarker = (node) => {
      if (node.type === 'text') {
        node.value = node.value.replace('existing-plugin-marker', 'existing-plugin-output');
      }

      for (const child of node.children ?? []) replaceMarker(child);
    };

    replaceMarker(tree);
  };
}

export default defineConfig({
  markdown: {
    processor: unified({
      remarkPlugins: [remarkExisting, remarkEmbed],
    }),
  },
});
