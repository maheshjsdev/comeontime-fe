import { Routes } from '@angular/router';

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
            .then(m => m.Deshboard)
    },
    {
        path: 'admin',
        loadComponent: () => import('./components/admin-management/admin-management')
            .then(m => m.AdminManagement)
    },
    {
        path: 'employee',
        loadComponent: () => import('./components/employee-management/employee-management')
            .then(m => m.EmployeeManagement)
    },
    {
        path: 'superadmin',
        loadComponent: () => import('./components/super-admin-management/super-admin-management')
            .then(m => m.SuperAdminManagement)
    },
    {
        path: 'login',
        loadComponent: () => import('./components/super-admin-management/super-admin-management')
            .then(m => m.SuperAdminManagement)
    },
    {
        path: '**',
        loadComponent: () => import('./components/not-found/not-found')
            .then(m => m.NotFound)
    },
];
