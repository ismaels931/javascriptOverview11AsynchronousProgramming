console.log("Los computadores de nidos de cuervos tienen una bombilla de almacenamiento de datos a largo plazo, donde se graban");
console.log("fragementos de información en ramitas para que puedan recuperarse más tarde (el objeto storage que crea la función storageFor).");
console.log("Grabar o encontrar un dato, toma un momento, por lo que la interfaz para el almacenamiento a largo plazo es asíncrona y utiliza");
console.log("callbacks (los métodos readStorage y writeStorage de la clase Node).");

console.log();

console.log("Las bombillas de almacenamiento almacenan partes de datos codificables JSON con nombres (línea 40 crow-tech.js) e.g.");
console.log("un cuervo puede almacenar información sobre los lugares donde se esconde comida bajo el nombre de 'food caches' (línea ");
console.log("23 crow-tech.js), que podría contener una serie de nombres que apuntan a otros datos, describiendo el caché rel. Para");
console.log("buscar un caché de alimentos en las bombillas de almacenamiento del nido Big Oak, un cuervo podría ejecutar un código");
console.log("como el siguiente:");

import { bigOak } from "./crow-tech.js";
console.log(bigOak);

bigOak.readStorage("food caches", caches => {
	let firstCache = caches[0];
	bigOak.readStorage(firstCache, info => {
		console.log(info);
	});
});

console.log("Los computadores de nidos de cuervos están diseñados para comunicarse mediante pares de solicitud y respuesta. Esto significa");
console.log("que un nido envía un mensaje a otro nido, que luego envía inmediatamente un mensaje de regreso, confirmando la recepción");
console.log("y posiblemente incluyendo una respuesta a una pregunta formulada en el mensaje. Cada mensaje está etiquetado con un tipo,");
console.log("que determina cómo se maneja. Nuestro código puede definir controladores para tipos de solicitud específicos y, cuando se");
console.log("recibe una solicitud de este tipo, se llama al controlador para producir una respuesta.");

console.log();

console.log("La interfaz exportada por el módulo './crow-tech.js' proporciona funciones de comunicación basadas en callbacks. Los nidos");
console.log("tienen un método de envío que envía una solicitud. Espera el nombre del nido de destino, el tipo de solicitud y el contenido");
console.log("de la solicitud como sus primeros tres argumentos, y espera que una función llame cuando llegue una respuesta como cuarto");
console.log("argumento (método send de la clase Node) e.g.");

bigOak.send("Cow Pasture", "note", "Let's caw loudly at 7PM", () => console.log("Note delivered."));

console.log();

console.log("Pero para hacer que los nidos sean capaces de recibir la solicitud anterior, primero tenemos que definir un tipo de solicitud");
console.log("llamado 'note'. El código que maneja las solicitudes tiene que ejecutarse no solo en este computador nido sino en todos los");
console.log("nidos que pueden recibir mensajes de este tipo. Simplemente asumiremos que un cuervo vuela e instala nuestro código de");
console.log("controlador en todos los nidos e.g.");

import {defineRequestType} from "./crow-tech.js";

defineRequestType("note", (nest, content, source, done) => {
	console.log(`${nest.name} received note: ${content}`);
	done();
});

console.log();

console.log("La función 'defineRequestType' define un nuevo tipo de solicitud. El ejemplo agrega soporte para solicitudes de 'note',");
console.log("que Simplemente envía una nota a un nido determinado. Nuestra implementación llama a 'console.log' para que podamos verificar");
console.log("que llegó la solicitud. Los nidos tienen una propiedad de nombre que contiene su nombre (línea 65 crow-tech.js). El cuarto");
console.log("argumento (done), es una callback a la se llama cuando finaliza la solicitud.");

console.log();

console.log("En el caso de acciones asincrónicas, podría, en lugar de disponer que se llame a una función en algún momento en el futuro,");
console.log("devolver un objeto que represente este evento futuro. Esto es lo que implementa la clase estándar 'Promise'. Una promesa es");
console.log("una acción asincrónica que puede completarse en algún momento y producir un valor. Puede notificar a cualquiera que esté");
console.log("interesado cuando su valor está disponible. Para crear una promesa podemos usar la función 'Promise.resolve' que asegura");
console.log("que el valor que le da esté envuelto en una promesa. Si ya es una promesa, se devuelve; de lo contrario, obtiene una nueva");
console.log("promesa que termina inmediatamente con su valor como resultado e.g.");

