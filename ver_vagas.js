const vagasContainer = document.getElementById("vagasContainer");
let vagasGlobais = JSON.parse(localStorage.getItem("vagas")) || [];

// Função para criar o card da vaga
function criarCardVaga(vaga, index) {
    return `
    <div class="card-vaga">
        <img src="${vaga.imagem}" alt="${vaga.titulo}" onerror="this.src='imagens/placeholder.png'">
        <h3>${vaga.titulo}</h3>
        <p><strong>Instituição:</strong> ${vaga.instituicao}</p>
        <p><strong>Categoria:</strong> ${vaga.categoria}</p>
        <p class="descricao-resumo">${vaga.descricao.substring(0, 100)}...</p>
        <button class="btn-toggle" data-id="${index}" id="btn-${index}">Ver Mais</button>
        <div class="descricao-completa" id="descricao-${index}" style="display: none;">
            <p>${vaga.descricao}</p>
            <p><strong>Contato:</strong> ${vaga.contato}</p>
            <p><strong>Endereço:</strong> 
                ${vaga.endereco.rua}, ${vaga.endereco.numero} - ${vaga.endereco.bairro}, 
                ${vaga.endereco.cidade} - ${vaga.endereco.estado}, CEP ${vaga.endereco.cep}
            </p>
        </div>
    </div>
    `;
}

// Função para renderizar as vagas
function renderizarVagas(lista = vagasGlobais) {
    vagasContainer.innerHTML = lista.map((vaga, idx) => criarCardVaga(vaga, idx)).join("") || "<p>Nenhuma vaga cadastrada no momento.</p>";

    // Adiciona eventos aos botões de expandir/recolher descrição
    document.querySelectorAll('.btn-toggle').forEach(btn => {
        btn.addEventListener('click', function () {
            const id = Number(this.getAttribute('data-id'));
            toggleDescricao(id);
        });
    });
}

// Função para alternar a descrição
function toggleDescricao(index) {
    const descricao = document.getElementById(`descricao-${index}`);
    const botao = document.getElementById(`btn-${index}`);

    if (descricao.style.display === "none") {
        descricao.style.display = "block";
        botao.textContent = "Ver Menos";
    } else {
        descricao.style.display = "none";
        botao.textContent = "Ver Mais";
    }
}

// Renderiza as vagas ao carregar a página
document.addEventListener("DOMContentLoaded", renderizarVagas);
