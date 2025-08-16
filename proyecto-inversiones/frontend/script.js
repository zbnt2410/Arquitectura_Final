async function optimizar() {
    const capacidad = parseInt(document.getElementById('capacidad').value);
    const proyectos = Array.from(document.querySelectorAll('.proyecto')).map(proyecto => ({
        nombre: proyecto.querySelector('.nombre').value.trim(),
        peso: parseInt(proyecto.querySelector('.peso').value),
        ganancia: parseInt(proyecto.querySelector('.ganancia').value)
    }));

    // Validación básica
    if (isNaN(capacidad)) {
        mostrarError("Ingresa un presupuesto válido.");
        return;
    }
    if (proyectos.some(p => !p.nombre || isNaN(p.peso) || isNaN(p.ganancia))) {
        mostrarError("Completa todos los campos correctamente.");
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/optimizar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ capacidad, objetos: proyectos })
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${await response.text()}`);
        }

        const data = await response.json();
        mostrarResultado(data);

    } catch (error) {
        mostrarError(`Error al conectar con el servidor: ${error.message}`);
    }
}

function mostrarResultado(data) {
    const resultadosDiv = document.getElementById('resultados');
    resultadosDiv.innerHTML = `
        <h3>Resultados de Optimización</h3>
        <p><strong>Proyectos seleccionados:</strong> ${data.seleccionados?.join(', ') || 'Ninguno'}</p>
        <p><strong>Ganancia total:</strong> $${data.ganancia_total?.toLocaleString() || 0}</p>
        <p><strong>Presupuesto utilizado:</strong> $${data.peso_total?.toLocaleString() || 0} / $${document.getElementById('capacidad').value}</p>
    `;
}

function mostrarError(mensaje) {
    document.getElementById('resultados').innerHTML = `
        <div class="error">
            <p>❌ ${mensaje}</p>
        </div>
    `;
}

function agregarProyecto() {
    const div = document.createElement('div');
    div.className = 'proyecto';
    div.innerHTML = `
        <input type="text" placeholder="Nombre (ej: Fondo_A)" class="nombre">
        <input type="number" placeholder="Costo (ej: 2000)" class="peso" min="1">
        <input type="number" placeholder="Ganancia (ej: 1500)" class="ganancia" min="1">
        <button onclick="this.parentElement.remove()">🗑️</button>
    `;
    document.getElementById('proyectos').appendChild(div);
}