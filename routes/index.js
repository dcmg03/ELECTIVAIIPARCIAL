const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Rutas de los archivos JSON
const departmentsFilePath = path.join(__dirname, '../public/js/departments.json');
const townsFilePath = path.join(__dirname, '../public/js/towns.json');

// Leer y parsear datos de departamentos y municipios
let departamentos = [];
let municipios = {};

// Función para cargar los datos desde los archivos JSON
function loadJSONData() {
  try {
    const departmentsData = fs.readFileSync(departmentsFilePath, 'utf8');
    const townsData = fs.readFileSync(townsFilePath, 'utf8');

    departamentos = JSON.parse(departmentsData); // Cargar departamentos
    const towns = JSON.parse(townsData); // Cargar municipios

    // Organizar municipios por departamento
    towns.forEach(town => {
      const deptCode = town.department;
      if (!municipios[deptCode]) {
        municipios[deptCode] = [];
      }
      municipios[deptCode].push(town.name);
    });
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
  res.render('index', { departamentos, objetos: objetosRegistrados });
});

// Ruta para manejar la obtención de municipios basados en el departamento seleccionado
router.post('/get-municipios', (req, res) => {
  const { departamento } = req.body;
  res.json(municipios[departamento] || []);
});

// Ruta para manejar la adición de un nuevo objeto
router.post('/add-object', (req, res) => {
  const { departamento, municipio, carroMarca, carroModelo, carroAnio, carroColor } = req.body;

  const nuevoObjeto = {
    departamento,
    municipio,
    carro: {
      marca: carroMarca,
      modelo: carroModelo,
      anio: carroAnio,
      color: carroColor
    }
  };

  objetosRegistrados.push(nuevoObjeto);
  res.redirect('/');
});

// Ruta para manejar la eliminación de un objeto
router.post('/delete-object', (req, res) => {
  const { index } = req.body;
  if (index >= 0 && index < objetosRegistrados.length) {
    objetosRegistrados.splice(index, 1);
  }
  res.redirect('/');
});

// Ruta para mostrar el formulario de edición
router.get('/edit-object', (req, res) => {
  const { index } = req.query;

  if (index >= 0 && index < objetosRegistrados.length) {
    const objeto = objetosRegistrados[index];
    res.render('edit', { objeto, index });
  } else {
    res.redirect('/');
  }
});

// Ruta para manejar la actualización de un objeto
router.post('/update-object', (req, res) => {
  const { index, departamento, municipio, carroMarca, carroModelo, carroAnio, carroColor } = req.body;

  if (index >= 0 && index < objetosRegistrados.length) {
    objetosRegistrados[index] = {
      departamento,
      municipio,
      carro: {
        marca: carroMarca,
        modelo: carroModelo,
        anio: carroAnio,
        color: carroColor
      }
    };
  }

  res.redirect('/');
});

module.exports = router;
