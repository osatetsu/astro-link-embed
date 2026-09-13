# astro-link-embed

`astro-link-embed` renders [Obsidian Link Embed](https://github.com/Seraphli/obsidian-link-embed) YAML code blocks as static HTML link cards in Astro Markdown (`.md`) files.

It is for standard Markdown only. It does not use Astro components or support MDX.

## Installation

Install the package together with Astro 7 and its Unified Markdown processor:

```sh
npm install astro-link-embed @astrojs/markdown-remark
```

## Setup

Add `remarkEmbed` to the existing Astro 7 Unified Markdown processor in `astro.config.mjs`. This plugin does not create or override `markdown.processor`.

```js
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import { remarkEmbed } from 'astro-link-embed';

export default defineConfig({
  markdown: {
    processor: unified({
      remarkPlugins: [
        // Existing remark plugins.
        remarkEmbed,
      ],
    }),
  },
});
```

Keep all existing `remarkPlugins` and `rehypePlugins` in this same `unified()` configuration, then add `remarkEmbed` to `remarkPlugins`.

## Usage

Use an `embed` code block in any `.md` page:

````md
```embed
title: "Example Title"
image: "https://example.com/image.jpg"
description: "This is an example description."
url: "https://example.com"
```
````

The plugin emits static HTML using these classes:

- `.astro-link-embed`
- `.astro-link-embed__link`
- `.astro-link-embed__image`
- `.astro-link-embed__body`
- `.astro-link-embed__title`
- `.astro-link-embed__description`

Add styles in the consuming Astro site's global stylesheet. For example:

```css
.astro-link-embed {
  border: 1px solid #d1d5db;
  border-radius: 8px;
  margin-block: 1rem;
  max-width: 600px;
  overflow: hidden;
}

.astro-link-embed__link {
  color: inherit;
  display: flex;
  text-decoration: none;
}

.astro-link-embed__image {
  flex: 0 0 150px;
  object-fit: cover;
  width: 150px;
}

.astro-link-embed__body {
  padding: 1rem;
}

.astro-link-embed__title {
  margin: 0 0 0.5rem;
}

.astro-link-embed__description {
  margin: 0;
}
```

## Safety

`title`, `description`, `url`, and `image` are HTML-escaped. Only absolute `http:` and `https:` URLs are allowed for `url` and `image`; other values are omitted. When `url` is valid, the card link receives `target="_blank"` and `rel="noopener noreferrer"`.

If `url` is missing or invalid, the card is emitted without a link. If `image` is missing or invalid, the image is omitted.

## License

MIT License. See `LICENSE`.
