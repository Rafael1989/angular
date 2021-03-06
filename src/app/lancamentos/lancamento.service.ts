import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import * as moment from 'moment';
import { Lancamento } from '../core/model';
import { environment } from 'src/environments/environment';

export class LancamentoFilter {
  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
  pagina = 0;
  itensPorPagina = 3;
}


@Injectable()
export class LancamentoService {

  lancamentosUrl: string;

  constructor(private http: HttpClient) {
    this.lancamentosUrl = `${environment.apiUrl}/lancamentos`;
  }

  urlUploadAnexo(): string {
    return `${this.lancamentosUrl}/anexo`;
  }

  pesquisar(filtro: LancamentoFilter): Promise<any> {
    // const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    let params = new HttpParams();

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if (filtro.descricao) {
      params = params.set('descricao', filtro.descricao);
    }

    if (filtro.dataVencimentoInicio) {
      params = params.set('dataVencimentoDe', moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD'));
    }

    if (filtro.dataVencimentoFim) {
      params = params.set('dataVencimentoAte', moment(filtro.dataVencimentoFim).format('YYYY-MM-DD'));
    }
    return this.http.get(`${this.lancamentosUrl}?resumo`, {params})
      .toPromise()
      .then(response => {
        const lancamentos = response['content'];
        const resultado = {
          lancamentos,
          total: response['totalElements']
        }
        return resultado;
      });
  }

  excluir(codigo: number): Promise<void> {
    // const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    return this.http.delete(`${this.lancamentosUrl}/${codigo}`).toPromise()
    .then(() => null);
  }

  adicionar(lancamento: Lancamento): Promise<Lancamento> {
    // let headers = new HttpHeaders();
    // headers = headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    // headers = headers.append('Content-Type', 'application/json');

    return this.http.post<Lancamento>(this.lancamentosUrl,lancamento).toPromise();
  }

  atualizar(lancamento: Lancamento): Promise<Lancamento> {
    // let headers = new HttpHeaders();
    // headers = headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    // headers = headers.append('Content-Type', 'application/json');

    return this.http.put<Lancamento>(`${this.lancamentosUrl}/${lancamento.codigo}`,lancamento)
      .toPromise()
      .then(response => {
        console.log(response);
        const lancamentoAlterado = response;

        this.converterStringsParaDatas([lancamentoAlterado]);
        
        return lancamentoAlterado;
      });
  }  

  buscarPorCodigo(codigo: number): Promise<Lancamento> {
    // let headers = new HttpHeaders();
    // headers = headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    // headers = headers.append('Content-Type', 'application/json');

    return this.http.get<Lancamento>(`${this.lancamentosUrl}/${codigo}`)
      .toPromise()
      .then(response => {
          const lancamento = response;
          
          this.converterStringsParaDatas([lancamento]);

          return lancamento;
      });
  }

  private converterStringsParaDatas(lancamentos: Lancamento[]) {
    for(const lancamento of lancamentos) {
      lancamento.dataVencimento = moment(lancamento.dataVencimento,'YYYY-MM-DD').toDate();

      if(lancamento.dataPagamento) {
        lancamento.dataPagamento = moment(lancamento.dataPagamento, 'YYYY-MM-DD').toDate();
      }
    }
  }
}