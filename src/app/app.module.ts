import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { VerificaLogin } from './servicos/verifica-login.service';
import { PessoaService } from './servicos/pessoa.service';
import { LoginModule } from './login/login.module';
import { RegistroModule } from './registro/registro.module';
import { FormsModule } from '@angular/forms';
import { HomeModule } from './home/home.module';
import { PessoaModule } from './pessoa/pessoa.module';
import { ValidacaoFormularioService } from './servicos/validacao-formulario.service';
import { CadastroUsuarioService } from './servicos/cadastro-usuario.service';
import { UsuarioService } from './servicos/usuario.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    LoginModule,
    RegistroModule,
    HomeModule,
    PessoaModule
  ],

  providers: [
    VerificaLogin,
    UsuarioService,
    CadastroUsuarioService,
    PessoaService,
    ValidacaoFormularioService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
