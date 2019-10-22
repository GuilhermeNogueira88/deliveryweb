import { CategoriasService } from './../shared/categorias.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form-categorias',
  templateUrl: './form-categorias.component.html',
  styleUrls: ['./form-categorias.component.css']
})
export class FormCategoriasComponent implements OnInit {

// formCategoria é declarado aqui para ser chamado no html, atuando depois no metodo criarFormulario
formCategoria: FormGroup;
// esta variavel recebe o ID(KEY)
key: string;




constructor(private formBuilder: FormBuilder,
          private route: ActivatedRoute,
          private categoriasService: CategoriasService,
          private toastr: ToastrService,
          private router: Router ) { }




  ngOnInit() {
    this.criarFormulario();
    // isto coloca o ID na variavel key
    this.key = this.route.snapshot.paramMap.get('key');
    if (this.key) {
      const categoriasSubscribe = this.categoriasService.getByKey(this.key)
      // o metôdo subscribe significa "escutar" dados no banco, até que a key que voce passou, até ele encontrar.
      // encontrado ele guarda o resultado da consulta na variavel categorias
      .subscribe((categorias: any) => {

        // o metôdo unsubcribe é para parar de "escutar" depois de encontrado
        categoriasSubscribe.unsubscribe();
     // o setValue coloca os dados recebidos no input no banco,
     // os parametros indicados exe: categorias.nome... são os dados que vão aparecer no formulario HTML no processo de UPDATE
      this.formCategoria.setValue({nome: categorias.nome, descricao: categorias.descricao});
      });
    }

  }



get nome() { return this.formCategoria.get('nome'); }
get descricao() { return this.formCategoria.get('descricao'); }



// metodo serve para criar as variaveis recebidas pelo formulario
criarFormulario() {
    this.key = null;
    this.formCategoria = this.formBuilder.group({
     nome: ['', Validators.required],
     descricao: [''],
    });
  }


  // este metôdo serve para salvar os dados inseridos no formularios e submetidos, assim salvando-os
  onSubmit()
  // esta estrutura condicional verifica se há dados, se não houver ele fará insert, se houver ele fará update
  {
    if (this.formCategoria.valid) {
      if (this.key) {
     this.categoriasService.update(this.formCategoria.value, this.key);
      } else {
        this.categoriasService.insert(this.formCategoria.value);
      }
      this.router.navigate(['categorias']);
      this.toastr.success('Categoria salva com secesso!!!');
    }
  }
}
