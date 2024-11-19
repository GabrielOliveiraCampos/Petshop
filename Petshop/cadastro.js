document.getElementById('cadastroForm').addEventListener('submit', async (event) => {
    event.preventDefault();

const nome = document.getElementById('nome').value;
const email = document.getElementById('email').value;
const senha = document.getElementById('senha').value;
const telefone = document.getElementById('telefone').value;
const endereco = document.getElementById('endereco').value;

    try {
        const response = await fetch('http://localhost:3000/usuario/cadastrar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, email, senha, telefone, endereco })
        });

        const result = await response.json();
        if (result.success) {
            window.location.href = 'login.html';
        } else {
            document.getElementById('mensagemerro').textContent = result.message;
        }
    } catch (error) {
        console.error("Erro na solicitação:", error);
        document.getElementById('mensagemerro').textContent = 'Erro ao conectar ao servidor.';
    }
});







