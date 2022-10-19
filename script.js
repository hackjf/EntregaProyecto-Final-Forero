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
        precio: 160000,
        stock: 5
    },
    {
        id: 3,
        nombre: "Reparación",
        precio: 160000,
        stock: 4
    }
]



listaDeServicios.forEach((servicio) => {
    let tipoServicio = document.getElementById("tipoServicio")
    let option = document.createElement("option")
    option.value = servicio.id
    option.text = servicio.nombre
    option.setAttribute("mark", servicio.id)
    tipoServicio.appendChild(option)
   tipoServicio.addEventListener("change", servicioSeleccionado) 
})

    function servicioSeleccionado(e) {
        if (e.target.value == 1) {
            console.log(e.target.value)
            let subTotal = document.getElementById("subTotal")
            let etiquetaSubTotal = document.createElement("label")
            etiquetaSubTotal.innerHTML = "El costo del diagnostico es de : "
        }
    }