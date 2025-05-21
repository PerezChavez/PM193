const personas =[
    {nombre: "Ana", edad: 22},
    {nombre: "Luis", edad: 32},
    {nombre: "Maria", edad: 28}

]

//Tu código aquí 

//Usa .find() para buscar a la persona con nombre "Luis".
const buscarluis = personas.find (persona => persona.nombre == "Luis");
console.log("Persona Encontrada con el nombre: ", buscarluis);

//Usa .forEach() para imprimir el nombre de cada persona con su edad.
personas.forEach(persona => {
    console.log(`${persona.nombre} tiene ${persona.edad} años`);
});

//Usa .reduce() para sumar todas las edades y obtener un total.
const SumaDeEdades = personas.reduce((acumulador,persona) => acumulador + persona.edad, 0);
console.log("La suma de todas las edades es igual a: " , SumaDeEdades)