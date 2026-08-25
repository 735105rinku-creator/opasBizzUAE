import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // Static routes prerender at build time
  { path: '',                   renderMode: RenderMode.Prerender },
  { path: 'home',               renderMode: RenderMode.Prerender },
  { path: 'about',              renderMode: RenderMode.Prerender },
  { path: 'contact',            renderMode: RenderMode.Prerender },
  { path: 'products',           renderMode: RenderMode.Prerender },
  { path: 'services/grains',    renderMode: RenderMode.Prerender },
  { path: 'services/export',    renderMode: RenderMode.Prerender },
  { path: 'services/import',    renderMode: RenderMode.Prerender },
  { path: 'services/it-sector', renderMode: RenderMode.Prerender },
  { path: 'privacy',            renderMode: RenderMode.Prerender },
  { path: 'terms',              renderMode: RenderMode.Prerender },

  // Dynamic route uses SSR because product IDs are dynamic
  { path: 'products/:id',       renderMode: RenderMode.Server },

  // Wildcard fallback
  { path: '**',                 renderMode: RenderMode.Server },
];

