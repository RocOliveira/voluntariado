document.addEventListener("DOMContentLoaded",() =>{
    const listaVagas = document.getElementById("lista-vagas");
    const vaga = JSON.parse(localStorage.getItem("vagas")) || [];

    if(vaga.length ===0){
        listaVagas.innerHTML = "<p>Nenhuma vaga cadastrada no momento.</p>";
        return;
    }

    vaga.forEach((vaga, index)=>{
        const vagaCard = document.createElement("div");
        vagaCard.classList.add("card-vaga");
    
    vagaCard.innerHTML = `
      <img src="${vaga.imagem}" alt="Imagem da vaga ${vaga.titulo}" />
      <h3>${vaga.titulo}</h3>
      <p><strong>Instituição:</strong> ${vaga.instituicao}</p>
      <p><strong>Categoria:</strong> ${vaga.categoria}</p>
      <p class="descricao-resumo">${vaga.descricao.substring(0, 100)}...</p>

      <button onclick="toggleDescricao(${index})" id="btn-${index}">
        Ver Mais
      </button>

      <div class="descricao-completa" id="descricao-${index}" style="display: none;">
        <p>${vaga.descricao}</p>
        <p><strong>Contato:</strong> ${vaga.contato}</p>
        <p><strong>Endereço:</strong> 
          ${vaga.endereco.rua}, ${vaga.endereco.numero} - ${vaga.endereco.bairro}, 
          ${vaga.endereco.cidade} - ${vaga.endereco.estado}, CEP ${vaga.endereco.cep}
        </p>
      </div>
    `;

    listaVagas.appendChild(vagaCard);
  });
  });

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