document.getElementById('formu').addEventListener('submit', async (event) => {
    event.preventDefault();

const nomeAnimal = document.getElementById('nomeAnimal').value;
const idade = parseInt(document.getElementById('idade').value);
const tipo = document.getElementById('tipo').value;
const dono_id = parseInt(document.getElementById('dono').value);
    try {
        const response = await fetch('http://localhost:3000/animal/cadastrar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome: nomeAnimal, idade, tipo, dono_id })
        });

        const result = await response.json();
        if (result.success) {
            alert("Animal cadastrado com sucesso!");
            window.location.href = 'inicial.html'; 
        } else {
            alert("Erro ao cadastrar o animal: " + result.message);
        }
    } catch (error) {
        console.error("Erro ao conectar ao servidor:", error);
        alert("Erro ao conectar ao servidor.");
    }
});

