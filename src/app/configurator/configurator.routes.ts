import { Routes } from '@angular/router';

export const configuratorRoutes: Routes = [
  { 
    path: '', 
    title: 'Configurator',
    loadComponent: () => import('./components/configurator/configurator.component').then((c) => c.ConfiguratorComponent) 
  },
];