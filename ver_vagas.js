document.addEventListener("DOMContentLoaded",() =>{
    const vagasContainer = document.getElementById("vagasContainer");

//Recupera vagas do localSotrage//
    const vaga = JSON.parse(localStorage.getItem("vagas")) || [];

    if(vaga.length ===0){
        vagasContainer.innerHTML = "<p>Nenhuma vaga cadastrada no momento.</p>";
        return;
    }

    vaga.forEach((vaga =>{
        const card = document.createElement("div");
        card.className = "card-vaga";
    
    card.innerHTML = `
      <img src="${vaga.imagem}" alt=" ${vaga.titulo}" onerror="this.src='imagens/placeholder.png'">
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

    vagasContainer.appendChild(card);
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