import fetch from 'node-fetch';
import cheerio from 'cheerio';
import fs from 'fs';

const baseURL = 'https://[prueba]/vcard/';
const batchSize = 100; // Procesaremos 100 IDs a la vez
const idInicial = 'cd89fe'; // Este es el ID inicial que quieres procesar

// Función para generar un ID hexadecimal aleatorio de 6 caracteres
function generarIdHexAleatorio() {
  const caracteresHex = '0123456789abcdef';
  let id = '';
  for (let i = 0; i < 6; i++) {
    id += caracteresHex.charAt(
      Math.floor(Math.random() * caracteresHex.length)
    );
  }
  return id;
}

const fetchAllLinks = async (idInicial = generarIdHexAleatorio()) => {
  // Generar un lote de IDs hexadecimales aleatorios, incluyendo el ID inicial si se proporciona
  const ids = idInicial
    ? [
        idInicial,
        ...Array.from({ length: batchSize - 1 }, generarIdHexAleatorio),
      ]
    : Array.from({ length: batchSize }, generarIdHexAleatorio);

  const links = ids.map((id) => `${baseURL}${id}`);
  console.log(`Procesando los siguientes enlaces: ${links.join(', ')}`); // Mostrar los enlaces que se van a procesar

  try {
    const results = await Promise.allSettled(links.map((link) => fetch(link)));

    const data = await Promise.all(
      results.map(async (result, index) => {
        const currentID = ids[index];

        if (result.status === 'fulfilled') {
          const htmlText = await result.value.text();
          const $ = cheerio.load(htmlText);
          // Asumiendo que quieres obtener el contenido de la etiqueta meta "og:title"
          const ogTitle = $('meta[property="og:title"]').attr('content');
          const ogImage = $('meta[property="og:image"]').attr('content');

          if (ogTitle && ogImage) {
            return `${currentID}: Título - ${ogTitle}, Imagen - ${ogImage}`;
          } else {
            console.error(
              `Información no encontrada en el enlace ${links[index]}`
            );
            return `${currentID}: Información no encontrada`;
          }
        } else {
          console.error(
            `Error con el enlace ${links[index]}: ${result.reason}`
          );
          return `${currentID}: Error en la solicitud`;
        }
      })
    );

    return data;
  } catch (error) {
    console.error('Error inesperado:', error);
    return [];
  }
};

const processAllBatches = async () => {
  // Procesar primero el lote con el ID inicial
  let results = await fetchAllLinks(idInicial);
  console.log(`Lote con ID inicial ${idInicial} procesado.`);

  // Puedes decidir cuántos lotes adicionales quieres procesar, excluyendo el inicial
  const numberOfBatches = 100;

  for (let i = 0; i < numberOfBatches; i++) {
    const batchResults = await fetchAllLinks();
    results = results.concat(batchResults);
    console.log(`Lote ${i + 1} procesado.`); // Comienza en 1 después del lote inicial
  }

  fs.writeFileSync('results.log', results.join('\n'), 'utf-8');
  console.log('Resultados guardados en results.log');
};

processAllBatches();
