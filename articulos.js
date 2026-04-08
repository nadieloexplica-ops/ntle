const searchInput = document.getElementById("article-search");
const filterButtons = document.querySelectorAll(".filter-btn");
const articleCards = document.querySelectorAll(".article-card");
const resultsCount = document.getElementById("results-count");
const emptyState = document.getElementById("empty-state");

let activeFilter = "all";

function normalizeText(text) {
  return text.toLowerCase().trim();
}

function updateArticles() {
  const query = normalizeText(searchInput.value);
  let visibleCount = 0;

  articleCards.forEach((card) => {
    const categories = normalizeText(card.dataset.category || "");
    const searchableText = normalizeText(card.dataset.search || "");
    const matchesFilter =
      activeFilter === "all" || categories.includes(activeFilter);
    const matchesSearch =
      query === "" || searchableText.includes(query);

    const isVisible = matchesFilter && matchesSearch;

    card.classList.toggle("hidden", !isVisible);

    if (isVisible) {
      visibleCount += 1;
    }
  });

  resultsCount.textContent = String(visibleCount);
  emptyState.classList.toggle("hidden", visibleCount > 0);
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    activeFilter = button.dataset.filter;
    updateArticles();
  });
});

searchInput.addEventListener("input", updateArticles);

updateArticles();
