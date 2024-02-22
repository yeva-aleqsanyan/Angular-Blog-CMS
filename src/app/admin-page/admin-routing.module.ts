import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AdminPageComponent } from "./admin-page.component";

const routes: Routes = [
  {
    path: "",
    component: AdminPageComponent,
    children: [
      {
        path: "dashboard",
        component: DashboardComponent
      },
      {
        path: "",
        pathMatch: "full",
        redirectTo: "dashboard"
      }
    ]
  }
];

export const AdminRoutingModule = RouterModule.forChild(routes);