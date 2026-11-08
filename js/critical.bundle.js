(() => {
  // ns-hugo-imp:/tmp/hugo_cache_eor/modules/filecache/modules/pkg/mod/github.com/gethinode/hinode/v3@v3.42.1/assets/js/critical/_cookie.js
  function hasConsent(_category) {
    return true;
  }
  function getLocalStorage(key, def, category) {
    if (hasConsent(category)) {
      return localStorage.getItem(key);
    } else {
      return def;
    }
  }
  function setLocalStorage(key, val, category) {
    if (hasConsent(category)) {
      localStorage.setItem(key, val);
    }
  }
  function getSessionStorage(key, def, category) {
    if (hasConsent(category)) {
      return sessionStorage.getItem(key);
    } else {
      return def;
    }
  }
  function setSessionStorage(key, val, category) {
    if (hasConsent(category)) {
      sessionStorage.setItem(key, val);
    }
  }
  window.getLocalStorage = getLocalStorage;
  window.setLocalStorage = setLocalStorage;
  window.getSessionStorage = getSessionStorage;
  window.setSessionStorage = setSessionStorage;

  // ns-hugo-params:/tmp/hugo_cache_eor/modules/filecache/modules/pkg/mod/github.com/gethinode/hinode/v3@v3.42.1/assets/js/critical/color.js
  var darkMode = false;

  // ns-hugo-imp:/tmp/hugo_cache_eor/modules/filecache/modules/pkg/mod/github.com/gethinode/hinode/v3@v3.42.1/assets/js/critical/color.js
  if (darkMode) {
    let getPreferredTheme = function() {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }, getTheme = function() {
      const storedTheme = getLocalStorage("theme", "auto", "functional");
      if (storedTheme) {
        return storedTheme;
      } else {
        const preference = getPreferredTheme();
        setLocalStorage("theme", preference, "functional");
        return preference;
      }
    }, setTheme = function(theme) {
      if (!supportedThemes.includes(theme)) {
        theme = "auto";
      }
      setLocalStorage("theme", theme, "functional");
      if (theme === "auto") {
        theme = getPreferredTheme();
      }
      document.documentElement.setAttribute("data-bs-theme", theme);
      document.documentElement.setAttribute("data-bs-main-theme", theme);
      updateSelectors();
    }, toggleTheme = function() {
      const target = document.documentElement.getAttribute("data-bs-theme") === "dark" ? "light" : "dark";
      setTheme(target);
    }, updateSelectors = function() {
      const light = document.documentElement.getAttribute("data-bs-theme") === "light";
      document.querySelectorAll(".navbar-mode-selector").forEach((chk) => {
        chk.checked = light;
        chk.toggleAttribute("checked", light);
      });
    };
    const supportedThemes = ["auto", "dark", "light"];
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
      const stored = getLocalStorage("theme", "auto", "functional");
      if (!stored || stored === "auto") {
        setTheme(getPreferredTheme());
      }
    });
    document.addEventListener("change", (event) => {
      const selector = event.target.closest?.(".navbar-mode-selector");
      if (!selector) return;
      document.documentElement.setAttribute("data-bs-theme-animate", "true");
      toggleTheme();
    });
    window.addEventListener("load", () => {
      updateSelectors();
    });
    window.addEventListener("pageshow", (event) => {
      if (event.persisted) {
        setTheme(getTheme());
      }
    });
    setTheme(getTheme());
  }

  // ns-hugo-imp:/tmp/hugo_cache_eor/modules/filecache/modules/pkg/mod/github.com/gethinode/hinode/v3@v3.42.1/assets/js/critical/js-detect.js
  (function() {
    var el = document.documentElement;
    el.classList.remove("no-js");
    el.classList.add("js");
  })();

  // ns-hugo-params:/tmp/hugo_cache_eor/modules/filecache/modules/pkg/mod/github.com/gethinode/hinode/v3@v3.42.1/assets/js/critical/languageSelector.js
  var languageFolder = "/";
  var languageSelector = false;

  // ns-hugo-imp:/tmp/hugo_cache_eor/modules/filecache/modules/pkg/mod/github.com/gethinode/hinode/v3@v3.42.1/assets/js/critical/languageSelector.js
  if (languageSelector) {
    let getLanguage = function() {
      return getLocalStorage("selectedLanguage", document.documentElement.lang, "functional");
    }, setLanguage = function(language) {
      setLocalStorage("selectedLanguage", language, "functional");
    }, keepParams = function() {
      return window.location.search + window.location.hash;
    }, applyLanguage = function(language, href) {
      if (document.documentElement.lang !== language) {
        if (href) {
          if (window.location.pathname !== href) {
            window.location.href = href + keepParams();
          }
        } else {
          const target = folder + language + "/";
          if (window.location.pathname !== target) {
            window.location.href = target + keepParams();
          }
        }
      }
    };
    const folder = languageFolder || "/";
    document.addEventListener("DOMContentLoaded", () => {
      const urlParams = new URLSearchParams(document.location.search);
      const force = urlParams.get("force");
      if (force !== null && force.toLowerCase() === "true") {
        setLanguage(document.documentElement.lang);
        return;
      }
      const storedLanguage = getLanguage();
      const languageItems = document.querySelectorAll("#language-selector[data-translated=true] .dropdown-item");
      const link = document.querySelector("link[rel='canonical']");
      let alias = "";
      if (link !== null) {
        alias = link.getAttribute("href");
      }
      let onCanonical = true;
      if (alias !== "") {
        const canonical = new URL(alias, window.location.href);
        onCanonical = canonical.origin === window.location.origin && canonical.pathname.toLowerCase() === window.location.pathname.toLowerCase();
      }
      if (!onCanonical) {
        window.location.href = alias + keepParams();
      } else if (languageItems.length > 0) {
        if (storedLanguage && document.documentElement.lang !== storedLanguage) {
          languageItems.forEach((item) => {
            if (item.getAttribute("hreflang") === storedLanguage) {
              applyLanguage(storedLanguage, item.getAttribute("href"));
            }
          });
        }
        languageItems.forEach((item) => {
          item.addEventListener("click", () => {
            const selectedLanguage = item.getAttribute("hreflang");
            if (selectedLanguage) {
              setLanguage(selectedLanguage);
            }
          });
        });
      } else {
        setLanguage(document.documentElement.lang);
      }
    });
  }

  // ns-hugo-imp:/tmp/hugo_cache_eor/modules/filecache/modules/pkg/mod/github.com/gethinode/hinode/v3@v3.42.1/assets/js/critical/sidebar-active.js
  (function() {
    "use strict";
    function normalize(path) {
      try {
        path = decodeURI(path);
      } catch {
      }
      if (path.length > 1) path = path.replace(/\/+$/, "");
      return path || "/";
    }
    function linkPath(link) {
      var href = link.getAttribute("href");
      if (!href || href.charAt(0) === "#") return null;
      var url;
      try {
        url = new URL(href, window.location.origin);
      } catch {
        return null;
      }
      if (url.origin !== window.location.origin) return null;
      return normalize(url.pathname);
    }
    function findBestMatch(nav, pathname) {
      var best = null;
      var bestLength = -1;
      var bestExact = false;
      nav.querySelectorAll("a[href]:not(.sidebar-brand)").forEach(function(link) {
        if (link.closest(".sidebar-group-flyout")) return;
        var path = linkPath(link);
        if (path === null) return;
        if (path === pathname) {
          if (!bestExact) {
            best = link;
            bestLength = path.length;
            bestExact = true;
          }
        } else if (!bestExact && path !== "/") {
          var prefix = path + "/";
          if (pathname.indexOf(prefix) === 0 && path.length > bestLength) {
            best = link;
            bestLength = path.length;
          }
        }
      });
      return { link: best, exact: bestExact, path: best ? linkPath(best) : null };
    }
    function initNav(nav, pathname) {
      var match = findBestMatch(nav, pathname);
      var link = match.link;
      if (!link) return;
      var group = link.closest(".sidebar-item-group");
      nav.classList.add("sidebar-no-transition");
      nav.querySelectorAll("a[href]:not(.sidebar-brand)").forEach(function(el) {
        if (linkPath(el) !== match.path) return;
        if (el !== link && !el.closest(".sidebar-group")) return;
        el.classList.add("active");
        el.setAttribute("aria-current", match.exact ? "page" : "true");
      });
      if (group) group.classList.add("active");
      var railGroup = link.closest(".sidebar-group");
      var isRailTitle = link.hasAttribute("data-sidebar-group-toggle");
      if (railGroup && !isRailTitle) railGroup.classList.add("sidebar-group-trail");
      var own = null;
      if (group && group.parentElement) {
        own = group.parentElement.querySelector(":scope > .collapse");
      } else if (railGroup && isRailTitle) {
        own = railGroup.querySelector(":scope > .collapse");
      }
      var trail = own ? [own] : [];
      var ancestor = link.closest(".collapse");
      while (ancestor && nav.contains(ancestor)) {
        trail.push(ancestor);
        ancestor = ancestor.parentElement && ancestor.parentElement.closest(".collapse");
      }
      trail.forEach(function(el) {
        el.classList.add("show");
        if (el.id) {
          nav.querySelectorAll('[data-bs-target="#' + el.id + '"]').forEach(function(toggle) {
            toggle.setAttribute("aria-expanded", "true");
          });
        }
      });
      nav.offsetHeight;
      nav.classList.remove("sidebar-no-transition");
      if (own && match.exact) {
        link.addEventListener("click", function(event) {
          if (nav.classList.contains("sidebar-collapsed")) return;
          if (typeof bootstrap === "undefined" || !bootstrap.Collapse) return;
          event.preventDefault();
          bootstrap.Collapse.getOrCreateInstance(own).toggle();
        });
      }
    }
    function init() {
      var pathname = normalize(window.location.pathname);
      document.querySelectorAll("[data-sidebar-nav]").forEach(function(nav) {
        initNav(nav, pathname);
      });
    }
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", init);
    } else {
      init();
    }
  })();

  // ns-hugo-imp:/tmp/hugo_cache_eor/modules/filecache/modules/pkg/mod/github.com/gethinode/hinode/v3@v3.42.1/assets/js/critical/sidebar-pre-init.js
  (function() {
    try {
      if (localStorage.getItem("sidebar-collapsed") === "1") {
        document.documentElement.classList.add("sidebar-pre-collapsed");
      }
    } catch {
    }
  })();
})();
/*!
 * Color mode toggler for Bootstrap's docs (https://getbootstrap.com/)
 * Copyright 2011-2022 The Bootstrap Authors
 * Licensed under the Creative Commons Attribution 3.0 Unported License.
 */
//# sourceMappingURL=critical.bundle.js.map
