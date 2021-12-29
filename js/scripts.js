class Validator {
    constructor() {
        this.validations = [
            'data-min-length',
            'data-max-length',
            'data-required'
        ]
    }

    /**Iniciar a validação de todos os campos */
    validate(form){

        //resgatando todas as validações
        let currentValidations = document.querySelectorAll('form .error-validation')

        if (currentValidations.length > 0) {
            this.cleanValidations(currentValidations)
        }

        //pegando os inputs
        let inputs = form.getElementsByTagName('input')

        //transformando HTMLCollection em array
        let inputsArray = [...inputs]

        //loop nos inputs e validando conforme qo que for encontrado
        inputsArray.forEach( input => {

            //loop em todas as validações existentes
            for (let i = 0; i < this.validations.length; i++) {
                //verificando se a validação atual existe no input
                if (input.getAttribute(this.validations[i]) != null) {
                    //limpando string para virar um metodo
                    let method = this.validations[i].replace('data-', '').replace('-', '')

                    //valor do input
                    let value = input.getAttribute(this.validations[i])

                    //invocando o metodo
                    this[method](input, value)

                }
            }
        }, this)
    }

    //verifica se um input possui um número mínimo de caracteres
    minlength(input, minValue){
        let inputLength = input.value.length
        let errorMessage = `O campo precisa ter pelo menos ${minValue} caracteres`

        if (inputLength < minValue) {
            this.printMesssage(input, errorMessage)
        }
    }

    //verifica se um input possui um número maximo de caracteres
    maxlength(input, maxValue){
        let inputLength = input.value.length
        let errorMessage = `O campo não pode ter menos que ${maxValue} caracteres`

        if (inputLength > maxValue) {
            this.printMesssage(input, errorMessage)
        }
    }

    //imnprimindo a mensagem na tela
    printMesssage(input, msg){
        let template = document.querySelector('.error-validation').cloneNode(true)

        template.textContent = msg

        let inputParent = input.parentNode

        template.classList.remove('template')

        inputParent.appendChild(template)
    }

    //verifica se o input é requerido
    required(input){
        let inputValue = input.value

        if (inputValue === "") {
            let errorMessage = `Este capo é obrigatório`
        }
    }

    //limpando as validações da tela
    cleanValidations(validations){
        validations.forEach( e => e.remove())
    }
}


let form = document.querySelector('#register-form')
let submit = document.querySelector('#btn-submit')

let validator = new Validator()

/**
 * Disparando validações
 */
submit.addEventListener('click', e => {
    e.preventDefault()

    validator.validate(form)

})