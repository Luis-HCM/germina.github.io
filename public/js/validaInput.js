
let button = document.querySelector('.registerbtn');

let inputValidator = {
    "nome": false,
    "sobrenome": false,
    "email": false,
    "senha": false,
    "senha2": false
};

function validateInput(){
    let control = 1;
    for(key in inputValidator){
        control = control * inputValidator[key];
    }
    if(control){
        button.style.backgroundColor='rgba(80, 180, 80, 0.1)';
        button.style.border = '3px solid rgba(25, 98, 30, 0.8)';
        button.style.color = 'green';
        button.style.cursor = 'pointer';
        button.style.onhover = 'background-color: blue';
        button.disabled = false;
    }
    else{
        button.style.backgroundColor='#cacaca';
        button.style.border = '3px solid #8a8a8a';
        button.style.color = 'white';
        button.style.cursor = 'auto';
        button.disabled = true;
    }
}

let format2 = /^[A-zÀ-ÿ]+\s?(\s[A-zÀ-ÿ]+)*$/
let format = /[^`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~^\d]/g;
let nomes = document.querySelectorAll('input[name=nome]');

for (let i=0;i<nomes.length;i++){
    nomes[i].addEventListener('change', (e) => {
        if(e.target.value.match(format2) && e.target.value.length>0){
            e.target.style.border = '1px solid green';
            inputValidator.nome = true;
            inputValidator.sobrenome = true;
        }
        else{
            e.target.style.border = '1px solid red';
            inputValidator.nome = false;
            inputValidator.sobrenome = false;
        }
        validateInput();
    })
};


// VALIDAÇÃO DO CAMPO DO EMAIL
emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
let email = document.querySelector('input[name=email]');
let email2 = document.getElementById('email');


email.addEventListener('change', (e) => {
    if(e.target.value.match(emailRegex) ){
        e.target.style.border = '1px solid green';
        inputValidator.email = true;
    }
    else{
        e.target.style.border = '1px solid red';
        inputValidator.email = false;
    }
    validateInput();
})


let letter = document.getElementById('letter');
let capital = document.getElementById('capital');
let number = document.getElementById('number');
let length = document.getElementById("length");

let senha = document.querySelector('input[name=psw]');


// VERIFICAR SE CAMPOS ESTÃO CORRETOS
let passwordValidation = {
    'letter': false,
    'capital': false,
    'number': false,
    'length': false
};

// VALIDACAO DOS REQUISITOS DA SENHA
let control = 1;

senha.onfocus = function(){
    document.getElementById("message").style.display = "block";
};

senha.onblur = function(){
    document.getElementById("message").style.display = "none";
    for(key in passwordValidation){
        control = control * passwordValidation[key];
    }
    if(control){
        inputValidator.senha = true;
    }
    else{
        inputValidator.senha = false;
    }
    validateInput();
}

senha.onfocus = function() {
    document.getElementById("message").style.display = "block";
}
// VALIDACAO DOS INPUTS DA SENHA
senha.onkeyup = function(e){
    // Validação de letras minúsculas
    if(senha.value.match(/[a-z]/g)){
        letter.classList.remove('invalid');
        letter.classList.add('valid');
        passwordValidation.letter = true;
    }else{
        letter.classList.remove('valid');
        letter.classList.add('invalid');
        passwordValidation.letter = false;
    }

    // Validação de letras maiúsculas
    if(senha.value.match(/[A-Z]/g)){  
        capital.classList.remove("invalid");
        capital.classList.add("valid");
        passwordValidation.capital = true;
    }else {
        capital.classList.remove("valid");
        capital.classList.add("invalid");
        passwordValidation.capital = false;
    }
    
    // Validação de número
    if(senha.value.match(/[0-9]/g)) {  
        number.classList.remove("invalid");
        number.classList.add("valid");
        passwordValidation.number = true;
    } else {
        number.classList.remove("valid");
        number.classList.add("invalid");
        passwordValidation.number = false
    }
    
    // Validate length
    if(senha.value.length >= 8) {
        length.classList.remove("invalid");
        length.classList.add("valid");
        passwordValidation.length = true;
    } else {
        length.classList.remove("valid");
        length.classList.add("invalid");
        passwordValidation.length = false
    }

   
    if((senha2.value != '') && senha.value != senha2.value){
        document.getElementById('psw-repeat').style.border = '1px solid red';
        //passwordValidation.repeat = false;
        inputValidator.senha2 = false;

    }
    else if((senha2.value != '') && senha.value == senha2.value){
        document.getElementById('psw-repeat').style.border = '1px solid green';
        //passwordValidation.repeat = false;
        inputValidator.senha2 = true;
    }
    validateInput();
}




let senha2 = document.querySelector('input[name=psw-repeat]');
senha2.addEventListener('input', (e) =>{
	console.log(e.target.value);
    if(e.target.value === senha.value){
        e.target.style.border = '1px solid green';
        inputValidator.senha2 = true;
        //passwordValidation.repeat = true;
    }
    else{
        e.target.style.border = '1px solid red';
        inputValidator.senha2 = false;
    }
    validateInput();
})



