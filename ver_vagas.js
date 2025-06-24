document.addEventListener("DOMContentLoaded", function () {
    const vagasContainer = document.getElementById("vagasContainer");
    const campoPesquisa = document.getElementById("campoPesquisa");
    const filtroCategoria = document.getElementById("filtroCategoria"); // Corrigido o ID

    // Carrega todas as vagas do localStorage
    let vagasGlobais = JSON.parse(localStorage.getItem("vagas")) || [];

    // Função para criar o card da vaga
    function criarCardVaga(vaga) {
        // Usa uma imagem de placeholder se a URL da imagem estiver vazia ou quebrada
        const imageUrl = vaga.imagem && vaga.imagem.startsWith('http') ? vaga.imagem : 'imagens/placeholder.jpeg';
        const numeroEndereco = vaga.endereco.numero ? `, ${vaga.endereco.numero}` : '';

        return `
            <div class="card-vaga">
                <img src="${imageUrl}" alt="${vaga.titulo}" onerror="this.src='imagens/placeholder.jpeg'">
                <h3>${vaga.titulo}</h3>
                <p><strong>Instituição:</strong> ${vaga.instituicao}</p>
                <p><strong>Categoria:</strong> ${vaga.categoria}</p>
                <p class="descricao-resumo">${vaga.descricao.substring(0, 100)}...</p>
                <button class="btn-ver-mais" data-id="${vaga.id}">Ver Mais</button>
                <div class="detalhes-necessidade" id="detalhes-${vaga.id}" style="display: none;">
                    <p>${vaga.descricao}</p>
                    <p><strong>Contato:</strong> ${vaga.contato}</p>
                    <p><strong>Endereço:</strong> 
                        ${vaga.endereco.rua}${numeroEndereco} - ${vaga.endereco.bairro}, 
                        ${vaga.endereco.cidade} - ${vaga.endereco.estado}, CEP ${vaga.endereco.cep}
                    </p>
                </div>
            </div>
        `;
    }

    // Função para renderizar as vagas com base na lista fornecida
    function renderizarVagas(listaVagas = vagasGlobais) {
        vagasContainer.innerHTML = ''; // Limpa o container antes de renderizar

        if (listaVagas.length === 0) {
            vagasContainer.innerHTML = '<p style="text-align: center; width: 100%;">Nenhuma vaga cadastrada ou encontrada com os filtros aplicados.</p>';
            return;
        }

        listaVagas.forEach(vaga => {
            vagasContainer.innerHTML += criarCardVaga(vaga);
        });

        // Adiciona eventos aos botões "Ver Mais"
        document.querySelectorAll('.btn-ver-mais').forEach(button => {
            button.addEventListener('click', function () {
                const id = this.dataset.id;
                const detalhesDiv = document.getElementById(`detalhes-${id}`);
                
                if (detalhesDiv.style.display === "none") {
                    detalhesDiv.style.display = "block";
                    this.textContent = "Ver Menos";
                } else {
                    detalhesDiv.style.display = "none";
                    this.textContent = "Ver Mais";
                }
            });
        });
    }

    // Função para aplicar os filtros e pesquisa
    function aplicarFiltros() {
        const termoPesquisa = campoPesquisa.value.toLowerCase().trim();
        const categoriaFiltro = filtroCategoria.value;

        let vagasFiltradas = vagasGlobais.filter(vaga => {
            const tituloVaga = vaga.titulo.toLowerCase();
            const descricaoVaga = vaga.descricao.toLowerCase();
            const categoriaVaga = vaga.categoria;

            const correspondePesquisa = tituloVaga.includes(termoPesquisa) || descricaoVaga.includes(termoPesquisa);
            const correspondeCategoria = (categoriaFiltro === '' || categoriaVaga === categoriaFiltro);

            return correspondePesquisa && correspondeCategoria;
        });

        renderizarVagas(vagasFiltradas);
    }

    // Adiciona event listeners para os campos de pesquisa e filtro
    if (campoPesquisa) {
        campoPesquisa.addEventListener('input', aplicarFiltros);
    }

    if (filtroCategoria) {
        filtroCategoria.addEventListener('change', aplicarFiltros);
    }

    // Renderiza as vagas ao carregar a página pela primeira vez
    renderizarVagas();
});