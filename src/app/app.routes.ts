import { Routes } from '@angular/router';

/**
 * Route order: 
 * 1. Path with redirectTo and pathMatch: 'full',  2. Specific path and parameters ('product/:id'), 3. Specific path without parameters ('configurator'), 
 * 4. Path with pathMatch: 'prefix',  5. Empty path (''), 6. Wildcard path ('**')
 */
export const routes: Routes = [
    {
        path: 'configurator',  // Same name as routerLink value in homepage component. Set [root (example: localhost:4200)]/configurator
        loadChildren: () => import('./configurator/configurator.routes').then((m) => m.configuratorRoutes),
    },
    {
        path: '',
        loadChildren: () => import('./homepage/homepage.routes').then((m) => m.homepageRoutes)
    },
    {
        path: '**',           
        loadChildren: () => import('./homepage/homepage.routes').then((m) => m.homepageRoutes)
    },
];
