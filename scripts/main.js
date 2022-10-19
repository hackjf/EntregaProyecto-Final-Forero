//Base de datos
const listaDeServicios = [
    {
        id: 0,
        nombre: "Diagnostico",
        precio: 75000,
        msg: "Ha elegido servicio de diagnóstico, el cual consiste en realizar la validación técnica en nuestro centro de servicio y generar una cotización según lo requiera el equipo."
    },
    {
        id: 1,
        nombre: "Mantenimiento",
        precio: 140000,
        msg: "Ha elegido servicio de mantenimiento, el cual consiste en realizar inicialmente una validación técnica en nuestro centro de servicio, seguido de la limpieza y mantenimiento del equipo según lo requiera. En el caso de que el equipo requiera de una reparación, se generará una cotización para su posterior aprobación."
    },
    {
        id: 2,
        nombre: "Reparación",
        precio: 160000,
        msg: "Ha elegido servicio de reparación, a continuación seleccione el repuesto del equipo a cotizar, ten en cuenta que el valor dado es un estimado y que el precio exacto se dará al momento del diagnóstico y también la disposición de stock del repuesto"
    }
]

const listaDeRepuestos = [
    {
        id: 0,
        nombre: "Sensor de Imagen",
        precio: 500000,
        stock: 12
    },
    {
        id: 1,
        nombre: "Tarjeta principal",
        precio: 450000,
        stock: 5
    },
    {
        id: 2,
        nombre: "Obturador",
        precio: 145000,
        stock: 4
    },
    {
        id: 3,
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
let subTotal = document.getElementById("subTotal")
let etiquetaSubTotal = document.createElement("label")
let mostrarServicio = document.createElement("p")
let descripcionServicio = document.createElement("p")
etiquetaSubTotal.classList.add("text-center", "text-success", "fw-bold", "form-control", "h-100")
etiquetaSubTotal.innerHTML = ``


function servicioSeleccionado(e) {
    e.target.value == (listaDeServicios[e.target.value].id)
    let precio = listaDeServicios[e.target.value].precio
    etiquetaSubTotal.innerHTML = `Subtotal: ${formatearMoneda.format(precio)}`    
    descripcionServicio.innerHTML = listaDeServicios[e.target.value].msg
    descripcionServicio.classList.add("text-info", "fw-bold", "form-control", "h-100")
    mostrarServicio.innerHTML = `Servicio de ${listaDeServicios[e.target.value].nombre}`
    mostrarServicio.classList.add("text-center", "card-text", "font-weight-bold")    
    subTotal.appendChild(mostrarServicio)
    subTotal.appendChild(etiquetaSubTotal)
    formulario.innerHTML = ``
    tipoRepuesto.classList.remove("d-block")
    tipoRepuesto.innerHTML = `<option value="" disabled selected>-- Seleccione el repuesto --</option>`
    formulario.appendChild(descripcionServicio)
    if (e.target.value == 2) {
        reparacion()
    }
}

const reparacion = () => {
    formulario.innerHTML = ``
   
    formulario.appendChild(descripcionServicio)
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
    e.target.value == (listaDeRepuestos[e.target.value].id)
    let precio = listaDeRepuestos[e.target.value].precio

}
