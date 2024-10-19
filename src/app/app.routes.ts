import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then(m => m.RegisterPage)
  },
  {
    path: 'modal',
    loadComponent: () => import('./component/modal/modal.page').then(m => m.ModalPage)
  },
  {
    path: 'tabs',
    loadComponent: () => import('./component/tabs/tabs.component').then(m => m.TabsComponent),
    children: [
      {
        path: 'config',
        loadComponent: () => import('./pages/config/config.page').then(m => m.ConfigPage)
      },
      {
        path: 'album',
        loadComponent: () => import('./pages/album/album.page').then(m => m.AlbumPage)
      },
      {
        path: 'location',
        loadComponent: () => import('./pages/location/location.page').then(m => m.LocationPage)
      }

    ]
  },
  {
    path: 'reset-password',
    loadComponent: () => import('./pages/reset-password/reset-password.page').then( m => m.ResetPasswordPage)
  }
];
