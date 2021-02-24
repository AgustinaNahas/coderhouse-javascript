
function NaveEnVenta(id, nombre, imagen, precio ){
    this.id=id;
    this.nombre=nombre;
    this.imagen=imagen;
    this.precio=precio;
}

function NaveEnCarrito(nave, cantidad){
    this.nave=nave;
    this.cantidad=cantidad;
}

function traerCarrito(usuarie){
    var JSONProductos = localStorage.getItem("carrito_" + usuarie.toLowerCase())

    if (JSONProductos && JSONProductos.length > 0) {
        var productos = JSON.parse(JSONProductos);
        return productos;
    }
    else return [];
}

function Carrito(usuarie){
    this.usuarie = usuarie;
    this.carrito = usuarie ? traerCarrito(usuarie) : [];

    this.guardarCarrito = function(){
        if (usuarie && usuarie.length > 0)
            localStorage.setItem("carrito_" + usuarie.toLowerCase(), JSON.stringify(this.carrito))
    }

    this.existe = function(id){
        return this.carrito.find((nave) => {
            return nave.nave.id === id;
        })
    }

    this.agregarProducto = function(producto){
        this.carrito.push(new NaveEnCarrito(producto, 1))
        this.guardarCarrito();
    }

    this.eliminarProducto = function(producto_id){
        var nave_index = this.carrito.findIndex((nave) => {
            return nave.nave.id === producto_id})
        this.carrito.splice(nave_index, 1)
        this.guardarCarrito();
    }

    this.masUno = function(producto_id){
        var producto = this.existe(producto_id)

        producto.cantidad += 1;
        this.guardarCarrito();
    }

    this.menosUno = function(producto_id){
        var producto = this.existe(producto_id)

        producto.cantidad -= 1;

        if (producto.cantidad === 0) eliminarDelCarrito(producto_id);
        this.guardarCarrito();

    }


}

var carrito;


var navesEnVenta = [];

// const navesEnVenta = [
//     new NaveEnVenta("tie_fighter", "Tie Fighter", "https://img.icons8.com/color/452/tie-fighter.png", 4000),
//     new NaveEnVenta("millenium_falcon", "Millenium Falcon", "https://img.icons8.com/color/452/star-wars-millenium-falcon.png", 10000),
//     new NaveEnVenta("rebellion_ship", "Rebellion Ship", "https://img.icons8.com/color/452/star-wars-rebellion-ship.png", 4000),
//     new NaveEnVenta("upsilon", "Upsilon", "https://img.icons8.com/color/452/upsilon-class-command-shuttle.png", 4000),
//     new NaveEnVenta("star_destroyer", "Star Destroyer", "https://img.icons8.com/color/452/super-star-destroyer-executor-class.png", 7000),
//     new NaveEnVenta("transporter", "Transporter", "https://img.icons8.com/color/452/aal-1971-91-transporter.png", 8000),
//     new NaveEnVenta("space_fighter", "Space Fighter", "https://img.icons8.com/color/452/space-fighter.png", 5000),
//     new NaveEnVenta("x_wing", "X Wing", "https://img.icons8.com/color/452/x-wing.png", 6000),
// ]


function mostrarCarritoJQ(){
    navesEnVenta.forEach((naveEnVenta) => {

            $("#carrito_productos").append("<article class='card producto_" + naveEnVenta.id + "'><h4>" + naveEnVenta.nombre + "</h4>" +
                "<img style='width: 50px; heigth: 50px;' src='" + naveEnVenta.imagen + "'/>" +
                "<p>Precio: " + naveEnVenta.precio + "</p>" +
                "<button data-id='" + naveEnVenta.id + "' class='btn btn-dark producto_agregar_al_carrito producto_boton_" +
                naveEnVenta.id + "'>Agregar al carrito</button></article>")
    })


    $(".producto_agregar_al_carrito").click(function(){
        var naveId = $(this).attr("data-id");

        agregarAlCarrito(naveId);
    })
}

