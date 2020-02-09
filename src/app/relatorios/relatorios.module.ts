import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from './../shared/shared.module';

import { RelatoriosRoutingModule } from './relatorios-routing.module';
import { RelatorioLancamentosComponent } from './relatorio-lancamentos/relatorio-lancamentos.component';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/components/calendar/calendar';


@NgModule({
  declarations: [RelatorioLancamentosComponent],
  imports: [
    CommonModule,
    FormsModule,
    CalendarModule,

    SharedModule,
    RelatoriosRoutingModule
  ]
})
export class RelatoriosModule { }
