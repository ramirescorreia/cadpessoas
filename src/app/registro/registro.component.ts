import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Usuario } from '../model/usuario.model';
import { UsuarioService } from '../servicos/usuario.service';
import { CadastroUsuarioService } from '../servicos/cadastro-usuario.service';
import { Mensagem } from '../model/mensagem.model';
import { ValidacaoFormularioService } from '../servicos/validacao-formulario.service';

@Component({
    selector: 'registro',
    templateUrl: 'registro.component.html',
    styleUrls: ['registro.component.css']
})
export class RegistroComponent implements OnInit{
    usuario: Usuario;
    formValid = true;
    mensagemDialog: Mensagem;
    validacaoFormularioService: ValidacaoFormularioService;

    constructor(
        private cadastroUsuarioService: CadastroUsuarioService,
        validacaoFormularioService: ValidacaoFormularioService,
        private usuarioService: UsuarioService,
        private location: Location
    ){
        this.validacaoFormularioService = validacaoFormularioService;
        this.usuario = new Usuario();
    }

    ngOnInit(): void {
        if(this.usuarioService.isLoggedIn()){
            this.usuarioService.logout();
        }
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
        this.cadastroUsuarioService.cadastrarUsuario(this.usuario)
        .subscribe(
            resp =>{
                if (resp) {
                    this.mensagemDialog = new Mensagem('success', 'Usuário criado com sucesso!');
                }
            }, 
            error => {
                if (error.status === 500 || error.status == 0) {
                    this.mensagemDialog = new Mensagem('danger', 'Erro ao salvar o usuário!');
                }    
            }
        );
    }

    goBack(): void {
        this.location.back();
    }
}