// function mostrarCarrito(){
//     navesEnVenta.forEach((naveEnVenta) => {
//         var naveHTML = document.createElement("article");
//
//         naveHTML.className = "card producto_" + naveEnVenta.id;
//
//         naveHTML.innerHTML = "" +
//             "<h4>" + naveEnVenta.nombre + "</h4>" +
//             "<img style='width: 50px; heigth: 50px;' src='" + naveEnVenta.imagen + "'/>" +
//             "<p>Precio: " + naveEnVenta.precio + "</p>" +
//             "<button data-id='" + naveEnVenta.id + "' class='btn btn-dark producto_agregar_al_carrito producto_boton_" + naveEnVenta.id + "'>Agregar al carrito</button>" ;
//
//         document.getElementById("carrito_productos").appendChild(naveHTML);
//     })
//
//     $(".producto_agregar_al_carrito").click(function(){
//         var naveId = $(this).attr("data-id");
//
//         agregarAlCarrito(naveId);
//     })
//
// }

function agregarAlCarrito(nave_id){

    // Busco el elemento en mi array de naves a la venta
    var nave = navesEnVenta.filter((nave) => {return nave.id === nave_id})[0]

    var naveEnCarrito = carrito.existe(nave.id)

    if (naveEnCarrito){
        masUno(naveEnCarrito.nave.id)
    } else {
        // Lo agrego a mi array carrito
        carrito.agregarProducto(nave)

        // Lo agrego a mi DOM carrito
        agregarAlCarritoDOM(nave);

        agregarSelectorCantidad(nave_id)
    }



}

function agregarSelectorCantidad(nave_id, cantidad=1){

    console.log('agregarSelectorCantidad');

    console.log(document.getElementsByClassName("producto_boton_" + nave_id))

    // Saco el botón
    document.getElementsByClassName("producto_boton_" + nave_id)[0].remove();

    // Le agrego el cosito de mas y menos al producto
    var selectorCantidad = document.createElement("div");

    selectorCantidad.className = "producto_selector_" + nave_id;

    selectorCantidad.innerHTML =
        "       <div class=\"input-group mb-3\">" +
        "         <div class=\"input-group-prepend\" id=\"button-addon3\">" +
        "           <button onClick='menosUno(`" + nave_id + "`)' class=\"btn btn-outline-secondary\" type=\"button\">-</button>" +
        "         </div>" +
        "         <input type=\"text\" class=\"form-control\" disabled placeholder=\"\" aria-describedby=\"input-group-append\" aria-label=\"\" value='" + cantidad + "'" +
        "         <div class=\"input-group-append\" id='cantidad_producto_selector_" + nave_id +"'>" +
        "           <button onClick='masUno(`" + nave_id + "`)' class=\"btn btn-outline-secondary\" type=\"button\">+</button>" +
        "         </div>" +
        "       </div>";

    document.getElementsByClassName("producto_" + nave_id)[0].appendChild(selectorCantidad);

}

function quitarSelectorCantidad(nave_id){

    console.log('quitarSelectorCantidad');

    // console.log(document.getElementsByClassName("producto_selector_" + nave_id))

    // Saco el selector
    document.getElementsByClassName("producto_selector_" + nave_id)[0].remove();

    // Le agrego el botón

    var botonAgregarCarrito = document.createElement("button");

    botonAgregarCarrito.className = "btn btn-dark producto_boton_" + nave_id;
    botonAgregarCarrito.onclick = function(){
        console.log(nave_id)
        agregarAlCarrito(nave_id)
    }
    botonAgregarCarrito.innerText = "Agregar al carrito" ;

    document.getElementsByClassName("producto_" + nave_id)[0].appendChild(botonAgregarCarrito);

}

