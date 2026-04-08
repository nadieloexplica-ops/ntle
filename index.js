const searchInput = document.getElementById("articleSearch");
const clearBtn = document.getElementById("clearSearch");
const articleCards = document.querySelectorAll(".article-card");
const filterButtons = document.querySelectorAll(".filter-tag");
const topicButtons = document.querySelectorAll(".topic-box");
const noResults = document.getElementById("noResults");
const articlesSection = document.getElementById("articulos");

let activeFilter = "all";

function updateVisibleArticles() {
  const searchTerm = searchInput.value.toLowerCase().trim();
  let visibleCount = 0;

  articleCards.forEach((card) => {
    const title = card.dataset.title.toLowerCase();
    const category = card.dataset.category;

    const matchesSearch = title.includes(searchTerm);
    const matchesFilter = activeFilter === "all" || category === activeFilter;

    if (matchesSearch && matchesFilter) {
      card.style.display = "flex";
      visibleCount += 1;
    } else {
      card.style.display = "none";
    }
  });

  noResults.style.display = visibleCount === 0 ? "block" : "none";
}

function setActiveFilterButton(filterValue) {
  filterButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.filter === filterValue);
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    setActiveFilterButton(activeFilter);
    updateVisibleArticles();
  });
});

topicButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.topic;
    setActiveFilterButton(activeFilter);
    updateVisibleArticles();

    if (articlesSection) {
      articlesSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});

if (searchInput) {
  searchInput.addEventListener("input", updateVisibleArticles);
}

if (clearBtn) {
  clearBtn.addEventListener("click", () => {
    searchInput.value = "";
    activeFilter = "all";
    setActiveFilterButton("all");
    updateVisibleArticles();
  });
}

updateVisibleArticles();
