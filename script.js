
document.getElementById("guardarBtn").addEventListener('click', guardarTxt);

const objetoSeleccionados = [];
const cuadrados = [];
let contador = 0;
// crear 48 cuadrados
for (let index = 0; index < 49; index++) {
    const cuadrado = document.createElement("div");
    cuadrado.setAttribute("class",  "cuadrado");
    cuadrado.setAttribute("id",  cacularId(index));
    cuadrado.classList.add(index % 2 === 0 ? 'blanco' : 'negro');
    cuadrado.addEventListener('click', getData);

    document.getElementById("tablero").appendChild(cuadrado);
}


function getData(e) {
    let id = e.currentTarget.id;
    const idHtml = e.currentTarget.id;

    if(id.split('-')[1] === 'ultimo') {
        id = id.split('-')[0]
    }

    const cuadradoSeleccionado = document.getElementById(idHtml);
    const estaSeleccionado = cuadradoSeleccionado.classList.contains('seleccionado');

    if (estaSeleccionado) {
        cuadradoSeleccionado.classList.remove('seleccionado');
        eliminarSeleccion(idHtml);
    } else {
        fetch(`http://lamarr.srv.tecalis.com/pruebaNivel.php?employee=${id}`, {
            method: 'GET'
        }).then(response => response.json())
        .then(data => {
            document.getElementById(idHtml).innerHTML = 
            `<p>${data.id}</p>
             <p>${data.employee_name}</p>
             <p>${data.employee_salary}</p>
             <p>${data.employee_age}</p>
             <p>${data.profile_image}</p>`;
    
            seleccionId(data);
            document.getElementById(idHtml).classList.add('seleccionado');
            console.log(objetoSeleccionados)
        })
        .catch(error => console.error('Error:', error))
    }
}

function eliminarSeleccion(idHtml) {
    const index = objetoSeleccionados.findIndex(item => item.id === idHtml);
    if (index !== -1) {
        document.getElementById(idHtml).innerHTML = '';
        objetoSeleccionados.splice(index, 1);
    }
}

function seleccionId(data) {
    document.getElementById("guardarBtn").disabled = false;
    const existe = objetoSeleccionados.some(item => JSON.stringify(item) === JSON.stringify(data));

    if (!existe) {
        objetoSeleccionados.push(data);
    }
}


function cacularId(index) {
    if(index < 24) {
        return index + 1;
    } 
    
    if (index === 48) {
        return `1-ultimo-final`;
    } 
    
    contador++;
    return `${contador}-ultimo`;
}

function guardarTxt() {
    if (objetoSeleccionados.length === 0) {
        document.getElementById("guardarBtn").disabled = true;
        return;
    }

    let contenidoTxt = '';
    objetoSeleccionados.forEach(data => {
        contenidoTxt += `${data.id}, ${data.employee_name}, ${data.employee_salary}, ${data.employee_age}, ${data.profile_image}\n`;
    });

    const blob = new Blob([contenidoTxt], { type: 'text/plain' });

    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'datos_seleccionados.txt';
    link.click();
}