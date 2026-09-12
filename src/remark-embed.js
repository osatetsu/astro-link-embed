import { visit } from 'unist-util-visit';
import yaml from 'js-yaml';

/**
 * Visit every ```` ```embed ```` code block, parse its YAML payload,
 * and replace the node with an `html` node whose `data.hName` points
 * at the Astro component `Embed.astro`. Astro picks the component up
 * during markdown → HTML rendering and renders it with `hProperties`
 * forwarded as props.
 */
export function remarkEmbed() {
  return (tree) => {
    visit(tree, 'code', (node, index, parent) => {
      if (node.lang !== 'embed' || !parent) return;
      const data = yaml.load(node.value) ?? {};
      parent.children[index] = {
        type: 'html',
        value: '',
        data: {
          hName: 'Embed',
          hProperties: data,
          hChildren: [],
        },
      };
    });
  };
}
