const express = require('express');
const path = require('path');
const app = express();

// Configurar el motor de vistas como EJS
app.set('view engine', 'ejs');

// Configurar la carpeta de vistas
app.set('views', path.join(__dirname, 'views/templates')); // Asegúrate de ajustar el camino según tu estructura

// Middleware para analizar el cuerpo de las solicitudes (req.body)
app.use(express.urlencoded({ extended: true })); // Middleware para manejar formularios
app.use(express.json()); // Middleware para manejar datos en formato JSON (si es necesario)

// Configurar rutas estáticas (para CSS, JS, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Importar las rutas
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
