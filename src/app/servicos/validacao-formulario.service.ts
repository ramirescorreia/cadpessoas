import { Injectable } from "@angular/core";

@Injectable()
export class ValidacaoFormularioService{

    getFormGroupClass(isValid: boolean, isPristine: boolean) : {} {
        return {
            'form-group': true,
            'is-invalid': !isValid && !isPristine,
            'is-valid' : isValid && !isPristine
        };
    }

    getFormControlClass(isValid: boolean, isPristine: boolean) : {} {
        return {
            'form-control' : true,
            'is-invalid' : !isValid && !isPristine,
            'is-valid' : isValid && !isPristine
        };
    }
}