# 📋 Página de Cadastro de Vagas para Voluntariado

Este projeto tem como objetivo desenvolver uma página web para o cadastro e gerenciamento de vagas de voluntariado, conectando ONGs com pessoas interessadas em contribuir com causas sociais.

## 🚀 Funcionalidades

* Formulário de cadastro de vagas para ONGs e instituições
* Visualização detalhada da vaga
* Pesquisa dinãmica das vagas por categoria ou descrição
* Campo com validação e máscaras
* Integração com a API ViaCEP para preenchimento automático de endereço
* Listagem de vagas cadastradas com informações completas
* Botão para exclusão de vagas
* Salvamento de vagas em localStorage
* Interface simples e acessível

## 🛠️ Tecnologias Utilizadas

* **HTML5** - Estrutura da página
* **CSS3** - Estilização e responsividade
* **JavaScript** - Validações, interatividade e integração com API
* **API ViaCEP** - Consulta automática de endereço pelo CEP
* **localStorage** - Armazenamento dos dados das vagas diretamente no navegador do usuário

## 📄 Campos do Formulário

* Nome da Instituição
* Titulo da Vaga
* Descrição da Vaga
* TCategoria (ex: educação, saúde, meio ambiente)
* Imagem
* Telefone
* Endereço da Instuituição com:
    * CEP
    * Rua
    * Número
    * Bairro
    * Cidade
    * Estado

## 🧪 Validações

* Campos obrigatórios marcados com asterisco
* Validação de e-mail e telefone
* Máscara para CEP e telefone
* Verificação de preenchimento automático de endereço com ViaCEP

# ✨ Contribuição
Contribuições são bem-vindas! Se você tiver ideias para melhorias, encontrar bugs ou quiser adicionar novas funcionalidades, sinta-se à vontade para:

* Fazer um fork do projeto.
* Criar uma nova branch (git checkout -b feature/NomeDaSuaFeature).
* Fazer suas alterações e commitá-las (git commit -m 'feat: Adiciona nova funcionalidade X').
* Enviar para a sua branch (git push origin feature/NomeDaSuaFeature).
* Abrir um Pull Request.