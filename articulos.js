const searchInput = document.getElementById("articleSearch");
const resultsCount = document.getElementById("resultsCount");
const filterButtons = document.querySelectorAll(".filter-pill");
const topicButtons = document.querySelectorAll(".topic-card");
const articleCards = document.querySelectorAll(".article-card");
const emptyState = document.getElementById("emptyState");

let activeFilter = "all";

function normalizeText(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function applyFilters() {
  const query = normalizeText(searchInput.value);
  let visibleCount = 0;

  articleCards.forEach((card) => {
    const category = card.dataset.category;
    const searchable = normalizeText(card.dataset.search || card.textContent);

    const matchesFilter = activeFilter === "all" || category === activeFilter;
    const matchesQuery = query === "" || searchable.includes(query);

    const shouldShow = matchesFilter && matchesQuery;
    card.hidden = !shouldShow;

    if (shouldShow) visibleCount += 1;
  });

  resultsCount.textContent = visibleCount;
  emptyState.hidden = visibleCount !== 0;
}

function setActiveFilter(filterName) {
  activeFilter = filterName;

  filterButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.filter === filterName);
  });

  applyFilters();
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setActiveFilter(button.dataset.filter);
  });
});

topicButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setActiveFilter(button.dataset.filter);
    document.querySelector(".results-panel").scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
});

searchInput.addEventListener("input", applyFilters);

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const topicFromUrl = params.get("tema");

  const validFilters = ["salario", "finanzas", "vivienda", "burocracia", "trabajo"];

  if (topicFromUrl && validFilters.includes(topicFromUrl)) {
    setActiveFilter(topicFromUrl);
  } else {
    applyFilters();
  }
});
