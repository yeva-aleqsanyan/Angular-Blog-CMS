import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


export interface Menu {
  title: ""; 
  url: ""; 
}

@Injectable({
  providedIn: 'root'
})
export class MenusService {

  constructor(private afs: AngularFirestore) { }

  getMenus(): Observable<Menu[]> { 
    return this.afs.collection("menus").snapshotChanges()
      .pipe(
        map(menuChanges => {
          return menuChanges.map(menu => {
            const data = menu.payload.doc.data() as Menu;
            const id = menu.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }

  addMenu(menu: Menu): Promise<any> { 
    return this.afs.collection("menus").add(menu);
  }

  deleteMenu(menuId: string): Promise<void> { 
    return this.afs.doc('menus/' + menuId).delete();
  }

  updateMenu(menuId: string, menu: Menu): Promise<void> { 
    return this.afs.doc('menus/' + menuId).update(menu);
  }
}
