import { LancamentoService, LancamentoFilter } from './../lancamento.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  filtro = new LancamentoFilter();
  lancamentos = [];

  constructor(private lancamentoService: LancamentoService) {}

  ngOnInit() {
    this.pesquisar();
  }

  pesquisar() {
    console.log('teste');
    this.lancamentoService.pesquisar(this.filtro)
      .then(lancamentos => this.lancamentos = lancamentos);
  }
}
