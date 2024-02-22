import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { PagesListComponent } from './pages-list/pages-list.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { adminGuard } from './guards/admin.guard';
import { subscriberGuard } from './guards/subscriber.guard';

const adminPageModulePromise = () => import('./admin-page/admin-page.module').then(m => m.AdminPageModule);

const routes: Routes = [
  { path: '', component: HomePageComponent},
  { path: 'login', component: LoginPageComponent},
  { path: 'article', component: PagesListComponent, canActivate: [subscriberGuard]},
  { path: 'admin', loadChildren: adminPageModulePromise, canActivate: [adminGuard]},

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
