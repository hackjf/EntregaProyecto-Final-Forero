const precioDiagnostico = 75000;
const precioMantenimiento = 160000;
const precioReparacion = 200000;

let costoTotal;
let tipoServicio;

const formatearMoneda = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  minimumFractionDigits: 0,
});

function solicitarServicio() {
  tipoServicio = prompt(
    "Escriba el tipo de servicio que requiere (sin tildes): \n 1. Diagnostico \n 2. Mantenimiento \n 3. Reparacion \n 4. Salir"
  ).toLowerCase();
}

alert(
  "Bienvenido a MN FOTO - Centro de Servicio Autorizado Nikon \n Nuestros servicions \n 1. Diagnostico de equipos \n 2. Mantenimiento general \n 3. Reparación según falla "
);
solicitarServicio();

while (tipoServicio != "salir") {
  switch (tipoServicio) {
    case "diagnostico":
      costoTotal = precioDiagnostico * 1.16;
      alert(
        "El costo inicial es de: " +
          formatearMoneda.format(costoTotal) +
          " recuerde que según el resultado del diagnostico se le informara el costo de la reparación o mantenimiento"
      );
      solicitarServicio();
      break;

    case "mantenimiento":
      costoTotal = precioMantenimiento * 1.16;
      alert(
        "El costo es de: " +
          formatearMoneda.format(costoTotal) +
          " recuerde que según el modelo del equipo se le informara el costo del mantenimiento"
      );
      solicitarServicio();
      break;

    case "reparacion":
      costoTotal = precioReparacion;
      let referenciaRepuesto = prompt(
        "Escriba el repuesto que requiere de cambio: \n 1. Sensor de imagen \n 2. Tarjeta principal \n 3. Obturador \n 4. Flash"
      ).toLowerCase();
      switch (referenciaRepuesto) {
        case "1":
          costoTotal = costoTotal + 50000;
          alert(
            "El valor de la reparación con cambio de sensor de imagen es de: " +
              formatearMoneda.format(costoTotal)
          );
          break;
        case "2":
          costoTotal = costoTotal + 100000;
          alert(
            "El valor de la reparación con cambio de tarjeta principal es de: " +
              formatearMoneda.format(costoTotal)
          );
          break;
        case "3":
          costoTotal = costoTotal + 200000;
          alert(
            "El valor de la reparación con cambio de obturador es de: " +
              formatearMoneda.format(costoTotal)
          );
          break;
        case "4":
          costoTotal = costoTotal + 50000;
          alert(
            "El valor de la reparación con cambio de flash es de: " +
              formatearMoneda.format(costoTotal)
          );
          break;
        default:
          costoTotal = precioDiagnostico * 1.16;
          alert(
            "El costo es de " +
              formatearMoneda.format(costoTotal) +
              "que es el valor del diagnostico inicial y se le informara el costo de la reparación o mantenimiento según el resultado del diagnostico"
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
