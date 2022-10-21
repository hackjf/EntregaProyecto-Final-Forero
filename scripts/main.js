function main () {
    //Base de datos
    const listaDeServicios = [
        {
            id: 0,
            nombre: "Diagnostico",
            precio: 75000,
            msg: "ha elegido servicio de diagnóstico, el cual consiste en realizar la validación técnica en nuestro centro de servicio y generar una cotización según lo requiera el equipo.",
        },
        {
            id: 1,
            nombre: "Mantenimiento",
            precio: 140000,
            msg: "ha elegido servicio de mantenimiento, el cual consiste en realizar inicialmente una validación técnica en nuestro centro de servicio, seguido de la limpieza y mantenimiento del equipo según lo requiera. En el caso de que el equipo requiera de una reparación, se generará una cotización para su posterior aprobación.",
        },
        {
            id: 2,
            nombre: "Reparación",
            precio: 160000,
            msg: "ha elegido servicio de reparación, a continuación seleccione el repuesto del equipo a cotizar, ten en cuenta que el valor dado es un estimado y que el precio exacto se dará al momento del diagnóstico y también la disposición de stock del repuesto",
        },
    ]

    const listaDeRepuestos = [
        {
            id: 0,
            nombre: "Sensor de Imagen",
            precio: 500000,
            stock: 12,
        },
        {
            id: 1,
            nombre: "Tarjeta principal",
            precio: 450000,
            stock: 5,
        },
        {
            id: 2,
            nombre: "Sistema obturador",
            precio: 145000,
            stock: 4,
        },
        {
            id: 3,
            nombre: "Sistema de flash",
            precio: 132000,
            stock: 34,
        },
    ]

    //formateo de moneda
    const formatearMoneda = new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0,
    })

    let nombreCliente = document.getElementById("nombre")
    
    nombreCliente.addEventListener("input", () => {nombreCliente.value=capitalize(nombreCliente.value)
        nombreCliente.value = nombreCliente.value.replace(/[^a-zA-Z ]/g, ""
        )
       
    })
    
    

    let apellidoCliente = document.getElementById("apellido")
    apellidoCliente.addEventListener("input", () => {apellidoCliente.value=capitalize(apellidoCliente.value)
        apellidoCliente.value = apellidoCliente.value.replace(/[^a-zA-Z ]/g, ""
        )
        
    })
    

    function capitalize(word) {
        return word[0].toUpperCase() + word.slice(1);
      }

    let textoDebajo = document.getElementById("divRepuestos")
    let subTotal = document.getElementById("subTotal")
    let etiquetaSubTotal = document.createElement("label")
    let mostrarServicio = document.createElement("p")
    let descripcionServicio = document.createElement("p")
    let totalValue = document.createElement("p")
    let ivaValue = document.createElement("p")
    let repuestos = document.getElementById("tipoRepuesto")

    let carrito = []

    cargarCarritoStorage()

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
        e.target.value == listaDeServicios[e.target.value].id
        let precio = listaDeServicios[e.target.value].precio
        etiquetaSubTotal.innerHTML = `Mano de obra: ${formatearMoneda.format(
            precio
        )}`
        etiquetaSubTotal.classList.add(
            "text-center",
            "text-success",
            "fw-bold",
            "form-control",
            "h-100",
            "wow",
            "fadeIn"
        )
        descripcionServicio.classList.add(
            "text-info",
            "fw-bold",
            "form-control",
            "h-100"
        )
        descripcionServicio.innerHTML = `Sr/a <b>${nombreCliente.value} ${apellidoCliente.value}</b> ${listaDeServicios[e.target.value].msg}`
        mostrarServicio.classList.add("text-center", "card-text", "font-weight-bold")
        mostrarServicio.innerHTML = `Servicio de ${listaDeServicios[e.target.value].nombre}`
        subTotal.innerHTML = ``
        subTotal.appendChild(mostrarServicio)
        subTotal.appendChild(etiquetaSubTotal)
        repuestos.innerHTML = ``
        tipoRepuesto.classList.remove("d-block")
        repuestos.appendChild(descripcionServicio)

        let costo = document.createElement("p")
        costo.classList.add(
            "text-center",
            "text-success",
            "fw-bold",
            "form-control",
            "h-100",
            "wow",
            "fadeIn"
        )
        costo.innerHTML = `Total: ${formatearMoneda.format(precio + precio * 0.19)}`

        let ivaCosto = document.createElement("p")
        ivaCosto.classList.add(
            "text-center",
            "text-success",
            "fw-bold",
            "form-control",
            "h-100",
            "wow",
            "fadeIn"
        )
        ivaCosto.innerHTML = `IVA: ${formatearMoneda.format(precio * 0.19)}`

        subTotal.appendChild(ivaCosto)
        subTotal.appendChild(costo)
        if (e.target.value == 2) {
            ivaCosto.classList.add("d-none")
            costo.classList.add("d-none")
            ivaCosto.innerHTML = ``
            costo.innerHTML = ``
            reparacion()
            renderCarrito()
        }
    }

    const reparacion = () => {
        repuestos.innerHTML = ``
        textoDebajo.appendChild(descripcionServicio)
        listaDeRepuestos.forEach((repuesto) => {
            let container = document.createElement("div")
            container.classList.add(
                "card",
                "col-6",
                "col-md-6",
                "col-xl-3",
                "wow",
                "fadeIn"
            )
            //Body
            let cardBody = document.createElement("div")
            cardBody.classList.add("card-body", "text-center")
            //Title
            let cardTitulo = document.createElement("h6")
            cardTitulo.classList.add("card-title", "mb-0", "mb-lg-3")
            cardTitulo.innerText = repuesto.nombre
            //Precio
            let CardPrecio = document.createElement("p")
            CardPrecio.classList.add("card-text", "mb-0", "mb-lg-3")
            CardPrecio.innerText = `${formatearMoneda.format(repuesto.precio)}`
            //Stock
            let cardStock = document.createElement("p")
            cardStock.classList.add("card-text", "mb-0", "mb-lg-3")
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
    }

    function repuestoSeleccionado(e) {
        carrito.push(e.target.getAttribute("mark"))
        renderCarrito()
    }

    function renderCarrito() {
        guardarCarritoEnStorage()

        subTotal.innerHTML = ``
        subTotal.appendChild(mostrarServicio)
        subTotal.appendChild(etiquetaSubTotal)
        let sinRepetir = [...new Set(carrito)]

        sinRepetir.forEach((idRepuesto) => {
            let item = listaDeRepuestos.filter((parte) => {
                return parte.id === parseInt(idRepuesto)
            })
            let cantidad = carrito.reduce((total, id) => {
                return id === idRepuesto ? (total += 1) : total
            }, 0)

            let linea = document.createElement("li")
            linea.classList.add(
                "list-group-item",
                "d-flex",
                "justify-content-between",
                "align-items-center",
                "wow",
                "fadeIn"
            )
            linea.innerText = `${cantidad} x ${item[0].nombre} - $${item[0].precio}`

            let bEliminarRepuesto = document.createElement("button")
            bEliminarRepuesto.classList.add("btn", "btn-outline-danger", "btn-sm")
            bEliminarRepuesto.innerText = "X"
            bEliminarRepuesto.dataset.item = idRepuesto
            bEliminarRepuesto.addEventListener("click", eliminarRepuesto)

            linea.appendChild(bEliminarRepuesto)
            subTotal.appendChild(linea)

            totalValue.classList.add(
                "text-center",
                "text-danger",
                "fw-bold",
                "form-control",
                "h-100",
                "wow",
                "fadeIn"
            )
            totalValue.innerHTML = `Total: ${formatearMoneda.format(calcularTotal())}`

            ivaValue.classList.add(
                "text-center",
                "text-success",
                "fw-bold",
                "form-control",
                "h-100",
                "wow",
                "fadeIn"
            )
            ivaValue.innerHTML = `IVA: ${formatearMoneda.format(calcularIva())}`
        })
        subTotal.appendChild(ivaValue)
        subTotal.appendChild(totalValue)
    }

    function eliminarRepuesto(e) {
        let id = e.target.dataset.item

        carrito = carrito.filter((idRepuesto) => {
            return idRepuesto !== id
        })
        renderCarrito()

        if (carrito.length === 0) {
            ivaValue.classList.remove(
                "text-center",
                "text-success",
                "fw-bold",
                "form-control",
                "h-100"
            )
            totalValue.classList.remove(
                "text-center",
                "text-success",
                "fw-bold",
                "form-control",
                "h-100"
            )
            totalValue.innerHTML = ``
            ivaValue.innerHTML = ``

            subTotal.appendChild(ivaValue)
            subTotal.appendChild(totalValue)
        }
    }

    function calcularTotal() {
        let total = 0
        carrito.forEach((idRepuesto) => {
            let item = listaDeRepuestos.filter((parte) => {
                return parte.id === parseInt(idRepuesto)
            })
            total += item[0].precio
        })
        return total + listaDeServicios[2].precio
    }

    function calcularIva() {
        let iva = 0
        iva += calcularTotal() * 0.19
        return iva
    }

    function guardarCarritoEnStorage() {
        localStorage.setItem("carrito", JSON.stringify(carrito))
    }

    function cargarCarritoStorage() {
        if (localStorage.getItem("carrito") !== null) {
            carrito = JSON.parse(localStorage.getItem("carrito"))
        }
    }
}

main()