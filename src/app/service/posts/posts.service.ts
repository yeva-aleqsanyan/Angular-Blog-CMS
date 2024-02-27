import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


export interface Post {
  title: "",
  menu_id: "",
  content: ""
}

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private afs: AngularFirestore) { }

  getPosts(): Observable<Post[]> { 
    return this.afs.collection("posts").snapshotChanges()
      .pipe(
        map(postChanges => {
          return postChanges.map(post => {
            const data = post.payload.doc.data() as Post;
            const id = post.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }

  getConditionalPosts(field: string, condition: any, value: string): Observable<Post[]> { 
    return this.afs.collection("posts", ref => ref.where(field, condition, value)).snapshotChanges()
      .pipe(
        map(postChanges => {
          return postChanges.map(post => {
            const data = post.payload.doc.data() as Post;
            const id = post.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }

  addPost(post: Post): Promise<any> { 
    return this.afs.collection("posts").add(post);
  }

  deletePost(postId: string): Promise<void> { 
    return this.afs.doc('posts/' + postId).delete();
  }

  updatePost(postId: string, post: Post): Promise<void> { 
    return this.afs.doc('posts/' + postId).update(post);
  }
}
