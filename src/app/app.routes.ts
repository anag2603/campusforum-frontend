import { Routes } from '@angular/router';

export const routes: Routes = [
    // Se renderiza con lazy loading para optimizar la carga inicial de la aplicación
    { path: '', redirectTo: 'landing', pathMatch: 'full' },
    {
        path: 'landing',
        loadComponent: () => import('./screens/landing/landing').then(m => m.Landing)
    },
    { 
        path: 'login', 
        loadComponent: () => import('./screens/login/login').then(m => m.LoginScreen)
    },
    {
      path: 'registro', 
      loadComponent: () => import('./screens/registro/registro').then(m => m.RegistroScreen) 
    }, //Ruteo
    { 
      path: 'profile', 
      loadComponent: () => import('./screens/profile/profile').then(m => m.ProfileScreen) 
    },
    {
      path: 'dashboard',
      loadComponent: () => import('./screens/dashboard/dashboard').then(m => m.DashboardScreen)
    },
    {
      path: 'posts',
      loadComponent: () => import('./screens/posts/list/list').then(m => m.PostsList)
    },
    {
      path: 'posts/create',
      loadComponent: () => import('./screens/posts/create/create').then(m => m.PostsCreate)
    },
    {
      path: 'posts/:id',
      loadComponent: () => import('./screens/posts/detail/detail').then(m => m.PostsDetail)
    },
    {
      path: 'posts/:id/edit',
      loadComponent: () => import('./screens/posts/edit/edit').then(m => m.PostsEdit)
    },
    {
      path: 'categories',
      loadComponent: () => import('./screens/categories/list/list').then(m => m.CategoriesList)
    },
    {
      path: 'categories/form',
      loadComponent: () => import('./screens/categories/form/form').then(m => m.CategoriesForm)
    },
    {
      path: 'categories/:id/edit',
      loadComponent: () => import('./screens/categories/edit/edit').then(m => m.CategoriesEdit)
    },
    {
    path: 'reports',
      loadComponent: () => import('./screens/reports/list/list').then(m => m.ReportsList)
    },
    {
      path: 'reports/create',
      loadComponent: () => import('./screens/reports/create/create').then(m => m.ReportsCreate)
    },
    {
      path: 'reports/:id',
      loadComponent: () => import('./screens/reports/detail/detail').then(m => m.ReportsDetail)
    },
];