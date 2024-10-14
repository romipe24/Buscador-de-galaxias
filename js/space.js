document.getElementById('btnBuscar').addEventListener('click', function() {
    const query = document.getElementById('inputBuscar').value;
  
    if (query) {
      // Realizamos la solicitud a la API
      fetch(`https://images-api.nasa.gov/search?q=${query}`)
        .then(response => response.json())
        .then(data => {
          // Limpiamos el contenedor antes de mostrar los resultados
          const contenedor = document.getElementById('contenedor');
          contenedor.innerHTML = '';
  
          // Verificamos si la respuesta tiene resultados
          const items = data.collection.items;
          const totalHits = data.collection.metadata.total_hits;
  
          if (totalHits > 0) {
            // Creamos una fila para las cards
            const row = document.createElement('div');
            row.className = 'row';
  
            // Iteramos sobre los resultados y los mostramos
            items.forEach(item => {
              const title = item.data[0].title;
              const description = item.data[0].description || 'No description available';
              const date = item.data[0].date_created;
              const imageUrl = item.links && item.links[0].href;
  
              // Creamos la columna para la card
              const col = document.createElement('div');
              col.className = 'col-lg-4 col-md-6 mb-4';  // Para 3 cards por fila en pantallas grandes
  
              // Creamos la card
              const card = document.createElement('div');
              card.className = 'card h-100';  // Asegura que todas las cards tengan la misma altura
  
              // Imagen
              const img = document.createElement('img');
              img.src = imageUrl;
              img.className = 'card-img-top';  // Clase para que todas las imágenes tengan el mismo tamaño
              img.alt = title;
  
              // Cuerpo de la card
              const cardBody = document.createElement('div');
              cardBody.className = 'card-body d-flex flex-column';  // Flex para distribuir el contenido verticalmente
  
              // Título
              const cardTitle = document.createElement('h5');
              cardTitle.className = 'card-title';
              cardTitle.textContent = title;
  
              // Descripción
              const cardText = document.createElement('p');
              cardText.className = 'card-text';  // Clase que limita la altura y agrega scroll
              cardText.textContent = description;
  
              // Fecha
              const cardDate = document.createElement('p');
              cardDate.className = 'text-muted mt-auto';  // mt-auto para empujar hacia abajo
              cardDate.textContent = `${date}`;
  
              // Agregamos elementos a la card
              cardBody.appendChild(cardTitle);
              cardBody.appendChild(cardText);
              cardBody.appendChild(cardDate);
              card.appendChild(img);
              card.appendChild(cardBody);
              col.appendChild(card);  // Agregamos la card a la columna
              row.appendChild(col);  // Agregamos la columna a la fila
            });
  
            // Agregamos la fila completa al contenedor
            contenedor.appendChild(row);
          } else {
            // Mostramos un mensaje si no hay resultados
            contenedor.innerHTML = '<p>No se encontraron resultados para la búsqueda.</p>';
          }
        })
        .catch(error => {
          console.error('Error al realizar la solicitud:', error);
          const contenedor = document.getElementById('contenedor');
          contenedor.innerHTML = '<p>Ocurrió un error al realizar la búsqueda. Por favor, intenta de nuevo.</p>';
        });
    } else {
      alert('Por favor, ingresa un término de búsqueda.');
    }
  });
  