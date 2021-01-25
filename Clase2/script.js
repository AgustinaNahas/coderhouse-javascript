var cartaA = 5;
var cartaB = 7;
var cartaC = 9;

var suma = cartaA + cartaB + cartaC; // 21 EN NUMERO
var veintiuno = "21"

var esBlackjack = (suma === 21); // lo comparo con un "21" COMO STRING
var esBlackjack2 = (suma === veintiuno); // lo comparo con un "21" COMO STRING

// == -> valor igual
// === -> valor Y TIPO igual

// console.log("esBlackjack es " + esBlackjack) // verdadero!
// console.log("esBlackjack es " + esBlackjack) // falso!
//
// console.log("21 != '21' nos da " + (21 != "21")) // falso!
// console.log("21 !== '21' nos da " + (21 !== "21")) // verdadero!



// En este caso, llegamos a 21

// Si es Blackjack
// if (suma == 21) {
//     console.log("Ganaste! Llegaste a 21")
// } else if (suma < 21){
//     console.log("Podés sacar otra carta")
// } else if (suma > 25){
//     console.log("Ah pero te reeee pasaste!")
// } else {
//     console.log("Perdiste!")
// }

// console.log("Terminó el juego")

// var estaLindoElDia = true;
// var tengoMuchaHambre = true;
// var estamosEnCuarentena = false;
//
// if ((estaLindoElDia || tengoMuchaHambre) && !estamosEnCuarentena){
//     // Estas lineas de abajo, se ejecutan si la condicion es VERDADERA
//     console.log("Asado!")
// } else {
//     // Estas lineas de abajo, se ejecutan si la condicion es FALSA
//     console.log("Nos quedamos en casa!")
// }

// if (estamosEnCuarentena || !estaLindoElDia){
//     // Estas lineas de abajo, se ejecutan si la condicion es VERDADERA
//     console.log("Nos quedamos en casa!")
// } else {
//     // Estas lineas de abajo, se ejecutan si la condicion es FALSA
//     console.log("Juntada al aire libre!")
// }




// if (!estamosEnCuarentena){
//     // Estas lineas de abajo, se ejecutan si la condicion es VERDADERA
//     alert("Podemos salir")
// }





// var golesAEntero = parseInt(prompt("Cuántos goles hizo el equipo A? "));
// var golesBEntero = parseInt(prompt("Cuántos goles hizo el equipo B? "));

// var empate = (golesEquipoA = golesEquipoB);





