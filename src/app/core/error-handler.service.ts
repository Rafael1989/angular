import { Injectable } from '@angular/core';
import { ToastyService } from 'ng2-toasty';
import { MessageService} from 'primeng/components/common/messageservice';

@Injectable()
export class ErrorHandlerService {

  constructor(
    // private toastyService: ToastyService
    private messageService: MessageService
    ) { }

  handle(errorResponse: any) {
    let msg: string;

    if (typeof errorResponse === 'string') {
      msg = errorResponse;

    } else if (errorResponse.status >= 400 && errorResponse.status <= 499) {
      msg = 'Ocorreu um erro ao processar a sua solicitação';

      if(errorResponse.status === 403) {
        msg = 'Você não tem permissão para executar esta ação';
      }

      try {
        msg = errorResponse.error[0].mensagemUsuario;
      } catch (e) { }

      console.error('Ocorreu um erro', errorResponse);

    } else {
      msg = 'Erro ao processar serviço remoto. Tente novamente.';
      console.error('Ocorreu um erro', errorResponse);
    }

    // this.toastyService.error(msg);
    this.messageService.add({severity: 'error', detail: msg});
  }
}
