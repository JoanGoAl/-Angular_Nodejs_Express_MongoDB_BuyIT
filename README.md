Proyecto 2º DAW - BuyIT
============
Este proyecto se basa en crear una replica o similar a wallapop, una web donde un usuario puede subir sus productos a vender o comprar productos vendidos por otros usuarios.

Tecnologías
-----------
En este proyecto se han utilizado dos tecnologias:
> __ExpressJS__ - Versión 4.18.1 - Servidor  
> __Angular__ - Versión 14.2.0 - Cliente  

También se han utilizado iconos y componentes de:
> __PrimeNG__ - Versión 14.1.2 - Componentes  
> __PrimeIcons__ - Versión 6.0.1 - Iconos  
> __FontAwesome__ - Versión 6.2.0 - Iconos  

Funciones
--------
El proyecto tiene un __header__ como barra de navegación la cual te permite:
- Ir a la tienda
- Cambiar el tema a oscuro o claro dependiendo el que tengas activo
- Ir a inciar sesión o a tu perfil

y a parte del __header__ tiene unas funciones repartidas en las diferentes rutas:
1. __Home / Inicio__:
    - Primera vista de la web.
    - "infinite-scroll" para mostrar las categorias
    - Carousel de categorias
    - Con un click salta a la tienda con el filtro escogido
2.  __Shop / Tienda__:
    - Filtrar Productos
    - Dar me gusta a un producto
    - Entrar en los detalles del producto
3.  __Details / Detalles__:
    - Visitar perfil del vendedor
    - Dar me gusta al producto
    - Seguir al vendedor
4.  __Auth__:
    - Iniciar Sesión o Registrarse
5.  __Profile / Perfil__: 
    - Ver tus productos
    - Ver a quien sigues
    - Ver los productos que te gustan
6.  __Perfil de otro usaurio__:
    - Ver sus productos y entrar en los detalles de estos

Para iniciar el proyecto existen dos carpetas, backend y frontend:

    npm start # Backend - Inicia el Servidor Express
    ng s o npm start # Frontend - Inicia el proyecto en Angular
