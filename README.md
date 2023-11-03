# README

## Descripción del Proyecto

Este script de Node.js, `fetch.mjs`, está diseñado para hacer solicitudes a URLs que contienen tarjetas de presentación virtuales (vCards) generadas a partir de IDs hexadecimales. Utiliza la biblioteca `node-fetch` para las peticiones HTTP, `cheerio` para parsear el HTML y `fs` para guardar los resultados en un archivo.

## Cómo empezar

### Prerrequisitos

Debes tener Node.js y npm instalados en tu sistema para poder ejecutar este script. Si no los tienes instalados, descárgalos desde [la página oficial de Node.js](https://nodejs.org/).

### Instalación

Ejecuta el siguiente comando en tu terminal para instalar las dependencias:

```bash
npm install node-fetch cheerio fs
```

Si prefieres usar yarn, puedes hacerlo con:

```bash
yarn add node-fetch cheerio fs
```

### Configuración

Reemplaza el marcador `[prueba]` en la variable `baseURL` con el dominio objetivo:

```javascript
const baseURL = 'https://[prueba]/vcard/';
```

Cambiarlo para que se vea así:

```javascript
const baseURL = 'https://tudominio.com/vcard/';
```

## Uso

Para ejecutar el script, utiliza el siguiente comando en la terminal:

```bash
node fetch.mjs
```

El script procesará los lotes de IDs y almacenará los resultados en un archivo llamado `results.log`.

## Contribuciones

Las contribuciones son bienvenidas y son lo que hacen a la comunidad de código abierto un lugar tan maravilloso para aprender, inspirarse y crear. Cualquier contribución que hagas será **enormemente apreciada**.

1. Haz un Fork del proyecto.
2. Crea tu rama de características (`git checkout -b feature/AmazingFeature`).
3. Realiza tus cambios y haz commit (`git commit -m 'Add some AmazingFeature'`).
4. Haz push a tu rama (`git push origin feature/AmazingFeature`).
5. Abre una Pull Request.

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo `LICENSE` para más información.

## Contacto

Luis Humeau – [@l_humeau](https://twitter.com/l_humeau) - l.humeau@hynit.com

Enlace del proyecto: [https://github.com/lhumeau/Fetchvcards](https://github.com/lhumeau/Fetchvcards)

---

