const express = require('express');
const fs = require('fs'); // Importar módulo fs para manejar archivos
const path = require('path'); // Importar módulo path para manejar rutas
const router = express.Router();

// Ruta de los archivos JSON
const departmentsFilePath = path.join(__dirname, '../public/js/departments.json');
const townsFilePath = path.join(__dirname, '../public/js/towns.json');

// Leer y parsear datos de departamentos y municipios
let departamentos = {};
let municipios = {};

// Función para cargar los datos desde los archivos JSON
function loadJSONData() {
  try {
    const departmentsData = fs.readFileSync(departmentsFilePath, 'utf8');
    const townsData = fs.readFileSync(townsFilePath, 'utf8');

    departamentos = JSON.parse(departmentsData);
    municipios = JSON.parse(townsData);
  } catch (err) {
    console.error('Error al leer archivos JSON:', err);
  }
}

// Cargar datos inicialmente
loadJSONData();

// Array para almacenar los objetos registrados
let objetosRegistrados = [];

// Ruta para la página principal
router.get('/', (req, res) => {
  // Renderiza la vista 'index' con los departamentos y objetos registrados
  res.render('index', { departamentos: Object.keys(departamentos), objetos: objetosRegistrados });
});

// Ruta para manejar la obtención de municipios basados en el departamento seleccionado
router.post('/get-municipios', (req, res) => {
  const { departamento } = req.body;
  // Retorna los municipios correspondientes al departamento seleccionado
  res.json(municipios[departamento] || []);
});

// Ruta para manejar la adición de un nuevo objeto
router.post('/add-object', (req, res) => {
  const { departamento, municipio, nombreObjeto } = req.body; // Asegúrate de que el formulario tenga los campos adecuados

  // Agrega el nuevo objeto a la lista
  objetosRegistrados.push({ departamento, municipio, nombreObjeto });

  // Redirige a la página principal para mostrar el objeto agregado
  res.redirect('/');
});

module.exports = router;
