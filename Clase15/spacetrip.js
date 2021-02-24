
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

function calcularPrecio(event){

    console.log(event);

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

function validarCampo(event){

    console.log(event);

    var valor = event.target.value;

    if (valor == ""){
        event.target.className = "form-control is-invalid"
    } else {
        event.target.className = "form-control"
    }


}

function buscar(texto){
    // var i;
    // for (i = 0; i < planetas.length; i++) {
    //     if (planetas[i].nombre == texto) return planetas[i];
    // }
    // return false;

    $.get( "https://swapi.dev/api/planets/?name=" + texto,
        function(data, status){
            console.log(data);
            return data;
        }
    );

}

function fullWitdh(e){
    console.log(e)
    document.getElementsByClassName("busqueda")[0].className = "input-group busqueda fullWidth"
}

function halfWitdh(e){
    console.log(e)
    document.getElementsByClassName("busqueda")[0].className = "input-group busqueda"
}

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
