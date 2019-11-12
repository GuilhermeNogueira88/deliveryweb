import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
// o AngularFireList é uma diretiva uma listagem dos dados do banco firebase
  categoriasRef: AngularFireList<any>;

constructor(private db: AngularFireDatabase) {
  // a variavel categoriasRef recebe o comando e caminho para acessar o banco de dados
  this.categoriasRef = this.db.list('categorias/');
  }

  // a variavel categoria recebe qualquer tipo de dados "any" e em qualquer quantidade
  insert(categoria: any) {
return this.categoriasRef.push(categoria);
  }

  update(categoria: any, key: string) {
 return this.categoriasRef.update( key, categoria);
  }


  // este metôdo traz todos os dados do banco, neste caso traz todas as categorias
  getAll() {
return this.categoriasRef.snapshotChanges().pipe(
  map(changes => {
    return changes.map(m => ({key: m.payload.key, ...m.payload.val() }))
       })
   );
 }



 // este metôdo traz um item somente no banco, e é feito pela key
  getByKey(key: string) {
   // este path recebe categorias/ mais o o ID
    const path = 'categorias/'+key;
        return this.db.object(path).snapshotChanges().pipe(
          map(change => {
            return ({ key: change.key, ...change.payload.val() });
          })
        );
      }



      getProdutosByCategoria(key: string) {
        return this.db.list('produtos/', q => q.orderByChild('categoriaKey').equalTo(key))
        .snapshotChanges()
        .pipe(
          map(changes => {
            return changes.map(m => ({ key: m.key }))
          })
        )
      }



  remove(key: string) {
 return new Promise((resolve, reject) => {
  // faz uma "escuta" do que tem em getProdutosByCategoria pela key, e a variavel produtos recebe esta escuta
  const subscribe = this.getProdutosByCategoria(key).subscribe((produtos: any) => {
    // encontrada a variavel se faz o "unsubscribe", ou seja para de escutar
    subscribe.unsubscribe();

    // se não houver algo em produtos exclui a categoria
        if (produtos.length == 0) {
          return this.categoriasRef.remove(key);
        }
        // se tiver um produto cadastrado ele não permite excluir como em um banco de dados SQL
        else {
          reject('Não é possível excluir a categoria pois ela tem produtos associados.')
        }
      });
    });
  }


}

