let incidencias = JSON.parse(localStorage.getItem("incidencias")) || [];

// REGISTRAR INCIDENCIA
const form = document.getElementById("formIncidencia");
if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const incidencia = {
            usuario: document.getElementById("usuario").value,
            descripcion: document.getElementById("descripcion").value,
            estado: document.getElementById("estado").value,
            prioridad: document.getElementById("prioridad").value
        };

        incidencias.push(incidencia);
        localStorage.setItem("incidencias", JSON.stringify(incidencias));
        alert("Incidencia registrada correctamente");
        form.reset();
    });
}

// MOSTRAR INCIDENCIAS
const tabla = document.getElementById("tablaIncidencias");

function mostrarIncidencias(lista) {
    if (!tabla) return;
    tabla.innerHTML = "";

    lista.forEach(i => {
        tabla.innerHTML += `
            <tr>
                <td>${i.usuario}</td>
                <td>${i.descripcion}</td>
                <td>${i.estado}</td>
                <td>${i.prioridad}</td>
            </tr>
        `;
    });
}

// FILTROS
const filtroEstado = document.getElementById("filtroEstado");
const filtroPrioridad = document.getElementById("filtroPrioridad");

function aplicarFiltros() {
    let filtradas = incidencias;

    if (filtroEstado.value) {
        filtradas = filtradas.filter(i => i.estado === filtroEstado.value);
    }

    if (filtroPrioridad.value) {
        filtradas = filtradas.filter(i => i.prioridad === filtroPrioridad.value);
    }

    mostrarIncidencias(filtradas);
}

if (filtroEstado && filtroPrioridad) {
    filtroEstado.addEventListener("change", aplicarFiltros);
    filtroPrioridad.addEventListener("change", aplicarFiltros);
    mostrarIncidencias(incidencias);
}