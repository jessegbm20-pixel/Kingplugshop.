const CLAVE = "jessebillonario1232"; // ← puedes cambiarla

function entrar() {
  const clave = document.getElementById("clave").value;
  if (clave === CLAVE) {
    document.getElementById("login").style.display = "none";
    document.getElementById("panel").style.display = "block";
  } else {
    alert("Contraseña incorrecta 😅");
  }
}

const form = document.getElementById("formProducto");
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const precio = document.getElementById("precio").value;
    const descripcion = document.getElementById("descripcion").value;
    const imagen = document.getElementById("imagen").files[0];

    if (!imagen) {
      alert("Selecciona una imagen");
      return;
    }

    const reader = new FileReader();
    reader.onload = function () {
      const producto = {
        nombre,
        precio,
        descripcion,
        imagen: reader.result,
      };

      let productos = JSON.parse(localStorage.getItem("productos")) || [];
      productos.push(producto);
      localStorage.setItem("productos", JSON.stringify(productos));

      document.getElementById("estado").textContent = "✅ Producto agregado localmente";
      form.reset();
    };
    reader.readAsDataURL(imagen);
  });
}
