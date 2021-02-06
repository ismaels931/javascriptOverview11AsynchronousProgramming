console.log("Muchos programas interactúan con elementos a parte del procesador e.g. se comunican a través de una red o solicitan datos");
console.log("a un disco duro, que más lentos de cargar que los de memoria (RAM). Cuando se producen alguno de estos eventos el");
console.log("procesador permanece inactivo. Lo ideal sería que se ocupara de realizar otra tarea mientras tanto. En parte, esto lo");
console.log("maneja el sistema operativo, que asigna un tiempo ejecución a cada programa. Pero eso no ayuda cuando queremos que un solo");
console.log("programa pueda progresar mientras que, por ejemplo, espera una solicitud de red.");

console.log();

console.log("En un modelo de programación síncrona, las tareas se realizan en serie, de una en una e.g. cuando llamamos a una función que");
console.log("realiza una acción de larga duración, solo regresa cuando la acción ha finalizado y puede devolver el resultado. Esto detiene");
console.log("el programa durante el tiempo que tarda la acción.");

console.log();

console.log("Un modelo asíncrono, permite que sucedan varias cosas al mismo tiempo. Cuando inicia una acción, el programa continúa");
console.log("ejecutándose. Cuando finaliza la acción, se informa al programa y obtiene acceso al resultado e.g. datos leídos del disco.");
console.log("El diagrama de la página 181 representa los dos modelos de ejecución de programas.");

console.log();

console.log("Crow tech: escribiremos algunas funciones básicas de red de cuervos.");

console.log();

console.log("Un enfoque de la programación asíncrona es hacer que las funciones que realizan una acción lenta tomen un argumento");
console.log("adicional, una función de devolución de llamada (callback). Se inicia la acción y, cuando finaliza, se llama a la callback");
console.log("con el resultado. Como ejemplo, la función setTimeout, espera una determinada cantidad de milisegundos");
console.log("(un segundo equivale a mil milisegundos) y luego llama a una función.");

setTimeout(() => console.log("Tick"), 500);