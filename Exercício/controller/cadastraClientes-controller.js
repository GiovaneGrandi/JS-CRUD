import { clienteService } from "../service/cliente-service.js";

const formulario = document.querySelector("[data-form]"); //Percorrendo o DOM para conseguir mexer no formulário de cadastro 

formulario.addEventListener("submit", (evento) => { //Código que irá executar as ações presentes nele ao detectar a execução do que está sendo monitorado, no caso o "submit"
    evento.preventDefault(); //Código que irá prevenir o comportamento default do formulário que seria enviar direto os dados recebidos sem passar pela checagem criada

    const nome = evento.target.querySelector("[data-nome]").value; //Percorrendo o DOM para pegar os valores que foram inseridos nos campos do formulario e coloca-los na const
    const email = evento.target.querySelector("[data-email]").value;

    clienteService.criaCliente(nome, email) //Passando para a função que postará no http, os dados coletados do formulario
    .then(() => {
        window.location.href = "../telas/cadastro_concluido.html"; //Redirecionando o usuário para a página de conclusão de cadastro após todas etapas concluídas
    })
})