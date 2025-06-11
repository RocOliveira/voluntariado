function verMais() {
  alert("Aqui você verá a descrição completa da vaga (em breve)!");
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-vaga");
  const cepInput = document.getElementById("cep");
  const contatoInput = document.getElementById("contato");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const vaga = {
        instituicao: form.instituicao.value,
        titulo: form.titulo.value,
        descricao: form.descricao.value,
        categoria: form.categoria.value,
        imagem: form.imagem.value,
        contato: form.contato.value,
        endereco: {
             cep: form.cep.value,
             rua: form.rua.value,
             numero: form.numero.value,
             bairro: form.bairro.value,
             cidade: form.cidade.value,
             estado: form.estado.value
        }
      };

      // Recupera vagas existentes ou inicia array
      const vagas = JSON.parse(localStorage.getItem("vagas")) || [];

      vagas.push(vaga);

      localStorage.setItem("vagas", JSON.stringify(vagas));

      alert("Vaga cadastrada com sucesso!");
      form.reset();
    });
  }

// Máscara e busca de CEP //
  if (cepInput) {
    cepInput.addEventListener("input", () => {
      cepInput.value = cepInput.value.replace(/\D/g, "").replace(/^(\d{5})(\d)/, "$1-$2");
    });

    cepInput.addEventListener("blur", () => {
      const cep = cepInput.value.replace("-", "");

      if (cep.length === 8) {
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
          .then(response => response.json())
          .then(data => {
            if (data.erro) {
              alert("CEP não encontrado.");
              return;
            }

            document.getElementById("rua").value = data.logradouro;
            document.getElementById("bairro").value = data.bairro;
            document.getElementById("cidade").value = data.localidade;
            document.getElementById("estado").value = data.uf;
          })
          .catch(() => alert("Erro ao buscar CEP."));
      }
    });
  }
 // Máscara e busca de telefone //
    if (contatoInput) {
  contatoInput.addEventListener("input", () => {
    let numero = contatoInput.value.replace(/\D/g, "");
    if (numero.length > 11) numero = numero.slice(0, 11);
    if (numero.length <= 10) {
      // Formato: (XX) XXXX-XXXX
      contatoInput.value = numero.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
    } else {
      // Formato: (XX) 9XXXX-XXXX
      contatoInput.value = numero.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
    }
  });
}
});