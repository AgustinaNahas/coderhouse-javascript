

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

function Planeta(nombre, distancia, imagen, tarifa){
    this.nombre=nombre;
    this.distancia=distancia;
    this.imagen=imagen;
    this.tarifa=tarifa;

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
    new Planeta('Mercurio', 0.39, "https://img.icons8.com/color/344/mercury-planet.png", 1),
    new Planeta('Venus', 0.72, "https://img.icons8.com/color/344/venus-planet.png", 1),
    new Planeta('Marte', 1.52, "https://img.icons8.com/color/344/mars-planet.png", 2),
    new Planeta('Jupiter', 5.20, "https://img.icons8.com/color/344/jupiter-planet.png", 1),
    new Planeta('Saturno', 9.54, "https://img.icons8.com/color/344/saturn-planet.png", 1),
    new Planeta('Urano', 19.19, "https://img.icons8.com/color/344/uranus-planet.png", 2),
    new Planeta('Neptuno', 30, "https://img.icons8.com/color/344/neptune-planet.png", 1)
]

function calcularPrecio(event){

    // Pido los datos para el cálculo

    var cantPx = parseInt(document.getElementById("inputPxs").value)
    var planeta = parseInt(document.getElementById("inputPlaneta").value)
    var idaYVuelta = document.getElementById("inputIdaYVuelta").checked

    // Este es el cálculo del precio

    var costo = cantPx * precioUA(planetas[planeta].distanciaTierra()) * planetas[planeta].tarifa
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

var buttonCalcular = document.getElementById("calcular");
buttonCalcular.addEventListener("click", calcularPrecio);



var nombre = document.getElementById("inputName")
var cantPx = document.getElementById("inputPxs")
var planeta = document.getElementById("inputPlaneta")


nombre.addEventListener("blur", validarCampo);
cantPx.addEventListener("blur", validarCampo);
planeta.addEventListener("blur", validarCampo);

function validarCampo(event){
    var valor = event.target.value;
    if (valor == ""){
        event.target.className = "form-control is-invalid"
    } else {
        event.target.className = "form-control"
    }
    validarTodosLosCampos()
}

function validarTodosLosCampos(){
    var valornombre = nombre.value;
    var valorcantPx = cantPx.value;
    var valorplaneta = planeta.value;

    document.getElementById("calcular").disabled = !(valornombre !== "" &&  valorcantPx !== "" && valorplaneta !== "")
}

function buscar(texto){
    var i;
    for (i = 0; i < planetas.length; i++) {
        if (planetas[i].nombre == texto) return planetas[i];
    }
    return false;
}

function fullWitdh(e){
    console.log(e)
    document.getElementsByClassName("busqueda")[0].className = "input-group busqueda fullWidth"
}

function halfWitdh(e){
    console.log(e)
    document.getElementsByClassName("busqueda")[0].className = "input-group busqueda"
}

window.onscroll = function() {myFunction()};

function myFunction(e) {

    var cuantoScrollee = document.documentElement.scrollTop;


    var planetaAMostrar = (cuantoScrollee / 109).toFixed();

    console.log(cuantoScrollee)
    console.log(planetaAMostrar)
    console.log(planetas[planetaAMostrar])

    var imagenPlaneta = document.getElementById("imagen-planeta-flotando")
    imagenPlaneta.style = "display: block;"
    imagenPlaneta.src = planetas[planetaAMostrar].imagen;

}



document.getElementsByClassName("busqueda-input")[0].onblur = halfWitdh
document.getElementsByClassName("busqueda-input")[0].onfocus = fullWitdh


document.getElementsByClassName("busqueda-input")[0].onkeypress = capturarEnter

function capturarEnter(event){
    if (event.which == 13 || event.keyCode == 13) { // 13 es el código asociado a la tecla enter
        var resultado = buscar(event.target.value)

        if (resultado){
            document.getElementById("alert-busqueda").className =
                "alert alert-success alert-dismissible fade show";
            document.getElementById("alert-busqueda-texto").innerText =
                "Sí, vamos al planeta " + resultado.nombre + " que queda a " + resultado.distanciaTierra() + " UA";
        } else {
            document.getElementById("alert-busqueda").className =
                "alert alert-danger alert-dismissible fade show";
            document.getElementById("alert-busqueda-texto").innerText =
                "No, no vamos a ese planeta";

        }
    }

}


// Ejecutar calculo cuando hago click

// Agrandar barra de busqueda onfocus y onblur

// Ejecutar busqueda cuando aprieto enter
