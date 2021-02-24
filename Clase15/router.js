// Componentes
const HomeComponent = {
    postRender: () => {
        var bee = document.getElementById("wunderbiene");
        document.addEventListener("mousemove", getMouse);

        bee.style.position = "absolute";

        setInterval(followMouse, 20);
        $('#myModal').on('shown.bs.modal', function () {
            $('#myInput').trigger('focus')
        })


        $("#jumbotron-spacetrip").fadeIn();

        $( "#showToast" ).click(function() {
            $('.toast').toast('show');
        });

    },

    render: () => {
        return `
            <div class="parallax"></div>
            <div class="jumbotron jumbotron-fluid" id="jumbotron-spacetrip" style="display: none;">
                <div class="container titulos">
                    <h1 class="display-4">Spacetrip</h1>
                    <p class="lead">Primeros viajes espaciales turisticos de la historia.</p>
                </div>
            </div>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.0/jquery.min.js"></script>
            <div id="wunderbiene">
                <img id="wunimg" src="https://images.emojiterra.com/mozilla/512px/1f680.png" />
            </div>
        `;
    }
}

const ViajesComponent = {
    postRender: () => {
        var buttonCalcular = document.getElementById("calcular");
        buttonCalcular.addEventListener("click", calcularPrecio);

        var nombre = document.getElementById("inputName")
        var cantPx = document.getElementById("inputPxs")
        var planeta = document.getElementById("inputPlaneta")
        nombre.addEventListener("blur", validarCampo);
        cantPx.addEventListener("blur", validarCampo);
        planeta.addEventListener("blur", validarCampo);

        document.getElementsByClassName("busqueda-input")[0].onblur = halfWitdh
        document.getElementsByClassName("busqueda-input")[0].onfocus = fullWitdh
        document.getElementsByClassName("busqueda-input")[0].onkeypress = capturarEnter
    },

    render: () => {
        return `
                <section id="spacetrip" style="background-color: #0D1221; z-index: 500; position: relative;">
                    <div class="container" style="padding: 60px;">
                        <h2 id="titulo" style="margin-bottom: 24px;">Bienvenides!</h2>
            
                        <div id="seccion" class="alert alert-dark alert-dismissible fade show" role="alert">
                                    <i class="bi bi-star" style="margin-right: 5px;"></i>  Los viajes aún no están funcionando, pero comenzarán muy pronto.
                                    Anotate si querés reservar tu viaje lo antes posible. Hay pocos lugares!
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
            
                        </div>
            
                        <form style="margin-top: 60px;">
                            <div class="row mb-3">
                                <label for="inputName" class="col-sm-2 col-form-label">Nombre</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" id="inputName">
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label for="inputPxs" class="col-sm-2 col-form-label">Cantidad de pasajeros</label>
                                <div class="col-sm-10">
                                    <input type="number" class="form-control" id="inputPxs">
                                </div>
                            </div>
            
                            <div class="row mb-3">
                                <label for="inputPlaneta" class="col-sm-2 col-form-label">Planeta</label>
                                <div class="col-sm-10">
                                    <select class="form-control" id="inputPlaneta">
                                        <option selected value="">Elegir...</option>
                                        <option value="0">Mercurio</option>
                                        <option value="1">Venus</option>
                                        <option value="2">Marte</option>
                                        <option value="3">Jupiter</option>
                                        <option value="4">Saturno</option>
                                        <option value="5">Urano</option>
                                        <option value="6">Neptuno</option>
                                    </select>
                                </div>
            
                            </div>
                            <div class="form-group row">
                                <label for="inputFecha" class="col-2 col-form-label">Fecha de viaje</label>
                                <div class="col-10">
                                    <input class="form-control" type="date" value="2011-08-19" id="inputFecha">
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-sm-10 offset-sm-2">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="inputIdaYVuelta">
                                        <label class="form-check-label" for="inputIdaYVuelta">
                                            Ida y vuelta
                                        </label>
                                    </div>
                                </div>
                            </div>
            
                            <button type="button" class="btn btn-dark calcular" id="calcular">Calcular precio</button>
            
                            <div id="alert-calculo" class="alert alert-warning alert-dismissible fade hide" role="alert"
                                 style="margin-top: 30px; margin-bottom: 60px;">
            
                                <img id="alert-imagen-planeta" src="" style="display: inline-block; width: 40px; height: 40px;"/>
                                <i class="bi bi-star" style="margin-right: 5px;"></i> El viaje que ingresaste tiene un precio de <strong id="alert-calculo-precio"></strong> U$D
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
            
                        </form>
            
                        <div class="input-group busqueda">
                            <input type="text" class="form-control busqueda-input" placeholder="Buscar..." aria-label="Buscar">
                            <div class="input-group-append">
                                <span class="input-group-text"><i class="bi bi-search" style=""></i></span>
                            </div>
                        </div>
            
                        <div id="alert-busqueda" class="alert alert-danger alert-dismissible fade hide" role="alert"
                             style="margin-top: 30px; margin-bottom: 60px;">
                            <i class="bi bi-star" style="margin-right: 5px;"></i>
                            <span id="alert-busqueda-texto"></span>
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
            
                    </div>
                    
                </section>

        `;
    }
}

