//Base de datos
const listaDeServicios = [
    {
        id: 1,
        nombre: "Diagnostico",
        precio: 75000,
        stock: 12
    },
    {
        id: 2,
        nombre: "Mantenimiento",
        precio: 140000,
        stock: 5
    },
    {
        id: 3,
        nombre: "Reparación",
        precio: 160000,
        stock: 4
    }
]

const listaDeRepuestos = [
    {
        id: 10,
        nombre: "Sensor de Imagen",
        precio: 500000,
        stock: 12
    },
    {
        id: 11,
        nombre: "Tarjeta principal",
        precio: 450000,
        stock: 5
    },
    {
        id: 12,
        nombre: "Obturador",
        precio: 145000,
        stock: 4
    },
    {
        id: 13,
        nombre: "Flash",
        precio: 132000,
        stock: 34
    }
]

//formateo de moneda
const formatearMoneda = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
});




//funcion para seleccionar los servicios
listaDeServicios.forEach((servicio) => {
    let tipoServicio = document.getElementById("tipoServicio")
    let listaServicios = document.createElement("option")
    listaServicios.value = servicio.id
    listaServicios.text = servicio.nombre
    listaServicios.setAttribute("mark", servicio.id)
    tipoServicio.appendChild(listaServicios)
    tipoServicio.addEventListener("change", servicioSeleccionado)
})


let formulario = document.getElementById("divRepuestos")
let para = document.createElement("p")
let subTotal = document.getElementById("subTotal")
let etiquetaSubTotal = document.createElement("label")
etiquetaSubTotal.classList.add("text-center", "text-success", "fw-bold", "form-control")
etiquetaSubTotal.innerHTML = ``


function servicioSeleccionado(e) {
    e.target.value == (listaDeServicios[e.target.value - 1].id)
    let precio = listaDeServicios[e.target.value - 1].precio
    etiquetaSubTotal.innerHTML = `Subtotal: ${formatearMoneda.format(precio)}`
    subTotal.appendChild(etiquetaSubTotal)
    formulario.innerHTML = ``
    tipoRepuesto.classList.remove("d-block")
    tipoRepuesto.innerHTML = `<option value="">-- Seleccione el repuesto --</option>`
    if (e.target.value == 3) {
        reparacion()
    }
}

const reparacion = () => {
    para.classList.add("text-info", "fw-bold", "form-control", "h-100")
    para.innerText = "Ha elegido servicio de reparación, a continuación seleccione el repuesto del equipo a cotizar, ten en cuenta que el valor dado es un estimado y que el precio exacto se dará al momento del diagnóstico y también la disposición de stock del repuesto"
    formulario.appendChild(para)

    listaDeRepuestos.forEach((repuesto) => {
        let tipoRepuesto = document.getElementById("tipoRepuesto")
        tipoRepuesto.classList.add("d-block", "form-control")

        let listaRepuestos = document.createElement("option")
        listaRepuestos.value = repuesto.id
        listaRepuestos.text = repuesto.nombre
        listaRepuestos.setAttribute("mark", repuesto.id)

        tipoRepuesto.appendChild(listaRepuestos)
    })
    tipoRepuesto.addEventListener("change", repuestoSeleccionado)
};

function repuestoSeleccionado(e) {
    e.target.value == (listaDeRepuestos[e.target.value - 10].id)
    let precio = listaDeRepuestos[e.target.value - 10].precio
    etiquetaSubTotal.innerHTML = `Subtotal: ${formatearMoneda.format(precio)}`
    subTotal.appendChild(etiquetaSubTotal)
}