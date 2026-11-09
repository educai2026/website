import type { APIRoute } from 'astro';

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export const GET: APIRoute = ({ site }) =>
  new Response(`User-agent: *\nAllow: /\n\nSitemap: ${new URL(`${base}/sitemap-index.xml`, site).href}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
