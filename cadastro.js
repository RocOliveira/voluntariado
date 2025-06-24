document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form-vaga");
    const cepInput = document.getElementById("cep");
    const ruaInput = document.getElementById("rua");
    const bairroInput = document.getElementById("bairro");
    const cidadeInput = document.getElementById("cidade");
    const estadoInput = document.getElementById("estado");
    const contatoInput = document.getElementById("contato"); // Corrigido aqui!

    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            // Monta o objeto da vaga
            const vaga = {
                id: Date.now(), // Adiciona um ID único baseado no timestamp
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

            // Recupera vagas já cadastradas do localStorage
            // Usa 'vagas' como chave para consistência
            let vagas = JSON.parse(localStorage.getItem("vagas")) || [];
            vagas.push(vaga);
            localStorage.setItem("vagas", JSON.stringify(vagas));

            alert("Vaga cadastrada com sucesso!");
            form.reset(); // Limpa o formulário após o cadastro
        });
    }

    // Máscara e busca de CEP
    if (cepInput) {
        cepInput.addEventListener("input", () => {
            // Remove tudo que não é dígito e aplica a máscara
            cepInput.value = cepInput.value.replace(/\D/g, "").replace(/^(\d{5})(\d)/, "$1-$2");
        });

        cepInput.addEventListener("blur", () => { // Usar 'blur' para acionar a busca quando o campo perde o foco
            const cep = cepInput.value.replace("-", ""); // Remove o hífen para a busca

            if (cep.length === 8) {
                fetch(`https://viacep.com.br/ws/${cep}/json/`)
                    .then(response => response.json())
                    .then(data => {
                        if (data.erro) {
                            alert("CEP não encontrado.");
                            // Limpa os campos de endereço se o CEP for inválido
                            ruaInput.value = '';
                            bairroInput.value = '';
                            cidadeInput.value = '';
                            estadoInput.value = '';
                            return;
                        }

                        ruaInput.value = data.logradouro;
                        bairroInput.value = data.bairro;
                        cidadeInput.value = data.localidade;
                        estadoInput.value = data.uf;
                    })
                    .catch(() => {
                        alert("Erro ao buscar CEP. Verifique sua conexão ou tente novamente.");
                        // Limpa os campos em caso de erro na requisição
                        ruaInput.value = '';
                        bairroInput.value = '';
                        cidadeInput.value = '';
                        estadoInput.value = '';
                    });
            } else if (cep.length > 0) { // Avisa se o CEP digitado não tem 8 dígitos
                alert("CEP inválido. Digite 8 dígitos.");
            }
        });
    }

    // Máscara de telefone
    if (contatoInput) {
        contatoInput.addEventListener("input", () => {
            let numero = contatoInput.value.replace(/\D/g, ""); // Remove tudo que não é dígito
            if (numero.length > 11) numero = numero.slice(0, 11); // Limita a 11 dígitos

            if (numero.length <= 10) {
                // Formato: (XX) XXXX-XXXX (para fixo ou celular antigo)
                contatoInput.value = numero.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
            } else {
                // Formato: (XX) 9XXXX-XXXX (para celular com 9)
                contatoInput.value = numero.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
            }
        });
    }
});