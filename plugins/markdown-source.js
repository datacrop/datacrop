// Writes each doc's Markdown source (front matter stripped) next to its page as
// `<slug>/index.md`, so the "Copy page" button can fetch it from the static site.
const fs = require('fs/promises');
const path = require('path');
const matter = require('gray-matter');

async function walk(dir) {
  const entries = await fs.readdir(dir, {withFileTypes: true});
  const files = await Promise.all(
    entries.map((e) => {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) return walk(full);
      return /\.mdx?$/.test(e.name) ? [full] : [];
    }),
  );
  return files.flat();
}

module.exports = function markdownSource(context) {
  return {
    name: 'markdown-source',
    async postBuild({outDir}) {
      const files = await walk(path.join(context.siteDir, 'docs'));
      await Promise.all(
        files.map(async (file) => {
          const {data, content} = matter(await fs.readFile(file, 'utf8'));
          if (!data.slug) return;
          const dest = path.join(outDir, data.slug, 'index.md');
          await fs.mkdir(path.dirname(dest), {recursive: true});
          await fs.writeFile(dest, content.trimStart());
        }),
      );
    },
  };
};
