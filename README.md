# Como iniciar

Una vez descargado el repositoria lo iniciaremos con el siguiente comando:

````
docker-compose up
````

# Partes docker-compose.yml

## Servicio de mongodb

Utilizaremos la imagen de **mongo**

El contenedor asociado se denominará **mongo_container**

Será el primer servicio en arrancar

La primera tarea que hará nada más arrancar será crear las tablas necesarias y realizar una restauración de datos partiendo de un fichero dump que previamente habréis generado y almacenado en una carpeta mongo de vuestro proyecto

Todos los ficheros de configuración necesarios residirán en una carpeta mongo de nuestro repositorio

---

Primero crearemos una carpeta a nivel de aplicación llamada `mongo`.

Dentro de esta carpeta crearemos el archivo `mongo-init.js`
````js
print("########### START ###########")

db = db.getSiblingDB('buyIT');
db.createUser(
    {
        user: "joan", // Nombre de usuario
        pwd: "1234", // Contraseña
        roles: [
            {
                role: "readWrite",
                db: "buyIT" // Nombre de la base de datos
            }
        ]
    }
)
````

Por ultimo crearemos un script `mongorestore.sh` el qual se encargará de importar los .json con la información de la base de datos:
````sh
#!/usr/bin/env bash
FILES="/db-dump/*.json"; 
for f in $FILES; do 
	mongoimport --authenticationDatabase admin --username joan --password 1234 -d buyIT --jsonArray --file $f; 
  # Hace una migración de todos los ficheros json que se encuentran en la carpeta db-dump
done
````

<br>

---

En el docker-compose.yml
````yml
mongodb:
    image: mongo
    container_name: mongo_container
    restart: always
    ports:
      - 27018:27017
    environment:
      - MONGO_INITDB_ROOT_USERNAME=joan
      - MONGO_INITDB_ROOT_PASSWORD=1234
      - MONGO_INITDB_DATABASE=buyIT
    volumes:
      - ./mongo/mongo-init.js:/docker-entrypoint-initdb.d/mongo-init.js:ro
      - ./mongo/mongorestore.sh:/docker-entrypoint-initdb.d/mongorestore.sh
      - ./backend/src/db:/db-dump
    networks:
      - angular_net
````

## Servicio de backend

Utilizará una multi-stage build (al menos tendrá dos etapas) para generar la imagen de la parte backend de vuestro proyecto implementada con express. Partirá de una imagen node:19-alpine

No arrancará hasta que el servicio de mongodb no esté preparado completamente

El contenedor asociado se denominará **backend_container**

Ejecutará como primer comando nada más arrancar: **npm start**

---

Configuraremos el fichero `index.js` para poder conectarse a mongo
````js
mongoose.connect(`mongodb://mongodb:27017/buyIT`, {
    useNewUrlParser: true,
    authSource: "admin",
    user: process.env.USERNAME,
    pass: process.env.PASSWORD
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => console.log(err));
````

En el docker-compose.yml
````yml
backend:
    build: ./backend
    container_name: backend_container
    restart: always
    depends_on:
      - mongodb
    ports:
      - 3000:3000
    networks:
      - practica_net
    command: npm start
````

/backend/Dockerfile
````Dockerfile
FROM node:19-alpine as builder
WORKDIR /app
COPY package.json .
RUN npm install
 
FROM node:19-alpine as start
WORKDIR /usr/src/app
RUN apk update && apk add bash
 
COPY package.json .
COPY ./.env ./.env
COPY index.js ./index.js
COPY ./src ./src
COPY --from=builder /app/node_modules ./node_modules
 
EXPOSE 3000
````

## Servicio de frontend

Utilizará una multi-stage build (al menos tendrá dos etapas) para generar la imagen de vuestra parte implementada en angularjs. Partirá de una imagen node:19-alpine
.
Arrancará tras el servicio de backend

El contenedor asociado se denominará frontend_container

Ejecutará como primer comando nada más arrancar: npm start

<br>

---

En el docker-compose.yml
````yml
frontend:
    build: ./frontend
    container_name: frontend_container
    restart: always
    depends_on:
      - backend
    ports:
      - 4200:4200
    networks:
      - practica_net
    command: npm start
````

/frontend/Dockerfile
````Dockerfile
FROM node:19-alpine as installer
WORKDIR /app
RUN npm install -g @angular/cli
COPY package.json .
RUN npm install
 
FROM node:19-alpine as start
ENV NODE_OPTIONS=--max_old_space_size=2048
 
WORKDIR /usr/src/app
 
RUN apk add bash
RUN apk update && apk add bash
 
COPY src ./src
COPY ["package.json", "angular.json", "tsconfig.app.json", "tsconfig.json", "tsconfig.spec.json", "./"]
COPY --from=installer /app/node_modules ./node_modules
 
EXPOSE 4200 49153
````

## Servicio mongo-express

Nos permitirá administrar la base de datos mongo. Utilizará la imagen oficial de mongo-express

El contenedor asociado se denominará **adminMongo_container**

Arrancará después del servicio de **mongodb**

<br>

---

En el docker-compose.yml
````yml
mongo_express:
    image: mongo-express:latest
    container_name: adminMongo_container
    restart: always
    environment:
      ME_CONFIG_OPTIONS_EDITORTHEME: ambiance
      ME_CONFIG_MONGODB_URL: mongodb://joan:1234@mongodb:27017/
    ports:
      - 8282:8081
    depends_on:
      - mongodb
    networks:
      - practica_net
````

## Servicio de loadbalancer de nginx

Nos permitirá implementar un sistema de balanceo de carga/proxy en nuestro sistema 

Partirá de la imagen oficial de nginx

Asociará un fichero de configuración de nginx (nginx.conf) que tendremos en la carpeta loadbalancer de nuestro repositorio con el mismo fichero de la carpeta /etc/nginx/ de la imagen. Este fichero nos permitirá implementar el balanceador de carga y su contenido será similar al adjuntado a esta tarea (realizando las modificaciones oportunas para adecuarlo a vuestras necesidades).

Ejecutará como primer comando nada más arrancar: nginx -g daemon off

---

Primero crearemos un carpeta `./conf/loadbalancer` donde crearemos un fichero llamado `nginx.conf`

````nginx
events {
  worker_connections 1024;
}

http {
  upstream frontend {
    # These are references to our backend containers, facilitated by
    # Compose, as defined in docker-compose.yml
    server frontend:4200;
  } 
  upstream backend {
    # These are references to our backend containers, facilitated by
    # Compose, as defined in docker-compose.yml
    server backend:3000;
  }
  

 server {
    listen 80;
    server_name frontend;
    server_name backend;

    location / {
       resolver 127.0.0.1 valid=30s;
       proxy_pass http://frontend;
       proxy_set_header Host $host;
    }
    location /api {
      resolver 127.0.0.1 valid=30s;
       proxy_pass http://backend;
       proxy_set_header Host $host;
    }
  }
}
````
En el docker-compose.yml
````yml
nginx_loadbalancer:
    image: nginx:stable
    container_name: nginx_loadbalancer_container
    depends_on:
      - frontend
    volumes:
      - ./conf/loadbalancer/nginx.conf:/etc/nginx/nginx.conf
    ports:
      - 80:80
    networks:
      - practica_net
    command: ["nginx", "-g", "daemon off;"]
````
