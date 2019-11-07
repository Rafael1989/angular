import { Component } from '@angular/core';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent {

  pessoas = [
    { nome: 'Rafael', cidade: 'São Paulo', estado: 'São Paulo',
      status: true },
    { nome: 'Pedro', cidade: 'Rio de Janeiro', estado: 'Rio de Janeiro',
    status: false },
    { nome: 'Maria', cidade: 'Rio Grande do Sul', estado: 'Rio Grande do Sul',
    status: true },
    { nome: 'Ana', cidade: 'Minas Gerais', estado: 'Minas Gerais',
    status: false },
    { nome: 'José', cidade: 'São Paulo', estado: 'São Paulo',
    status: true }
  ];

}
