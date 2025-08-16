// backend/app.js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

function optimizarPortafolio(capacidad, objetos) {
    // Ordenar proyectos por mayor ganancia por costo (eficiencia)
    const proyectosOrdenados = objetos.map(obj => ({
        ...obj,
        eficiencia: obj.ganancia / obj.peso
    })).sort((a, b) => b.eficiencia - a.eficiencia);

    let pesoTotal = 0;
    let gananciaTotal = 0;
    const seleccionados = [];

    for (const proyecto of proyectosOrdenados) {
        if (pesoTotal + proyecto.peso <= capacidad) {
            seleccionados.push(proyecto.nombre);
            pesoTotal += proyecto.peso;
            gananciaTotal += proyecto.ganancia;
        }
    }

    // Verificar si hay una combinación mejor sin seguir el orden de eficiencia (para casos complejos)
    const dp = new Array(capacidad + 1).fill(0);
    const selected = new Array(capacidad + 1).fill().map(() => []);

    for (const proyecto of objetos) {
        for (let w = capacidad; w >= proyecto.peso; w--) {
            if (dp[w - proyecto.peso] + proyecto.ganancia > dp[w]) {
                dp[w] = dp[w - proyecto.peso] + proyecto.ganancia;
                selected[w] = [...selected[w - proyecto.peso], proyecto.nombre];
            }
        }
    }

    // Comparar ambos métodos y elegir el mejor
    if (dp[capacidad] > gananciaTotal) {
        return {
            seleccionados: selected[capacidad],
            ganancia_total: dp[capacidad],
            peso_total: capacidad
        };
    }

    return { seleccionados, ganancia_total: gananciaTotal, peso_total: pesoTotal };
}

app.post('/optimizar', (req, res) => {
    try {
        const { capacidad, objetos } = req.body;

        if (typeof capacidad !== 'number' || capacidad <= 0) {
            return res.status(400).json({ error: "Capacidad debe ser un número positivo" });
        }

        if (!Array.isArray(objetos) || objetos.some(obj => 
            typeof obj.nombre !== 'string' || 
            typeof obj.peso !== 'number' || 
            typeof obj.ganancia !== 'number'
        )) {
            return res.status(400).json({ error: "Formato de objetos inválido" });
        }

        const resultado = optimizarPortafolio(capacidad, objetos);
        res.json(resultado);

    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));