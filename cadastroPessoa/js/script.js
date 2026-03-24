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
            tdNome.className = 'py-4 px-6 text-sm text-slate-700';
            tdNome.textContent = usuario.nome;

            const tdSobrenome = document.createElement('td');
            tdSobrenome.className = 'py-4 px-6 text-sm text-slate-700';
            tdSobrenome.textContent = usuario.sobrenome;

            const tdEmail = document.createElement('td');
            tdEmail.className = 'py-4 px-6 text-sm text-slate-700';
            tdEmail.textContent = usuario.email;

            const tdAcoes = document.createElement('td');
            tdAcoes.className = 'py-4 px-6 text-sm text-center space-x-2';

            const btnEditar = document.createElement('button');
            btnEditar.className = 'bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-1.5 px-4 rounded-lg transition-colors duration-200 shadow-sm';
            btnEditar.textContent = 'Editar';
            btnEditar.addEventListener('click', () => habilitaEdicao(usuario.id, usuario.nome, usuario.sobrenome, usuario.email));
            tdAcoes.appendChild(btnEditar);

            const tdDeletar = document.createElement('td');
            const btnDeletar = document.createElement('button');
            btnDeletar.className = 'bg-red-500 hover:bg-red-600 text-white font-medium py-1.5 px-4 rounded-lg transition-colors duration-200 shadow-sm';
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
        <td class="py-3 px-4"><input type="text" id="edit-nome-${id}" value="${nomeAtual}" class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm transition-all"></td>
        <td class="py-3 px-4"><input type="text" id="edit-sobrenome-${id}" value="${sobrenomeAtual}" class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm transition-all"></td>
        <td class="py-3 px-4"><input type="text" id="edit-email-${id}" value="${emailAtual}" class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm transition-all"></td>
        <td class="py-3 px-4 text-center space-x-2 whitespace-nowrap"> 
            <button id="btn-salvar" onclick="salvarEdicao(${id})" class="bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-1.5 px-4 rounded-lg transition-colors duration-200 shadow-sm">Salvar</button>
            <button id="btn-cancelar" onclick="carregarUsuarios()" class="bg-slate-500 hover:bg-slate-600 text-white font-medium py-1.5 px-4 rounded-lg transition-colors duration-200 shadow-sm">Cancelar</button>
        </td>`;
}

async function salvarEdicao(id){
    const novoNome = document.getElementById(`edit-nome-${id}`).value;
    const novoSobrenome = document.getElementById(`edit-sobrenome-${id}`).value;
    const novoEmail = document.getElementById(`edit-email-${id}`).value;

    try {
            const resposta = await fetch(`/api/usuarios/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nome: novoNome, sobrenome: novoSobrenome, email: novoEmail })
            });

            if (resposta.ok) {
                // ALERTA MODERNO DE SUCESSO
                Swal.fire({
                    title: 'Sucesso!',
                    text: 'Usuário atualizado com sucesso!',
                    icon: 'success',
                    confirmButtonColor: '#4f46e5', // Cor indigo-600 do Tailwind
                    customClass: { popup: 'rounded-2xl' }
                });
                carregarUsuarios();
            } else {
                // ALERTA MODERNO DE ERRO
                Swal.fire({
                    title: 'Erro!',
                    text: 'Erro ao atualizar o usuário no banco de dados.',
                    icon: 'error',
                    confirmButtonColor: '#4f46e5',
                    customClass: { popup: 'rounded-2xl' }
                });
            } 
        } catch (erro) {
            console.error('Erro na comunicação: ', erro);
            Swal.fire('Erro', 'Erro de comunicação com o servidor.', 'error');
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
 const confirmacao = await Swal.fire({
        title: 'Tem a certeza?',
        text: "Não será possível reverter esta ação!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ef4444', // red-500
        cancelButtonColor: '#64748b',  // slate-500
        confirmButtonText: 'Sim, excluir!',
        cancelButtonText: 'Cancelar',
        customClass: { popup: 'rounded-2xl' }
    });
    
    // Verifica se o utilizador clicou no botão de confirmar
    if (confirmacao.isConfirmed) {
        try {
            const resposta = await fetch(`/api/usuarios/${id}`, {
                method: 'DELETE'
            });

            if (resposta.ok) {
                Swal.fire({
                    title: 'Excluído!',
                    text: 'O usuário foi removido com sucesso.',
                    icon: 'success',
                    confirmButtonColor: '#4f46e5',
                    customClass: { popup: 'rounded-2xl' }
                });
                carregarUsuarios(); 
            } else {
                Swal.fire('Erro!', 'Erro ao excluir o usuário no banco de dados.', 'error');
            }
        } catch (erro) {
            console.error('Erro ao deletar:', erro);
            Swal.fire('Erro!', 'Erro de comunicação com o servidor.', 'error');
        }
    }
}