let fifteen = Promise.resolve(15);
fifteen.then(value => console.log(`Got ${value}`));

console.log();

console.log("El método 'then' de 'Promise' permite obtener el resultado de una promesa. Esto registra un callback que se llamará cuando");
console.log("la promesa se resuelva y produzca un valor. Podemos agregar múltiples callbacks a una sola promesa, y se llamarán, incluso");
console.log("si las agregamos después de que la promesa ya se haya resulto (terminado). Hay más aplicaciones del método 'then'.");

console.log();

console.log("Es útil pensar en las promesas como un dispositivo para trasladar valores a una realidad asincrónica. Un valor normal solo");
console.log("está ahí. Un valor prometido es una valor que podría estar ya ahí o aparecer en algún momento en el futuro. Los cálculos");
console.log("definidos en términos de promesas actúan sobre dichos valores envueltos y se ejecutan de forma asincrónica a medida que los");
console.log("valores están disponibles. Para crear una promesa, podemos usar el constructor 'Promise'. Tiene una interfaz un tanto");
console.log("extraña: el constructor espera una función como argumento, a la que llama inmediatamente, pasándole una función que puede");
console.log("usar para resolver la promesa e.g.");

function storage(nest, name) {
	return new Promise(resolve => {
		nest.readStorage(name, result => resolve(result));
	});
}

storage(bigOak, "enemies").then(value => console.log("Got", value));

console.log();

console.log("La función asincrónica de arriba devuelve un valor significativo. Ésta es la principal ventaja de las promesas: simplifican");
console.log("el uso de funciones asincrónicas. En lugar de tener que pasar callbacks, las funciones basadas en promesas se parecen a las");
console.log("normales: toman entradas como argumentos y devuelven su salida. La única diferencia es que es posible que la salida aún");
console.log("no esté disponible.");

console.log();

console.log("Una solicitud de red puede fallar o algún código que forma parte del cálculo asincrónico puede generar una excepción. Una");
console.log("convención ampliamente utilizada es que el primer argumento del callback se use para indicar que la acción falló y el");
console.log("segundo contiene el valor producido por la acción cuando tiene éxito. Dichos callback siempre deben verificar si recibieron");
console.log("una excepción y asegurarse de que cualquier problema que causen, incluidas las excepciones generadas por las funciones que");
console.log("llaman, se detecten y se asignen a la función correcta. Las promesas facilitan esto. Pueden resolverse (la acción finalizó");
console.log("correctamente) o rechazarse (la acción falló). Los manejadores de resolución se llaman solo cuando la acción es exitosa, y");
console.log("los rechazos se propagan automáticamente a la nueva promesa, que se devuelve. Y cuando un manejador lanza una excepción,");
console.log("esto automáticamente hace que la promesa producida por su llamada sea rechazada. Entonces, si falla cualquier elemento en");
console.log("una cadena de acciones asincrónicas, el resultado de toda la cadena se marca como rechazado y no se llama a ningún");
console.log("manejador de éxito más allá del punto en el que falló.");

console.log();

console.log("Al igual que resolver una promesa proporciona un valor, rechazar una también proporciona uno, llamado razón del rechazo.");
console.log("La función 'Promise.reject' crea una nueva promesa inmediatamente rechazada. Para manejar explícitamente tales rechazos,");
console.log("las promesas tienen el método 'catch' que registra un manejador para ser llamado cuando la promesa es rechazada.");

console.log();

console.log("Las cadenas de promesas creadas por las llamadas a 'then' y 'catch' son como un conducto a través del cual se mueven los");
console.log("valores asincrónicos o los rechazos e.g.");

new Promise((_, reject) => reject(new Error("Fail")))
	.then(value => console.log("Handler 1"))
	.catch(reason => {
		console.log("Caught failure " + reason);
		return "nothing";
	})
	.then(value => console.log("Handler 2", value));

console.log();

console.log("De vez en cuando, no hay suficiente luz para que los sistemas de espejos de los cuervos transmitan una señal o algo está");
console.log("bloqueando el camino de la señal. Es posible que se envíe una señal pero nunca se reciba. Esto hará que el callback dado");
console.log("para enviar, nunca sea llamado, lo que probablemente hará que el programa se detenga sin siquiera darse cuenta de que hay");
console.log("un problema. Estaría bien, que después de un período determinado de no obtener una respuesta, una solicitud expirara el");
console.log("tiempo de espera y notificara el error.");

