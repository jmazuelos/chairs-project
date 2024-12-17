import { Routes } from '@angular/router';

export const homepageRoutes: Routes = [
  { 
    path: '', 
    title: 'Homepage',
    loadComponent: () => import('./components/homepage/homepage.component').then((c) => c.HomepageComponent) 
  },
];