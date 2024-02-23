function start() {
    let elementoTiendas = document.getElementById("noTiendas")

    let miTextoT = elementoTiendas.value;
    let miNumeroT = Number(miTextoT);
    crearTiendas('itemsTiendas', 0, miNumeroT);
}

function crearTiendas(contenedorID, min, cantidadTiendas) {
    //encontrar contenedor por su id
    let elementoContenedor = document.getElementById(contenedorID);

    //crear el loop para crear tantas tiendas como se pidan
    for (let conteoTiendas = 1; conteoTiendas <= cantidadTiendas; conteoTiendas++) {

        //crear el texto de label para poder llamar a la funcion
        let textoEtiqueta = "Tienda " + conteoTiendas;

        //crear tiendas con crearParrafoTienda
        let parrafoTienda = crearParrafoTienda(textoEtiqueta, min);

        //agregar el parrafo al contenedor 
        elementoContenedor.appendChild(parrafoTienda);
    }
}

function crearParrafoTienda(textoLabel, valorMin) {
    //crear las etiquetas de parrafo <p>
    let elementoParrafo = document.createElement("p");

    //crear la etiqueta label 
    let elementoEtiqueta = document.createElement("label");
    elementoEtiqueta.innerText = textoLabel + ": ";

    //conectar con el input
    elementoEtiqueta.setAttribute("for", textoLabel);

    //crear el input
    let elementoInput = document.createElement("input");

    //establecer los elementos del input
    elementoInput.setAttribute("type", "number");
    elementoInput.setAttribute("id", textoLabel);
    elementoInput.setAttribute("min", valorMin);
    elementoInput.setAttribute("value", 0);

    //agregar label input al parrafo
    elementoParrafo.appendChild(elementoEtiqueta);
    elementoParrafo.appendChild(elementoInput);

    //devolver el parrafo completo
    return elementoParrafo;

}



function extraerNumeroDesdeElemento(elemento) {
    let miTexto = elemento.value;
    let miNumero = Number(miTexto);

    return miNumero;
}

function calcular() {
    let ventas = [];
    let posiscionVentas = 0;
    let elementosVentas = document.getElementById("itemsTiendas");
    elementosVentas.children[1].setAttribute("class", "default")

    for (let item of elementosVentas.children) {
        let valorVenta = extraerNumeroDesdeElemento(item.children[1]);
        ventas[posiscionVentas] = valorVenta;
        posiscionVentas = posiscionVentas + 1;
    }


    let totalVentas = sumarTotal(ventas);
    let ventaMayor = calcularMayor(ventas);
    let ventaMenor = calcularMenor(ventas);

    
    for (let comparacion of elementosVentas.children) {
        let valorPorTienda = extraerNumeroDesdeElemento(comparacion.children[1]);

        comparacion.children[1].className = "default";

        if (valorPorTienda == ventaMayor) {
            comparacion.children[1].className = "mayor" 
        } else if (valorPorTienda == ventaMenor) {
            comparacion.children[1].className = "menor" 
        }
    }

    let mensajeSalida = "Total Ventas: " + totalVentas;
    let elementoSalida = document.getElementById("parrafoSalida");

    elementoSalida.textContent = mensajeSalida;
}

function sumarTotal(tiendas) {
    let total = 0;

    for (let venta of tiendas) {
        total = total + venta;
    }

    return total;
}

function calcularMayor(tiendas) {
    let maximo = tiendas[0];

    for (let venta of tiendas) {
        if (venta > maximo) {
            maximo = venta;
        }
    }

    return maximo;
}

function calcularMenor(tiendas) {
    let minimo = tiendas[0];

    for (let venta of tiendas) {
        if (venta < minimo) {
            minimo = venta;
        }
    }

    return minimo;
}