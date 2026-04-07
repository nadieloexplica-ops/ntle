const articulos = [
  {
    titulo: "Cómo leer una nómina en España (explicado fácil con ejemplo real)",
    descripcion: "Aprende qué significan el bruto, el neto, el IRPF y las deducciones de una nómina real paso a paso.",
    tema: "trabajo-y-salario",
    temaLabel: "Trabajo y salario",
    url: "articulos/como-leer-una-nomina-espana.html",
    fecha: "2026-04-07",
    keywords: ["nomina", "nómina", "irpf", "salario bruto", "salario neto", "trabajo", "sueldo"],
    descargable: true,
    descargaTexto: "Descargar ejemplo de nómina",
    descargaUrl: "descargas/ejemplo-nomina.pdf"
  },
  {
    titulo: "Cómo hacer un presupuesto mensual (paso a paso y sin complicaciones)",
    descripcion: "Una guía clara y realista para organizar tus ingresos, gastos fijos, variables y ahorro mensual.",
    tema: "finanzas-personales",
    temaLabel: "Finanzas personales",
    url: "articulos/como-hacer-un-presupuesto-mensual.html",
    fecha: "2026-04-07",
    keywords: ["presupuesto", "ahorro", "gastos", "ingresos", "finanzas personales"],
    descargable: true,
    descargaTexto: "Descargar plantilla de presupuesto",
    descargaUrl: "descargas/plantilla-presupuesto-mensual.xlsx"
  }
];

const grupos = {
  "finanzas-personales": document.getElementById("grupo-finanzas-personales"),
  "trabajo-y-salario": document.getElementById("grupo-trabajo-y-salario")
};

const searchInput = document.getElementById("articleSearch");
const filterButtons = document.querySelectorAll(".filter-btn");
const temaGroups = document.querySelectorAll(".tema-group");
const resultsCount = document.getElementById("resultsCount");
const noResults = document.getElementById("noResults");

let filtroActual = "todos";
let textoBusqueda = "";

function formatFecha(fecha) {
  const date = new Date(fecha);
  return date.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

function crearCard(articulo) {
  const descargaHtml = articulo.descargable
    ? `<a class="article-download" href="${articulo.descargaUrl}" download>${articulo.descargaTexto}</a>`
    : "";

  return `
    <article class="article-card">
      <div class="article-meta">
        <span class="article-tag">${articulo.temaLabel}</span>
        <span class="article-date">${formatFecha(articulo.fecha)}</span>
      </div>

      <h3>${articulo.titulo}</h3>
      <p>${articulo.descripcion}</p>

      <div class="article-actions">
        <a class="article-link" href="${articulo.url}">Leer artículo</a>
        ${descargaHtml}
      </div>
    </article>
  `;
}

function filtrarArticulos() {
  return articulos
    .filter((articulo) => {
      const coincideTema = filtroActual === "todos" || articulo.tema === filtroActual;

      const textoCompleto = `
        ${articulo.titulo}
        ${articulo.descripcion}
        ${articulo.temaLabel}
        ${articulo.keywords.join(" ")}
      `.toLowerCase();

      const coincideBusqueda = textoCompleto.includes(textoBusqueda.toLowerCase());

      return coincideTema && coincideBusqueda;
    })
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
}

function limpiarGrupos() {
  Object.values(grupos).forEach((grupo) => {
    if (grupo) {
      grupo.innerHTML = "";
    }
  });
}

function renderArticulos() {
  limpiarGrupos();

  const filtrados = filtrarArticulos();

  temaGroups.forEach((group) => {
    group.classList.add("hidden");
  });

  if (filtrados.length === 0) {
    noResults.classList.remove("hidden");
    resultsCount.textContent = "0 artículos encontrados";
    return;
  }

  noResults.classList.add("hidden");
  resultsCount.textContent =
    filtrados.length === 1
      ? "1 artículo encontrado"
      : `${filtrados.length} artículos encontrados`;

  filtrados.forEach((articulo) => {
    if (grupos[articulo.tema]) {
      grupos[articulo.tema].innerHTML += crearCard(articulo);
    }
  });

  temaGroups.forEach((group) => {
    const key = group.dataset.group;
    if (grupos[key] && grupos[key].children.length > 0) {
      group.classList.remove("hidden");
    }
  });
}

if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    textoBusqueda = e.target.value.trim();
    renderArticulos();
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    filtroActual = button.dataset.filter;
    renderArticulos();
  });
});

renderArticulos();
