const products = [
  { id: "fc-1888", name: "flux capacitor" },
  { id: "fc-2050", name: "power laces" },
  { id: "fs-1987", name: "time circuits" },
  { id: "ac-2000", name: "low voltage reactor" },
  { id: "jj-1969", name: "warp equalizer" }
];

// llenar productos
const select = document.getElementById("productName");
if (select) {
  products.forEach(p => {
    const option = document.createElement("option");
    option.value = p.id;
    option.textContent = p.name;
    select.appendChild(option);
  });
}

// footer
const year = document.getElementById("year");
if (year) {
  year.textContent = new Date().getFullYear();
}

const last = document.getElementById("lastModified");
if (last) {
  last.textContent = document.lastModified;
}

// contador
const count = document.getElementById("reviewCount");
if (count) {
  let total = localStorage.getItem("reviews") || 0;
  total++;
  localStorage.setItem("reviews", total);
  count.textContent = total;
}