function Servicio(tipoServicio, precio) {
  this.tipoServicio = tipoServicio;
  this.precio = precio;
}
/* 1. Diagnostico \n 2. Mantenimiento \n 3. Reparacion*/
const diagnostico = new Servicio("diagnostico", 75000);
const mantenimiento = new Servicio("mantenimiento", 160000);
const reparacion = new Servicio("reparacion", 160000);
let servicios = [diagnostico, mantenimiento, reparacion];

function Repuestos(id, nombre, precio, stock) {
  this.id = id;
  this.nombre = nombre;
  this.precio = precio;
  this.stock = stock;
}

/* 1. Sensor de imagen \n 2. Tarjeta principal \n 3. Obturador \n 4. Flash" */
const sensorImagen = new Repuestos(10, "Sensor de Imagen", 500000, 12);
const tPrincipal = new Repuestos(11, "Tarjeta principal", 450000, 5);
const obturador = new Repuestos(12, "Obturador", 145000, 4);
const flash = new Repuestos(13, "Flash", 132000, 34);
let repuestos = [sensorImagen, tPrincipal, obturador, flash];

const formatearMoneda = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  minimumFractionDigits: 0,
});

let repuestosConStock = repuestos.filter((repuesto) => repuesto.stock > 0);
let listaRepuestos = repuestosConStock.map((repuesto) => repuesto.nombre);

function consultarExistencias() {
  this.listaRepuestos = listaRepuestos.join("\n");
  return this.listaRepuestos;
}

let costoTotal;
function calcularCosto() {
  if (tipoServicio === "diagnostico") {
    costoTotal = servicios[0].precio * 1.19;
  } else if (tipoServicio === "mantenimiento") {
    costoTotal = servicios[1].precio * 1.19;
    return costoTotal;
  }
}
let tipoServicio = ""
function solicitarServicio() {
  tipoServicio = prompt(
    "Escriba el tipo de servicio que requiere (sin tildes): \n 1. Diagnostico \n 2. Mantenimiento \n 3. Reparacion \n 4. Salir"
  ).toLowerCase();
}

/** inicio */
alert(
  "Bienvenido a MN FOTO - Centro de Servicio Autorizado Nikon \n Nuestros servicions \n 1. Diagnostico de equipos \n 2. Mantenimiento general \n 3. Reparación según falla "
);
solicitarServicio();

while (tipoServicio != "salir") {
  switch (tipoServicio) {
    case "diagnostico":
      calcularCosto();
      console.log(costoTotal);
      alert(
        "El costo inicial es de: " +
          formatearMoneda.format(costoTotal) +
          " recuerde que según el resultado del diagnostico se le informara el costo de la reparación o mantenimiento"
      );
      solicitarServicio();
      break;

    case "mantenimiento":
      calcularCosto();
      alert(
        "El costo es de: " +
          formatearMoneda.format(costoTotal) +
          " recuerde que según el modelo del equipo se le informara el costo del mantenimiento"
      );
      solicitarServicio();
      break;

    case "reparacion":
      alert(
        "Actualmente tenemos estos repuestos en stock: \n" +
          consultarExistencias()
      );
      let referenciaRepuesto = prompt(
        "Escriba el repuesto que requiere de cambio: \n 1. Sensor de imagen \n 2. Tarjeta principal \n 3. Obturador \n 4. Flash"
      ).toLowerCase();
      let total;
      switch (referenciaRepuesto) {
        case "1":
          total = (reparacion.precio + sensorImagen.precio) * 1.19;
          alert(
            `El valor de la reparación con cambio de ${
              sensorImagen.nombre
            } es de: ${formatearMoneda.format(total)}`
          );
          break;
        case "2":
          total = (reparacion.precio + tPrincipal.precio) * 1.19;
          alert(
            `El valor de la reparación con cambio de ${
              tPrincipal.nombre
            } es de: ${formatearMoneda.format(total)}`
          );
          break;
        case "3":
          total = (reparacion.precio + obturador.precio) * 1.19;
          alert(
            `El valor de la reparación con cambio de ${
              obturador.nombre
            } es de: ${formatearMoneda.format(total)}`
          );
          break;
        case "4":
          total = (reparacion.precio + flash.precio) * 1.19;
          alert(
            `El valor de la reparación con cambio de flash es de: ${formatearMoneda.format(
              total
            )}`
          );
          break;
        default:
          tipoServicio = "diagnostico";
          calcularCosto();
          alert(
            `El costo es de ${formatearMoneda.format(
              costoTotal
            )} el cual es el valor del diagnostico inicial y se le informara el costo de la reparación o mantenimiento según el resultado del diagnostico`
          );
          break;
      }
      solicitarServicio();
      break;

    default:
      alert("Valide nuevamente el tipo de servicio ingresado");
      solicitarServicio();
  }
}
