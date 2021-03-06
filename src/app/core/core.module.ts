import { NavbarComponent } from './navbar/navbar.component';
import { NgModule,LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorHandlerService } from './error-handler.service';
// import { ToastyModule} from 'ng2-toasty';
import {GrowlModule} from 'primeng/growl';
import {ConfirmDialogModule} from 'primeng/components/confirmdialog/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/components/common/api';
import { CategoriaService } from '../categorias/categoria-service.service';
import { RouterModule } from '@angular/router';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { Title } from '@angular/platform-browser';
import { LancamentoService } from '../lancamentos/lancamento.service';
import { PessoaService } from '../pessoas/pessoa-service';
import { AuthService } from '../seguranca/auth.service';
import { NaoAutorizadoComponent } from './nao-autorizado.component';
import { DashboardService } from '../dashboard/dashboard.service';
import { RelatoriosService } from '../relatorios/relatorios.service';

@NgModule({
  imports: [
    CommonModule,
    // ToastyModule.forRoot(),
    GrowlModule,
    ConfirmDialogModule,
    RouterModule
  ],
  declarations: [NavbarComponent, PaginaNaoEncontradaComponent,NaoAutorizadoComponent],
  exports: [
    NavbarComponent, 
    // ToastyModule,
    GrowlModule, 
    ConfirmDialogModule],
  providers: [
    LancamentoService,
    PessoaService,
    ErrorHandlerService,
    ConfirmationService,
    MessageService,
    AuthService,

    CategoriaService,
    DashboardService,
    RelatoriosService,
    {provide: LOCALE_ID,useValue: 'pt-BR'},
    Title
  ]
})
export class CoreModule { }
