# Optimizador de Portafolio de Inversiones

## Descripción 📌
Solución tecnológica para optimizar la asignación de un presupuesto entre oportunidades de inversión, maximizando el retorno sin exceder la capacidad financiera.

- **Backend**: Microservicio en Node.js que resuelve el problema mediante programación dinámica
- **Frontend**: Interfaz web intuitiva (HTML/CSS/JS vanilla) para ingresar datos y visualizar resultados

## Requisitos 📋
- Node.js v18+
- Navegador moderno (Chrome, Firefox, Edge)

## Instalación 🚀

### Backend
```bash
cd backend
npm install
npm start

### Ejecución del frontend

Abrir el archivo frontend/index.html en tu navegador preferido

### Ejemplos de uso
Entrada de ejemplo

{
    "capacidad": 10000,
    "objetos": [
        {"nombre": "ProyectoA", "peso": 3000, "ganancia": 2500},
        {"nombre": "ProyectoB", "peso": 5000, "ganancia": 4000}
    ]
}

Salida esperada
{
    "capacidad": 10000,
    "objetos": [
        {"nombre": "ProyectoA", "peso": 3000, "ganancia": 2500},
        {"nombre": "ProyectoB", "peso": 5000, "ganancia": 4000}
    ]
}


### Dependencias del proyecto

{
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5"
  }
}


### Frontend

Vanilla JS (sin dependencias externas)

### Especificación de API

### Documentación OpenAPI (Swagger)

openapi: 3.0.0
info:
  title: API de Optimización de Portafolio
  version: 1.0.0
paths:
  /optimizar:
    post:
      summary: Optimiza una cartera de inversiones
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                capacidad:
                  type: number
                objetos:
                  type: array
                  items:
                    type: object
                    properties:
                      nombre:
                        type: string
                      peso:
                        type: number
                      ganancia:
                        type: number
      responses:
        '200':
          description: Resultado de la optimización
        '400':
          description: Entrada inválida
        '500':
          description: Error del servidor

### Colección Postman

Descripción detallada del endpoint /optimizar

Método

POST

URL

http://localhost:5000/optimizar

### Respuestas

200 OK: Retorna la solución óptima

400 Bad Request: Error en los datos de entrada

500 Internal Server Error: Error en el servidor


### Ejemplos de llamada

curl -X POST http://localhost:5000/optimizar \
-H "Content-Type: application/json" \
-d '{"capacidad":10000,"objetos":[{"nombre":"A","peso":2000,"ganancia":1500}]}'

### Diagrama de Arquitectura 

graph TD
    A[Frontend] -->|HTTP POST| B[Backend]
    B --> C[Algoritmo de Optimización]
    C --> D[Resultados]
