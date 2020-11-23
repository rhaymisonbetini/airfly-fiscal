import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { LoadingProvider } from '../providers/loading';
import { ToastProvider } from '../providers/toast';
import { AlertProvider } from '../providers/alert';
import { MesagemErroValidacaoModule } from '../message-erro-validacao/message-erro-validacao/message-erro-validacao.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    ReactiveFormsModule,
    MesagemErroValidacaoModule,
  ],
  declarations: [LoginPage],
  providers:[
    LoadingProvider,
    ToastProvider,
    AlertProvider
  ]
})
export class LoginPageModule {}
