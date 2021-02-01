

$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
})

// A $( document ).ready() block.
$( document ).ready(function() {

    $( "#showToast" ).click(function() {
        $('.toast').toast('show');
    });

});

function Viaje(nombre, cantPx, planeta ){
    this.nombre=nombre;
    this.cantPx=cantPx;
    this.planeta=planeta;
}

function Planeta(nombre, distancia, imagen){
    this.nombre=nombre;
    this.distancia=distancia;
    this.imagen=imagen;

    this.distanciaTierra = function(){
        if (distancia < 1) {
            return (1 - this.distancia);
        }
        else {
            return (this.distancia - 1);
        }
    }
}

const precioKm = 6.5752;

function precioUA(distanciaUA){
    return distanciaUA * 149597870 * precioKm;
}


const planetas=[
    new Planeta('Mercurio', 0.39, "https://img.icons8.com/color/344/mercury-planet.png"),
    new Planeta('Venus', 0.72, "https://img.icons8.com/color/344/venus-planet.png"),
    new Planeta('Marte', 1.52, "https://img.icons8.com/color/344/mars-planet.png"),
    new Planeta('Jupiter', 5.20, "https://img.icons8.com/color/344/jupiter-planet.png"),
    new Planeta('Saturno', 9.54, "https://img.icons8.com/color/344/saturn-planet.png"),
    new Planeta('Urano', 19.19, "https://img.icons8.com/color/344/uranus-planet.png"),
    new Planeta('Neptuno', 30, "https://img.icons8.com/color/344/neptune-planet.png")
]

function calcularPrecio(){

    // Pido los datos para el cálculo

    var cantPx = parseInt(document.getElementById("inputPxs").value)
    var planeta = parseInt(document.getElementById("inputPlaneta").value)
    var idaYVuelta = document.getElementById("inputIdaYVuelta").checked

    // Este es el cálculo del precio

    var costo = cantPx * precioUA(planetas[planeta].distanciaTierra())
    if (idaYVuelta) costo *= 2

    // Acá nomás pongo la imagen del planeta que eligió el usuario

    var imagenPlaneta = document.getElementById("alert-imagen-planeta")
    imagenPlaneta.src = planetas[planeta].imagen;

    // Acá pongo el costo en el elemento correspondiente

    var precio = document.getElementById("alert-calculo-precio")
    precio.innerText = costo;

    // Acá muestro la alerta

    document.getElementById("alert-calculo").className = "alert alert-warning alert-dismissible fade show"

    return Number.parseFloat(costo).toFixed(2);


}

function buscar(texto){
    var i;
    for (i = 0; i < planetas.length; i++) {
        if (planetas[i].nombre == texto) return true;
    }
    return false;
}

function fullWitdh(){
    document.getElementsByClassName("busqueda")[0].className = "input-group busqueda fullWidth"
}

function halfWitdh(){
    document.getElementsByClassName("busqueda")[0].className = "input-group busqueda"
}


// Ejecutar calculo cuando hago click

// Agrandar barra de busqueda onfocus y onblur

// Ejecutar busqueda cuando aprieto enter
