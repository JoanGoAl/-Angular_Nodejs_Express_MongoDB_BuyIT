PRÁCTICA DOCKER-COMPOSE MOISÉS GUEROLA
======================  
Contenedor MongoDB
-------------
Crear un archivo `mongo-init.js` el cual creará un usuario en MongoDB y le dará permisos de lectura y escritura sobre base de datos "buyIT":

````javascript
db = db.getSiblingDB("buyIT")
db.createUser(
	{
		user: "gfmois",
		pwd: "1234",
		role: [
			{
				role: "readWrite",
				db: "buyIT"
			}
		]
)
````

Y creamos otro archivo, `mongorestore.sh`, encargado de importar todas las colecciones de la aplicación adentro de MongoDB, para que este script funcione tenemos que crear un volumen hacia la ruta `/db-dump` que almacenará todos los archivos con los datos de respaldo:
````bash
#!/usr/bin/env bash
FILES="/db-dump/*.json";
for  f  in  $FILES;  do
	mongoimport --authenticationDatabase admin --username gfmois --password 1234 -d buyIT --jsonArray --file $f;
done
````

Estos archivo usando los volumenes de docker-compose lo añadiremos a la siguiente ruta la cual se encarga de lanzar todo lo que se encuentre dentro de la carpeta, en mi caso `mongo-init.js` y `mongorestore.sh`.
El servicio de MongoDB en el archivo `docker-compose.yml` quedaría así:
````yml
mongodb:
        image: mongo
        container_name: mongo_container
        restart: always
        ports:
                - 27018:27017
        environment:
                - MONGO_INITDB_ROOT_USERNAME=gfmois
                - MONGO_INITDB_ROOT_PASSWORD=1234
                - MONGO_INITDB_DATABASE=buyIT
        volumes:
                - ./backend/src/db:/db-dump
                - ./mongo/mongo-init.js:/docker-entrypoint-initdb.d/mongo-init.js:ro
                - ./mongo/mongorestore.sh:/docker-entrypoint-initdb.d/mongorestore.sh
        networks:
                - angular_net
````

Contenedor Backend
-------------
Crear un Dockerfile multistage partiendo ambas stages de la imagen `node:19-alpine`, el cual se encarga de poner a punto el servidor `express` de backend ya sea instalando las dependencias, y demás. A parte modificar el `index.js` que se encarga de lanzar el servidor entero para que se pueda conectar a MongoDB dentro del contendor usando las credenciales del usuario creado en el contenedor Mongo anterior y modificar el `index.js` de la carpeta `routes`.

__Dockerfile__:
En la primera stage se copia el `package.json` adentro del contenedor para instalar todas las dependencias y generar el `node_modules`, el cual en la segunda stage, la que se encarga de arrancar el servidor, copiara los archivos necesarios como el `.env`, `package.json`, `node_modules`, `index.js` para poder lanzar el servidor, `src` que es el servidor en sí.
````dockerfile
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

__index.js__:
Añadimos configuración al index.js que es el usuario y la contraseña para poder entrar en la base de datos y añadimos otra configuración que es el `authSource` que es donde mirará los permisos del usuario y demás.
Y como ultimo modificamos el `app.use` de las rutas y le añadimos un `/api` tal y como está para mas adelante con el `nginx` poder hacerle peticiones. 
````javascript
const  express  =  require("express");
const  mongoose  =  require('mongoose')
require('dotenv').config()

const  app  =  express();
const  port  =  3000;

app.use('/api', require('./src/routers'))

mongoose.connect(`mongodb://mongodb:27017/buyIT`, {
	useNewUrlParser: true,
	authSource: "admin",
	user: process.env.USERNAME,// gfmois
	pass: process.env.PASSWORD // 1234
}).then(() => {
	console.log('Connected to MongoDB');
}).catch(err  =>  console.log(err));

app.listen(port, () => {
	console.log(`Server Listening on http://localhost:${port} 🚀`)
})
````

__index.js__ de la carpeta __routes__:
Creamos una constante, `client`, importando el paquete `prom-client` de la cual crearemos una variable, `collectDefaultMetrics`,  en esta le pondremos de timeout `5000`. Una vez creada la contante creamos una función que se encargará de hacer de contador de una ruta llamada `endpoint`
la cual la pondremos como `middleware` en las rutas que queramos y crearemos otra ruta llamada `metrics` la cual devolverá todas las métricas del servidor incluyendo la nueva creada por nosotros.
````js
const cors = require('cors');
const morgan = require('morgan')
const bodyParser = require('body-parser')
const router = require('express').Router()

let client = require('prom-client');
const collectDefaultMetrics = client.collectDefaultMetrics;

collectDefaultMetrics({ timeout: 5000 });

const counterPracticaEndpoint = new client.Counter({
	name:`_endpoint`,
	help:`Total de peticiones para el endpoint`
})

router.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

router.use(cors());
router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())
router.use(morgan('dev'))

