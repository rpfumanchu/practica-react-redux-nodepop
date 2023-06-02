# Práctica NodePop-React

# Usuario por defecto rober@gmail.com contraseña 123123

## Esta app consume como backend.

https://github.com/davidjj76/nodepop-api

## Si necesitas instala las dependencias con:

```sh
npm install
```

## Para iniciar el proyecto

```sh
npm start
```

## Ya tienes el backend corriendo en el puerto 3001

### En el backend tendremos disponibles los siguientes endpoints:

- /api/auth/signup
  - POST: Nos permite crear usuarios.
- /api/auth/me
  - GET: Nos devuelve la información del usuario autenticado
- /api/auth/login
  - POST: Devuelve un token de acceso cuando le pasamos un email y
    password de un usuario correctos.
- /api/v1/adverts
  - GET: Devuelve un listado de anuncios, con la posiblidad de aplicar
    filtros con la query que enviemos en la URL. Los filtros posibles son:
  - name=coche (que el nombre empiece por “coche”, sin importar
    MAY/MIN)
  - sale=true/false (si el anuncio es de compra o venta)
  - price=0-25000 (precio dentro del rango indicado)
  - tags=motor,work (que tenga todos los tags)
- POST: Crea un anuncio.
- /api/v1/adverts/tags
  - GET: Devuelve el listado de tags disponibles.
- /api/v1/adverts/:id
  - GET: Devuelve un único anuncio por Id.
- DELETE: Borra un anuncio por Id.

# Frontend

## Instala las dependencias con:

```sh
npm install
```

La aplicación frontend será una SPA (Single Page Application) desarrollada con
React como librería principal. Podéis crear la aplicación con create-react-app para
que no os tengáis que preocupar de la inicialización del proyecto.
En la aplicación se implementarán una serie de rutas (enrutado en el navegador)
divididas en dos grupos: Públicas y Protegidas. En cada una de la rutas se
renderizará un componente principal tal como se explica a continuación.

- Públicas: Accesibles para cualquier usuario.
  - /login: LoginPage
- Protegidas: Accesibles SOLO para usuarios autenticados. Cualquier acceso
  de un usuario no autenticado a cualquiera de estas rutas redireccionará a
  /login.
- /: Redirecciona a /adverts
- /adverts: AdvertsPage
- /adverts/:id: AdvertPage
- /adverts/new: NewAdvertPage
- Para cualquier otra url que no coincida se creará un componente
  NotFoundPage que informará al usuario que la página solicitada no
  existe (la típica 404).
  Funcionalidad de cada página-componente:
- LoginPage:
  - Formulario con inputs para recoger email y password del usuario.
  - Checkbox “Recordar contraseña” mediante el que indicaremos si
    guardamos en el localStorage el hecho de que hay un usuario logado,
    evitando tener que introducir credenciales en cada visita al sitio
    (pensad la información mínima que os interesea guardar).
- AdvertsPage:
  - Listado de anuncios. Cada anuncio presentará nombre, precio, si es
    compra o venta y los tags. No es necesario mostrar la foto en este
    listado.
    o Manejará el estado cuando no haya ningún anuncio de mostrar, con un
    enlace a la página de creación de anuncios.
    o Cada anuncio del listado tendrá un enlace al detalle del anuncio (ruta
    /adverts/:id).
- Zona de filtros: Formulario con distintos inputs, donde podremos
  introducir los filtros que queremos aplicar sobre el listado.
  La idea es que a medida que vayamos eligiendo filtros se reduzca el
  número de anuncios mostrados, es decir, los anuncios filtrados
  mostrados deben cumplir todos los filtros elegidos.
- AdvertPage:
  - Detalle del anuncio cuyo id es recogido de la URL. Mostrará la foto del
    anuncio o un placeholder en su lugar si no existe foto.
  - Si el anuncio no existe deberia redirigirnos al NotFoundPage.
  - Botón para poder borrar el anuncio. Antes de borrar mostar una
    confirmación al usuario (algo más elaborado que un window.confirm,
    jugando con el estado de React). Tras el borrado debería redireccionar
    al listado de anuncios.
- NewAdvertPage:
  - Formulario con TODOS los inputs necesarios para crear un nuevo
    anuncio:
- Nombre
- Compra / Venta
- Tags disponibles.
- Precio
- Foto
  - Todos los campos, excepto la foto serán requeridos para crear un
    anuncio. Manejar estas validaciones con React, por ejemplo
    desabiltando el submit hasta pasar todas las validaciones.
- Tras la creación del anuncio debería redireccionar a la página del
  anuncio.
- Además de estos componentes necesitaremos un componente visible cuando
  el usuario esté logeado desde el que podamos hacer logout (un botón por
  ejemplo, a poder ser possible con confirmación, pensando en reusar lo que
  hayamos hecho en la confirmación de borrado).
- Las rutas de /adverts y /adverts/new deben de estar accesibles fácilmente
  mediante enlaces de navegación (Link o NavLink).

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
