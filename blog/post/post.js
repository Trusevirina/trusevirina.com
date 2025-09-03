document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("articles-list");
  const pagination = document.getElementById("pagination");
  const perPage = 25;
  let currentPage = 1;
  let articles = [];

  // Carica l'indice JSON
  fetch("post/post_index.json")
    .then(res => res.json())
    .then(data => {
      articles = data.sort((a, b) => b.date.localeCompare(a.date)); // articoli dal più recente
      renderPage();
    });

  function renderPage() {
    container.innerHTML = "";
    const start = (currentPage - 1) * perPage;
    const end = start + perPage;
    const pageArticles = articles.slice(start, end);

    pageArticles.forEach(article => {
        const card = document.createElement("div");
        card.classList.add("article-card");
        card.innerHTML = `
            <h2>${article.title}</h2>
            <small>${article.date} • ${article.collaboration} • ${article.reading_time}</small>
            <p>${article.summary}</p>
            <a href="post/${article.file}" class="read-more">READ MORE</a>
        `;
        container.appendChild(card);
    });

    renderPagination();
  }

  function renderPagination() {
    pagination.innerHTML = "";
    const totalPages = Math.ceil(articles.length / perPage);

    if (currentPage > 1) {
      const prev = document.createElement("button");
      prev.textContent = "← Precedente";
      prev.onclick = () => { currentPage--; renderPage(); };
      pagination.appendChild(prev);
    }

    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement("button");
      btn.textContent = i;
      if (i === currentPage) btn.disabled = true;
      btn.onclick = () => { currentPage = i; renderPage(); };
      pagination.appendChild(btn);
    }

    if (currentPage < totalPages) {
      const next = document.createElement("button");
      next.textContent = "Successivo →";
      next.onclick = () => { currentPage++; renderPage(); };
      pagination.appendChild(next);
    }
  }
});
