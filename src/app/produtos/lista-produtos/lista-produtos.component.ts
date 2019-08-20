import { Component, OnInit } from '@angular/core';
import { ProdutosService } from '../shared/produtos.service';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lista-produtos',
  templateUrl: './lista-produtos.component.html',
  styleUrls: ['./lista-produtos.component.css']
})

export class ListaProdutosComponent implements OnInit {
  produtos: Observable<any[]>;

  constructor(private produtosService: ProdutosService,
    private toastr: ToastrService) {}
    
    ngOnInit() {
      this.produtos = this.produtosService.getAll();
    }
    remover(key: string) {
      this.produtosService.remove(key)
      .then( (mensagem: string) => {
        this.toastr.success('Categoria excluida com sucesso!!!');
      })
      .catch((mensagem: string) => {
        this.toastr.error(mensagem);
          });
        }
 
}
