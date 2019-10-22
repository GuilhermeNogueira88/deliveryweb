import { Component, OnInit, NgModule } from '@angular/core';
import { CategoriasService } from '../shared/categorias.service';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-lista-categorias',
  templateUrl: './lista-categorias.component.html',
  styleUrls: ['./lista-categorias.component.css']
})
export class ListaCategoriasComponent implements OnInit {
// Observable é um objeto um array de valores, ele precisa ser importado
  categorias: Observable<any[]>;

  constructor(private categoriasService: CategoriasService,
  private toastr: ToastrService) {}


  ngOnInit() {
    // getAll traz tudo do banco de dados, se quiser trazer especificico tem que ser especificado os parametros entre parenteses
    this.categorias = this.categoriasService.getAll();
  }

  remover(key: string) {
  //  o metodo "remove" foi criado no categorias.service.ts
    this.categoriasService.remove(key)
    .catch((mensagem: string) => {
      this.toastr.error(mensagem);
        });
  }
}
