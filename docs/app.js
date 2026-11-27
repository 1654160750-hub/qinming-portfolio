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

  setText("#brandName", data.person.name);
  setText("#brandLabel", data.person.archiveLabel);
  setText("#personLocation", data.person.location);
  setText("#personName", data.person.name);
  setText("#personRole", data.person.role);
  setText("#personIntro", data.person.intro);
  setText("#footerName", data.person.name);

  const heroTagline = $("#heroTagline");
  heroTagline.replaceChildren(...data.person.tagline.map((line, index) =>
    make("span", index ? "accent" : "", line)
  ));
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

  // 01 简历：基本信息 + 教育背景 + 工作经历
  const basics = $("#resumeBasics");
  data.resume.basics.forEach(item => {
    const cell = make("div", "basic-cell");
    cell.append(make("dt", "", item.label), make("dd", "", item.value));
    basics.append(cell);
  });

  const edu = data.resume.education;
  const eduCard = $("#resumeEdu");
  eduCard.append(
    make("p", "edu-period", edu.period),
    make("h3", "", edu.school),
    make("p", "edu-major", edu.major),
    make("p", "edu-detail", edu.detail),
    make("p", "edu-courses", edu.courses)
  );

  const jobs = $("#resumeJobs");
  data.resume.jobs.forEach(job => {
    const row = make("article", "job");
    const body = make("div");
    body.append(make("h3", "", job.organization), make("p", "job-role", job.role));
    const points = make("ul", "job-points");
    job.points.forEach(point => points.append(make("li", "", point)));
    body.append(points);
    row.append(make("p", "job-period", job.period), body);
    jobs.append(row);
  });

  // 02 个人技能
  const skillGrid = $("#skillGrid");
  data.skills.forEach(item => {
    const card = make("article", "about-card");
    card.append(
      make("p", "about-index", item.index),
      make("h3", "", item.title),
      make("p", "about-subtitle", item.subtitle),
      make("p", "", item.description)
    );
    skillGrid.append(card);
  });

  // 03 账号运营
  const accountGrid = $("#accountGrid");
  data.accounts.forEach(item => {
    const card = make("article", "account-card");
    card.append(
      make("p", "account-period", item.period),
      make("h3", "", item.organization),
      make("p", "account-role", item.role),
      make("p", "account-desc", item.description)
    );
    const result = make("div", "account-metric");
    result.append(make("strong", "", item.metric), make("span", "", item.metricLabel));
    const tags = make("div", "metric-row");
    item.tags.forEach(tag => tags.append(make("span", "metric-chip", tag)));
    card.append(result, tags);
    accountGrid.append(card);
  });

  // 04–08 作品板块：剪辑 / 网页 / H5 / APP / 自媒体
  function workMedia(item) {
    const frame = make("div", "work-media");
    if (usableUrl(item.video)) {
      const video = document.createElement("video");
      video.controls = true;
      video.playsInline = true;
      video.preload = "none";
      if (item.poster) video.poster = item.poster;
      video.src = item.video;
      video.setAttribute("aria-label", `播放：${item.title}`);
      frame.append(video);
    } else if (item.poster) {
      const image = document.createElement("img");
      image.src = item.poster;
      image.alt = `${item.title} 作品封面`;
      image.loading = "lazy";
      image.decoding = "async";
      image.width = 1200;
      image.height = 750;
      frame.append(image);
    }
    return frame;
  }

  function workCard(item) {
    const card = make("article", `work-card${item.poster || usableUrl(item.video) ? "" : " text-card"}`);
    if (item.poster || usableUrl(item.video)) card.append(workMedia(item));
    const body = make("div", "work-body");
    body.append(
      make("p", "work-platform", item.platform),
      make("h3", "", item.title),
      make("p", "work-desc", item.description)
    );
    if (item.metrics && item.metrics.length) {
      const metrics = make("div", "metric-row");
      item.metrics.forEach(metric => metrics.append(make("span", "metric-chip", metric)));
      body.append(metrics);
    }
    if (usableUrl(item.originalUrl)) {
      const source = make("a", "source-link", "查看原作 ↗");
      source.href = item.originalUrl;
      source.target = "_blank";
      source.rel = "noreferrer";
      body.append(source);
    }
    card.append(body);
    return card;
  }

  const workRoot = $("#workSections");
  data.workSections.forEach((section, index) => {
    const scene = make("section", `work-section scene${index % 2 ? " alt" : ""}`);
    scene.id = section.id;
    const shell = make("div", "page-shell section-shell");
    const heading = make("div", `section-heading${section.illo ? " has-illo" : ""}`);
    const headingText = make("div", "heading-text");
    headingText.append(make("p", "eyebrow", `${section.en} · ${section.no}`), make("h2", "", section.title));
    if (section.intro) headingText.append(make("p", "", section.intro));
    heading.append(headingText);
    if (section.illo) {
      const illo = document.createElement("img");
      illo.className = "section-illo";
      illo.src = section.illo;
      illo.alt = `${section.title}板块拼贴风人物插画`;
      illo.loading = "lazy";
      illo.decoding = "async";
      illo.width = 840;
      illo.height = 900;
      heading.append(illo);
    }
    shell.append(heading);
    const single = section.items.length === 1;
    const grid = make("div", single ? "work-feature" : "work-grid");
    section.items.forEach(item => grid.append(workCard(item)));
    shell.append(grid);
    scene.append(shell);
    workRoot.append(scene);
  });

  // 09 联系方式
  setText("#contactHeading", data.contact.heading);
  setText("#contactDescription", data.contact.description);
  const emailLink = $("#emailLink");
  emailLink.textContent = data.contact.email;
  emailLink.href = `mailto:${data.contact.email}`;
  const socialLink = $("#socialLink");
  socialLink.textContent = data.contact.socialLabel;
  socialLink.href = data.contact.socialUrl;
  socialLink.hidden = !usableUrl(data.contact.socialUrl);

  // 导航与滚动
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
})();