router.use('/metrics', (req, res) => {
	res.set('Content-Type', client.register.contentType);
	client.register.metrics().then(data  =>  res.send(data))
});

router.use('/products', (req, res, next) => { counterPracticaEndpoint.inc(); next() }, require('./product.route'))
router.use('/categories', (req, res, next) => { counterPracticaEndpoint.inc(); next() }, require('./category.route'))
router.use('/productsXcategory', (req, res, next) => { counterPracticaEndpoint.inc(); next() }, require('./productsXcategory.route'))
router.use('/auth', (req, res, next) => { counterPracticaEndpoint.inc(); next() }, require('./user.routes'))
router.use('/profile', (req, res, next) => { counterPracticaEndpoint.inc(); next() }, require('./profile.routes'))
router.use('/comments', (req, res, next) => { counterPracticaEndpoint.inc(); next() }, require('./comments.routes'))

module.exports  =  router;
````

__docker-compose__ del servicio backend:
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
                - angular_net
        command: npm start
````

Contenedor Frontend
-------------
Creamos un `Dockerfile` bastante parecido al del servicio backend pero simplemente cambiando los archivos copiados al interior del contenedor como `angular.json`, o los `tsconfig`, a parte exponemos los puertos `4200` y el `49153`, el primero es por donde saldrá la aplicación y el segundo es el puerto del `live server` de angular. En el proyecto de angular también hay que cambiar un poco los `enviroment.ts` y los `services`:

__Dockerfile__:
Como en el dockerfile del backend tenemos dos stages, el primero creará el `node_modules` y el segundo copiará archivos de configuración al contenedor y lanzará el proyecto angular.
````dockerfile
FROM node:19-alpine as installer
WORKDIR /app
RUN npm install -g @angular/cli
COPY package.json .
RUN npm install

FROM node:19-alpine as start
WORKDIR /usr/src/app

RUN apk add bash
RUN apk update && apk add bash
COPY src ./src
COPY ["package.json", "angular.json", "tsconfig.app.json", "tsconfig.json", "tsconfig.spec.json", "./"]
COPY --from=installer /app/node_modules ./node_modules

EXPOSE 4200 49153
````

__Enviroment.ts__:
Cambiamos el valor de `url` a `/api` para mas adelante en el servicio de `nginx` hacer que nos redirija al servicio `backend`.
````ts
export  const  environment  = {
	production: false,
	url: '/api'
};
````

__Services__:
Este es uno, hay que cambiar prácticamente todos los servicios de `http://localhost:3000` a `/api` y dejarlo como en el ejemplo de `categories.service.ts` el `baseUrl`:
````ts
import { Injectable } from  '@angular/core';
import { HttpClient, HttpParams } from  '@angular/common/http';
import { BehaviorSubject, Observable } from  'rxjs';
import { Category } from  '../models';

@Injectable({
	providedIn: 'root',
})
export  class  CategoryService {
	private  baseUrl  =  '/api/categories';
	
	constructor(private  _http:  HttpClient) {}
	getCategories(count: number =  0, offset: number =  0):  Observable<Category[]> {
		count  =  typeof  count  ==  'number'  ?  count  :  -1;
		offset  =  typeof  offset  ==  'number'  ?  offset  :  -1;
		
		let  params  =  new  HttpParams().set('count', count).set('offset', offset);
		return  this._http.get<Category[]>(`${this.baseUrl}/getCategories`, {
			params,
		});
	}

	getCategoryInfo(catsArr:  String[]):  Observable<any[]> {
		return  this._http.get<any[]>(`${this.baseUrl}/getCategoryInfo`, {
			params: new  HttpParams().set('categories', JSON.stringify(catsArr))
		});
	}
}
````

__Docker-compose__ del servicio frontend:
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
                - angular_net
        command: npm start
