import type { APIRoute } from 'astro';

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export const GET: APIRoute = () =>
  new Response(
    JSON.stringify({
      name: 'trIA',
      short_name: 'trIA',
      lang: 'pt-BR',
      start_url: `${base}/`,
      scope: `${base}/`,
      display: 'browser',
      background_color: '#FBFAF7',
      theme_color: '#13254A',
      icons: [
        { src: `${base}/trIA-icone-192.png`, sizes: '192x192', type: 'image/png' },
        { src: `${base}/trIA-icone-512.png`, sizes: '512x512', type: 'image/png' },
      ],
    }),
    { headers: { 'Content-Type': 'application/manifest+json' } },
  );
