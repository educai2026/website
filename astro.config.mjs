import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// GitHub Pages: https://educai2026.github.io/website/
// Ao ganhar domínio próprio, troque `site` e remova `base`.
export default defineConfig({
  site: 'https://educai2026.github.io',
  base: '/website',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
});
