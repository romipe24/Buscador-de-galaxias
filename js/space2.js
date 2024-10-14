document.getElementById('btnBuscar').addEventListener('click', function() {
  const query = document.getElementById('inputBuscar').value;

  if (query) {
    fetch(`https://images-api.nasa.gov/search?q=${query}`)
      .then(response => response.json())
      .then(data => {
        const contenedor = document.getElementById('contenedor');
        contenedor.innerHTML = ''; // Limpiar el contenido anterior

        const items = data.collection.items;
        const totalHits = data.collection.metadata.total_hits;

        if (totalHits > 0) {
          contenedor.innerHTML = '<div class="row"></div>'; // Crear un contenedor para las cards

          const rowElement = document.querySelector('#contenedor .row'); // Seleccionamos la fila

          items.forEach(item => {
            const title = item.data[0].title;
            const description = item.data[0].description || 'No description available';
            const date = item.data[0].date_created;
            const imageUrl = item.links && item.links[0].href;

            // Crear el HTML de la card
            const cardHtml = `
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="card h-100">
                  <img src="${imageUrl}" class="card-img-top" alt="${title}" style="height: 200px; object-fit: cover;">
                  <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text">${description}</p>
                    <p class="text-muted mt-auto">${date}</p>
                  </div>
                </div>
              </div>`;

            // Añadir la card al rowElement
            rowElement.innerHTML += cardHtml;
          });
        } else {
          contenedor.innerHTML = '<p>No se encontraron resultados para la búsqueda.</p>';
        }
      })
      .catch(error => {
        console.error('Error al realizar la solicitud:', error);
        document.getElementById('contenedor').innerHTML = '<p>Ocurrió un error al realizar la búsqueda. Por favor, intenta de nuevo.</p>';
      });
  } else {
    alert('Por favor, ingresa un término de búsqueda.');
  }
});
