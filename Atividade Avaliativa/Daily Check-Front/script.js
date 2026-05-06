
const API = "http://localhost:3000/tarefas";

const key = "fcfc8a25f4b9ba5c5cb37384dfc008ab";


async function buscarCidade(cidade){
    try {
        const resposta = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${key}&lang=pt_br&units=metric`
        );

        const dados = await resposta.json();

        if(!resposta.ok){
            alert("Cidade não encontrada!");
            return;
        }

        document.querySelector(".cidade").innerHTML = "Tempo em " + dados.name;
        document.querySelector(".temp").innerHTML = Math.floor(dados.main.temp) + "°C";
        document.querySelector(".texto-previsao").innerHTML = dados.weather[0].description;
        document.querySelector(".umidade").innerHTML = "Umidade: " + dados.main.humidity + "%";

        document.querySelector(".img-previsao").src =
            "https://openweathermap.org/img/wn/" + dados.weather[0].icon + ".png";

    } catch (erro) {
        console.log(erro);
        alert("Erro ao buscar clima!");
    }
}

function cliquenoBotao(){
    const cidade = document.querySelector(".input-cidade").value;
    buscarCidade(cidade);
}



// formatar data
function formatarData(data){
    const d = new Date(data);
    const dia = String(d.getDate()).padStart(2, '0');
    const mes = String(d.getMonth() + 1).padStart(2, '0');
    const ano = d.getFullYear();
    return `${dia}/${mes}/${ano}`;
}


async function salvarTarefa(){
    const dados = {
        nome: document.getElementById("nome").value,
        dataInicio: document.getElementById("inicio").value,
        dataFim: document.getElementById("fim").value,
        descricao: document.getElementById("descricao").value,
        imagem: "https://picsum.photos/300/200"
    };

    await fetch(API + "/cadastrar", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(dados)
    });

    fecharModal();
    listarTarefas();
}


async function excluirTarefa(id){
    await fetch(API + `/excluir/${id}`, {
        method: "DELETE"
    });

    listarTarefas();
}


async function listarTarefas(){
    const res = await fetch(API + "/listar");
    const tarefas = await res.json();

    const container = document.querySelector(".cards");
    if(!container) return;

    container.innerHTML = "";

    tarefas.forEach(t => {
        container.innerHTML += `
        <div class="card">
            <img src="${t.imagem}">
            <h3>${t.nome}</h3>
            <p>${t.descricao}</p>
            <span>
                ${formatarData(t.dataInicio)} até 
                ${formatarData(t.dataFim)}
            </span>

            <button class="btn-excluir" onclick="excluirTarefa(${t.id})">
                🗑️
            </button>
        </div>
        `;
    });
}

function abrirModal(){
    document.getElementById("modal").style.display = "flex";
}

function fecharModal(){
    document.getElementById("modal").style.display = "none";
}

window.onload = () => {
    listarTarefas();
};