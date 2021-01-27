var myModal = document.getElementById('myModal')
var myInput = document.getElementById('myInput')

// console.log(myModal)

myModal.addEventListener('shown.bs.modal', function () {
    myInput.focus()
})


var titulo = document.getElementById("titulo") // UN SOLO RESULTADO
var form = document.getElementsByTagName("form") // varios, en un array
var button = document.getElementsByClassName("log-in") // varios, en un array
var todosLosBotones = document.getElementsByTagName("button")
var input = document.getElementById("inputEmail3")

console.log(input)
// console.log(button[0].innerHTML)
// console.log(form[0].innerHTML)
//
// console.log(todosLosBotones[0].innerHTML)
// console.log(todosLosBotones[1].innerHTML)
// titulo.innerHTML = prompt("")
titulo.innerHTML = prompt("Ingrese el nuevo titulo para que prompt no muera")

var button = document.getElementsByClassName("log-in")
button[0].innerHTML = "Logueate"


var check = document.getElementById("gridCheck1")
check.checked = true


var parrafo = document.createElement("p");
parrafo.innerHTML = "Hola Mundo!"; // Insertar texto, opcion 1


var container = document.getElementsByClassName("container")

container[0].appendChild(parrafo);
