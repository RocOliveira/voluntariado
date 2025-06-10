function verMais() {
  alert("Aqui você verá a descrição completa da vaga (em breve)!");
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-vaga");

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
      };

      // Recupera vagas existentes ou inicia array
      const vagas = JSON.parse(localStorage.getItem("vagas")) || [];

      vagas.push(vaga);

      localStorage.setItem("vagas", JSON.stringify(vagas));

      alert("Vaga cadastrada com sucesso!");
      form.reset();
    });
  }
});