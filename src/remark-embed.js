import { visit } from 'unist-util-visit';
import yaml from 'js-yaml';

const HTML_ESCAPE_MAP = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => HTML_ESCAPE_MAP[character]);
}

function stringValue(value) {
  return typeof value === 'string' ? value : '';
}

function allowedUrl(value) {
  if (!value) return '';

  try {
    const parsed = new URL(value);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:'
      ? parsed.href
      : '';
  } catch {
    return '';
  }
}

function renderEmbed(data) {
  const title = escapeHtml(stringValue(data.title));
  const description = escapeHtml(stringValue(data.description));
  const url = allowedUrl(stringValue(data.url));
  const image = allowedUrl(stringValue(data.image));
  const body = [
    image
      ? `<img class="astro-link-embed__image" src="${escapeHtml(image)}" alt="${title}" loading="lazy" decoding="async">`
      : '',
    '<div class="astro-link-embed__body">',
    `<h3 class="astro-link-embed__title">${title}</h3>`,
    `<p class="astro-link-embed__description">${description}</p>`,
    '</div>',
  ].join('');

  const content = url
    ? `<a class="astro-link-embed__link" href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${body}</a>`
    : body;

  return `<article class="astro-link-embed">${content}</article>`;
}

/**
 * Visit every ```` ```embed ```` code block, parse its YAML payload,
 * and replace the node with static, safe HTML for Astro Markdown output.
 */
export function remarkEmbed() {
  return (tree) => {
    visit(tree, 'code', (node, index, parent) => {
      if (node.lang !== 'embed' || !parent) return;
      const data = yaml.load(node.value) ?? {};
      parent.children[index] = {
        type: 'html',
        value: renderEmbed(data),
      };
    });
  };
}
