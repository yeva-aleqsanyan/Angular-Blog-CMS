import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Menu, MenusService } from '../../service/menus/menus.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort'
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';
import { EditMenuComponent } from './edit-menu/edit-menu.component';


@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrl: './menus.component.css'
})
export class MenusComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  menuDetails: Menu = {
    title: "",
    url: ""
  }
  dataSource = new MatTableDataSource();
  displayedColumns = ["id", "title", "url", "actions"]; 

  constructor(private menus: MenusService, public dialog: MatDialog) { }

  ngOnInit() {
    this.menus.getMenus().subscribe( (data: any) => {
      this.dataSource.data = data;
    })
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  addMenu(){
    this.menus.addMenu(this.menuDetails);
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleUpperCase();
    this.dataSource.filter = filterValue;
  }
  editMenu(menuId, menu: Menu){
    this.menus.updateMenu(menuId, menu);
  }
  deleteMenu(menuId){
    this.menus.deleteMenu(menuId);
  }
  openDialog(menuId): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === 'true'){
        console.log('The dialog was closed'+menuId);
        this.deleteMenu(menuId)
      }
    });
  }
  openEditDialog(menuId: string, title: string, url: string): void {
    const dialogRef = this.dialog.open(EditMenuComponent, {
      data: {title, url},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        console.log('The Edit dialog was closed');
        this.editMenu(menuId, result);
      }
    });
  }
}