console.log();

console.log("A menudo, los fallos en la transmisión son accidentes aleatorios, y el simple hecho de volver a intentar la solicitud puede");
console.log("hacer que tenga éxito. Entonces, haremos que nuestra función de solicitud vuelva a intentar enviar la solicitud");
console.log("automáticamente varias veces antes de que se rinda. Esta función devolverá una promesa.");

console.log();

console.log("Incluso cuando una solicitud y su respuesta se entregan correctamente, la respuesta puede indicar un error, e.g. si la");
console.log("solicitud intenta utilizar un tipo de solicitud que no se ha definido o el controlador arroja un error. Para admitir esto,");
console.log("'send' y 'defineRequestType' (crow-tech.js) siguen la convención mencionada anteriormente, donde el primer argumento que");
console.log("se pasa a los callbacks es el motivo del error, si lo hay, y el segundo es el resultado real. Esto se traduce a continuación");
console.log("como una resolución de promesa y rechazo:");

class Timeout extends Error {}

function request(nest, target, type, content) {
	return new Promise((resolve, reject) => {
		let done = false;
		function attempt(n) {
			nest.send(target, type, content, (failed, value) => {
				done = true;
				if (failed) reject(failed);
				else resolve(value);
			});
			setTimeout(() => {
				if (done) return;
				else if (n < 3) attempt(n + 1);
				else reject(new Timeout("Timed out"));
			}, 250);
		}
		attempt(1);
	});
}

console.log("La primera vez que se llama a 'resolve' o 'reject', se determina el resultado de la promesa, y se ignoran las llamadas");
console.log("posteriores causadas por una solicitud que regresa después de que finalice otra solicitud. La función 'attempt' hace un");
console.log("único intento de enviar una solicitud. También establece un tiempo de espera que, si no recibe una respuesta después de");
console.log("250 milisegundos, inicia el siguiente intento o, si se encuentra en el tercer intento, rechaza la promesa con una");
console.log("instancia de Timeout como motivo.");

console.log();

console.log("Para aislarnos de los callbacks por completo, definiremos un contenedor para 'defineRequestType' que permita que la");
console.log("función del controlador devuelva una promesa o un valor simple, y lo transfiera al callback por nosotros e.g.");

function requestType(name, handler) {
	defineRequestType(name, (nest, content, source, callback) => {
		try {
			Promise.resolve(handler(nest, content, source))
			.then(response => callback(null, response),
				failure => callback(failure));
		}
		catch(exception) {
			callback(exception);
		}
	});
}

console.log("'Promise.resolve' se usa para convertir el valor devuelto por el controlador en una promesa, si aún no lo es.");

console.log();

console.log("Cada computador de nido de cuervo mantiene una serie de otros nidos dentro de la distancia de transmisión en la propiedad");
console.log("de sus vecinos. Para verificar cuáles de ellos están disponibles, podemos escribir una función que intente enviar una");
console.log("solicitud de 'ping' (que simplemente solicita una respuesta) a cada uno de ellos y ver cuáles regresan. Cuando se trabaja");
console.log("con colecciones de promesas que se ejecutan al mismo tiempo, la función 'Promise.all' puede resultar útil. Devuelve una");
console.log("promesa que espera a que se resuelvan todas las promesas (de un array). Si se rechaza alguna promesa, el resultado de");
console.log("'Promise.all' se rechaza e.g.");

requestType("ping", () => "pong");

function availableNeighbors(nest) {
	//Adjunta controladores que hacen que las solicitudes existosas produczcan 'true' y
	//las rechazadas produzcan 'false'
	let requests = nest.neighbors.map(neighbor => {
		return request(nest, neighbor, "ping")
		.then(() => true, () => false);
	});
	return Promise.all(requests).then(result => {
		//El método 'filter' se usa para eliminar aquellos vecinos de 'requests' cuyo valor correspondiente es 'false'
		return nest.neighbors.filter((_, i) => result[i]);
	});
}

console.log();

console.log("El hecho de que los nidos de cuervos solo puedan hablar con sus vecinos inhibe en gran medida la utilidad de esta red. Para");
console.log("transmitir información a toda la red, una solución es configurar un tipo de solicitud que se reenvíe automáticamente a todos");
console.log("los vecinos. Estos vecinos, a su vez, lo reenvían a sus vecinos, hasta que toda la red haya recibido el mensaje e.g.");

