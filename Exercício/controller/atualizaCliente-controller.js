import { clienteService } from "../service/cliente-service.js";

(async () => {
    const pegaURL = new URL (window.location); //Criando uma URL da página de cada cliente para adicionar o id

    const id = pegaURL.searchParams.get("id"); //Pegando a id da URL como parâmetro

    const inputNome = document.querySelector("[data-nome]"); //Percorrendo o DOM para pegar os campos de nome e email do formulário
    const inputEmail = document.querySelector("[data-email]");

    try {
        const dados = await clienteService.detalhaCliente(id)
        inputNome.value = dados.nome; //Informando que o valor dos campos de input são os dados usados no detalhaCliente
        inputEmail.value = dados.email;
    }
    catch(erro){
        console.log(erro);
        window.location.href = "../telas/erro.html";
    }

    const formulario = document.querySelector("[data-form]"); //Buscando o formulário através do DOM

    formulario.addEventListener("submit", async (evento) => { //O asyn se usa antes de abrir a função /É bom usar async e await por deixar o código mais legível
        evento.preventDefault() //Evitando o comportamento padrão do evento que seria enviar os dados direto

        try {
            await clienteService.atualizaCliente(id, inputNome.value, inputEmail.value)
            window.location.href = "../telas/edicao_concluida.html"; //Enviando o usuário para a tela de conclusão após op encerramento do processo da função
        }
        catch(erro){
            console.log(erro);
            window.location.href = "../telas/erro.html";
        }
    })
})() //Criando uma função auto-executável onde encapsulamos todas as funções em uma função maior e a executamos