function agregarAlCarritoDOM(naveEnVenta, cantidad = 1){
    var naveCarritoHTML = document.createElement("li");

    naveCarritoHTML.className = "producto_carrito_" + naveEnVenta.id;

    naveCarritoHTML.innerHTML = "" +
        "<div class=\"container\">" +
        "  <div class=\"row\">" +
        "    <div class=\"col-sm-1\">" +
        "      <img style='width: 50px; heigth: 50px;' src='" + naveEnVenta.imagen + "'/>" +
        "    </div>" +
        "    <div class=\"col-sm-5\">" +
        "       <h4>" + naveEnVenta.nombre + "</h4>" +
        "       <p>Precio: " + naveEnVenta.precio + "</p>" +
        "       </div>"+
        "    <div class=\"col-sm-5\">" +
        "       <div class=\"input-group mb-3\">" +
        "         <div class=\"input-group-prepend\" id=\"button-addon3\">" +
        "           <button onClick='menosUno(`" + naveEnVenta.id + "`)' class=\"btn btn-outline-secondary\" type=\"button\">-</button>" +
        "         </div>" +
        "         <input type=\"text\" class=\"form-control\" disabled placeholder=\"\" aria-describedby=\"input-group-append\" aria-label=\"\" value='" + cantidad + "'" +
        "         <div class=\"input-group-append\" id='cantidad_producto_carrito_" + naveEnVenta.id +"'>" +
        "           <button onClick='masUno(`" + naveEnVenta.id + "`)' class=\"btn btn-outline-secondary\" type=\"button\">+</button>" +
        "         </div>" +
        "       </div>"+
        "    <div class=\"col-sm-1\">" +
        "      <button class='btn btn-dark' onClick='eliminarDelCarrito(`" + naveEnVenta.id + "`)'>x</button>" +
        "    </div>" +
        "  </div>" +
        "</div>";

    document.getElementById("carrito_carrito").appendChild(naveCarritoHTML);
}

function eliminarDelCarrito(nave_id){

    // Lo elimino de mi array carrito
    carrito.eliminarProducto(nave_id)

    // Lo elimino de mi DOM carrito
    eliminarDelCarritoDOM(nave_id);

}

function eliminarDelCarritoDOM(nave_id){


    console.log(".producto_carrito_" + nave_id)

    $(".producto_carrito_" + nave_id).fadeOut(400, function(){
        document.getElementsByClassName("producto_carrito_" + nave_id)[0].remove();
    });

    console.log("Che, quitarSelectorCantidad")

    quitarSelectorCantidad(nave_id);
}

function masUno(nave_id){
    var value = parseInt(document.getElementById("cantidad_producto_carrito_" + nave_id).value)
    document.getElementById("cantidad_producto_carrito_" + nave_id).value = value + 1;
    document.getElementById("cantidad_producto_selector_" + nave_id).value = value + 1;

    carrito.masUno(nave_id)
}

function menosUno(nave_id){
    var value = parseInt(document.getElementById("cantidad_producto_carrito_" + nave_id).value)
    document.getElementById("cantidad_producto_carrito_" + nave_id).value = value - 1;
    document.getElementById("cantidad_producto_selector_" + nave_id).value = value - 1;

    carrito.menosUno(nave_id)
}


function ingresar(){
    mostrarCarritoJQ();

    var nombre = document.getElementById("nombreUsuarie").value;

    carrito = new Carrito(nombre);

    if (carrito.carrito.length > 0){
        carrito.carrito.forEach((producto) => {
            agregarAlCarritoDOM(producto.nave, producto.cantidad);

            agregarSelectorCantidad(producto.nave.id, producto.cantidad)
        })
    }

    document.getElementsByClassName("carrito_form_ingresar")[0].remove();

    // e.preventDefault(); //Sirve para frenar la propagación del click en un (recargar pagina)

    $('html, body').animate({
        scrollTop: $("#carrito").offset().top
    }, 2000);

}

function comprarAnonim(){
    mostrarCarritoJQ();

    carrito = new Carrito();

    document.getElementsByClassName("carrito_form_ingresar")[0].remove();

    $('html, body').animate({
        scrollTop: $("#carrito").offset().top
    }, 2000);
}

