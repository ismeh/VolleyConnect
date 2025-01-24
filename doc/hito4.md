# Documentación y Justificación de la Estructura, Configuración del Clúster de Contenedores

El clúster de contenedores implementado consta de tres servicios principales que interactúan entre sí para ofrecer un entorno reproducible y funcional. Estos servicios son:

  - Aplicación (app): Contenedor que ejecuta la lógica de negocio de la aplicación. Está basada en Node.js y se comunica con los demás contenedores para manejar datos y registros.
  - Base de datos (db): Contenedor que almacena y administra datos persistentes usando MariaDB.
  - Gestión de logs (logs): Contenedor con Fluentd que recopila, procesa y almacena logs estructurados generados por la aplicación.

Para que el entorno sea reproducible utilizaremos un Dockerfile para el contenedor de la aplicación e imagenes de Docker Hub para los otros dos contenedores, gestionaremos (orquestaremos) estos ficheros con Docker Compose.

## Base de datos

Comenzaremos descargando una [imagen oficial de mariaDB](https://hub.docker.com/_/mariadb) desde [DockerHub](https://hub.docker.com/), configuramos la imagen creando un volumen que guardaremos en el directorio /var/lib/mysql , definimos las variables de entorno necesarias:

    MYSQL_ROOT_PASSWORD: Contraseña para el usuario root (ejemplo: rootpassword).
    MYSQL_DATABASE: Nombre de la base de datos inicial (ejemplo: volleyconnect).
    MYSQL_USER: Usuario estándar (ejemplo: app_user).
    MYSQL_PASSWORD: Contraseña del usuario estándar (ejemplo: app_password).

## Dockerización de mi aplicación

Ha sido necesario crear un [Dockerfile](https://github.com/ismeh/VolleyConnect/blob/main/Dockerfile) para configurar y crear el contenedor, si accedemos a este podemos ver que es la que hace cada comando del fichero, también ha sido necesario utilizar un fichero [.dockerignore](https://github.com/ismeh/VolleyConnect/blob/main/.dockerignore) para evitar copiar algunos archivos innecesarios en el contenedor (no solo eran innecesarios sino que algunos impedian la correcta ejecución del contenedor, por ejemplo el archivo node_modules, que claramente no debería ser copiado ya que es un documento que se genera a partir de los paquetes especificados en el package.json)

Este contenedor parte de una imagen node:16-alpine ya que es una imagen ligera que reduce el tamaño del contenedor y agiliza la construcción del contenedor. 

## Contenedor para logs

El objetivo de este contenedor es centralizar la recopilación de logs estructurados generados por la aplicación, utilizando Fluentd para procesarlos y almacenarlos.

Se ha descargado la imagen oficial de Fluent desde el repositorio de Docker.

## Fichero para la composición de contenedores

El fichero docker-compose.yml define cómo interactúan los tres contenedores que forman el clúster: aplicación (app), base de datos (db) y gestión de logs (logs). Este archivo utiliza Docker Compose para automatizar el despliegue y la configuración de los servicios, asegurando que puedan ejecutarse de manera reproducible y consistente.
Secciones del Archivo
### Servicios

Cada contenedor se define como un servicio dentro del clúster.
#### app

Este contenedor ejecuta la lógica de negocio de la aplicación.
  
Configuración:
- build: Indica que este servicio construye la imagen utilizando un Dockerfile localizado en el contexto actual (.).
- ports: Mapea el puerto 3000 del contenedor al puerto 3000 del host, permitiendo el acceso a la API.
- environment:
  Define las variables de entorno necesarias para que la aplicación se conecte a la base de datos y al contenedor de logs.
- depends_on:
  Especifica que este servicio depende de los servicios db y logs, asegurando que estos se inicien primero.
- networks: Conecta el servicio a la red compartida volley-network.

#### db

Este contenedor ejecuta MariaDB para almacenar los datos de la aplicación.

Configuración:
- image: Usa la imagen oficial mariadb:10.9, que incluye una configuración básica para entornos de desarrollo y producción.
- environment:
  Configura las variables de entorno para inicializar la base de datos, incluyendo credenciales y el nombre de la base de datos.
- ports: Mapea el puerto estándar de MariaDB (3306) al host, permitiendo la conexión desde herramientas externas si es necesario.
- volumes:
  Usa un volumen persistente (db_data) para almacenar los datos de la base de datos en el host, garantizando que no se pierdan al reiniciar el contenedor.
- networks: Conecta el servicio a la red compartida volley-network.

#### logs

Este contenedor ejecuta Fluentd para centralizar la gestión de logs.

Configuración:
- image: Usa la imagen oficial fluent/fluentd:v1.17-debian-1, que incluye soporte para configuraciones personalizadas.
- ports: Abre el puerto 24224 (TCP/UDP), utilizado por Fluentd para recibir logs desde otros servicios.
- volumes:
  Monta un archivo de configuración personalizado (fluent.conf) para definir cómo Fluentd procesa y almacena los logs.
  Almacena los logs procesados en un directorio (./logs) persistente en el host.
- networks: Conecta el servicio a la red compartida volley-network.

### Volúmenes (volumes)

Define los volúmenes persistentes para almacenar datos y configuraciones importantes:

    db_data: Almacena los datos de la base de datos MariaDB en el host, asegurando que no se pierdan al reiniciar el contenedor.
    fluentd_config: Almacena configuraciones específicas de Fluentd, como el archivo fluent.conf.
    fluentd_logs: Almacena los logs generados por Fluentd.

### Redes (networks)

Se ha definido una red personalizada (volley-network) que permite a los contenedores comunicarse entre sí de forma privada y segura.

## GitHub Packages
GitHub Packages es un registro integrado en GitHub que permite almacenar, compartir y gestionar paquetes de software directamente en tus repositorios. Es compatible con varios formatos, como contenedores Docker, bibliotecas Node.js, paquetes de Maven, NuGet, RubyGems y más.

Se ha creado el fichero [docker-publish.yml](https://github.com/ismeh/VolleyConnect/blob/main/.github/workflows/docker-publish.yml) para que se genere una imagen de docker y se publique en los paquetes del proyecto.