const personas =[
    {nombre: "Ana", edad: 22},
    {nombre: "Luis", edad: 32},
    {nombre: "Maria", edad: 28}

]

//Tu código aquí 

//Usa .find() para buscar a la persona con nombre "Luis".
const buscarluis = personas.find (persona => persona.nombre == "Luis");
console.log("Persona Encontrada con el nombre: ", buscarluis);