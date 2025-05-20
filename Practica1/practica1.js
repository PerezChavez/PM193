//Parte 1
let nombre = "Carol"; 
let edad = 20; 

nombre = "Pupe y Cami"; 

const saludoo = "Holii, " + nombre + ". Tienes " + edad + " años";

console.log(saludoo);

//Ejercicio 1 Parte 2

function cuadrado (numero) {
    return numero * numero;
}

console.log(cuadrado(2)); 
console.log(cuadrado(5)); 
console.log(cuadrado(7));

//Ejercicio 1 parte 3
const saludoPersonalizado = (nombre, edad) => {
  return `Hola, me llamo ${nombre} y tengo ${edad} años.`;
};

console.log(saludoPersonalizado("Isay", 37));
