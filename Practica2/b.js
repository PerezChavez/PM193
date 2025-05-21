const productos = [
    {nombre: "Laptop", precio: 12000},
    {nombre: "Mouse", precio: 250},
    {nombre: "Teclado", precio: 750},
    {nombre: "Monitor", precio: 3000}
];

//Código aquí
const productosF = productos.filter(producto => producto.precio > 1000);
const nombres = productosF.map(producto => producto.nombre);

console.log(nombres);