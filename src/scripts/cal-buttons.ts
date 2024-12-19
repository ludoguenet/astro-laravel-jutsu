(function (C, A, L) {
  let p = function (a, ar) {
    a.q.push(ar);
  };
  let d = C.document;
  C.Cal =
    C.Cal ||
    function () {
      let cal = C.Cal;
      let ar = arguments;
      if (!cal.loaded) {
        cal.ns = {};
        cal.q = cal.q || [];
        d.head.appendChild(d.createElement("script")).src = A;
        cal.loaded = true;
      }
      if (ar[0] === L) {
        const api = function () {
          p(api, arguments);
        };
        const namespace = ar[1];
        api.q = api.q || [];
        if (typeof namespace === "string") {
          cal.ns[namespace] = cal.ns[namespace] || api;
          p(cal.ns[namespace], ar);
          p(cal, ["initNamespace", namespace]);
        } else p(cal, ar);
        return;
      }
      p(cal, ar);
    };
})(window, "https://app.cal.com/embed/embed.js", "init");
Cal("init", "consulting-laravel-avance", { origin: "https://cal.com" });

// Important: Please add the following attributes to the element that should trigger the calendar to open upon clicking.
// `data-cal-link="laraveljutsu/consulting-laravel-avance"`
// data-cal-namespace="consulting-laravel-avance"
// `data-cal-config='{"layout":"month_view"}'`

Cal.ns["consulting-laravel-avance"]("ui", {
  cssVarsPerTheme: {
    light: { "cal-brand": "#18181b" },
    dark: { "cal-brand": "#d9f99d" },
  },
  hideEventTypeDetails: false,
  layout: "month_view",
});

(function (C, A, L) {
  let p = function (a, ar) {
    a.q.push(ar);
  };
  let d = C.document;
  C.Cal =
    C.Cal ||
    function () {
      let cal = C.Cal;
      let ar = arguments;
      if (!cal.loaded) {
        cal.ns = {};
        cal.q = cal.q || [];
        d.head.appendChild(d.createElement("script")).src = A;
        cal.loaded = true;
      }
      if (ar[0] === L) {
        const api = function () {
          p(api, arguments);
        };
        const namespace = ar[1];
        api.q = api.q || [];
        if (typeof namespace === "string") {
          cal.ns[namespace] = cal.ns[namespace] || api;
          p(cal.ns[namespace], ar);
          p(cal, ["initNamespace", namespace]);
        } else p(cal, ar);
        return;
      }
      p(cal, ar);
    };
})(window, "https://app.cal.com/embed/embed.js", "init");
Cal("init", "consulting-laravel-junior", { origin: "https://cal.com" });

// Important: Please add the following attributes to the element that should trigger the calendar to open upon clicking.
// `data-cal-link="laraveljutsu/consulting-laravel-junior"`
// data-cal-namespace="consulting-laravel-junior"
// `data-cal-config='{"layout":"month_view"}'`

Cal.ns["consulting-laravel-junior"]("ui", {
  cssVarsPerTheme: {
    light: { "cal-brand": "#18181b" },
    dark: { "cal-brand": "#d9f99d" },
  },
  hideEventTypeDetails: false,
  layout: "month_view",
});
