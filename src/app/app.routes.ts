import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {
        path: 'login',
        loadComponent: () => import('./core/login/login')
            .then(m => m.Login)
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./components/deshboard/deshboard')
            .then(m => m.Deshboard),
        canActivate: [authGuard]
    },
    {
        path: 'admin',
        loadComponent: () => import('./components/admin-management/admin-management')
            .then(m => m.AdminManagement),
        canActivate: [authGuard]
    },
    {
        path: 'employee',
        loadComponent: () => import('./components/employee-management/employee-management')
            .then(m => m.EmployeeManagement),
        canActivate: [authGuard]
    },
    {
        path: 'superadmin',
        loadComponent: () => import('./components/super-admin-management/super-admin-management')
            .then(m => m.SuperAdminManagement),
        canActivate: [authGuard]
    },
    {
        path: 'login',
        loadComponent: () => import('./components/super-admin-management/super-admin-management')
            .then(m => m.SuperAdminManagement),
        canActivate: [authGuard]

    },
    {
        path: '**',
        loadComponent: () => import('./components/not-found/not-found')
            .then(m => m.NotFound)
    },
];
