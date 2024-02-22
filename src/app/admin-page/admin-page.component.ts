import { Component } from '@angular/core';

export interface Section {
  name: string;
  link: string;
}

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent {
  links: Section[] = [
    {
      name: 'Menus',
      link: 'menus',
    },
    {
      name: 'Posts',
      link: 'posts',
    },
  ];
}