import { NavbarComponent } from './navbar/navbar.component';
import { NgModule,LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorHandlerService } from './error-handler.service';
import { ToastyModule} from 'ng2-toasty';
import {ConfirmDialogModule} from 'primeng/components/confirmdialog/confirmdialog';
import { ConfirmationService } from 'primeng/components/common/api';
import { CategoriaService } from '../categorias/categoria-service.service';

@NgModule({
  imports: [
    CommonModule,
    ToastyModule.forRoot(),
    ConfirmDialogModule
  ],
  declarations: [NavbarComponent],
  exports: [NavbarComponent, ToastyModule, ConfirmDialogModule],
  providers: [
    ErrorHandlerService,
    ConfirmationService,
    CategoriaService,
    {provide: LOCALE_ID,useValue: 'pt-BR'}
  ]
})
export class CoreModule { }
