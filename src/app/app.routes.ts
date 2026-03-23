import { Routes } from '@angular/router';

import { Landing } from './screens/landing/landing';
import { Registro } from './screens/auth/registro/registro';
import { Login } from './screens/auth/login/login';
import { Profile } from './screens/profile/profile';

// IMPLEMENTAR DESPUÉS
// import { CategoriesList } from './screens/categories/list/list';
// import { CategoriesForm } from './screens/categories/form/form';
// import { PostsList} from './screens/posts/list/list';
// import { PostsDetail } from './screens/posts/detail/detail';
// import { PostsForm } from './screens/posts/form/form';
// import { DashboardScreen } from './screens/dashboard/dashboard';
// import { ReportListScreen } from './screens/reports/list/list';

export const routes: Routes = [
    { path: '', component: Landing, pathMatch: 'full' },
    { path: 'registro', component: Registro, pathMatch: 'full' },
    { path: 'auth/login', component: Login, pathMatch: 'full' },
    { path: 'auth/registro', component: Registro, pathMatch: 'full' },
    { path: 'profile', component: Profile, pathMatch: 'full' },

    // IMPLEMENTAR DESPUÉS
    // { path: 'categories', component: CategoriesList },
    // { path: 'categories/form', component: CategoriesForm },
    // { path: 'posts', component: PostsList },
    // { path: 'posts/:id', component: PostsDetail },
    // { path: 'posts/form', component: PostsForm },
    // { path: 'dashboard', component: DashboardScreen },
    // { path: 'reports', component: ReportListScreen }
];
