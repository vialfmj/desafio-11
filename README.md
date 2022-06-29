## Bienvenido al repositorio de mi proyecto para el desafio 15 del curso de backend de coderhouse

------------
Este proyecto consiste en desarrollar una app de mensajes usando socket.io

------------

Para este desafio se configuro el proyecto de manera que se pueda elegir por linea de comandos el modo de configuracion y el puerto donde se va a ejecutar la aplicacion.

------------

## Configuraciones para cumplir las consignas del desafio
### En los comandos se hará uso de dos variables:
- "port" para especificar el puerto de escucha. Por defecto port=8080
- "mode" para seleccionar el modo que tiene dos valores posibles: "FORK" o "CLUSTER". Por defecto mode=FORK

### Lista de comandos
- Cluster con nodemon: "npm run nodemoncluster"
- Fork con nodemon: "npm run nodemonfork"
- forever: forever src/index.js --port=<port> --mode=<mode> (--watch para activar el modo escucha)
- Fork pm2: pm2 start src/index.js (--watch para activar el modo escucha)
- Cluster pm2: pm2 start src/index.js -i <numeroDeClustersACrear> (--watch para activar el modo escucha)

## Ejercicios con Nginx
### Consigna: Redirigir todas las consultas de /api/randoms a un cluster nativo de node en el puerto 8080
   Pasos a seguir para resolverlo:
   - inciar el cluster en el puerto 8081 y un fork en el 8080.
   Para esto se debe ejecutar el comando  "pm2 start ejercicio1.config.js"
   - Ejecutar nginx con la siguiente configuracion:
 
worker_processes  1;

events {
    worker_connections  1024;
}
http {
    include       mime.types;
    default_type  application/octet-stream;

    upstream node_app {
        server 127.0.0.1:8080;
    }
    upstream randoms_app {
        server 127.0.0.1:8081;
    }
    sendfile        on;
    keepalive_timeout  65;
    server {
        listen       80;
        server_name  node;
        root ../desafio11/src/public;

        location / {
            proxy_pass http://node_app;
        }
        location /api/randoms {
            proxy_pass http://randoms_app;
        }

        location ~ \.css {
            add_header  Content-Type    text/css;
        }
        location ~ \.js {
            add_header  Content-Type    application/x-javascript;
        }
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
}
- Ejecutar en otra terminal pm2 log para verificar el PID cada vez q se hace un get
------------

### Consigna: redirigir todas las consultas a /api/radoms a un cluster de servidores gestionado por nginx en los puertos 8082 8083 8084 8085

Pasos a seguir para resolverlo:
   - inciar los servidores en los puertos 8080, 8082, 8083, 8084 y 8085.
   Para esto se debe ejecutar el comando  "pm2 start ejercicio2.config.js"
   - Ejecutar nginx con la siguiente configuracion:

   worker_processes  1;

events {
    worker_connections  1024;
}
http {
    include       mime.types;
    default_type  application/octet-stream;

    upstream node_app {
        server 127.0.0.1:8080;
    }
    upstream randoms_app {
        server 127.0.0.1:8082;
        server 127.0.0.1:8083;
        server 127.0.0.1:8084;
        server 127.0.0.1:8085;

    }
    sendfile        on;
    keepalive_timeout  65;
    server {
        listen       80;
        server_name  node;
        root ../desafio11/src/public;

        location / {
            proxy_pass http://node_app;
        }
        location /api/randoms {
            proxy_pass http://randoms_app;
        }

        location ~ \.css {
            add_header  Content-Type    text/css;
        }
        location ~ \.js {
            add_header  Content-Type    application/x-javascript;
        }
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
}
- Ejecutar en otra terminal pm2 log para verificar el PID cada vez q se hace un get
------------


