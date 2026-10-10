(async function () {
  const grid = document.getElementById("ageGrid");
  const totalEl = document.getElementById("statTotal");
  const bandEl = document.getElementById("statBands");
  if (!grid) return;
  try {
    const summary = await KidsGuide.fetchJSON("data/summary.json");
    if (totalEl) totalEl.textContent = summary.total.toLocaleString("zh-CN");
    if (bandEl) bandEl.textContent = String((summary.bands || []).length);
    grid.innerHTML = (summary.bands || [])
      .map((b) => {
        return `<a class="age-card" href="age.html?band=${encodeURIComponent(b.band)}">
          <div class="age-num">${KidsGuide.escapeHTML(b.label)}</div>
          <div class="age-tag">${KidsGuide.escapeHTML(b.tagline || "")}</div>
          <p class="age-blurb">${KidsGuide.escapeHTML(b.needs || b.desc || "")}</p>
          <div class="age-meta">
            <span>${Number(b.count || 0).toLocaleString("zh-CN")} 款模型</span>
            <span class="go">去看看 →</span>
          </div>
        </a>`;
      })
      .join("");
  } catch (e) {
    grid.innerHTML = `<div class="empty">加载年龄目录失败：${KidsGuide.escapeHTML(e.message)}</div>`;
    console.error(e);
  }
})();
