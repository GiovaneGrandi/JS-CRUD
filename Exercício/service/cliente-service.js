const listaClientes = () => {
    return fetch(`http://localhost:3000/profile`) //O fetch automaticamente faz um GET e retorna uma promise, não precisa instanciar mais nada, por isso só retornar a fetch /Caso eu coloque um ; ao final antes de chamar o .then ocorre um erro 
    .then(resposta => {
        if(resposta.ok){
            return resposta.json(); //Retornando a resposta como um objeto JS utilizando o .json
        }
        throw new Error("Não foi possível listar os clientes"); //Criando um novo erro no código para exibir uma mensagem quando não for possível entrar em contato com o server
    })
}

const criaCliente = (nome, email) => {
    return fetch(`http://localhost:3000/profile`, {
        method: "POST", //Usando o method para informar que ação queremos fazer / O post serve para postar algo no servidor http
        headers: {
            "content-type" : "application/json" //Informando que tipo de contéudo nós estamos enviando
        },
        body: JSON.stringify({ //Informando os dados que enviaremos /Usando o stringify para transformar o objeto JSON em string para o http entender
            nome: nome,
            email: email
        })
    })
    .then(resposta => {
        if(resposta.ok){
            return resposta.body;
        }
        throw new Error("Não foi possível criar um cliente");
    }) 
}

const removeCliente = (id) => {
    return fetch(`http://localhost:3000/profile/${id}`, { //Passando o id no link de busca para quando o delete for requisitado ele buscar pelo id informado e não por todos os clientes do arquivo
        method: "DELETE" //Utilizando o método delete para poder deletar clientes do formulário 
    }).then(resposta => {
        if(!resposta.ok){
            throw new Error("Não foi possível remover o cliente");
        }
    })
}

const detalhaCliente = (id) => {
    return fetch(`http://localhost:3000/profile/${id}`) //Usando o fetch para pegar as ids de cada cliente para poder editar
    .then(resposta => {
        if(resposta.ok){
            return resposta.json();
        }
        throw new Error("Não foi possível detalhar o cliente");
    })
}

const atualizaCliente = (id, nome, email) => { //Função que irá pegar a edição feita no cliente e enviará ao servidor http
    return fetch(`http://localhost:3000/profile/${id}`, {
        method: "PUT", //Usando o método PUT que irá reescrever os dados do cliente
        headers: {
            "content-type" : "application/json" //Passando que o contéudo dos dados será um arquivo json
        },
        body: JSON.stringify({ //Passando os dados em formato json convertendo para string
            nome: nome, //Informando que o nome usado é o mesmo nome usado para preencher o campo nome do formulário
            email: email //Informando que o email usado é o mesmo email usado para preencher o campo email do formulário
        })
    })
    .then(resposta => {
        if(resposta.ok){
            return resposta.json(); //Retornando a resposta da requisição como um arquivo json
        }
        throw new Error("Não foi possível atualizar o cliente"); //Personalizei todos os erros nas chamadas de servidor para saber localizar melhor onde está o problema
    })
}

export const clienteService = { //Criando uma constante onde ficarão todas as funções que precisarão ser exportadas para maior facilidade no código
    listaClientes,
    criaCliente,
    removeCliente,
    detalhaCliente,
    atualizaCliente
}

//Anotações de código usadas na versão anterior da listaClientes:

//const promise = new Promise((resolve, reject) => {
//const http = new XMLHttpRequest(); //Inicializando o objeto para a comunicação com o servidor http

//http.open("GET", "http://localhost:3000/profile"); //Enviando um comando para o servidor http e em seguida informando o endereço do mesmo /Usei o npm install para instalar o servidor armazenado no package.json e também o npx json-server --watch (arquivo desejado) para habilitar o servidor do arquivo db.json para poder mockar os dados
//Mockar dados significa que o json-server vai simular uma API para poder fazer testes de requisição sem ter que criar uma API exclusivamente para isso
    
//http.onload = () => { //O comando "onload" serve para "ao carregar a tela faça isso:"
    //if(http.status >= 400){ //Se o valor for acima de 400, que indica alguns erros
            //reject(JSON.parse(http.response)); //Recuse a resposta do HTTP
    //}else{
            //resolve(JSON.parse(http.response)); //Se não, aceite ela
    //}
//}

//http.send(); //O comando para enviar a requisição para o servidor

//O acronímo CRUD significa: Create, Read, Update, Delete