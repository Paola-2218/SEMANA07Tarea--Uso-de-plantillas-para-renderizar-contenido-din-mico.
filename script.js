const productosCatalogo = [
    {
        nombre: "Balones profesionales",
        descripcion: "Balones resistentes para entrenamientos, partidos y competencias.",
        categoria: "Balones",
        imagen: "img/balones.jpg"
    },
    {
        nombre: "Botines deportivos",
        descripcion: "Calzado cómodo y seguro para diferentes tipos de cancha.",
        categoria: "Botines",
        imagen: "img/botines.jpg"
    },
    {
        nombre: "Camisetas oficiales",
        descripcion: "Modelos deportivos para aficionados, equipos y entrenamientos.",
        categoria: "Camisetas",
        imagen: "img/camisetas.jpg"
    }
];

const productosRegistrados = [];

const catalogoProductos = document.getElementById("catalogoProductos");
const formProducto = document.getElementById("formProducto");
const nombreProducto = document.getElementById("nombreProducto");
const descripcionProducto = document.getElementById("descripcionProducto");
const categoriaProducto = document.getElementById("categoriaProducto");

const errorNombre = document.getElementById("errorNombre");
const errorDescripcion = document.getElementById("errorDescripcion");
const errorCategoria = document.getElementById("errorCategoria");

const mensajeValidacion = document.getElementById("mensajeValidacion");
const listaProductos = document.getElementById("listaProductos");
const totalProductos = document.getElementById("totalProductos");
const mensajeEstadoRegistros = document.getElementById("mensajeEstadoRegistros");

document.addEventListener("DOMContentLoaded", function () {
    renderizarCatalogo();
    renderizarProductosRegistrados();
});

nombreProducto.addEventListener("input", validarNombre);
nombreProducto.addEventListener("blur", validarNombre);

descripcionProducto.addEventListener("input", validarDescripcion);
descripcionProducto.addEventListener("blur", validarDescripcion);

categoriaProducto.addEventListener("change", validarCategoria);
categoriaProducto.addEventListener("blur", validarCategoria);

formProducto.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const nombreValido = validarNombre();
    const descripcionValida = validarDescripcion();
    const categoriaValida = validarCategoria();

    if (!nombreValido || !descripcionValida || !categoriaValida) {
        mostrarMensajeGeneral("Revise los campos marcados antes de registrar.", "danger");
        return;
    }

    const nuevoProducto = {
        nombre: nombreProducto.value.trim(),
        descripcion: descripcionProducto.value.trim(),
        categoria: categoriaProducto.value.trim()
    };

    productosRegistrados.push(nuevoProducto);

    renderizarProductosRegistrados();
    formProducto.reset();
    limpiarValidaciones();
    mostrarMensajeGeneral("Producto registrado correctamente.", "success");
});

function renderizarCatalogo() {
    catalogoProductos.innerHTML = "";

    productosCatalogo.forEach(function (producto) {
        const columna = document.createElement("div");
        columna.className = "col-md-6 col-lg-4";

        const tarjeta = document.createElement("div");
        tarjeta.className = "card";

        const imagen = document.createElement("img");
        imagen.className = "card-img-top";
        imagen.src = producto.imagen;
        imagen.alt = producto.nombre;

        const cuerpo = document.createElement("div");
        cuerpo.className = "card-body";

        const titulo = document.createElement("h3");
        titulo.className = "card-title h5";
        titulo.textContent = producto.nombre;

        const descripcion = document.createElement("p");
        descripcion.className = "card-text";
        descripcion.textContent = producto.descripcion;

        const categoria = document.createElement("span");
        categoria.className = "badge bg-success mb-3";
        categoria.textContent = producto.categoria;

        cuerpo.appendChild(titulo);
        cuerpo.appendChild(descripcion);
        cuerpo.appendChild(categoria);

        tarjeta.appendChild(imagen);
        tarjeta.appendChild(cuerpo);
        columna.appendChild(tarjeta);

        catalogoProductos.appendChild(columna);
    });
}