import {everywhere} from "./crow-tech.js";

//Esta función ejecuta código en cada nido, para agregar una propiedad al objeto de estado del nido, que es donde mantendremos
//el estado local del nido. Así cada nido guarda una serie de cadenas de chismes (gossip) que ya ha visto y evitamos enviar el mismo
//mensaje por la red.
everywhere(nest => {
	nest.state.gossip = [];
});

function sendGossip(nest, message, exceptFor = null) {
	nest.state.gossip.push(message);
	for (let neighbor of nest.neighbors) {
		if (neighbor == exceptFor) continue;
		request(nest, neighbor, "gossip", message);
	}
}

requestType("gossip", (nest, message, source) => {
	if (nest.state.gossip.includes(message)) return;
	console.log(`${nest.name} received gossip '${message}' from ${source}`);
	sendGossip(nest, message, source);
});

console.log();

console.log("Cuando un nido recibe un mensaje de chismes duplicado, lo ignora. Pero cuando recibe un nuevo mensaje, se lo dice emocionado");
console.log("a todos sus vecinos excepto al que envió el mensaje. Esto hará que un nuevo chisme se extienda por la red como una mancha de");
console.log("tinta en el agua. Incluso cuando algunas conexiones no funcionen, si hay una ruta alternativa a un nido determinado, los");
console.log("rumores llegarán allí. Este estilo de comunicación en la red se llama inundación: inunda la red con un fragmento de");
console.log("información hasta que todos los nodos la tienen.");

console.log();

console.log("Si un nodo determinado quiere hablar con otro nodo, la inundación no es un enfoque muy eficiente. Especialmente cuando la");
console.log("la red es grande, eso daría lugar a muchas transferencias inútiles. Un enfoque alternativo consiste en una configuración");
console.log("para que los mensajes salten de un nodo a otro hasta que lleguen a su destino, pero para hacer esto, hay que conocer el");
console.log("diseño de la red. Para enviar una solicitud a un nido lejano, es necesario saber que su nido vecino. Podemos usar la");
console.log("inundación nuevamente, pero en lugar de verificar si un mensaje dado ya ha sido recibido, ahora verificamos si el nuevo");
console.log("conjunto de vecinos de un nido determinado, coincide con el conjunto actual que tenemos para él e.g.");

requestType("connections", (nest, {name, neighbors}, source) => {
	let connections = nest.state.connections;
	if (JSON.stringify(connections.get(name)) == JSON.stringify(neighbors)) return;
	connections.set(name, neighbors);
	broadcastConnections(nest, name, source);
});

function broadcastConnections(nest, name, exceptFor = null) {
	for (let neighbor of nest.neighbors) {
		if (neighbor == exceptFor) continue;
		request(nest, neighbor, "connections", {
			name,
			neighbors: nest.state.connections.get(name)
		});
	}
}

everywhere(nest => {
	nest.state.connections = new Map();
	nest.state.connections.set(nest.name, nest.neighbors);
	broadcastConnections(nest, nest.name);
});

console.log();

console.log("Los nidos comienzan inmediatamente a transmitir sus conexiones, que deberían, a menos que algunos nidos sean inalcazables,");
console.log("a dar rápidamente a cada nido un grafo de la red actual. Gracias a los grafos, podemos encontrar rutas e.g.");

function findRoute(from, to, connections) {
	let work = [{at: from, via: null}];
	for (let i = 0; i < work.length; i++) {
		let {at, via} = work[i];
		for (let next of connections.get(at) || []) {
			if (next == to) return via;
			if (!work.some(w => w.at == next)) work.push({at: next, via: via || next});
		}
	}
	return null;
}

console.log();

console.log("Ahora podemos crear una función que pueda enviar mensajes a larga distancia. Si el mensaje está dirigido a un vecino");
console.log("directo, se entrega como de costumbre. Si no, se empaqueta en un objeto y se envía al vecino que está más cerca del");
console.log("objetivo, utilizando el tipo solicitud 'route', lo que hará que ese vecino repita el mismo comportamiento e.g.");

function routeRequest(nest, targe, type, content) {
	if (nest.neighbors.includes(target)) return request(nest, target, type, content);
	else {
		let via = findRoute(nest.name, target, nest.state.connections);
		if (!via) throw new Error(`No route to ${target}`);
		return request(nest, via, "route", {target, type, content});
	}
}

