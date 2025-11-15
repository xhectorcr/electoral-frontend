import { Routes } from '@angular/router';
import { TabsPage } from './tabs/tabs.page';
import { Tab1Page } from './tabs/tab1/tab1.page';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./auth/register/register.page').then((m) => m.RegisterPage),
  },
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        component: Tab1Page,
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./public/home/home.page').then((m) => m.HomePage),
          },
        ],
      },
      {
        path: 'tab2',
        loadComponent: () =>
          import('./tabs/tab2/tab2.page').then((m) => m.Tab2Page),
      },
      {
        path: 'tab3',
        loadComponent: () =>
          import('./tabs/tab3/tab3.page').then((m) => m.Tab3Page),
      },
      { path: '', redirectTo: '/tabs/tab1', pathMatch: 'full' },
    ],
  },
];
