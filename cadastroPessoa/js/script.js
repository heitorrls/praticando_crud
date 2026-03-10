// async antes da function pq se comunica com o backend, e o await para esperar a resposta do backend antes de continuar a execução do código

async function carregarUsuarios() {
    try {
        const resposta = await fetch('/api/usuarios');
        
        const usuarios = await resposta.json();

        const tabelaCorpo = document.getElementById('tabela-corpo');
        tabelaCorpo.innerHTML = '';

        usuarios.forEach(usuario => {
            const tr = document.createElement('tr');
            tr.id = `linha-${usuario.id}`;

            const tdNome = document.createElement('td');
            tdNome.textContent = usuario.nome;

            const tdSobrenome = document.createElement('td');
            tdSobrenome.textContent = usuario.sobrenome;

            const tdEmail = document.createElement('td');
            tdEmail.textContent = usuario.email;

            const tdAcoes = document.createElement('td');
            const btnEditar = document.createElement('button');
            btnEditar.className = 'btn-editar';
            btnEditar.textContent = 'Editar';
            btnEditar.addEventListener('click', () => habilitaEdicao(usuario.id, usuario.nome, usuario.sobrenome, usuario.email));
            tdAcoes.appendChild(btnEditar);

            const tdDeletar = document.createElement('td');
            const btnDeletar = document.createElement('button');
            btnDeletar.className = 'btn-deletar';
            btnDeletar.textContent = 'Deletar';
            btnDeletar.addEventListener('click', () => deletarUsuario(usuario.id));
            tdDeletar.appendChild(btnDeletar);

            tr.appendChild(tdNome);
            tr.appendChild(tdSobrenome);
            tr.appendChild(tdEmail);
            tr.appendChild(tdAcoes);
            tr.appendChild(tdDeletar);

            tabelaCorpo.appendChild(tr);
        });

        

    }
    catch (erro) {
            console.error('Erro ao carregar os dados:', erro);
        }
}

window.onload = carregarUsuarios;

function habilitaEdicao(id, nomeAtual, sobrenomeAtual, emailAtual) {

    const tr = document.getElementById(`linha-${id}`);

    tr.innerHTML = `
        <td><input type="text" id="edit-nome-${id}" value="${nomeAtual}"></td>
        <td><input type="text" id="edit-sobrenome-${id}" value="${sobrenomeAtual}"></td>
        <td><input type="text" id="edit-email-${id}" value="${emailAtual}"></td>
        <td> 
            <button id="btn-salvar" onclick="salvarEdicao(${id})">Salvar</button>
            <button id="btn-cancelar" onclick="carregarUsuarios()">Cancelar</button>
        </td>
        <td>
            <button disabled>Deletar</button>
        </td>`;
}

async function salvarEdicao(id){
    const novoNome = document.getElementById(`edit-nome-${id}`).value;
    const novoSobrenome = document.getElementById(`edit-sobrenome-${id}`).value;
    const novoEmail = document.getElementById(`edit-email-${id}`).value;

    try {
        const resposta = await fetch(`/api/usuarios/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                nome: novoNome, sobrenome: novoSobrenome, email: novoEmail 
            })

        })

        if (resposta.ok) {
            alert('Usuário atualizado com sucesso!');
            carregarUsuarios();
        } else {
            alert('erro ao atualizar o usuario no banco de dados');
        } 
    }
        catch (erro) {
            console.error('Erro na comunicação: ', erro);
            alert('Erro de comunicação com o servidor.');
        }
}

// sem async pq nao precisa esperar resposta do backend, apenas redirecionar para a página de edição
function editarUsuario(id, nomeAtual, sobrenomeAtual, emailAtual) {
    document.getElementById('id-usuario').value = id;
    document.getElementById('nome').value = nomeAtual;
    document.getElementById('sobrenome').value = sobrenomeAtual;
    document.getElementById('email').value = emailAtual;
    document.getElementById('btn-submit').value = "Atualizar Usuário";

}

document.getElementById('form-usuario').addEventListener('submit', async function (event){
    const id = document.getElementById('id-usuario').value;

    if (id) {
        event.preventDefault();

        const nome = document.getElementById('nome').value;
        const sobrenome = document.getElementById('sobrenome').value;
        const email = document.getElementById('email').value;

        try {
            const resposta = await fetch(`/api/usuarios/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nome, sobrenome, email })
            });
        
        if (resposta.ok) {
            alert('Usuário atualizado com sucesso paizao!');
            document.getElementById('id-usuario').value = '';
            this.reset();
            document.getElementById('btn-submit').value = "Cadastrar";

            carregarUsuarios();
        }    else {
            alert('Erro ao atualizar o usuário no banco de dados.');    
        }

        } catch (erro) {
            console.error('Erro na comunicação: ', erro);
        }
    }
})
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