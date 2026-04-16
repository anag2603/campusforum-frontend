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

    // IMPLEMENTAR DESPUÉS
    // { path: 'categories', component: CategoriesList },
    // { path: 'categories/form', component: CategoriesForm },
    // { path: 'posts', component: PostsList },
    // { path: 'posts/:id', component: PostsDetail },
    // { path: 'posts/form', component: PostsForm },
    // { path: 'dashboard', component: DashboardScreen },
    // { path: 'reports', component: ReportListScreen }
];