import { remarkEmbed } from './remark-embed.js';

/**
 * Layout: completely delegated to `src/components/Embed.astro`.
 * Data:   parsed here from the YAML frontmatter of ```embed blocks.
 */
export function embedObsidianPlugin() {
  return {
    name: 'astro-obsidian-embed-plugin',
    hooks: {
      'astro:config:setup': ({ updateConfig }) => {
        updateConfig({
          markdown: {
            remarkPlugins: [remarkEmbed],
          },
        });
      },
    },
  };
}