function renderizarProductosRegistrados() {
    listaProductos.innerHTML = "";
    totalProductos.textContent = productosRegistrados.length;

    if (productosRegistrados.length === 0) {
        mensajeEstadoRegistros.innerHTML = "";

        const mensaje = document.createElement("p");
        mensaje.className = "estado-vacio mb-3";
        mensaje.textContent = "Aún no hay productos registrados.";

        mensajeEstadoRegistros.appendChild(mensaje);
        return;
    }

    mensajeEstadoRegistros.innerHTML = "";

    productosRegistrados.forEach(function (producto, indice) {
        const columna = document.createElement("div");
        columna.className = "col-md-6";

        const tarjeta = document.createElement("div");
        tarjeta.className = "card h-100 border";

        const cuerpo = document.createElement("div");
        cuerpo.className = "card-body";

        const titulo = document.createElement("h4");
        titulo.className = "card-title h5";
        titulo.textContent = producto.nombre;

        const textoDescripcion = document.createElement("p");
        textoDescripcion.className = "card-text";
        textoDescripcion.textContent = producto.descripcion;

        const etiquetaCategoria = document.createElement("span");
        etiquetaCategoria.className = "badge bg-success mb-3";
        etiquetaCategoria.textContent = producto.categoria;

        const botonEliminar = document.createElement("button");
        botonEliminar.className = "btn btn-outline-danger btn-sm d-block";
        botonEliminar.textContent = "Eliminar";

        botonEliminar.addEventListener("click", function () {
            productosRegistrados.splice(indice, 1);
            renderizarProductosRegistrados();
            mostrarMensajeGeneral("Producto eliminado correctamente.", "danger");
        });

        cuerpo.appendChild(titulo);
        cuerpo.appendChild(textoDescripcion);
        cuerpo.appendChild(etiquetaCategoria);
        cuerpo.appendChild(botonEliminar);

        tarjeta.appendChild(cuerpo);
        columna.appendChild(tarjeta);

        listaProductos.appendChild(columna);
    });
}

function validarNombre() {
    const nombre = nombreProducto.value.trim();

    if (nombre === "") {
        mostrarError(nombreProducto, errorNombre, "El nombre del producto es obligatorio.");
        return false;
    }

    if (nombre.length < 3) {
        mostrarError(nombreProducto, errorNombre, "El nombre debe tener al menos 3 caracteres.");
        return false;
    }

    mostrarCorrecto(nombreProducto, errorNombre);
    return true;
}

function validarDescripcion() {
    const descripcion = descripcionProducto.value.trim();

    if (descripcion === "") {
        mostrarError(descripcionProducto, errorDescripcion, "La descripción es obligatoria.");
        return false;
    }

    if (descripcion.length < 10) {
        mostrarError(descripcionProducto, errorDescripcion, "La descripción debe tener al menos 10 caracteres.");
        return false;
    }

    mostrarCorrecto(descripcionProducto, errorDescripcion);
    return true;
}

function validarCategoria() {
    const categoria = categoriaProducto.value.trim();

    if (categoria === "") {
        mostrarError(categoriaProducto, errorCategoria, "Debe seleccionar una categoría.");
        return false;
    }

    mostrarCorrecto(categoriaProducto, errorCategoria);
    return true;
}

function mostrarError(campo, contenedorError, mensaje) {
    campo.classList.remove("is-valid");
    campo.classList.add("is-invalid");
    contenedorError.textContent = mensaje;
}

function mostrarCorrecto(campo, contenedorError) {
    campo.classList.remove("is-invalid");
    campo.classList.add("is-valid");
    contenedorError.textContent = "";
}

function limpiarValidaciones() {
    nombreProducto.classList.remove("is-valid", "is-invalid");
    descripcionProducto.classList.remove("is-valid", "is-invalid");
    categoriaProducto.classList.remove("is-valid", "is-invalid");

    errorNombre.textContent = "";
    errorDescripcion.textContent = "";
    errorCategoria.textContent = "";
}

function mostrarMensajeGeneral(texto, tipo) {
    mensajeValidacion.innerHTML = "";

    const alerta = document.createElement("div");
    alerta.className = `alert alert-${tipo}`;
    alerta.textContent = texto;

    mensajeValidacion.appendChild(alerta);

    setTimeout(function () {
        mensajeValidacion.innerHTML = "";
    }, 3000);
}