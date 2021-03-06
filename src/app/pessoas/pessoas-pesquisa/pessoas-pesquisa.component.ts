import { Component, OnInit, ViewChild } from '@angular/core';
import { PessoaService, PessoaFilter } from '../pessoa-service';
import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';
// import { ToastyService } from 'ng2-toasty';
import { MessageService} from 'primeng/components/common/messageservice';
import { Table } from 'primeng/components/table/table';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new PessoaFilter();
  pessoas = [];
  @ViewChild('tabelaPessoa', {static: true}) gridPessoa: Table;

  constructor(private pessoaService: PessoaService,
    private messageService: MessageService,
    // private toastyService: ToastyService,
    private confirmationService: ConfirmationService,
    private errorHandlerService: ErrorHandlerService,
    private title: Title) {}

  ngOnInit() {
    this.title.setTitle('Pesquisa de pessoas');
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.pessoaService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.pessoas = resultado.pessoas;
      })
      .catch(erro => this.errorHandlerService.handle(erro));
  
  }

  aoMudarPagina(event: LazyLoadEvent){
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(pessoa: any) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(pessoa);
      }
    });
  }

  excluir(pessoa: any) {
    this.pessoaService.excluir(pessoa.codigo)
      .then(() => {
        this.gridPessoa.reset();
        // this.toastyService.success('Pessoa excluída com sucesso!');
        this.messageService.add({severity: 'success', detail: 'Pessoa excluída com sucesso!'});
      })
      .catch(erro => this.errorHandlerService.handle(erro));
  }

  alternarStatus(pessoa: any): void {
    const novoStatus = !pessoa.ativo;

    this.pessoaService.mudarStatus(pessoa.codigo, novoStatus)
      .then(() => {
        const acao = novoStatus ? 'ativada' : 'desativada';

        pessoa.ativo = novoStatus;
        // this.toastyService.success(`Pessoa ${acao} com sucesso!`);
        this.messageService.add({severity: 'success', detail: `Pessoa ${acao} com sucesso!`});
      })
      .catch(erro => this.errorHandlerService.handle(erro));
  }

}
