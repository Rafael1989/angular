import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/categorias/categoria-service.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { PessoaService } from 'src/app/pessoas/pessoa-service';
import { Lancamento } from 'src/app/core/model';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LancamentoService } from '../lancamento.service';
import { ToastyService } from 'ng2-toasty';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { timingSafeEqual } from 'crypto';
import { MessageService} from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  tipos = [
    {label: 'Receita', value: 'RECEITA'},
    {label: 'Despesa', value: 'DESPESA'},
  ];

  categorias = [];
  pessoas = [];
  //lancamento = new Lancamento();
  formulario: FormGroup;
  uploadEmAndamento = false;

  constructor(private categoriaService: CategoriaService,
              private pessoaService: PessoaService,
              private lancamentoService: LancamentoService,
              // private toastyService: ToastyService,
              private messageService: MessageService,
              private errorHandler: ErrorHandlerService,
              private route: ActivatedRoute,
              private router: Router,
              private title: Title,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.configurarFormulario();

    const codigoLancamento = this.route.snapshot.params['codigo'];
    
    this.title.setTitle('Novo lançamento');

    if(codigoLancamento) {
      this.carregarLancamento(codigoLancamento);
    }

    this.carregarCategorias();
    this.carregarPessoas();
  }

  antesUploadAnexo(event) {
    event.originalEvent.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));

    this.uploadEmAndamento = true;
  }

  aoTerminarUploadAnexo(event) {
    const anexo = JSON.parse(event.originalEvent.response);

    this.formulario.patchValue({
       anexo: anexo.nome,
       urlAnexo: anexo.url
    });

    this.uploadEmAndamento = false;
  }

  erroUpload(event) {
    // this.toastyService.error('Erro ao tentar enviar anexo!');
    this.messageService.add({severity: 'error', detail: 'Erro ao tentar enviar anexo!'});

    this.uploadEmAndamento = false;
  }

  removerAnexo() {
    this.formulario.patchValue({
      anexo: null,
      urlAnexo: null
    });
  }

  get nomeAnexo() {
    const nome = this.formulario.get('anexo').value;

    if(nome) {
      return nome.substring(nome.indexOf('_')+1,nome.length);
    }

    return '';
  }

  get urlUploadAnexo() {
    return this.lancamentoService.urlUploadAnexo();
  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      codigo: [],
      tipo: ['RECEITA', Validators.required],
      dataVencimento: [null, Validators.required],
      dataPagamento: [],
      descricao: [null, [this.validarObrigatoriedade, this.validarTamanhoMinimo]],
      valor: [null,Validators.required],
      pessoa: this.formBuilder.group({
        codigo: [null, Validators.required],
        nome: []
      }),
      categoria: this.formBuilder.group({
        codigo: [null, Validators.required],
        nome: []
      }),
      observacao: [],
      anexo: [],
      urlAnexo: []
    });
  }  

  validarObrigatoriedade(input: FormControl) {
    return (input.value ? null : {obrigatoriedade: true})
  }

  validarTamanhoMinimo(valor: number) {
    return (input: FormControl) => {
      return (!input.value || input.value.length >= valor) ? null : {tamanhoMinimo: {tamanho: valor}}
    };
  }

  get editando() {
    return Boolean(this.formulario.get('codigo').value);
  }

  carregarLancamento(codigo: number) {
    this.lancamentoService.buscarPorCodigo(codigo)
      .then(lancamento => {
        // this.lancamento = lancamento;
        this.formulario.patchValue(lancamento);
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar() {
    if (this.editando) {
      this.atualizarLancamento();
    }else {
      this.adicionarLancamento();
    }
  }

  adicionarLancamento() {
    this.lancamentoService.adicionar(this.formulario.value)
    .then(lancamentoAdicionado => {
      // this.toastyService.success('Lançamento adicionado com sucesso!');
      this.messageService.add({severity: 'success', detail: 'Lançamento adicionado com sucesso!'});
      
      this.router.navigate(['/lancamentos',lancamentoAdicionado.codigo]);
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarLancamento() {
    console.log(this.formulario.value);
    this.lancamentoService.atualizar(this.formulario.value)
      .then(lancamento => {
        // this.lancamento = lancamento;
        this.formulario.patchValue(lancamento);

        // this.toastyService.success('Lançamento alterado com sucesso!');
        this.messageService.add({severity: 'success', detail: 'Lançamento alterado com sucesso!'});
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarCategorias() {
    return this.categoriaService.listarTodas()
    .then(categorias => {
      this.categorias = categorias.map(c => ({ label: c.nome, value: c.codigo}));
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  carregarPessoas() {
    return this.pessoaService.listarTodas()
    .then(pessoas => {
      this.pessoas = pessoas.map(p => ({ label: p.nome, value: p.codigo}));
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  novo(form: FormControl) {
    this.formulario.reset();
    setTimeout(function() {
      this.lancamento = new Lancamento();
    }.bind(this),1);
    
    this.router.navigate(['lancamentos/novo']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de lançamento: ${this.formulario.get('descricao').value}`);
  }

}