const CarritoComponent = {
    postRender: () => {
        document.getElementById("modal-login").click()

        var api_url = 'https://api.estadisticasbcra.com/usd' ; // URL destino de la llamada a la API
        var key = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDU2MjU2NzYsInR5cGUiOiJleHRlcm5hbCIsInVzZXIiOiJtLmFndXN0aW5hLm5haGFzQGdtYWlsLmNvbSJ9.8QdWDmNsX6u1WXHCSG-MlBkkpXG5hg8ny3zV8U7Bj2RoYn8ZEP9YJFtZvjbyicuUoshaBQSkY68G6_HgEgGhhw' // clave alfanumerica para autenticarse (ej)

        $.ajax({
            url: api_url,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + key);
            },
            success: function(result){
                console.log(result)
            }
        })



        $.get( "https://swapi.dev/api/starships",
            function(data, status){
                console.log(data, status)
                if (status === "success"){
                    document.getElementById("alertCarga").className =
                        "alert alert-success alert-dismissible fade show";
                } else {
                    document.getElementById("alertCarga").className =
                        "alert alert-danger alert-dismissible fade show";

                }

                data.results.forEach((nave) => {
                    var id = nave.name.split(" ").join("-").toLowerCase()
                    navesEnVenta.push(
                        new NaveEnVenta(id, nave.name, "https://img.icons8.com/color/452/" + id + ".png", nave.cost_in_credits)
                    )
                })
            }
        );


        $(".carrito_button_ingresar").click(ingresar);
        $(".carrito_button_anonim").click(comprarAnonim);

        $("#button-carrito").click(function(){
            $("#carrito-content").slideToggle()

            var colorActual = $("#button-carrito")[0].style.background

            if (colorActual === "#343a40") $("#button-carrito").css("background", "grey")
            else $("#button-carrito").css("background", "#343a40")

        })
    },

    render: () => {
        return `
            <section id="carrito" style="background-color: lightgrey; padding-top: 40px; padding-bottom: 40px; z-index: 10; position: relative;">
        
                <div class="container">
                    <p>
                        <a class="btn btn-dark" id="button-carrito">
                            <i class="bi bi-cart"></i>
                        </a>
                    </p>
                    <div class="collapse" id="carrito-content">
                        <ul id="carrito_carrito" class="container" style="padding: 60px;">
                        </ul>
                    </div>
                </div>
        
                <div id="alertCarga" class="alert alert-warning alert-dismissible fade hide" role="alert">
                    <strong>Productos cargados!</strong> ASDF.
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
        
                <div id="carrito_productos" class="container">
                </div>
        
            </section>
            <button id="modal-login" type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" style="display: none;">
                Login
            </button>
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div id="carrito_div" class="modal-body">
                            <form class="carrito_form_ingresar">
                                <div class="form-group">
                                    <label for="nombreUsuarie">Nombre</label>
                                    <input type="text" class="form-control" id="nombreUsuarie">
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-dark carrito_button_ingresar" data-dismiss="modal">Ingresar</button>
                            <button type="button" class="btn btn-light carrito_button_anonim" data-dismiss="modal">Comprar anónimamente</button>
                        </div>
                    </div>
                </div>
            </div>

        `;
    }
}

const ErrorComponent = {
    render: () => {
        return `
      <p>Error</p>
    `;
    }
}


const routes = [
    { path: '/', component: HomeComponent, },
    { path: '/viajes', component: ViajesComponent, },
    { path: '/carrito', component: CarritoComponent, },
];

const parseLocation = () => location.hash.slice(1).toLowerCase() || '/';

const findComponentByPath = (path, routes) =>
    routes.find(r => r.path.match(new RegExp(`^\\${path}$`, 'gm'))) || undefined;

const router = () => {
    const path = parseLocation();

    const { component = ErrorComponent } = findComponentByPath(path, routes) || {};

    $('#app').html(component.render());
    if (component.postRender) component.postRender();

};

$( window ).on( 'load', function( e ) {
    router();
} );

$( window ).on( 'hashchange', function( e ) {
    router();
} );

