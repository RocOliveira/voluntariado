cadInstituicao = [];

function salvaInstituicao(){
    let nomeInstituicao = document.getElementById("nomeInstituicao").value;
    console.log(nomeInstituicao);
    cadInstituicao.push(nomeInstituicao);
    exibirInstituicao();
}

function exibirInstituicao() {
    let mostraInstituicao = document.getElementById("vagasContainer");
    for(let i=0; i < cadInstituicao.length; i++){
        mostraInstituicao.innerHTML += cadInstituicao;   
}
}