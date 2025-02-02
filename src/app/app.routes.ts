import { Routes } from '@angular/router';
import { AddEditUserComponent } from './components/add-edit-user/add-edit-user.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  { path: 'form', redirectTo: 'form/', pathMatch: 'full' },
  { path: 'form/:id', component: AddEditUserComponent },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
