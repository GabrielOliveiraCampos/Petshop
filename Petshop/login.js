document.getElementById('formulario').addEventListener('submit', async (event) => {
    event.preventDefault();

const email = document.getElementById('email').value;
const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/usuario/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha: password })
        });

        const result = await response.json();
        if (result.success) {
            window.location.href = 'inicial.html';
        } else {
            document.getElementById('mensagemerro').textContent = result.message;
        }
    } catch (error) {
        console.error("Erro:", error);
        document.getElementById('mensagemerro').textContent = 'Erro';
    }
});
