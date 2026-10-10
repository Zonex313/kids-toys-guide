/* Shared helpers — http:// and file:// */
(function () {
  const PAGE = document.body?.dataset?.page || "";
  document.querySelectorAll(".nav-links a[data-nav]").forEach((a) => {
    if (a.dataset.nav === PAGE) a.classList.add("is-active");
  });
  const header = document.querySelector(".site-header");
  if (header) {
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }
})();

window.__KIDS_DATA__ = window.__KIDS_DATA__ || {};

window.KidsGuide = {
  PAGE_SIZE: 24,
  dataBase: "data",

  dataKey(path) {
    const p = String(path || "").replace(/^\.\//, "");
    if (p === "data/summary.json" || p.endsWith("/summary.json")) return "summary";
    if (p === "data/editorial.json" || p.endsWith("/editorial.json")) return "editorial";
    const m = p.match(/(?:^|\/)data\/age\/([0-9]+-[0-9]+)\.json$/);
    if (m) return "age:" + m[1];
    return null;
  },

  dataScriptPath(path) {
    return String(path || "").replace(/\.json$/i, ".js");
  },

  loadScript(src) {
    return new Promise((resolve, reject) => {
      const existing = Array.from(document.querySelectorAll("script[data-kids-src]")).find(
        (el) => el.getAttribute("data-kids-src") === src
      );
      if (existing) {
        if (existing.dataset.kidsLoaded === "1") return resolve();
        existing.addEventListener("load", () => resolve());
        existing.addEventListener("error", () => reject(new Error("脚本加载失败：" + src)));
        return;
      }
      const s = document.createElement("script");
      s.src = src;
      s.async = false;
      s.dataset.kidsSrc = src;
      s.onload = () => {
        s.dataset.kidsLoaded = "1";
        resolve();
      };
      s.onerror = () => reject(new Error("脚本加载失败：" + src));
      document.head.appendChild(s);
    });
  },

  async fetchJSON(path) {
    const key = this.dataKey(path);
    if (key && window.__KIDS_DATA__[key] != null) {
      return window.__KIDS_DATA__[key];
    }
    try {
      const res = await fetch(path);
      if (!res.ok) throw new Error("HTTP " + res.status);
      const data = await res.json();
      if (key) window.__KIDS_DATA__[key] = data;
      return data;
    } catch (fetchErr) {
      if (!key) {
        throw new Error("无法加载数据：" + path + "（" + (fetchErr && fetchErr.message) + "）");
      }
      const jsPath = this.dataScriptPath(path);
      try {
        await this.loadScript(jsPath);
      } catch (scriptErr) {
        throw new Error(
          "无法加载数据。请确认站点文件完整，或使用在线地址访问。" +
            " 路径：" + path + " / " + jsPath
        );
      }
      if (window.__KIDS_DATA__[key] == null) {
        throw new Error("数据脚本已加载但未找到键：" + key);
      }
      return window.__KIDS_DATA__[key];
    }
  },

  qs(name) {
    return new URLSearchParams(location.search).get(name);
  },

  escapeHTML(s) {
    return String(s ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  },

  safetyBadges(model) {
    const flags = model.flags || [];
    if (!flags.length && !(model.safety || []).length) return "";
    const map = {
      marbles: "谨防误吞小球",
      magnets: "含磁铁，需成人处理",
      small_parts: "含小零件，谨防误吞",
      glue: "可能需胶水，成人操作",
      sharp: "请充分打磨锐边",
    };
    const labels = flags.length
      ? flags.map((f) => map[f] || f)
      : model.safety || [];
    return labels
      .map((t) => `<span class="badge-warn">${this.escapeHTML(t)}</span>`)
      .join("");
  },

  imgHTML(src, alt) {
    const safeAlt = this.escapeHTML(alt || "模型预览");
    if (!src) return `<div class="ph">暂无预览图</div>`;
    return `<img src="${this.escapeHTML(src)}" alt="${safeAlt}" loading="lazy" decoding="async"
      onerror="this.style.display='none';this.parentNode.insertAdjacentHTML('beforeend','<div class=ph>图片暂不可用</div>')">`;
  },

  cardHTML(m, index) {
    const badges = this.safetyBadges(m);
    const delay = Math.min((index || 0) * 0.04, 0.4);
    return `<a class="model-card" style="animation-delay:${delay}s" href="model.html?id=${encodeURIComponent(m.id)}&band=${encodeURIComponent(m.band)}">
      <div class="thumb">${this.imgHTML(m.img, m.title)}</div>
      <div class="card-body">
        <h3>${this.escapeHTML(m.title)}</h3>
        <p class="card-intro">${this.escapeHTML(m.intro)}</p>
        <p class="why-line"><strong>为何适合${this.escapeHTML(m.band_label)}：</strong>${this.escapeHTML(m.why || "")}</p>
        <div class="tags">
          <span class="tag">${this.escapeHTML(m.cat_zh)}</span>
          <span class="tag-muted tag">${this.escapeHTML(m.band_label)}</span>
          ${badges}
        </div>
      </div>
    </a>`;
  },
};
