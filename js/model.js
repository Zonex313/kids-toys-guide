(async function () {
  const id = Number(KidsGuide.qs("id"));
  const bandHint = KidsGuide.qs("band") || "";
  const app = document.getElementById("modelApp");
  if (!app) return;

  const bands = bandHint
    ? [bandHint]
    : ["0-1", "1-2", "2-3", "3-4", "4-5", "5-6", "6-7", "7-8"];

  async function findModel() {
    for (const b of bands) {
      try {
        const d = await KidsGuide.fetchJSON(`data/age/${b}.json`);
        const m = (d.models || []).find((x) => x.id === id);
        if (m) return { m, d };
      } catch (_) {}
    }
    // fallback scan all if hint wrong
    if (bandHint) {
      for (const b of ["0-1", "1-2", "2-3", "3-4", "4-5", "5-6", "6-7", "7-8"]) {
        if (b === bandHint) continue;
        try {
          const d = await KidsGuide.fetchJSON(`data/age/${b}.json`);
          const m = (d.models || []).find((x) => x.id === id);
          if (m) return { m, d };
        } catch (_) {}
      }
    }
    return null;
  }

  try {
    const found = await findModel();
    if (!found) {
      app.innerHTML = `<div class="empty">找不到该模型。请从<a href="index.html">首页</a>按年龄重新进入。</div>`;
      return;
    }
    const { m, d } = found;
    document.title = `${m.title} · ${m.band_label} · 儿童玩具导览`;
    const safety =
      (m.flags && m.flags.length) || (m.safety && m.safety.length)
        ? `<div class="safety-box"><h2>安全提醒</h2><ul>${(m.flags && m.flags.length
            ? m.flags.map((f) => {
                const map = {
                  marbles: "含小球/滚珠，谨防误吞，务必成人看护并妥善收纳。",
                  magnets: "涉及磁铁方案：磁铁需成人安装与保管，勿让幼儿接触松动磁铁。",
                  small_parts: "含可入口小零件，不适合幼儿独自玩耍。",
                  glue: "组装可能需要胶水，请在通风处由成人完成后再给孩子玩。",
                  sharp: "可能存在锐边或毛刺，打印后请充分打磨。",
                };
                return `<li>${KidsGuide.escapeHTML(map[f] || f)}</li>`;
              })
            : (m.safety || []).map((t) => `<li>${KidsGuide.escapeHTML(t)}</li>`)
          ).join("")}</ul></div>`
        : "";

    app.innerHTML = `
      <div class="breadcrumb wrap" style="padding-top:1.2rem">
        <a href="index.html">首页</a> <span>/</span>
        <a href="age.html?band=${encodeURIComponent(m.band)}">${KidsGuide.escapeHTML(m.band_label)}</a>
        <span>/</span> <span>${KidsGuide.escapeHTML(m.title)}</span>
      </div>
      <div class="wrap detail-layout">
        <div class="detail-media">
          <div class="thumb">${KidsGuide.imgHTML(m.img, m.title)}</div>
        </div>
        <div class="detail-panel">
          <h1>${KidsGuide.escapeHTML(m.title)}</h1>
          <div class="meta-row">
            <span class="tag">${KidsGuide.escapeHTML(m.cat_zh)}</span>
            <span class="tag tag-muted">${KidsGuide.escapeHTML(m.band_label)}</span>
            ${m.free ? '<span class="tag tag-muted">公开模型页</span>' : ""}
            ${KidsGuide.safetyBadges(m)}
          </div>
          ${m.name_en ? `<p style="color:var(--muted);font-size:.9rem;margin:0 0 1rem">原名：${KidsGuide.escapeHTML(m.name_en)}</p>` : ""}

          <div class="panel-block">
            <h2>这是什么</h2>
            <p>${KidsGuide.escapeHTML(m.intro)}</p>
          </div>
          <div class="panel-block">
            <h2>为何适合 ${KidsGuide.escapeHTML(m.band_label)}</h2>
            <p>${KidsGuide.escapeHTML(m.why || "")}</p>
            ${d.editorial ? `<p style="margin-top:.7rem">${KidsGuide.escapeHTML(d.editorial.needs || "")}</p>` : ""}
          </div>
          <div class="panel-block">
            <h2>怎么玩</h2>
            <p>${KidsGuide.escapeHTML(m.play)}</p>
          </div>
          <div class="panel-block">
            <h2>打印小贴士</h2>
            <p>${KidsGuide.escapeHTML(m.tip)}</p>
            <p style="margin-top:.6rem">建议材料：PLA（最常见的「塑料线材」，相对好打、气味小）。打印后请打磨毛刺、擦拭干净，再给孩子玩。</p>
          </div>
          ${safety}
          <div class="detail-actions">
            <a class="btn btn-primary btn-lg" href="${KidsGuide.escapeHTML(m.url)}" target="_blank" rel="noopener">去 MakerWorld 查看并下载</a>
            <a class="btn btn-secondary btn-lg" href="guide.html">不会打印？看新手教程</a>
            <a class="btn btn-ghost" href="age.html?band=${encodeURIComponent(m.band)}">返回 ${KidsGuide.escapeHTML(m.band_label)} 列表</a>
          </div>
          <p style="margin-top:1rem;font-size:.85rem;color:var(--muted)">设计师：${KidsGuide.escapeHTML(m.designer || "未知")} · 下载与授权以 MakerWorld 原页面为准。本站不托管打印文件。</p>
        </div>
      </div>`;
  } catch (e) {
    app.innerHTML = `<div class="wrap empty">加载失败：${KidsGuide.escapeHTML(e.message)}</div>`;
  }
})();
