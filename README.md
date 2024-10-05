# Medi-App

Medi-App es una aplicación web diseñada para gestionar citas médicas, registros, tareas y perfiles de usuarios. Este README proporciona toda la información necesaria para configurar, ejecutar y usar la aplicación.

## Tabla de Contenidos
- [Características](#características)
- [Tecnologías](#tecnologías)
- [Instalación](#instalación)
- [Ejecutando la Aplicación](#ejecutando-la-aplicación)
- [Variables de Entorno](#variables-de-entorno)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Scripts Disponibles](#scripts-disponibles)
- [Contribuyendo](#contribuyendo)
- [Licencia](#licencia)

## Características
- Autenticación de Usuarios (Registro, Inicio de Sesión, Cierre de Sesión)
- Gestión de Perfiles
- Gestión de Tareas (operaciones CRUD)
- Gestión de Registros Médicos (Ver, Añadir)
- Sección de Opinión Médica
- Informes y Visualización de Datos

## Tecnologías
- Frontend: React, Tailwind CSS
- Backend: Node.js, Express
- Base de Datos: MongoDB
- Autenticación: JWT
- Gestión de Estado: React Context API
- Peticiones API: Axios

### Prerrequisitos
- Node.js (v14.x o superior)
- npm (v6.x o superior) o Yarn (v1.x o superior)
- MongoDB

### Clonar el Repositorio y Ejecutar los programas
```bash
git clone https://github.com/your-username/medi-app.git

#Correr base de datos Docker + MongoDB

#Ejecutar Backend
npm install
npm run dev

##Ejecutar Frontend
cd client
npm install
npm run dev
```

### Estructura del Proyecto
La estructura del proyecto es la siguiente:
```bash
medi-app/
│
├── client/              # Código del frontend
│   ├── public/          # Archivos estáticos
│   └── src/             # Código fuente de React
│       ├── components/  # Componentes de React
│       ├── context/     # Context API para la gestión de estado
│       ├── pages/       # Páginas de la aplicación
│       ├── services/    # Servicios para llamadas a la API
│       └── App.js       # Componente principal de la aplicación
│
├── controllers/         # Controladores de Express
├── models/              # Modelos de Mongoose
├── routes/              # Rutas de Express
├── middleware/          # Middlewares de Express
├── .env                 # Variables de entorno
├── server.js            # Punto de entrada del servidor
└── package.json         # Dependencias y scripts
```