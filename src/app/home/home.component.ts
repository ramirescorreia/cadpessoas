import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router  } from '@angular/router';
import { Location } from '@angular/common';
import { Mensagem } from '../model/mensagem.model';
import { Pessoa } from '../model/pessoa.model';
import { PessoaService } from '../servicos/pessoa.service';
import { UsuarioService } from '../servicos/usuario.service';
import { ConfirmationService } from 'primeng/api';


@Component({
    selector: 'home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit{

    pessoas: Array<Pessoa>;
    mensagemDialog: Mensagem;
    usuarioService: UsuarioService;
    constructor(
        private location: Location,
        private pessoaService: PessoaService,
        usuarioService: UsuarioService,
        private router: Router,
        private confirmationService: ConfirmationService
        
    ){
        this.usuarioService = usuarioService;
    }

    ngOnInit(){
        this.consultarTodasPessoasCadastradas();
    }

    incluirPessoa(){
        this.router.navigate(['pessoa']);
    }

    editarPessoa(pessoa: Pessoa){
        this.router.navigate(['pessoa', pessoa.cpf]);
    }

    excluirPessoa(pessoa: Pessoa){
        this.confirmationService.confirm({
            message: 'Confirma a exclusão?',
            accept: () => {
                this.pessoaService.deletar(pessoa).subscribe(resp => {
                    this.montarMensgemUsuario(resp.status);
                    this.consultarTodasPessoasCadastradas();
                });
            }
        });
    }

    private consultarTodasPessoasCadastradas(){
        this.pessoaService.buscarTodasPessoasCadastradas()
            .subscribe(pessoasBaseDados => { 
                this.pessoas = pessoasBaseDados;
            });
    }

    private montarMensgemUsuario(status: number){
        if (status === 200) {
            this.mensagemDialog = new Mensagem('sucess', 'Pessoa salva com sucesso!');
        }
        if (status === 403) {
            this.mensagemDialog = new Mensagem('danger', 'Usuário sem permissão!');
        }
        if (status === 500) {
            this.mensagemDialog = new Mensagem('danger', 'Erro ao salvar pessoa!');
        }    
    }

    goBack(): void {
        this.location.back();
    }

}