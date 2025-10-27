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
let cart = [];

function addToCart(name, price) {
  cart.push({ name, price });
  alert(`${name} agregado al carrito 🛒`);
}

function buyNow(name, price) {
  alert(`Gracias por tu compra de ${name} por $${price} MXN ✅`);
  // Aquí más adelante se puede conectar con WhatsApp o un sistema de pago real.
}
let products = JSON.parse(localStorage.getItem("products")) || [];

function updateAdminProductList() {
  const list = document.getElementById("product-list-admin");
  list.innerHTML = "";
  products.forEach((product, index) => {
    const item = document.createElement("div");
    item.style.border = "1px solid #ccc";
    item.style.borderRadius = "10px";
    item.style.margin = "8px 0";
    item.style.padding = "8px";
    item.innerHTML = `
      <strong>${product.name}</strong> - $${product.price} MXN
      <button onclick="deleteProduct(${index})" style="margin-left:10px;background:red;color:white;border:none;padding:5px 10px;border-radius:5px;">Eliminar</button>
    `;
    list.appendChild(item);
  });
}

function deleteProduct(index) {
  products.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(products));
  updateAdminProductList();
  alert("Producto eliminado ✅");
}

// Actualiza la lista cada vez que se abre el admin
document.addEventListener("DOMContentLoaded", updateAdminProductList);
