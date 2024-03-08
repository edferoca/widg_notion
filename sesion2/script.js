// Función para cargar el archivo de audio seleccionado
function cargarAudioSeleccionado() {
    const select = document.getElementById('audio-select');
    const reproductoresContainer = document.getElementById('reproductores');

    // Crear reproductor para el audio seleccionado
    const audio = new Audio(select.value);

    const controlsContainer = document.createElement('div');
    controlsContainer.classList.add('controls-container');
    audio.loop = true; // Establecer el bucle en true para reproducir en bucle
    const audioName = document.createElement('p');
    audioName.textContent = audio.src.split('/').pop();
    controlsContainer.appendChild(audioName);
    
    const playPauseButton = document.createElement('button');
    playPauseButton.classList.add('button', 'play-pause');
    playPauseButton.innerHTML = '&#9658;';
    controlsContainer.appendChild(playPauseButton);
    
    const volumeControl = document.createElement('input');
    volumeControl.type = 'range';
    volumeControl.classList.add('volume');
    volumeControl.min = 0;
    volumeControl.max = 1;
    volumeControl.step = 0.1;
    volumeControl.value = 1;
    controlsContainer.appendChild(volumeControl);

    const closeButton = document.createElement('button');
    closeButton.classList.add('close-button');
    closeButton.innerHTML = 'X';
    controlsContainer.appendChild(closeButton);

    // Agregar controles al contenedor
    reproductoresContainer.appendChild(controlsContainer);

    // Reproducir o pausar audio
    playPauseButton.addEventListener('click', function() {
        if (audio.paused) {
            audio.play();
            playPauseButton.innerHTML = '&#10074;&#10074;'; // Icono de pausa
            playPauseButton.style.backgroundColor = 'green'; // Cambiar color a verde cuando se reproduce
        } else {
            audio.pause();
            playPauseButton.innerHTML = '&#9658;'; // Icono de reproducir
            playPauseButton.style.backgroundColor = ''; // Restablecer color por defecto cuando se pausa
        }
    });

    // Control de volumen
    volumeControl.addEventListener('input', function() {
        audio.volume = volumeControl.value;
    });
    // Efecto de sombra al pasar el ratón sobre el botón de cierre
    closeButton.addEventListener('mouseover', function() {
        closeButton.style.boxShadow = '0 0 5px gray';
    });

    // Cerrar el reproductor
    closeButton.addEventListener('click', function() {
        audio.pause();
        controlsContainer.parentNode.removeChild(controlsContainer);
    });
}

// Leer el archivo de audio y cargar las opciones en la lista desplegable
window.addEventListener('DOMContentLoaded', function() {
    const select = document.getElementById('audio-select');
    fetch('audios.txt')
        .then(response => response.text())
        .then(data => {
            // Dividir el contenido del archivo por líneas y crear opciones para cada archivo
            data.split('\n').forEach(line => {
                const option = document.createElement('option');
                option.value = line.trim();
                option.textContent = line.trim();
                select.appendChild(option);
            });

            // Actualizar los controles de audio cuando se selecciona un archivo
            select.addEventListener('change', cargarAudioSeleccionado);
        });
});

