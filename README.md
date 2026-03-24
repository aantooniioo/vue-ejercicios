# Vue Ejercicios

Aplicación desarrollada con Vue 3 que integra dos ejercicios en una única SPA (Single Page Application), utilizando Vue Router, Vuetify, Pinia y Axios.

---

## Ejercicio 1

Gestión de artistas y discos:

- Crear, editar y eliminar artistas
- Crear, editar y eliminar discos
- Relación entre discos y artistas mediante un desplegable
- No se permite eliminar artistas con discos asociados
- Gestión del estado con Pinia (datos en memoria)

---

## Ejercicio 2

Consumo de API externa:

- Petición a una API mediante Axios mediante un botón
- Visualización de datos en tarjetas (Vuetify v-card)
- Filtro de búsqueda por título
- Paginación de resultados
- Vista de detalle de cada elemento

---

## Navegación

La aplicación cuenta con un menú superior con las siguientes rutas:

- API → Ejercicio 2
- Artistas → Ejercicio 1
- Discos → Ejercicio 1

---

## Tecnologías utilizadas

- Vue 3
- Vue Router
- Vuetify
- Pinia
- Axios

---

## Ejecución del proyecto

```bash
npm install
npm run dev
```

## Docker

El proyecto incluye un Dockerfile para ejecutar la aplicación en un contenedor:

```bash
docker build -t vue app .
docker run -p 5173:5173 vue-app


---