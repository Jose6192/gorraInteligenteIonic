import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'config',
    loadComponent: () => import('./config/config.page').then( m => m.ConfigPage)
  },
  {
    path: 'album',
    loadComponent: () => import('./album/album.page').then( m => m.AlbumPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'location',
    loadComponent: () => import('./location/location.page').then( m => m.LocationPage)
  },
];
