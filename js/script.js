async function carregarUsuarios() {
    try {
        const resposta = await fetch('/usuarios');
        
        const usuarios = await resposta.json();

        const tabelaCorpo = document.getElementById('tabela-corpo');
        tabelaCorpo.innerHTML = '';

        usuarios.forEach(usuario => {
            const tr = document.createElement('tr');

            tr.innerHTML = `<td>${usuario.id}</td>
                            <td>${usuario.nome}</td>
                            <td>${usuario.sobrenome}</td>
                            <td>${usuario.email}</td>`;
            tabelaCorpo.appendChild(tr);
        });

        

    }
    catch (erro) {
            console.error('Erro ao carregar os dados:', erro);
        }
}

window.onload = carregarUsuarios;;