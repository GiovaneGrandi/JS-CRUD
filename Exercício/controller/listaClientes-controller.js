import { clienteService } from "../service/cliente-service.js";

const criaNovaLinha = (nome, email, id) => {
    const linhaNovoCliente = document.createElement("tr"); //Criando uma linha
    const conteudo = ` 
        <td class="td" data-td>${nome}</td>
        <td>${email}</td>
        <td>
            <ul class="tabela__botoes-controle">
                <li><a href="../telas/edita_cliente.html?id=${id}" class="botao-simples botao-simples--editar">Editar</a></li>
                <li><button class="botao-simples botao-simples--excluir" type="button">Excluir</button></li>
            </ul>
        </td>` //Adicionando o trecho que deverá ser inserido no HTML com as interpolações do Javascript

    linhaNovoCliente.innerHTML = conteudo; //Adicionando a linha ao HTML aonde ela recebe o conteudo
    linhaNovoCliente.dataset.id = id; //Código que cria um data attribute inerente ao id do cliente que recebe o id do db.json

    return linhaNovoCliente;
}

const tabela = document.querySelector("[data-tabela]"); //Selecionando o elemento pai atráves da árvore do DOM utilizando o data attribute

tabela.addEventListener("click", async (evento) => { //Usando o asyn para informar que essa é uma função assíncrona
    let ehBotaoDeDeleta = evento.target.className == "botao-simples botao-simples--excluir"; //Usando o evento.target para localizar o alvo do eventListener e o className para localiza-lo pela classe CSS
    if(ehBotaoDeDeleta){
        try { //Usando o try para dizer ao código tentar rodar essa função, se ele não conseguir irá para op catch
            const linhaCliente = evento.target.closest("[data-id]"); //Usando o closest para localizar o elemento pai mais próximo da id, no caso a tr
            let id = linhaCliente.dataset.id;
            await clienteService.removeCliente(id) //Substituindo o .then pelo await que pausa a execução da função até a promise ser entregue para então continuar e retornar o valor /O await se coloca antes do termo anterior ao .then
            linhaCliente.remove();
        }
        catch(erro){
            console.log(erro);
            window.location.href = "../telas/erro.html"; //Redirecionando o usuário para a tela de erro caso a função não funcione como deveria
        }
    }
})

const render = async () => {
    try {
        const clienteServico = await clienteService.listaClientes() //Chamando a função
        clienteServico.forEach(elemento => { //Fazendo com que a ação seja executada para cada item adicionado no array
            tabela.appendChild(criaNovaLinha(elemento.nome, elemento.email, elemento.id)); //Colocando o elemento filho dentro do pai
        })
    }
    catch(erro){
        console.log(erro);
        window.location.href = "../telas/erro.html";
    }
}

render();

 //.then(data => { //Usando o "." o JS reconhece que eu estou falando do listaClientes e em seguida eu informo o que eu farei com a resposta do HTTP