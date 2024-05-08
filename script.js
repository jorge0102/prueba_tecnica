
const idSeleccionados = [];
const cuadrados = [];
let contador = 0;
// crear 48 cuadrados
for (let index = 0; index < 48; index++) {
    const cuadrado = document.createElement("div");
    cuadrado.textContent = "FICHAS";
    cuadrado.setAttribute("id",  cacularId(index));
    cuadrado.addEventListener('click', getData);

    document.getElementById("tablero").appendChild(cuadrado);
}


function getData(e) {
    let id = e.currentTarget.id;
    const idHtml = e.currentTarget.id;

    if(id.split('-')[1] === 'ultimo') {
        id = id.split('-')[0]
    }

    fetch(`http://lamarr.srv.tecalis.com/pruebaNivel.php?employee=${id}`, {
        method: 'GET'
    }).then(response => response.json())
    .then(data => {
        document.getElementById(idHtml).innerHTML = 
        `<p>${data.id}</p>
         <p>${data.employee_name}</p>
         <p>${data.employee_salary}</p>
         <p>${data.employee_age}</p>
         <p>${data.profile_image}</p>
        `

        idSeleccionados.push(idHtml);
    }
    )
    .catch(error => console.error('Error:', error))
}


function cacularId(index) {
    if(index < 24) {
        return index + 1;
    } else {
        contador++;
        return `${contador}-ultimo`;
    }
}