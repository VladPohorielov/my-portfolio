/* ==================================================================
 Владислав Погорєлов  AI Content Creator  Resume Scripts
 Extracted from index.html during refactoring.
================================================================== */
(function () {
  "use strict";

  var data = window.PORTFOLIO_DATA || {};
  var cfg  = data.siteConfig || {};

  // ── ICON REGISTRY ──────────────────────────────────────────────
  // Single source for all tool-category SVG icons.
  // Add new keys here when introducing new tool categories in data.js.
  var ICONS = {
    video:   '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="15" height="10" rx="2" ry="2"/><path d="m17 11 5-3v8l-5-3"/></svg>',
    image:   '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>',
    cpu:     '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>',
    edit:    '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>',
    volume:  '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>',
    sliders: '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/><circle cx="7" cy="6" r="2" fill="currentColor" stroke="none"/><circle cx="17" cy="12" r="2" fill="currentColor" stroke="none"/><circle cx="11" cy="18" r="2" fill="currentColor" stroke="none"/></svg>',
    send:    '<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>'
  };

  function escapeHtml(value) {
    return String(value || "").replace(/[&<>"']/g, function (char) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      }[char];
    });
  }

  function getModifierClass(size) {
    if (size === "tall") return " m-tall";
    if (size === "wide") return " m-wide";
    return "";
  }

  function renderHeroMetrics() {
    var mountNode = document.getElementById("heroMetrics");
    var metrics = Array.isArray(data.heroMetrics) ? data.heroMetrics : [];
    if (!mountNode || !metrics.length) return;

    mountNode.innerHTML = metrics.map(function (metric) {
      return (
        '<div class="metric">' +
          '<div class="metric-val">' +
            escapeHtml(metric.value) +
            '<em>' + escapeHtml(metric.suffix) + '</em>' +
          '</div>' +
          '<div class="metric-lbl">' + escapeHtml(metric.label) + '</div>' +
        '</div>'
      );
    }).join("");
  }

  function renderCases() {
    var mountNode = document.getElementById("resultsCases");
    var cases = Array.isArray(data.cases) ? data.cases : [];
    if (!mountNode || !cases.length) return;

    mountNode.innerHTML = cases.map(function (item, index) {
      var statsHtml = (item.stats || []).map(function (stat) {
        return (
          '<div class="pcs-item">' +
            '<span class="pcs-val">' + escapeHtml(stat.value) + '</span>' +
            '<span class="pcs-lbl">' + escapeHtml(stat.label) + '</span>' +
          '</div>'
        );
      }).join("");

      var narrativeRows = [
        { label: "Задача",    text: item.goal },
        { label: "Контекст",  text: item.context },
        { label: "Підхід",    text: item.approach },
        { label: "Результат", text: item.result }
      ].filter(function (r) { return r.text; });

      var narrativeHtml = narrativeRows.map(function (row, ri) {
        return (
          '<div class="cn-row' + (ri === narrativeRows.length - 1 ? " cn-row-result" : "") + '">' +
            '<span class="cn-label">' + escapeHtml(row.label) + '</span>' +
            '<p class="cn-text">' + escapeHtml(row.text) + '</p>' +
          '</div>'
        );
      }).join("");

      var screenshotsHtml = (item.images || []).map(function (image, imageIndex) {
        return (
          '<img class="case-screenshot"' +
            ' src="' + escapeHtml(image.src) + '"' +
            ' alt="' + escapeHtml(image.alt) + '"' +
            ' data-label="' + escapeHtml(image.label) + '"' +
            ' data-case-index="' + index + '"' +
            ' data-image-index="' + imageIndex + '"' +
            ' loading="lazy" />'
        );
      }).join("");

      var hasNarrative = narrativeHtml.length > 0;

      return (
        '<article class="case-card reveal d' + ((index % 5) + 1) + '">' +
          '<div class="case-top">' +
            '<div class="case-meta">' +
              '<span class="case-num">Кейс ' + escapeHtml(item.id) + '</span>' +
              '<span class="case-chip">' + escapeHtml(item.client) + '</span>' +
              '<span class="case-chip">' + escapeHtml(item.platform) + '</span>' +
            '</div>' +
            '<h3 class="case-title">' + escapeHtml(item.title) + '</h3>' +
            '<p class="case-summary">' + escapeHtml(item.summary) + '</p>' +
            '<div class="case-stats">' + statsHtml + '</div>' +
          '</div>' +
          (hasNarrative ?
            '<div class="case-narrative" aria-hidden="true">' +
              '<div class="cn-inner">' +
                '<div class="cn-body">' +
                  narrativeHtml +
                  (screenshotsHtml ?
                    '<div class="case-screenshots">' + screenshotsHtml + '</div>'
                  : '') +
                '</div>' +
              '</div>' +
            '</div>' +
            '<button class="case-toggle" type="button" aria-expanded="false">' +
              '<span class="case-toggle-label">Розгорнути кейс</span>' +
              '<span class="case-toggle-icon" aria-hidden="true"></span>' +
            '</button>'
          : '') +
        '</article>'
      );
    }).join("");

    // Wire expand / collapse toggles
    mountNode.querySelectorAll(".case-toggle").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var card = btn.closest(".case-card");
        var narrative = card.querySelector(".case-narrative");
        var isOpen = btn.getAttribute("aria-expanded") === "true";
        var next = !isOpen;
        btn.setAttribute("aria-expanded", String(next));
        narrative.setAttribute("aria-hidden", String(!next));
        card.classList.toggle("is-open", next);
        btn.querySelector(".case-toggle-label").textContent = next ? "Згорнути" : "Розгорнути кейс";
      });
    });
  }

  function renderVideoRail() {
    var mountNode = document.getElementById("videoRail");
    var countNode = document.getElementById("videoCount");
    var videos = Array.isArray(data.videos) ? data.videos : [];
    if (countNode) {
      countNode.textContent = videos.length ? videos.length + " робіт" : "";
    }
    if (!mountNode || !videos.length) return;

    mountNode.innerHTML = videos.map(function (video) {
      return (
        '<button class="vr-card" type="button" data-src="' + escapeHtml(video.embed) + '" aria-label="Відкрити відео: ' + escapeHtml(video.title) + '">' +
          '<span class="vr-thumb">' +
            '<img class="vr-thumb-img" src="' + escapeHtml(video.thumbnail) + '" alt="" loading="lazy" />' +
            '<span class="vr-play" aria-hidden="true">' +
              '<svg viewBox="0 0 24 24" fill="currentColor">' +
                '<path d="M8 5v14l11-7z" />' +
              '</svg>' +
            '</span>' +
          '</span>' +
          '<span class="vr-info">' +
            '<span class="vr-tag">' + escapeHtml(video.tag) + '</span>' +
            '<span class="vr-name">' + escapeHtml(video.title) + '</span>' +
          '</span>' +
        '</button>'
      );
    }).join("");
  }

  function renderGallery() {
    var mountNode = document.getElementById("masonry");
    var countNode = document.getElementById("galleryCount");
    var gallery = Array.isArray(data.gallery) ? data.gallery : [];
    if (countNode) {
      countNode.textContent = gallery.length ? gallery.length + " робіт" : "";
    }
    if (!mountNode || !gallery.length) return;

    mountNode.innerHTML = gallery.map(function (item) {
      return (
        '<button class="m-item' + getModifierClass(item.size) + '" type="button" data-full="' + escapeHtml(item.src) + '" data-label="' + escapeHtml(item.label) + '" aria-label="Відкрити зображення: ' + escapeHtml(item.label) + '">' +
          '<img class="m-media" src="' + escapeHtml(item.src) + '" alt="" loading="lazy" />' +
          '<span class="m-overlay"><span>' + escapeHtml(item.overlay) + '</span></span>' +
        '</button>'
      );
    }).join("");
  }

  function renderTestimonials() {
    var section = document.getElementById("testimonials");
    var mountNode = document.getElementById("tmtGrid");
    var testimonials = Array.isArray(data.testimonials) ? data.testimonials : [];
    if (!section || !mountNode || !testimonials.length) return;

    mountNode.innerHTML = testimonials.map(function (item) {
      return (
        '<article class="tmt-card reveal">' +
          '<span class="tmt-quote-mark" aria-hidden="true">“</span>' +
          '<p class="tmt-text">' + escapeHtml(item.text) + '</p>' +
          '<footer class="tmt-author">' +
            '<span class="tmt-name">' + escapeHtml(item.name) + '</span>' +
            '<span class="tmt-role">' + escapeHtml(item.role) + '</span>' +
          '</footer>' +
        '</article>'
      );
    }).join("");

    section.classList.add("tmt-visible");
  }

  // ── TRUST BAR ──────────────────────────────────────────────────
  function renderTrustBar() {
    var mountNode = document.getElementById("trustBar");
    var items = Array.isArray(data.trustBar) ? data.trustBar : [];
    if (!mountNode || !items.length) return;

    mountNode.innerHTML = items.map(function (item) {
      return (
        '<div class="tbar-item">' +
          '<span class="tbar-val">' + escapeHtml(item.value) + '</span>' +
          '<span class="tbar-lbl">' + escapeHtml(item.label) + '</span>' +
        '</div>'
      );
    }).join("");
  }

  // ── EXPERIENCE ─────────────────────────────────────────────────
  // points may contain <strong> — content is author-controlled, not user input.
  function safeHtml(value) {
    return escapeHtml(value)
      .replace(/&lt;strong&gt;/g, "<strong>")
      .replace(/&lt;\/strong&gt;/g, "</strong>");
  }

  function renderExperience() {
    var mountNode = document.getElementById("expList");
    var items = Array.isArray(data.experience) ? data.experience : [];
    if (!mountNode || !items.length) return;

    mountNode.innerHTML = items.map(function (item) {
      var pointsHtml = (item.points || []).map(function (point) {
        return (
          '<div class="exp-point">' +
            '<div class="exp-dot"></div>' +
            '<span>' + safeHtml(point) + '</span>' +
          '</div>'
        );
      }).join("");

      var companyHtml = escapeHtml(item.company) +
        (item.nda ? ' <span class="exp-nda">NDA</span>' : "");

      return (
        '<div class="exp-item-card reveal">' +
          '<div>' +
            '<div class="exp-company">' + companyHtml + '</div>' +
            '<div class="exp-title">' + escapeHtml(item.title) + '</div>' +
            '<div class="exp-points">' + pointsHtml + '</div>' +
          '</div>' +
          '<div class="exp-side">' +
            '<div class="exp-badge">' + escapeHtml(item.badge) + '</div>' +
            '<div class="exp-period">' + escapeHtml(item.period) + '</div>' +
          '</div>' +
        '</div>'
      );
    }).join("");
  }

  // ── WORKFLOW STEPS ─────────────────────────────────────────────
  function renderWorkflow() {
    var mountNode = document.getElementById("workflowSteps");
    var steps = Array.isArray(data.workflowSteps) ? data.workflowSteps : [];
    if (!mountNode || !steps.length) return;

    mountNode.innerHTML = steps.map(function (step) {
      return (
        '<div class="wf-step">' +
          '<div class="wf-num">' + escapeHtml(step.num) + '</div>' +
          '<div class="wf-title">' + escapeHtml(step.title) + '</div>' +
          '<div class="wf-desc">' + escapeHtml(step.desc) + '</div>' +
          '<span class="wf-tool">' + escapeHtml(step.tool) + '</span>' +
        '</div>'
      );
    }).join("");
  }

  // ── TOOLS / STACK ──────────────────────────────────────────────
  function renderTools() {
    var mountNode = document.getElementById("toolsGrid");
    var tools = Array.isArray(data.tools) ? data.tools : [];
    if (!mountNode || !tools.length) return;

    mountNode.innerHTML = tools.map(function (tool, index) {
      var delayClass = " d" + Math.min(index + 1, 5);
      var chipsHtml = (tool.chips || []).map(function (chip) {
        return '<span class="chip' + (chip.accent ? " accent" : "") + '">' +
          escapeHtml(chip.text) + '</span>';
      }).join("");

      var iconSvg = ICONS[tool.icon] || "";

      return (
        '<div class="tool-card reveal' + delayClass + '">' +
          '<div class="tool-card-head">' +
            '<span class="tool-card-icon">' + iconSvg + '</span>' +
            '<span class="tool-card-label">' + escapeHtml(tool.label) + '</span>' +
          '</div>' +
          '<div class="chips">' + chipsHtml + '</div>' +
        '</div>'
      );
    }).join("");
  }

  // ── DYNAMIC TEXT (dates, availability) ────────────────────────
  // Pull footer year, hero availability badge and contact block text
  // directly from siteConfig. Update data.js → all three sync automatically.
  function renderDynamicText() {
    var footerYearEl = document.getElementById("footerYear");
    if (footerYearEl) {
      footerYearEl.textContent = cfg.footerYear || String(new Date().getFullYear());
    }

    var heroAvailEl = document.getElementById("heroAvailText");
    if (heroAvailEl && cfg.availabilityText) {
      heroAvailEl.textContent = cfg.availabilityText;
    }

    var contactAvailEl = document.getElementById("contactAvailText");
    if (contactAvailEl && cfg.availabilityText) {
      var avail = cfg.availabilityText;
      if (cfg.availabilityDate) avail += " \u00b7 " + cfg.availabilityDate;
      contactAvailEl.textContent = avail;
    }
  }

  // ── CONTACT LINKS ──────────────────────────────────────────────
  // Renders contact-links section and cta-mega from siteConfig.
  // Update siteConfig.telegram once → both rendered links update.
  function renderContactLinks() {
    var linksNode = document.getElementById("contactLinks");
    var megaNode  = document.getElementById("ctaMega");
    if (!cfg.telegram) return;

    if (linksNode) {
      linksNode.innerHTML =
        '<a href="' + escapeHtml(cfg.telegram) + '" class="contact-link" aria-label="Написати в Telegram">' +
          ICONS.send +
          'Telegram · ' + escapeHtml(cfg.telegramHandle) +
        '</a>';
    }

    if (megaNode) {
      megaNode.href        = cfg.telegram;
      megaNode.textContent = cfg.telegramCta || "Написати в Telegram ↗";
    }
  }

  // ── HERO TICKER ────────────────────────────────────────────────
  // Items come from siteConfig.tickerItems in data.js.
  // Renders two identical <span> elements (original + aria-hidden duplicate)
  // so the CSS infinite-scroll animation works seamlessly.
  function renderTicker() {
    var trackNode = document.getElementById("heroTickerTrack");
    var items = Array.isArray(cfg.tickerItems) ? cfg.tickerItems : [];
    if (!trackNode || !items.length) return;

    var sep = " \u00a0\u00b7\u00a0 ";
    var content = items.map(escapeHtml).join(sep) + sep;

    trackNode.innerHTML =
      "<span>" + content + "</span>" +
      '<span aria-hidden="true">' + content + "</span>";
  }

  function renderDynamicSections() {
    renderDynamicText();
    renderHeroMetrics();
    renderTicker();
    renderCases();
    renderVideoRail();
    renderGallery();
    renderTestimonials();
    renderTrustBar();
    renderExperience();
    renderWorkflow();
    renderTools();
    renderContactLinks();
  }

  renderDynamicSections();

  // Scroll reveal
  var revEls = document.querySelectorAll(".reveal");
  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("on");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.07 },
  );
  revEls.forEach(function (el) {
    io.observe(el);
  });

  // ── STAGGERED CARD REVEALS (Motion per-section grouping) ──
  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var cardSections = [
    { parent: ".tools-grid",   cards: ".tool-card" },
    { parent: ".exp-list",     cards: ".exp-item-card" },
    { parent: ".why-grid",     cards: ".why-card" },
    { parent: ".brands-grid",  cards: ".brand-card" },
    { parent: ".workflow-row", cards: ".wf-step" },
    { parent: ".post-cases",   cards: ".case-card" },
    { parent: ".video-rail",   cards: ".vr-card" },
  ];

  if (!prefersReducedMotion) {
    cardSections.forEach(function (group) {
      var container = document.querySelector(group.parent);
      if (!container) return;

      var cards = Array.from(container.querySelectorAll(group.cards));
      if (!cards.length) return;

      // Mark cards as "pending reveal" — CSS (.will-stagger) handles hidden state.
      cards.forEach(function (el) {
        el.classList.add("will-stagger");
      });

      var sectionObserver = new IntersectionObserver(
        function (entries, observer) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;

            cards.forEach(function (el, index) {
              // Only the per-card delay is dynamic — everything else stays in CSS.
              el.style.setProperty("--stagger-delay", (index * 0.05) + "s");
              el.classList.add("is-revealed");
            });

            observer.unobserve(container);
          });
        },
        { threshold: 0.06 },
      );

      sectionObserver.observe(container);
    });
  }

  // ── HERO METRICS ENTRANCE ──
  // Only the per-metric delay is dynamic; animation is declared fully in CSS.
  document.querySelectorAll(".metric").forEach(function (el, i) {
    el.style.setProperty("--metric-delay", (0.6 + i * 0.08) + "s");
    el.classList.add("metric-enter");
  });

  // ── COUNTER ANIMATION ──
  function animateCounter(el) {
    var duration = 1700;
    if (el.classList.contains("metric-val")) {
      var textNode = null;
      var emEl = el.querySelector("em");
      for (var n = 0; n < el.childNodes.length; n++) {
        var cn = el.childNodes[n];
        if (cn.nodeType === 3 && cn.textContent.trim()) {
          textNode = cn;
          break;
        }
      }
      if (!textNode || !emEl) return;
      var rawMV = textNode.textContent.trim();
      var signMV = "";
      if (rawMV.charAt(0) === "\u2212") { signMV = "\u2212"; rawMV = rawMV.slice(1); }
      else if (rawMV.charAt(0) === "+") { signMV = "+"; rawMV = rawMV.slice(1); }
      var targetMV = parseFloat(rawMV);
      var decimalsMV = rawMV.indexOf(".") !== -1 ? rawMV.split(".")[1].length : 0;
      var startMV = null;
      var stepMV = function (ts) {
        if (!startMV) startMV = ts;
        var p = Math.min((ts - startMV) / duration, 1);
        var ease = 1 - Math.pow(1 - p, 3);
        textNode.textContent = signMV + (targetMV * ease).toFixed(decimalsMV);
        if (p < 1) requestAnimationFrame(stepMV);
        else textNode.textContent = signMV + targetMV.toFixed(decimalsMV);
      };
      requestAnimationFrame(stepMV);
    } else {
      var rawPCS = el.textContent.trim();
      var signPCS = "";
      if (rawPCS.charAt(0) === "+") { signPCS = "+"; rawPCS = rawPCS.slice(1); }
      var suffixPCS = "";
      if (rawPCS.slice(-1) === "M") { suffixPCS = "M"; rawPCS = rawPCS.slice(0, -1); }
      else if (rawPCS.slice(-1) === "K") { suffixPCS = "K"; rawPCS = rawPCS.slice(0, -1); }
      else if (rawPCS.slice(-1) === "%") { suffixPCS = "%"; rawPCS = rawPCS.slice(0, -1); }
      var targetPCS = parseFloat(rawPCS);
      var decimalsPCS = rawPCS.indexOf(".") !== -1 ? rawPCS.split(".")[1].length : 0;
      var startPCS = null;
      var stepPCS = function (ts) {
        if (!startPCS) startPCS = ts;
        var p = Math.min((ts - startPCS) / duration, 1);
        var ease = 1 - Math.pow(1 - p, 3);
        el.textContent = signPCS + (targetPCS * ease).toFixed(decimalsPCS) + suffixPCS;
        if (p < 1) requestAnimationFrame(stepPCS);
        else el.textContent = signPCS + targetPCS.toFixed(decimalsPCS) + suffixPCS;
      };
      requestAnimationFrame(stepPCS);
    }
  }

  // Assign delays for hero metric-val counters (stagger on load)
  var metricValEls = document.querySelectorAll(".metric-val");
  metricValEls.forEach(function (el, i) {
    el.dataset.counterDelay = String(900 + i * 160);
  });

  var counterEls = document.querySelectorAll(".metric-val, .pcs-val");
  var counterIO = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          var target = e.target;
          var delay = parseInt(target.dataset.counterDelay || "0", 10);
          counterIO.unobserve(target);
          setTimeout(function () { animateCounter(target); }, delay);
        }
      });
    },
    { threshold: 0.6 }
  );
  counterEls.forEach(function (el) { counterIO.observe(el); });

  // ── HERO PARALLAX (desktop only) ──
  var heroEl = document.getElementById("hero");
  var heroAmbientEl = document.querySelector(".hero-ambient");
  var heroLinesEl = document.querySelector(".hero-lines");
  if (heroEl && heroAmbientEl && heroLinesEl && !("ontouchstart" in window)) {
    var px = 0, py = 0, cx = 0, cy = 0;
    var parallaxRAF = null;
    function tickParallax() {
      cx += (px - cx) * 0.07;
      cy += (py - cy) * 0.07;
      heroAmbientEl.style.transform = "translate(" + (cx * 24) + "px, " + (cy * 15) + "px)";
      heroLinesEl.style.transform = "translate(" + (cx * 11) + "px, " + (cy * 7) + "px)";
      var diff = Math.abs(px - cx) + Math.abs(py - cy);
      parallaxRAF = diff > 0.005 ? requestAnimationFrame(tickParallax) : null;
    }
    document.addEventListener("mousemove", function (e) {
      var heroBottom = heroEl.getBoundingClientRect().bottom;
      if (heroBottom < 0) return;
      px = (e.clientX / window.innerWidth - 0.5) * 2;
      py = (e.clientY / window.innerHeight - 0.5) * 2;
      if (!parallaxRAF) parallaxRAF = requestAnimationFrame(tickParallax);
    }, { passive: true });
  }

  // Nav scroll — class-based (CSS handles all visual states)
  var nav = document.getElementById("nav");
  var hbg = document.getElementById("hbg");
  var navLinks = document.getElementById("nav-links");
  var mobileNavMQ = window.matchMedia("(max-width: 768px)");
  var menuOpen = false;

  function updateNav() {
    nav.classList.toggle("scrolled", window.scrollY > 40);
  }
  window.addEventListener("scroll", updateNav, { passive: true });
  updateNav();

  function syncBodyLock() {
    document.body.classList.toggle(
      "ui-locked",
      menuOpen ||
        (vm && vm.classList.contains("open")) ||
        (lb && lb.classList.contains("open")),
    );
  }

  function setMenuState(nextState) {
    menuOpen = !!nextState && mobileNavMQ.matches;
    nav.classList.toggle("menu-open", menuOpen);
    hbg.setAttribute("aria-expanded", String(menuOpen));
    hbg.setAttribute(
      "aria-label",
      menuOpen ? "Закрити меню" : "Відкрити меню",
    );
    syncBodyLock();
  }

  // Nav active link on scroll
  var navLinkItems = document.querySelectorAll(".nav-links a[href^='#']");
  var scrollSections = document.querySelectorAll("section[id]");
  var activeSectionIO = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          var id = e.target.id;
          navLinkItems.forEach(function (link) {
            link.classList.toggle("active", link.getAttribute("href") === "#" + id);
          });
        }
      });
    },
    { threshold: 0.35, rootMargin: "-64px 0px -40% 0px" }
  );
  scrollSections.forEach(function (s) { activeSectionIO.observe(s); });

  // Hamburger
  hbg.addEventListener("click", function () {
    setMenuState(!menuOpen);
  });
  window.addEventListener("resize", function () {
    if (!mobileNavMQ.matches) {
      setMenuState(false);
    }
  });

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      var href = a.getAttribute("href");
      if (!href || href === "#") return;
      var target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      if (menuOpen) {
        setMenuState(false);
      }
    });
  });

  // ── VIDEO MODAL (for rail cards) ──
  var vm = document.getElementById("vm");
  var vmFrame = document.getElementById("vm-frame");
  var vmClose = document.getElementById("vm-close");
  var lb = document.getElementById("lb");
  var lastActiveElement = null;

  function storeFocus(target) {
    lastActiveElement = target || document.activeElement;
  }

  function restoreFocus() {
    if (lastActiveElement && typeof lastActiveElement.focus === "function") {
      lastActiveElement.focus();
    }
    lastActiveElement = null;
  }

  function openVM(src, trigger) {
    if (!src) return;
    storeFocus(trigger);
    vmFrame.src = src;
    vm.classList.add("open");
    syncBodyLock();
    vmClose.focus();
  }

  var videoRail = document.getElementById("videoRail");
  if (videoRail) {
    videoRail.addEventListener("click", function (e) {
      var card = e.target.closest(".vr-card");
      if (!card) return;
      openVM(card.getAttribute("data-src"), card);
    });
  }

  function closeVM() {
    if (!vm.classList.contains("open")) return;
    vm.classList.remove("open");
    vmFrame.removeAttribute("src");
    syncBodyLock();
    restoreFocus();
  }
  vmClose.addEventListener("click", closeVM);
  vm.addEventListener("click", function (e) {
    if (e.target === vm) closeVM();
  });

  // ── LIGHTBOX (for masonry photos) ──
  var lbImg = document.getElementById("lb-img");
  var lbCaption = document.getElementById("lb-caption");
  var lbClose = document.getElementById("lb-close");
  var lbPrev = document.getElementById("lb-prev");
  var lbNext = document.getElementById("lb-next");

  var lbIndex = 0;
  var lightboxMode = "";

  function getGalleryItems() {
    return Array.from(document.querySelectorAll(".m-item"));
  }

  function openLB(index, trigger) {
    var mItems = getGalleryItems();
    lbIndex = index;
    var item = mItems[lbIndex];
    var imgUrl = item.getAttribute("data-full") || "";
    if (!imgUrl) return;
    lightboxMode = "gallery";
    storeFocus(trigger || item);
    lbImg.src = imgUrl;
    lbImg.alt = item.getAttribute("data-label") || "Зображення портфоліо";
    lbCaption.textContent = item.getAttribute("data-label") || "";
    lb.classList.add("open");
    syncBodyLock();
    lbClose.focus();
  }

  function openLBImage(src, alt, caption, trigger) {
    if (!src) return;
    lightboxMode = "single";
    storeFocus(trigger);
    lbImg.src = src;
    lbImg.alt = alt || "Зображення портфоліо";
    lbCaption.textContent = caption || "";
    lb.classList.add("open");
    syncBodyLock();
    lbClose.focus();
  }
  function closeLB() {
    if (!lb.classList.contains("open")) return;
    lb.classList.remove("open");
    lbImg.removeAttribute("src");
    lbCaption.textContent = "";
    lightboxMode = "";
    syncBodyLock();
    restoreFocus();
  }
  function prevLB() {
    var mItems = getGalleryItems();
    if (!mItems.length) return;
    lbIndex = (lbIndex - 1 + mItems.length) % mItems.length;
    openLB(lbIndex);
  }
  function nextLB() {
    var mItems = getGalleryItems();
    if (!mItems.length) return;
    lbIndex = (lbIndex + 1) % mItems.length;
    openLB(lbIndex);
  }

  var masonry = document.getElementById("masonry");
  if (masonry) {
    masonry.addEventListener("click", function (e) {
      var item = e.target.closest(".m-item");
      var mItems = getGalleryItems();
      var index = mItems.indexOf(item);
      if (index === -1) return;
      openLB(index, item);
    });
  }
  lbClose.addEventListener("click", closeLB);
  lb.addEventListener("click", function (e) {
    if (
      e.target === lb ||
      e.target === document.querySelector(".lb-img-wrap")
    )
      closeLB();
  });
  lbPrev.addEventListener("click", prevLB);
  lbNext.addEventListener("click", nextLB);

  // ── LIGHTBOX (for case-study screenshots) ──
  var resultsCases = document.getElementById("resultsCases");
  if (resultsCases) {
    resultsCases.addEventListener("click", function (e) {
      var img = e.target.closest(".case-screenshot");
      if (!img) return;
      openLBImage(
        img.currentSrc || img.src,
        img.alt || "",
        img.getAttribute("data-label") || "",
        img,
      );
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      if (menuOpen) setMenuState(false);
      closeVM();
      closeLB();
    }
    if (lb.classList.contains("open") && lightboxMode === "gallery") {
      if (e.key === "ArrowLeft") prevLB();
      if (e.key === "ArrowRight") nextLB();
    }
  });

  // ── STICKY CTA PILL ──
  var stickyCta = document.getElementById("stickyCta");
  var heroSect = document.getElementById("hero");
  var contactSect = document.getElementById("contact");
  var stickyVisible = false;

  var heroOutIO = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) {
        stickyVisible = true;
      } else {
        stickyVisible = false;
      }
      stickyCta.classList.toggle("visible", stickyVisible && !contactVisible);
    });
  }, { threshold: 0.15 });
  heroOutIO.observe(heroSect);

  var contactVisible = false;
  var contactInIO = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      contactVisible = e.isIntersecting;
      stickyCta.classList.toggle("visible", stickyVisible && !contactVisible);
    });
  }, { threshold: 0.35 });
  contactInIO.observe(contactSect);

})();
