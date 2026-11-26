(() => {
  "use strict";
  const data = window.SITE_CONTENT;
  if (!data) throw new Error("SITE_CONTENT is missing. Check content.js.");

  const $ = (selector, root = document) => root.querySelector(selector);
  const make = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };
  const setText = (selector, value) => {
    const node = $(selector);
    if (node) node.textContent = value || "";
  };
  const usableUrl = value => Boolean(value && value !== "#");

  document.title = data.meta.title;
  const descriptionMeta = $('meta[name="description"]');
  if (descriptionMeta) descriptionMeta.content = data.meta.description;

  setText("#brandName", data.person.name.toUpperCase());
  setText("#brandLabel", data.person.archiveLabel);
  setText("#personLocation", data.person.location);
  setText("#personName", data.person.name);
  setText("#personRole", data.person.role);
  setText("#personIntro", data.person.intro);
  setText("#footerName", data.person.name.toUpperCase());
  const heroTagline = $("#heroTagline");
  heroTagline.replaceChildren(...data.person.tagline.map((line, index) => {
    const span = make("span", index ? "accent" : "", line);
    return span;
  }));
  const portrait = $("#portrait");
  portrait.src = data.person.portrait;
  portrait.alt = data.person.portraitAlt;

  const chipRow = $("#personChips");
  data.person.chips.forEach(item => chipRow.append(make("span", "chip", item)));

  const heroStats = $("#heroStats");
  data.stats.forEach(item => {
    const card = make("div", "hero-stat");
    card.append(make("strong", "", item.value), make("span", "", item.label));
    heroStats.append(card);
  });

  const heroActions = $("#heroActions");
  data.actions.forEach(item => {
    const link = make("a", `button-link${item.primary ? " primary" : ""}`, item.label);
    link.href = item.href;
    heroActions.append(link);
  });

  const aboutGrid = $("#aboutGrid");
  data.about.forEach(item => {
    const card = make("article", "about-card");
    card.append(
      make("p", "about-index", item.index),
      make("h3", "", item.title),
      make("p", "about-subtitle", item.subtitle),
      make("p", "", item.description)
    );
    aboutGrid.append(card);
  });

  const experienceList = $("#experienceList");
  data.experience.forEach(item => {
    const row = make("article", "timeline-item");
    const content = make("div");
    content.append(
      make("h3", "", item.organization),
      make("p", "timeline-role", item.role),
      make("p", "timeline-result", item.result)
    );
    const metrics = make("div", "metric-row");
    item.metrics.forEach(metric => metrics.append(make("span", "metric-chip", metric)));
    content.append(metrics);
    row.append(make("p", "timeline-period", item.period), content);
    experienceList.append(row);
  });

  const projectGrid = $("#projectGrid");
  data.projects.forEach(item => {
    const hasUrl = usableUrl(item.url);
    const card = make(hasUrl ? "a" : "article", "project-card");
    if (hasUrl) {
      card.href = item.url;
      if (/^https?:/i.test(item.url)) {
        card.target = "_blank";
        card.rel = "noreferrer";
      }
    }
    const result = make("div", "project-result");
    result.append(make("strong", "", item.metric), make("span", "", item.metricLabel));
    const tags = make("div", "tag-row");
    item.tags.forEach(tag => tags.append(make("span", "tag", tag)));
    card.append(
      make("p", "project-kind", item.kind),
      make("h3", "", item.title),
      make("p", "project-description", item.description),
      result,
      tags
    );
    projectGrid.append(card);
  });

  setText("#contactHeading", data.contact.heading);
  setText("#contactDescription", data.contact.description);
  const emailLink = $("#emailLink");
  emailLink.textContent = data.contact.email;
  emailLink.href = `mailto:${data.contact.email}`;
  const socialLink = $("#socialLink");
  socialLink.textContent = data.contact.socialLabel;
  socialLink.href = data.contact.socialUrl;
  socialLink.hidden = !usableUrl(data.contact.socialUrl);
  const contactQr = $("#contactQr");
  const qrCard = contactQr ? contactQr.closest(".qr-card") : null;
  const hasQr = Boolean(data.contact.qr);
  if (qrCard) qrCard.hidden = !hasQr;
  const contactLayout = $(".contact-layout");
  if (contactLayout && !hasQr) contactLayout.classList.add("no-qr");
  if (contactQr && hasQr) {
    contactQr.src = data.contact.qr;
    contactQr.alt = data.contact.qrAlt;
  }

  const menuToggle = $("#menuToggle");
  const navLinks = $("#navLinks");
  const closeMenu = () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "菜单";
  };
  menuToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.textContent = open ? "关闭" : "菜单";
  });
  navLinks.addEventListener("click", event => {
    if (event.target.closest("a")) closeMenu();
  });

  const navAnchors = [...document.querySelectorAll('.nav-links a[href^="#"]')];
  const sections = navAnchors.map(anchor => $(anchor.getAttribute("href"))).filter(Boolean);
  const sectionObserver = new IntersectionObserver(entries => {
    const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    navAnchors.forEach(anchor => anchor.classList.toggle("active", anchor.getAttribute("href") === `#${visible.target.id}`));
  }, { rootMargin: "-20% 0px -60%", threshold: [0, .2, .5] });
  sections.forEach(section => sectionObserver.observe(section));

  const scrollProgress = $("#scrollProgress");
  const updateProgress = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    scrollProgress.style.width = `${max > 0 ? (scrollY / max) * 100 : 0}%`;
  };
  addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();

  let mediaIndex = 0;
  let touchStartX = 0;
  let touchStartY = 0;
  let wheelLocked = false;
  const mediaFrame = $("#mediaFrame");
  const mediaDots = $("#mediaDots");
  const mobileVideo = matchMedia("(max-width: 760px)");

  data.mediaWorks.forEach((_, index) => {
    const dot = make("button", "media-dot");
    dot.type = "button";
    dot.setAttribute("aria-label", `查看第 ${index + 1} 件影像作品`);
    dot.addEventListener("click", () => renderMedia(index));
    mediaDots.append(dot);
  });
  setText("#mediaTotal", String(data.mediaWorks.length).padStart(2, "0"));

  function renderMedia(nextIndex) {
    const previousVideo = mediaFrame.querySelector("video");
    if (previousVideo) previousVideo.pause();
    mediaIndex = Math.max(0, Math.min(nextIndex, data.mediaWorks.length - 1));
    const work = data.mediaWorks[mediaIndex];
    mediaFrame.replaceChildren();

    if (work.video) {
      const video = document.createElement("video");
      video.controls = true;
      video.playsInline = true;
      video.preload = "metadata";
      video.poster = work.poster;
      video.src = mobileVideo.matches && work.mobileVideo ? work.mobileVideo : work.video;
      video.setAttribute("aria-label", `播放：${work.title}`);
      const note = make("p", "media-placeholder-note", "正在准备播放");
      video.addEventListener("canplay", () => note.remove());
      video.addEventListener("error", () => { note.textContent = "加载失败，请重试或查看原作"; });
      mediaFrame.append(video, note);
    } else {
      const image = document.createElement("img");
      image.src = work.poster;
      image.alt = `${work.title} 作品封面`;
      image.width = 1600;
      image.height = 900;
      mediaFrame.append(image);
      if (work.note) mediaFrame.append(make("p", "media-placeholder-note", work.note));
    }

    setText("#mediaDate", work.date);
    setText("#mediaLabel", `${work.platform} · ${work.duration}`);
    setText("#mediaTitle", work.title);
    setText("#mediaDescription", work.description);
    setText("#mediaCurrent", String(mediaIndex + 1).padStart(2, "0"));
    const metrics = $("#mediaMetrics");
    metrics.replaceChildren();
    work.metrics.forEach(metric => {
      const item = make("div", "media-metric");
      item.append(make("strong", "", metric.value), make("span", "", metric.label));
      metrics.append(item);
    });
    const source = $("#mediaSource");
    source.href = work.originalUrl || "#";
    source.hidden = !usableUrl(work.originalUrl);
    [...mediaDots.children].forEach((dot, index) => dot.classList.toggle("active", index === mediaIndex));
    $("#mediaPrev").disabled = mediaIndex === 0;
    $("#mediaNext").disabled = mediaIndex === data.mediaWorks.length - 1;
  }

  $("#mediaPrev").addEventListener("click", () => renderMedia(mediaIndex - 1));
  $("#mediaNext").addEventListener("click", () => renderMedia(mediaIndex + 1));
  mediaFrame.addEventListener("touchstart", event => {
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
  }, { passive: true });
  mediaFrame.addEventListener("touchend", event => {
    const dx = event.changedTouches[0].clientX - touchStartX;
    const dy = event.changedTouches[0].clientY - touchStartY;
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.25) renderMedia(mediaIndex + (dx < 0 ? 1 : -1));
  }, { passive: true });
  $("#moving-image").addEventListener("wheel", event => {
    if (wheelLocked || Math.abs(event.deltaX) < 38 || Math.abs(event.deltaX) < Math.abs(event.deltaY)) return;
    event.preventDefault();
    wheelLocked = true;
    renderMedia(mediaIndex + (event.deltaX > 0 ? 1 : -1));
    setTimeout(() => { wheelLocked = false; }, 620);
  }, { passive: false });
  addEventListener("keydown", event => {
    if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
    const rect = $("#moving-image").getBoundingClientRect();
    if (rect.bottom <= 0 || rect.top >= innerHeight) return;
    renderMedia(mediaIndex + (event.key === "ArrowRight" ? 1 : -1));
  });
  renderMedia(0);
})();
