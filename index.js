const express = require('express');
const path = require('path');
const app = express();

// Configurar el motor de vistas como EJS
app.set('view engine', 'ejs');

// Configurar la carpeta de vistas para que apunte a 'views/templates'
app.set('views', path.join(__dirname, 'views/templates'));

// Importar las rutas
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
