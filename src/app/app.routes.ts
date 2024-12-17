import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./homepage/homepage.routes').then((m) => m.homepageRoutes)
    }
];