requestType("route", (nest, {target, type, content}) => {
	return routeRequest(nest, target, type, content);
});

console.log();

console.log("Este es un modelo agradable (aunque simplificado) de como funcionan las redes informáticas reales.");

console.log();

console.log("Para almacenar información importante, se sabe que los cuervos la duplican en los nidos. De esa forma, cuando un halcón");
console.log("destruye un nido, la información no se pierde. Para recuperar una determinada información que no tiene en su propia bombilla");
console.log("de almacenamiento, un computador nido puede consultar otros nidos aleatorios en la red hasta que encuentre uno que la tenga:");

requestType("storage", (nest, name) => storage(nest, name));

function findStorage(nest, name) {
	return storage(nest, name).then(found => {
		if (found != null) return found;
		else return findInRemoteStorage(nest, name);
	});
}

function network(nest) {
	return Array.from(nest.estate.connections.keys());
}

function findInRemoteStorage(nest, name) {
	let sources = network(nest).filter(n => n != nest.name);
	function next() {
		if (sources.length == 0) return Promise.reject(new Error("not found"));
		else {
			let source = sources[Math.floor(Math.random() * sources.length)];
			sources = sources.filter(n => n != source);
			return routeRequest(nest, source, "storage", name)
			.then(value => value != null ? value : next(), next);
		}
	}
	return next();
}

console.log();

console.log("Lo que hace el código anterior es completamente lineal: siempre espera a que se complete la acción anterior antes de iniciar");
console.log("la siguiente. En un modelo de programación sincrónica, sería más sencillo de expresar. La buena noticia es que JS nos");
console.log("permite escribir código pseudo-sincrónico para describir el cálculo asincrónico. Una función asincrónica es una función que");
console.log("devuelve implícitamente una promesa y que, en su cuerpo, puede esperar otras promesas de una manera que parece sincrónica.");
console.log("Podemos reescribir findInStorage así:");

async function findInStorage(nest, name) {
	let local = await storage(nest, name);
	if (local != null) return local;

	let sources = network(nest).filter(n => n != nest.name);
	while (sources.length > 0) {
		let source = sources[Math.floor(Math.random() * sources.length)];
		sources = sources.filter(n => n != source);
		try {
			let found = await routeRequest(nest, source, "storage", name);
			if (found != null) return found;
		}
		catch (_) {}
	}
	throw new Error("Not found");
}

console.log();

console.log("Una función asíncrona está marcada por la keyword 'async' antes de la keyword 'function'. Dicha función devuelve una");
console.log("promesa. Tan pronto como el cuerpo de la función devuelve algo, esta promesa se resuelve. Si lanza una excepción, la");
console.log("promesa se rechaza. Dentro de una async function, la keyword 'await' se puede poner delante de una expresión para esperar");
console.log("a que se resuelva una promesa y solo entonces continuar la ejecución de la función. Por lo tanto, este tipo de función JS");
console.log("se puede congelar en cualquier momento en el que tenga una espera (await) y se puede reanudar en un momento posterior.");

console.log();

console.log("La capacidad de pausar funciones y luego reanudarlas no es exclusiva de las funciones asíncronas. JS también tiene una");
console.log("característica llamada funciones generadoras que son similares a las async functions pero sin las promesas. Cuando definimos");
console.log("una función poniendo un asterisco después de la keyword function (function*), esta función se convierte en un generador.");
console.log("Cuando llamamos a un generador, este devuelve un iterador, como el que vimos en el capítulo 6 e.g.");

function* powers(n) {
	for (let current = n;; current *= n) {
		yield current;
	}
}

for (let power of powers(3)) {
	if (power > 50) break;
	console.log(power);
}

console.log();

console.log("Inicialmente, cuando llamamos a 'powers', la función se congela. Cada vez que llamamos a 'next' en el iterador, la función");
console.log("se ejecuta hasta que alcanza una expresión 'yield', lo que la detiene y hace que el valor generado se convierta en el");
console.log("siguiente valor producido por el iterador. Cuando la función regresa (la del ejemplo nunca lo hace), el iterador está listo.");
console.log("Escribir iteradores es mucho más fácil cuando se utilizan funciones generadoras e.g. el iterador de la clase Group");
console.log("del ejercicio del capítulo 6 se puede escribir con este generador:");

/*Group.prototype[Symbol.iterator] = function*() {
	for (let i = 0; i < this.members.length; i++) {
		yield this.members[i];
	}
};*/

