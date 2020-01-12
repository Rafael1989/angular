import { Injectable } from '@angular/core';
import { ToastyService } from 'ng2-toasty';

@Injectable()
export class ErrorHandlerService {

  constructor(private toastyService: ToastyService) { }

  handle(errorResponse: any) {
    let msg: string;

    // if(errorResponse.status >== 400 && errorResponse.status <== 499) {

    // }

    if(typeof errorResponse === 'string') {
      msg = errorResponse;
    } else {
      if(errorResponse.status > 399 && errorResponse.status < 500){
        msg = errorResponse.error[0].mensagemUsuario;
      }else{
        msg = 'Erro ao processar serviço remoto. Tente novamente';
      }
      
      console.log('Ocorreu um erro', errorResponse);
    }

    this.toastyService.error(msg);
  }
}
