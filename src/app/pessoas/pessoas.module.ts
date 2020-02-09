import { SharedModule } from './../shared/shared.module';
import { InputMaskModule } from 'primeng/components/inputmask/inputmask';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { TableModule } from 'primeng/components/table/table';
import { ButtonModule } from 'primeng/components/button/button';
import { FormsModule } from '@angular/forms';
import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';
import { PessoasCadastroComponent } from './pessoas-cadastro/pessoas-cadastro.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { PessoasRoutingModule } from './pessoas-routing.module';
import { PanelModule } from 'primeng/panel';
import { DialogModule} from 'primeng/dialog';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    InputMaskModule,
    PessoasRoutingModule,
    SharedModule,
    PanelModule,
    DialogModule
  ],
  declarations: [
    PessoasCadastroComponent,
    PessoasPesquisaComponent
  ],
  exports: []
})
export class PessoasModule { }
