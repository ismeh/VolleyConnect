# Integración continua
## Estructura de archivos
<details>
  <summary>/root </summary>

    │
    ├── /src                # Código fuente principal
    │   ├── /config         # Configuración (DB, entorno)
    │   ├── /controllers    # Controladores de la lógica de negocio
    │   ├── /models         # Modelos de datos
    │   ├── /public         # Archivos estáticos
    │   ├── /routes         # Rutas de Express
    │   ├── /services       # Lógica de microservicios
    │   ├── /views          # Plantillas, vistas
    │   └── app.js          # Archivo principal del servidor
    │
    
    │
    ├── /tests              # Pruebas unitarias y de integración
    │
    ├── /ci                 # Scripts y configuraciones para integración continua
    │
    ├── /docker             # Configuración Docker para despliegue
    │
    ├── /docs               # Documentación del proyecto y especificaciones
    │
    ├── .env                # Variables de entorno (excluidas del repositorio)
    ├── .gitignore          # Ignorar archivos innecesarios
    ├── docker-compose.yml  # Configuración para orquestar servicios
    ├── [README.md](http://readme.md/)           # Descripción del proyecto
    └── package.json        # Dependencias del proyecto
</details>

## Gestor de tareas
Un gestor de tareas permite la automatización de procesos.
Para Javascript podemos encontrar los siguientes:
- **Grunt**
- **Gulp**
- Rollup
- Webpack
- **npm**
    Cuenta con algunos script básicos para agilizar el desarrollo. Estos se indican en el ``package.json``

## Biblioteca de aserciones

- Chai
## Marco de pruebas
- Mocha
- **Jest**
## Integración continua
- **GitHub Actions**
- Travis CI