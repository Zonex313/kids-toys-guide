(async function () {
  const band = KidsGuide.qs("band") || "2-3";
  const root = document.getElementById("catalogApp");
  if (!root) return;

  const state = { band, data: null, filtered: [], page: 1, q: "", cat: "" };

  function renderEditorial(d) {
    const ed = d.editorial || {};
    document.getElementById("ageTitle").textContent = d.label;
    document.getElementById("ageTagline").textContent = ed.tagline || "";
    document.getElementById("crumbAge").textContent = d.label;
    const box = document.getElementById("editorial");
    const unsuitable = ed.unsuitable
      ? `<div class="ed-card deny-card"><h3>更适合避开的玩法</h3><p>${KidsGuide.escapeHTML(ed.unsuitable)}</p></div>`
      : "";
    box.innerHTML = `
      <div class="ed-card"><h3>👶 这个年龄需要什么</h3><p>${KidsGuide.escapeHTML(ed.needs || d.desc || "")}</p></div>
      <div class="ed-card"><h3>🌱 给父母的发展小提示</h3><p>${KidsGuide.escapeHTML(ed.develop || "")}</p></div>
      <div class="ed-card"><h3>🧸 什么样的玩具更合适</h3><p>${KidsGuide.escapeHTML(ed.toys || "")}</p></div>
      <div class="ed-card warn-card"><h3>给家长的提醒</h3><p>${KidsGuide.escapeHTML(ed.watch || "")}</p></div>
      ${unsuitable}`;
  }

  function applyFilter() {
    const q = state.q.trim().toLowerCase();
    const cat = state.cat;
    state.filtered = (state.data.models || []).filter((m) => {
      if (cat && m.cat !== cat) return false;
      if (!q) return true;
      const hay = `${m.title} ${m.name_en} ${m.cat_zh} ${m.intro} ${m.why}`.toLowerCase();
      return hay.includes(q);
    });
    state.page = 1;
    renderList();
  }

  function renderList() {
    const total = state.filtered.length;
    const pages = Math.max(1, Math.ceil(total / KidsGuide.PAGE_SIZE));
    if (state.page > pages) state.page = pages;
    const start = (state.page - 1) * KidsGuide.PAGE_SIZE;
    const slice = state.filtered.slice(start, start + KidsGuide.PAGE_SIZE);
    const grid = document.getElementById("modelGrid");
    const meta = document.getElementById("resultMeta");
    meta.textContent = `共 ${total} 款 · 第 ${state.page}/${pages} 页`;
    if (!slice.length) {
      grid.innerHTML = `<div class="empty">没有符合条件的模型，试试清空搜索或换个分类。</div>`;
    } else {
      grid.innerHTML = slice.map((m, i) => KidsGuide.cardHTML(m, i)).join("");
    }
    document.getElementById("prevPage").disabled = state.page <= 1;
    document.getElementById("nextPage").disabled = state.page >= pages;
    document.getElementById("pageInfo").textContent = `${state.page} / ${pages}`;
  }

  try {
    root.querySelector(".loading")?.remove();
    // prefetch companion js for current band to speed file://
    try { await KidsGuide.loadScript(`data/age/${band}.js`); } catch (_) {}
    const d = await KidsGuide.fetchJSON(`data/age/${band}.json`);
    state.data = d;
    renderEditorial(d);

    const sel = document.getElementById("catFilter");
    sel.innerHTML =
      `<option value="">全部分类</option>` +
      (d.categories || [])
        .map((c) => `<option value="${KidsGuide.escapeHTML(c.id)}">${KidsGuide.escapeHTML(c.zh)}（${c.n}）</option>`)
        .join("");

    document.getElementById("searchBox").addEventListener("input", (e) => {
      state.q = e.target.value;
      applyFilter();
    });
    sel.addEventListener("change", (e) => {
      state.cat = e.target.value;
      applyFilter();
    });
    document.getElementById("prevPage").addEventListener("click", () => {
      if (state.page > 1) {
        state.page--;
        renderList();
        window.scrollTo({ top: document.getElementById("toolbar").offsetTop - 70, behavior: "smooth" });
      }
    });
    document.getElementById("nextPage").addEventListener("click", () => {
      state.page++;
      renderList();
      window.scrollTo({ top: document.getElementById("toolbar").offsetTop - 70, behavior: "smooth" });
    });

    applyFilter();
  } catch (e) {
    const grid = document.getElementById("modelGrid");
    if (grid) grid.innerHTML = `<div class="empty">加载失败：${KidsGuide.escapeHTML(e.message)}</div>`;
  }
})();
