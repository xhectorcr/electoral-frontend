import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./public/home/home.component').then((m) => m.HomePage),
  },
  
  {
    path: '**',
    redirectTo: '',
  },
];
