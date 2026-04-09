const searchInput = document.getElementById("articleSearch");
const filterButtons = document.querySelectorAll(".filter-chip");
const articleItems = document.querySelectorAll(".article-item");
const resultsCount = document.getElementById("resultsCount");
const currentFilterText = document.getElementById("currentFilterText");
const emptyState = document.getElementById("emptyState");
const clearFiltersButton = document.getElementById("clearFilters");

let activeFilter = "todos";

const filterLabels = {
  "todos": "Todos",
  "finanzas-personales": "Finanzas personales",
  "trabajo-y-salario": "Trabajo y salario",
  "vivienda-y-hogar": "Vivienda y hogar",
  "impuestos-y-burocracia": "Impuestos y burocracia",
  "vida-adulta": "Vida adulta"
};

function getQueryParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

function setActiveButton(filterValue) {
  filterButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.filter === filterValue);
  });
}

function normalizeText(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function applyFilters() {
  if (!articleItems.length) return;

  const query = normalizeText(searchInput.value.trim());
  let visibleCount = 0;

  articleItems.forEach((item) => {
    const category = item.dataset.category;
    const title = normalizeText(item.dataset.title || "");
    const keywords = normalizeText(item.dataset.keywords || "");

    const matchesFilter = activeFilter === "todos" || category === activeFilter;
    const matchesSearch = query === "" || title.includes(query) || keywords.includes(query);

    const shouldShow = matchesFilter && matchesSearch;
    item.hidden = !shouldShow;

    if (shouldShow) visibleCount++;
  });

  resultsCount.textContent = String(visibleCount);
  currentFilterText.textContent = filterLabels[activeFilter] || "Todos";
  emptyState.hidden = visibleCount !== 0;
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    setActiveButton(activeFilter);
    applyFilters();
  });
});

if (searchInput) {
  searchInput.addEventListener("input", applyFilters);
}

if (clearFiltersButton) {
  clearFiltersButton.addEventListener("click", () => {
    activeFilter = "todos";
    if (searchInput) searchInput.value = "";
    setActiveButton(activeFilter);
    applyFilters();
    history.replaceState({}, "", "articulos.html");
  });
}

const initialFilter = getQueryParam("tema");
if (initialFilter && filterLabels[initialFilter]) {
  activeFilter = initialFilter;
  setActiveButton(activeFilter);
}

applyFilters();
