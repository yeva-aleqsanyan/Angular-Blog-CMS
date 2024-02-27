import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { adminGuard } from './guards/admin.guard';

const adminPageModulePromise = () => import('./admin-page/admin-page.module').then(m => m.AdminPageModule);
const frontPageComponentPromise = () => import('./front-page/front-page.module').then(m => m.FrontPageModule);


const routes: Routes = [
  { path: 'home', loadChildren: frontPageComponentPromise},
  { path: 'login', component: LoginPageComponent},
  { path: 'admin', loadChildren: adminPageModulePromise, canActivate: [adminGuard]},
  {path: '**', redirectTo: 'home'}

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
