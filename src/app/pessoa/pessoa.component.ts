import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params  } from '@angular/router';
import { Location } from '@angular/common';
import * as moment from 'moment'
import { Mensagem } from '../model/mensagem.model';
import { Pessoa } from '../model/pessoa.model';
import { ValidacaoFormularioService } from '../servicos/validacao-formulario.service';
import { PessoaService } from '../servicos/pessoa.service';


@Component({
    selector: 'pessoa',
    templateUrl: 'pessoa.component.html',
    styleUrls: ['pessoa.component.css']
})
export class PessoaComponent implements OnInit{

    pessoa: Pessoa;
    min =  new Date(1900, 0, 1);
    max = new Date();
    cpfInvalido: boolean = false;
    emailInvalido: boolean = false;
    formValid = true;
    dataNascimentoInvalida: boolean = false;
    validacaoFormularioService: ValidacaoFormularioService;
    mensagemDialog: Mensagem;

    constructor(
        private route: ActivatedRoute,
        private location: Location,
        private pessoaService: PessoaService,
        validacaoFormularioService: ValidacaoFormularioService
    ){
        this.pessoa = new Pessoa();
        this.validacaoFormularioService = validacaoFormularioService;
    }

    ngOnInit(): void {

        this.route.params.subscribe((params: Params) => {
            const cpf = params['cpf'];
            if(cpf){
                this.pessoaService.buscarPessoaPeloCpf(cpf).subscribe(pessoaEdicao => {
                    pessoaEdicao.dataNascimento = moment(pessoaEdicao.dataNascimento).format("YYYY-MM-DD")
                    this.pessoa = pessoaEdicao;

                });
            }
        });
    }

    onChangeSexo(indice){
        let indiceNumber: number = Number(indice).valueOf();
        if(indiceNumber == 0){
            this.pessoa.sexo = null;
        } else if(indiceNumber == 1){
            this.pessoa.sexo = "M";
        } else {
            this.pessoa.sexo = "F";
        }
    }
    
    private validaCPFEmailFormPessoa(): boolean{
        return !this.cpfInvalido && !this.emailInvalido;
    }
    
    private validaFormulario(formulario){
        if(!this.validaCPFEmailFormPessoa()){
            return this.formValid = false;
        }
        if(formulario.invalid){
            return this.formValid = false;
        }
        return this.formValid = true;
    }

    validaCPFComDigitoVerificador(cpf: string){
        if(cpf){
            let pattern = new RegExp("^([0-9]){3}([0-9]){3}([0-9]){3}([0-9]){2}$");
            if(!(cpf.search(pattern) === 0) ){
                this.cpfInvalido = true;
                return;
            }
            if(!this.validaConteudoCPF(cpf)){
                this.cpfInvalido = true;
                return;
            }
            this.cpfInvalido = false;
        }
    }

    private validaConteudoCPF(cpf){
        cpf = cpf.replace(/\.|\-/g, '');
        let soma = 0;
        let resto;
        if(cpf === '00000000000') {
            return false;
        }
        for(let i: number = 1 ; i <= 9; i++){
            soma = soma + parseInt(cpf.substring(i-1, i)) * (11 - i);
        }
        resto = (soma * 10) % 11;
    
        if((resto === 10) || (resto === 11)){
            resto = 0;
        }
        if(resto != parseInt(cpf.substring(9, 10))) {
            return false;
        }
        soma = 0;
        for(let i: number = 1; i <= 10; i++) {
            soma = soma + parseInt(cpf.substring(i-1, i))*(12-i);
        }
        resto = (soma * 10) % 11;
    
        if((resto === 10) || (resto === 11)) {
            resto = 0;
        }
        if(resto != parseInt(cpf.substring(10, 11))){
            return false;
        } 
        return true;
    }


    validaDataRegex(dataText: string){
        if(dataText){
            let pattern = new RegExp("([0-9]{4}[-](0[1-9]|1[0-2])[-]([0-2]{1}[0-9]{1}|3[0-1]{1})|([0-2]{1}[0-9]{1}|3[0-1]{1})[-](0[1-9]|1[0-2])[-][0-9]{4})");
            if(!pattern.test(dataText)){
               this.dataNascimentoInvalida = true;
               return;
            }
            this.dataNascimentoInvalida = false;
        }
    }

    validaEmailRegex(email: string){
        if(email){
            let pattern = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$");
            if(!(email.search(pattern) === 0) ){
               this.emailInvalido = true;
               return;
            }
            this.emailInvalido = false;
        }   
    }
    
    onSubmit(formulario){
        if(!this.validaFormulario(formulario)){
            return;
        }
        this.pessoa.cpf = this.pessoa.cpf.replace(/\D+/g, '');
        this.pessoaService.salvar(this.pessoa).subscribe(resp=> {
            this.montarMensgemUsuario(resp.status);        
        }, error => {
            this.montarMensgemUsuario(error.status);     
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