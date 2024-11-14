# Nexu Backend API

Este proyecto es una API RESTful desarrollada con Node.js, Express y Sequelize, utilizando MySQL como base de datos. La API permite gestionar marcas y modelos de vehículos y ofrece endpoints para obtener y modificar datos relacionados.

## Tabla de Contenidos

- [Instalación de MySQL](#installation-mysql)
- [Configuración del Proyecto](#proyect-config)
- [Creación de la Base de Datos](#create-db)
- [Ejecución de Migraciones y Seeders](#migration-executions-and-seeders)
- [Eecutar la API en Local](#execute-api)
- [Documentación de la API](#api-documentation)

## Instalación de MySQL

1. Instalar MySQL:
- En macOS:
```
brew install mysql
```

- En Ubuntu:
```
sudo apt update
sudo apt install mysql-server
```

- En Windows: Descarga el instalador de MySQL Installer y sigue las instrucciones.

2. Iniciar el servidor de MySQL:
- En macOS:
```
brew services start mysql
```

- En Ubuntu:
```
sudo service mysql start
```

- En Windows: MySQL debe iniciarse automáticamente; si no, puedes iniciar el servicio desde el panel de servicios.

3. Configurar el usuario MySQL:
- Ingresa a MySQL desde la terminal:
```
mysql -u root -p
```
- Crea un nuevo usuario y base de datos:
```
CREATE DATABASE nexu_db;
CREATE USER 'nexu_user'@'localhost' IDENTIFIED BY 'nexu_password';
GRANT ALL PRIVILEGES ON nexu_db.* TO 'nexu_user'@'localhost';
FLUSH PRIVILEGES;

```

## Configuración del Proyecto

1. Clonar el repositorio:

```
git clone https://github.com/JehuReynoso/nexu-backend.git
cd nexu-backend
```

2. Instalar dependencias:

```
npm install
```

3. Configurar el archivo .env:

- Crea un archivo .env en la raíz del proyecto con las siguientes variables:

```
DB_USER=nexu_user
DB_PASSWORD=nexu_password
DB_NAME=nexu_db
DB_HOST=localhost
DB_DIALECT=mysql
PORT=3000
```

### Creación de la Base de Datos

1. Inicializar Sequelize:
- Si no lo has hecho antes, inicializa el entorno de Sequelize:

```
npx sequelize-cli init
```

2. Crear las migraciones:
- Asegúrate de que las migraciones para las tablas Brand y Model están configuradas en src/migrations.

3. Ejecutar migraciones:
- Ejecuta las migraciones para crear las tablas necesarias en la base de datos:
```
npx sequelize-cli db:migrate
```

### Ejecución de Migraciones y Seeders

1. Colocar archivo de datos:
- Asegúrate de que el archivo JSON (models.json) esté ubicado en src/data/models.json.
2. Ejecutar el script de población:
- El script lee el archivo JSON y carga los datos en las tablas de MySQL. Para ejecutarlo, usa:
```
npm run seed
```

- Esto ejecutará el script seeders/populateDatabase.js, que poblará la base de datos con los datos iniciales de models.json.

### Ejecutar la API en Local

1. Iniciar el servidor de desarrollo:
- Ejecuta el siguiente comando para iniciar la API en modo desarrollo con nodemon:
```
npm run dev
```

- La API debería estar corriendo en http://localhost:3000.

2. Probar la conexión:
Usa curl o una herramienta como Postman para probar los endpoints. Ejemplo:
```
curl http://localhost:3000/brands
```

# Documentación de la API

- La API incluye los siguientes endpoints:
```
GET /brands: Lista todas las marcas.
GET /brands/:id/models: Lista todos los modelos de una marca específica.
POST /brands: Crea una nueva marca (debe tener un nombre único).
POST /brands/:id/models: Añade un nuevo modelo a una marca.
PUT /models/:id: Actualiza el precio promedio de un modelo.
GET /models: Lista todos los modelos, con filtros opcionales greater y lower para el precio promedio.
```

Para obtener una descripción detallada de cada endpoint y su estructura de respuesta, consulta la documentación en Swagger (enlace de ejemplo).

Este archivo README.md proporciona todos los pasos necesarios para ejecutar el proyecto en un entorno local, con configuraciones detalladas de instalación, migración, carga de datos y pruebas de la API.
