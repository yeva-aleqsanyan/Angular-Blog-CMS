import { RouterModule, Routes } from '@angular/router';
import { PagesListComponent } from './pages-list/pages-list.component';
import { HomePageComponent } from './home-page/home-page.component';
import { FrontPageComponent } from './front-page.component'; 

const routes: Routes = [
  {
    path: "",
    component: FrontPageComponent,
    children: [
      {
        path: "home",
        component: HomePageComponent
      },
      
      { path: 'article', 
        component: PagesListComponent
      },
      {
        path: "**",
        pathMatch: "full",
        redirectTo: "dashboard"
      }
    ]
  }
];

export const FrontRoutingModule = RouterModule.forChild(routes);