import { Component} from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';
import { Usuario } from '../model/usuario.model';
import { UsuarioService } from '../servicos/usuario.service';

import { ValidacaoFormularioService } from '../servicos/validacao-formulario.service';
import { Mensagem } from '../model/mensagem.model';

@Component({
    selector: 'login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})
export class LoginComponent {
    usuario: Usuario;
    formValid = true;
    mensagemDialog: Mensagem;
    validacaoFormularioService: ValidacaoFormularioService

    constructor(
        private usuarioService: UsuarioService,
        private route: ActivatedRoute,
        private location: Location,
        validacaoFormularioService: ValidacaoFormularioService
    ){
        this.validacaoFormularioService = validacaoFormularioService;
        this.usuario = new Usuario();
    }

    private validaFormulario(formulario){
        if(formulario.invalid){
            return this.formValid = false;
        }
        return this.formValid = true;
    }

    onSubmit(formulario): void{
        if(!this.validaFormulario(formulario)){
            return;
        }
        this.usuarioService.autenticar(this.usuario).subscribe(res => {
            var token = res.headers.get('Authorization');
            if (token) {
                this.usuarioService.goHome(token);
            }
         }, error => {
            if (error.status === 403) {
                this.mensagemDialog = new Mensagem('danger', 'Usuário não encontrado!');
            }
            if (error.status === 500 || error.status == 0) {
                this.mensagemDialog = new Mensagem('danger', 'Erro ao logar!');
            }    
         })
    }

    goBack(): void {
        this.location.back();
    }
}