````

Contenedor NGINX
-------------
En el `docke-compose.yml` creamos un nuevo servicio llamado `nginx_loadbalancer` el cual parte de la imagen `nginx:stable`. Este servicio permitirá entrar al proyecto de angular lanzado en el puerto `4200` por el puerto `80` y hará peticiones al servidor express expuesto en el puerto `3000` por el puerto `80` usando la ruta `http://localhost/api`. Para ello tenemos que modificar el `nginx.conf`:

__nginx.conf__:
Simplmente modificamos los valores del `upstream` dentro del `http` poniendo como valor del `server` el nombre del servicio `frontend` y `backend` y sus puertos correspondientes `4200` y `3000` y una vez tenemos eso al lanzar el `docker-compose up` nos hará el enrutamiento:
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

__docker-compose__ del servicio nginx:
````yml
nginx_loadbalancer:
        image: nginx:stable
        restart: always
        container_name: nginx_loadbalancer_container
        volumes:
                - ./conf/loadbalancer/nginx.conf:/etc/nginx/nginx.conf
        depends_on:
                - frontend
        ports:
                - 80:80
        command: ["nginx", "-g", "daemon off;"]
        networks:
                - angular_net
````
Contenedores Opcionales
========

Contenedor Prometheus
-------
En el `docker-compose.yml` crearemos un servicio nuevo llamado `prometheus` que partirá de la imagen `prom/prometheus:v2.20.1` y añadiremos un volumen del archivo `prometheus.yml` a `/etc/prometheus/`.
Expondremos un puerto que saldrá del contenedor por el `9090` hacia el `9090` del ordenador.

__prometheus.yml__:
Simplemente cambiamos el `job_name` al nombre que queramos, en mi caso he puesto __buyIT-angular-express-app__ y cambiamos el `target` al nombre del servicio backend con su puerto correspondiente `backend:3000` 

````yml
global:
        scrape_interval: 5s
        evaluation_interval: 30s
scrape_configs:
        - job_name: "buyIT-angular-express-app"
        honor_labels: true
        static_configs:
                - targets: ["backend:3000"]
````

__docker-compose.yml__ del servicio:
````yml
prometheus:
        image: prom/prometheus:v2.20.1
        container_name: prometheus_practica
        volumes:
                - ./conf/prometheus/prometheus.yml:/etc/prometheus/prometheus.yml
        depends_on:
                - backend
        network:
                - angular_net
        command: --config.file=/etc/prometheus/prometheus.yml
````

Contenedor Grafana
------
Creamos en el  `docker-compose.yml` un servicio nuevo con la imagen `grafana/grafana:7.1.5`, el servicio expondrá el puerto `3000` del contenedor hacia el `3500`, creará dos volúmenes, el primero se encargará de almacenar la información creada en grafana y el segundo la de importar la información de `prometheus`.
En el servicio añadiremos varias variables de entorno para deshabilitar el `login` de grafana y instalar un plugin (`grafana-clock-panel 1.0.1`).

 - `GF_AUTH_DISABLE_LOGIN_FORM: "true"`
 - `GF_AUTH_ANONYMOUS_ENABLED: "true"`
 - `GF_AUTH_ANONYMOUS_ORG_ROLE: Admin`
 - `GF_INSTALL_PLUGINS: grafana-clock-panel 1.0.1 `

__datasource.yml__:
````yml
apiVersion: 1
datasources:
        - name: Prometheus
          type: prometheus
          access: proxy
          orgId: 1
          url: prometheus:9000
          basicAuth: false
          isDefault: true
          editable: true
````

__docker-compose.yml__ del servicio grafana:
````yml
grafana:
        image: grafana/grafana:7.1.5
        container_name: grafana_practica
        enviroment: 
                - GF_AUTH_DISABLE_LOGIN_FORM: "true"
                - GF_AUTH_ANONYMOUS_ENABLED: "true"
                - GF_AUTH_ANONYMOUS_ORG_ROLE: Admin
                - GF_INSTALL_PLUGINS: grafana-clock-panel 1.0.1
        depends_on:
                - prometheus
        ports:
                - 3500:3000
        volumes:
                - myGrafanaVol:/var/lib/grafana
                - ./conf/prometheus/datasource.yml:/etc/grafana/provisioning/datasources/datasource.yml
        networks:
                - angular_net
````