console.log();

console.log("El comportamiento asincrónico ocurre en su propia pila de llamadas. Esta es una de las razones por las que, sin promesas,");
console.log("administrar excepciones en código asincrónico es difícil. Dado que cada callback comienza con un pila casi vacía, sus");
console.log("controladores de captura no estarán en la pila cuando lancen una excepción e.g.");

/*try {
	setTimeout(() => {
		throw new Error("Woosh");
	}, 20);
}

catch (_) {
	//This will not run
	console.log("Caught!");
}*/

console.log("Independientemente de la proximidad de los eventos (como tiempos de espera o solicitudes entrantes), un entorno JS ejecutará");
console.log("solo un programa a la vez. Podemos pensar en esto como si se ejecutara un gran bucle alrededor del programa, llamado bucle");
console.log("de enventos. A medida que llegan los eventos, se agregan a una cola y su código se ejecuta uno tras otro. El siguiente");
console.log("ejemplo establece un tiempo de espera, pero luego se demora hasta después del punto de tiempo previsto del tiempo de espera,");
console.log("lo que hace que el tiempo de espera se retrase:");

let start = Date.now();
setTimeout(() => {
	console.log("Timeout ran at", Date.now() - start);
}, 20);
while (Date.now() < start + 50) {}
console.log("Wasted time until", Date.now() - start);

console.log();

console.log("Las promesas siempre se resuelven o rechazan como un evento nuevo. Incluso si una promesa ya está resuelta, esperarla hará");
console.log("que el callback se ejecute después de que finalice el script actual, en lugar de hacerlo de inmediato e.g.");

Promise.resolve("Done").then(console.log);
console.log("Me first!");

console.log();

console.log("Los programas asincrónicos pueden tener brechas en su ejecución durante las cuales se puede ejecutar otro código. Veamos");
console.log("un ejemplo. Una de las aficiones de nuestros cuervos es contar la cantidad de polluelos que nacen en todo el pueblo cada");
console.log("año. Los nidos almacenan este recuento en sus bombillas de almacenamiento. El siguiente código intenta enumerar los");
console.log("recuentos de todos los nidos para un año determinado:");

function anyStorage(nest, source, name) {
	if (source == nest.name) return storage(nest, name);
	else return routeRequest(nest, source, "storage", name);
}

async function chicks(nest, year) {
	let list = "";
	await Promise.all(network(nest).map(async name => {
		list += `${ṇame}: ${await anyStorage(nest, name, `chicks in ${year}`)}\n`;
	}));
	return list;
}

console.log("El problema de la función 'chicks' radica en el operador '+=', que toma el valor actual de 'list' en el momento en que la");
console.log("instrucción comineza a ejecutarse y luego, cuando finaliza la espera, el valor de 'list' es el valor actual más la cadena");
console.log("agregada. Pero entre el momento en que la declaración comienza a ejecutarse y el momento en que termina hay una brecha");
console.log("asincrónica. La expresión de 'map' se ejecuta antes de que se haya agregado algo a la lista, por lo que cada uno de los");
console.log("operadores '+=' comienza con una cadena vacía y termina, cuando finaliza su recuperación de almacenamiento, configurando");
console.log("la lista en una lista de una sola línea, el resultado de agregar su línea a la cadena vacía.");

console.log();

console.log("Esto se puede evitar devolviendo las líneas de las promesas asignadas y llamando a 'join' en el resultado de Promise.all:");

/*async function chicks(nest, year) {
	let lines = network(nest).map(async name => {
		return name + ": " + await anyStorage(nest, name, `chicks in ${year}`);
	})
	return (await Promise.all(lines)).join("\n");
}*/

console.log("Una ventaja de la asincronicidad explícita de JS (ya sea a través de callbacks, promesas o 'await') es que detectar estas");
console.log("brechas es relativamente fácil.");

console.log();

console.log("Tracking the scalpel. Solution: https://eloquentjavascript.net/code/#11.1");
console.log("Building Promise.all. Solution: https://eloquentjavascript.net/code/#11.2");

console.log();

console.log("Para entender cómo y/o cuándo aplicar las herramientas vistas en este capítulo sería recomendable visitar esta bibliografia");
console.log("complementaria:");

console.log("https://www.neoguias.com/javascript-asincrono/");
console.log("https://lemoncode.net/lemoncode-blog/2018/1/29/javascript-asincrono");