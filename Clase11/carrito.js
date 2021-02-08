
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
        if (usuarie && usuarie.length > 0) localStorage.setItem("carrito_" + usuarie.toLowerCase(), JSON.stringify(this.carrito))
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
        var nave_index = this.carrito.findIndex((nave) => {return nave.nave.id === producto_id})
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

const navesEnVenta = [
    new NaveEnVenta("tie_fighter", "Tie Fighter", "https://img.icons8.com/color/452/tie-fighter.png", 4000),
    new NaveEnVenta("millenium_falcon", "Millenium Falcon", "https://img.icons8.com/color/452/star-wars-millenium-falcon.png", 10000),
    new NaveEnVenta("rebellion_ship", "Rebellion Ship", "https://img.icons8.com/color/452/star-wars-rebellion-ship.png", 4000),
    new NaveEnVenta("upsilon", "Upsilon", "https://img.icons8.com/color/452/upsilon-class-command-shuttle.png", 4000),
    new NaveEnVenta("star_destroyer", "Star Destroyer", "https://img.icons8.com/color/452/super-star-destroyer-executor-class.png", 7000),
    new NaveEnVenta("transporter", "Transporter", "https://img.icons8.com/color/452/aal-1971-91-transporter.png", 8000),
    new NaveEnVenta("space_fighter", "Space Fighter", "https://img.icons8.com/color/452/space-fighter.png", 5000),
    new NaveEnVenta("x_wing", "X Wing", "https://img.icons8.com/color/452/x-wing.png", 6000),
]


function mostrarCarrito(){
    navesEnVenta.forEach((naveEnVenta) => {
        var naveHTML = document.createElement("article");

        naveHTML.className = "producto";

        naveHTML.innerHTML = "" +
            "<div class=\"card\">" +
            "<h4>" + naveEnVenta.nombre + "</h4>" +
            "<img style='width: 50px; heigth: 50px;' src='" + naveEnVenta.imagen + "'/>" +
            "<p>Precio: " + naveEnVenta.precio + "</p>" +
            "<button class='btn btn-dark' onClick='agregarAlCarrito(`" + naveEnVenta.id + "`)'>Agregar al carrito</button></div>" ;

        document.getElementById("carrito_productos").appendChild(naveHTML);
    })
}

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
    }



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
    document.getElementsByClassName("producto_carrito_" + nave_id)[0].remove();
}

function masUno(nave_id){
    var value = parseInt(document.getElementById("cantidad_producto_carrito_" + nave_id).value)
    document.getElementById("cantidad_producto_carrito_" + nave_id).value = value + 1;

    carrito.masUno(nave_id)
}

function menosUno(nave_id){
    var value = parseInt(document.getElementById("cantidad_producto_carrito_" + nave_id).value)
    document.getElementById("cantidad_producto_carrito_" + nave_id).value = value - 1;

    carrito.menosUno(nave_id)
}


function ingresar(){
    mostrarCarrito();

    var nombre = document.getElementById("nombreUsuarie").value;

    carrito = new Carrito(nombre);

    if (carrito.carrito.length > 0){
        carrito.carrito.forEach((producto) => {
            agregarAlCarritoDOM(producto.nave, producto.cantidad);
        })
    }

    document.getElementsByClassName("carrito_form_ingresar")[0].remove();

}

function comprarAnonim(){
    mostrarCarrito();

    carrito = new Carrito();

    document.getElementsByClassName("carrito_form_ingresar")[0].remove();
}


document.getElementsByClassName("carrito_button_ingresar")[0].addEventListener("click", ingresar)
document.getElementsByClassName("carrito_button_anonim")[0].addEventListener("click", comprarAnonim)


// window.addEventListener('load', function(){
//     console.log("Página cargada en Javascript!" + (new Date()).getMilliseconds())
// })

$( document ).ready(function()
{
    document.getElementById("modal-login").click()
    // console.log( "Página cargada en jQuery!" + (new Date()).getMilliseconds() );
});




