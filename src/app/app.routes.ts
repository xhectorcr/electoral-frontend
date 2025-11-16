import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { LayoutMemberPage } from './shared/components/layout-member/layout-member.page';
import { Tab1Page } from './tabs/tab1/tab1.page';
import { TabsPage } from './tabs/tabs.page';

export const routes: Routes = [
  { path: '', redirectTo: 'tabs/tab1', pathMatch: 'full' },

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
              import('./public/home/home.component').then((m) => m.HomePage),
          },
        ],
      },
      {
        path: 'tab2',
        loadComponent: () =>
          import('./tabs/tab2/tab2.page').then((m) => m.Tab2Page),
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./public/candidates/candidates.page').then(
                (m) => m.CandidatesPage
              ),
          },
        ],
      },
      {
        path: 'tab3',
        loadComponent: () =>
          import('./tabs/tab3/tab3.page').then((m) => m.Tab3Page),
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./public/parties/parties.page').then(
                (m) => m.PartiesPage
              ),
          },
        ],
      },
      {
        path: 'tab4',
        loadComponent: () =>
          import('./tabs/tab4/tab4.page').then((m) => m.Tab4Page),
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./public/vote-info/vote-info.page').then(
                (m) => m.VoteInfoPage
              ),
          },
        ],
      },
      { path: '', redirectTo: '/tabs/tab1', pathMatch: 'full' },
    ],
  },
  {
    path: 'candidate-detail/:name',
    loadComponent: () =>
      import('./public/candidates/candidate-detail/candidate-detail.page').then(
        (m) => m.CandidateDetailPage
      ),
  },
  {
    path: 'member',
    component: LayoutMemberPage,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./member/dashboard/dashboard.page').then(
            (m) => m.DashboardPage
          ),
      },
      {
        path: 'voters',
        loadComponent: () =>
          import('./member/voters/voters.page').then((m) => m.VotersPage),
      },
      {
        path: 'incidents',
        loadComponent: () =>
          import('./member/incidents/incidents.page').then(
            (m) => m.IncidentsPage
          ),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./member/settings/settings.page').then((m) => m.SettingsPage),
      },
      {
        path: 'manual',
        loadComponent: () =>
          import('./member/manual/manual.page').then((m) => m.ManualPage),
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
  {
    path: 'manual',
    loadComponent: () =>
      import('./member/manual/manual.page').then((m) => m.ManualPage),
  },
];
