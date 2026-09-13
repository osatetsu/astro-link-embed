# astro-link-embed

This Astro plugin allows you to easily embed content in your Markdown files using a custom code block syntax. It is a fork of [astro-embed-obsidian-plugin](https://github.com/pierrenel/astro-embed-obsidian-plugin) and is designed to work with the [Obsidian Link Embed plugin](https://github.com/Seraphli/obsidian-link-embed), which allows you to embed content in Obsidian markdown files.

## Installation

~~npm install astro-link-embed~~

> [!IMPORTANT]
> This software has not yet been published on *NPM*.
> Please refer directly to the [GitHub repository](https://github.com/osatetsu/astro-link-embed).

## Usage

1. Add the plugin to your `astro.config.mjs` file:

```javascript
import { defineConfig } from 'astro/config';
import embedObsidianPlugin from 'astro-link-embed';

export default defineConfig({
  integrations: [embedObsidianPlugin()],
});
```

2. In your Markdown files, use the following syntax to embed content:

````
  ```embed
  title: "Example Title"
  image: "https://example.com/image.jpg"
  description: "This is an example description."
  url: "https://example.com"
  ```
````

The `remark` plugin (`src/remark-embed.js`) parses the YAML payload and forwards it to the Astro component `src/components/Embed.astro`, which owns all layout and styles. To restyle, edit `Embed.astro` only. To change the data shape (e.g. add an `author` field), edit `remark-embed.js` and `Embed.astro` together — no HTML strings embedded in the plugin.

## Layout vs. data

| Concern            | File                            |
| ------------------ | ------------------------------- |
| YAML parsing       | `src/remark-embed.js`           |
| Astro wiring       | `src/index.js`                  |
| Layout & styles    | `src/components/Embed.astro`    |

## Credits

Forked from [astro-embed-obsidian-plugin](https://github.com/pierrenel/astro-embed-obsidian-plugin) by Pierre Nel <hello@pierre.io>. Layout and data were separated in this fork. The package name `astro-link-embed` is a random three-word token with no special meaning.

## License

MIT License — see `LICENSE` for the original copyright.
