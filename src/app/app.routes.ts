

import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/home/home').then((m) => m.Home),
  },
  {
    path: 'home',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
  path: 'products',
  loadComponent: () =>
    import('./components/products/products').then((m) => m.ProductsComponent),
},
{
  path: 'products/:id',
  loadComponent: () =>
    import('./components/product-detail/product-detail').then(
      (m) => m.ProductDetailComponent
    ),
},
{
  path: 'about',
  loadComponent: () =>
    import('./components/about/about').then((m) => m.AboutComponent),
},
{
  path: 'contact',
  loadComponent: () =>
    import('./components/contact/contact').then((m) => m.Contact),
},
{
  path: 'services/grains',
  loadComponent: () =>
    import('./components/grains-service/grains-service').then(
      (m) => m.GrainsService
    ),
},
{
  path: 'services/export',
  loadComponent: () =>
    import('./components/export/export').then(
      (m) => m.Export
    ),
},
{
  path: 'services/import',
  loadComponent: () =>
    import('./components/import/import').then(
      (m) => m.Import
    ),
},
{
  path: 'services/it-sector',
  loadComponent: () =>
    import('./components/it-sector/it-sector').then(
      (m) => m.ItSector
    ),
},
{
  path: 'privacy',
  loadComponent: () =>
    import('./components/legal/legal').then((m) => m.PrivacyPolicyComponent),
},
{
  path: 'terms',
  loadComponent: () =>
    import('./components/legal/legal').then((m) => m.TermsComponent),
},
  {
    path: '**',
    redirectTo: 'home',
  },
];
