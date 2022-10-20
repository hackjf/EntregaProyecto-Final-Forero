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
        nombre: "Sistema obturador",
        precio: 145000,
        stock: 4
    },
    {
        id: 3,
        nombre: "Sistema de flash",
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

let textoDebajo = document.getElementById("divRepuestos")
let subTotal = document.getElementById("subTotal")
let etiquetaSubTotal = document.createElement("label")
let mostrarServicio = document.createElement("p")
let descripcionServicio = document.createElement("p")
etiquetaSubTotal.innerHTML = ``

let carrito = []

//funcion para seleccionar los servicios
listaDeServicios.forEach((servicio) => {
    let tipoServicio = document.getElementById("tipoServicio")
    let listaServicios = document.createElement("option")
    listaServicios.value = servicio.id
    listaServicios.text = servicio.nombre
    tipoServicio.appendChild(listaServicios)
    tipoServicio.addEventListener("change", servicioSeleccionado)
})


function servicioSeleccionado(e) {
    e.target.value == (listaDeServicios[e.target.value].id)
    let precio = listaDeServicios[e.target.value].precio    
    etiquetaSubTotal.innerHTML = `Subtotal: ${formatearMoneda.format(precio)}`
    etiquetaSubTotal.classList.add("text-center", "text-success", "fw-bold", "form-control", "h-100", "wow", "fadeIn")
    descripcionServicio.classList.add("text-info", "fw-bold", "form-control", "h-100")
    descripcionServicio.innerHTML = listaDeServicios[e.target.value].msg
    mostrarServicio.classList.add("text-center", "card-text", "font-weight-bold")
    mostrarServicio.innerHTML = `Servicio de ${listaDeServicios[e.target.value].nombre}`
    subTotal.appendChild(mostrarServicio)
    subTotal.appendChild(etiquetaSubTotal)
    repuestos.innerHTML = ``
    tipoRepuesto.classList.remove("d-block")
    repuestos.appendChild(descripcionServicio)
    if (e.target.value == 2) {
        reparacion()
    }
}

let repuestos = document.getElementById("tipoRepuesto")
const reparacion = () => {
    repuestos.innerHTML = ``
    textoDebajo.appendChild(descripcionServicio)
    listaDeRepuestos.forEach((repuesto) => {
        let container = document.createElement("div")
        container.classList.add("card", "col-sm-12", "col-md-6" , "col-xl-3", "wow", "fadeIn")
        //Body
        let cardBody = document.createElement("div")
        cardBody.classList.add("card-body", "text-center")
        //Title
        let cardTitulo = document.createElement("h6")
        cardTitulo.classList.add("card-title")
        cardTitulo.innerText = repuesto.nombre
        //Precio
        let CardPrecio = document.createElement("p")
        CardPrecio.classList.add("card-text")
        CardPrecio.innerText = `${formatearMoneda.format(repuesto.precio)}`
        //Stock
        let cardStock = document.createElement("p")
        cardStock.classList.add("card-text")
        cardStock.innerText = `Disponibles: ${repuesto.stock}`
        //Button
        let cardButton = document.createElement("button")
        cardButton.classList.add("btn", "btn-outline-info", "btn-sm")
        cardButton.innerText = `Agregar`
        cardButton.setAttribute("mark", repuesto.id)
        cardButton.addEventListener("click", repuestoSeleccionado)
    
        cardBody.appendChild(cardTitulo)
        cardBody.appendChild(CardPrecio)
        cardBody.appendChild(cardStock)
        cardBody.appendChild(cardButton)
        container.appendChild(cardBody)
        repuestos.appendChild(container)
        
        
        
    })
};


function repuestoSeleccionado(e) {
    carrito.push(e.target.getAttribute("mark"))
    console.log(carrito)
    renderCarrito()
    
}

function renderCarrito(){

    
}