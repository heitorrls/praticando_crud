// async antes da function pq se comunica com o backend, e o await para esperar a resposta do backend antes de continuar a execução do código

async function carregarUsuarios() {
    try {
        const resposta = await fetch('/api/usuarios');
        
        const usuarios = await resposta.json();

        const tabelaCorpo = document.getElementById('tabela-corpo');
        tabelaCorpo.innerHTML = '';

        usuarios.forEach(usuario => {
            const tr = document.createElement('tr');

            tr.innerHTML = `
                            <td>${usuario.nome}</td>
                            <td>${usuario.sobrenome}</td>
                            <td>${usuario.email}</td>
                            <td> 
                                <button onclick="editarUsuario(${usuario.id})">Editar</button>
                            </td>
                            <td>
                                <button onclick="deletarUsuario(${usuario.id})">Deletar</button>
                            </td>`;
                            
            tabelaCorpo.appendChild(tr);
        });

        

    }
    catch (erro) {
            console.error('Erro ao carregar os dados:', erro);
        }
}

window.onload = carregarUsuarios;

async function deletarUsuario(id) {
    const confirmacao = confirm("Tem certeza que deseja excluir este usuário?");
    
    if (confirmacao) {
        try {
            // Faz a requisição para a rota que você criou no backend, avisando que o método é DELETE
            const resposta = await fetch(`/api/usuarios/${id}`, {
                method: 'DELETE'
            });

            if (resposta.ok) {
                alert('Usuário excluído com sucesso!');
                // Chama a função de carregar novamente para atualizar a tabela na tela (sumir com a linha)
                carregarUsuarios(); 
            } else {
                alert('Erro ao excluir o usuário no banco de dados.');
            }
        } catch (erro) {
            console.error('Erro ao deletar:', erro);
            alert('Erro de comunicação com o servidor.');
        }
    }
}

// sem async pq nao precisa esperar resposta do backend, apenas redirecionar para a página de edição
function editarUsuario(id) {
    document.getElementById('id-usuario').value = id;
    document.getElementById('nome').value = nomeAtual;
    document.getElementById('sobrenome').value = sobrenomeAtual;
    document.getElementById('email').value = emailAtual;
document.getElementById('btn-submit').value = "Atualizar Usuário";}