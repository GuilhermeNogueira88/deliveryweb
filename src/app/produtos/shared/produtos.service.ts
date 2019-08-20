import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ProdutosService {
  removeImg(filePath: string, key: string): any {
    throw new Error("Method not implemented.");
  }
  produtosRef: AngularFireList<any>;
  constructor(private db: AngularFireDatabase) {
    this.produtosRef = this.db.list('produtos/');  
}

insert(produto: any) {
  return this.produtosRef.push(produto);
    }

    update(produto: any, key: string) {
      return this.produtosRef.update( key, produto);
       }

       getAll() {
        return this.produtosRef.snapshotChanges().pipe(
          map(changes => {
            return changes.map(m => ({key: m.payload.key, ...m.payload.val() }))
               })
           )
         }

         getByKey(key: string) {
          const path ='produtos/'+key;
          return this.db.object(path).snapshotChanges().pipe(
            map(change => {
              return ({ key: change.key, ...change.payload.val() });
            })
          );
        }

        remove(key: string) {
          return this.produtosRef.remove(key);
        }
  
      }




