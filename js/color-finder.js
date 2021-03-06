!(function (e, t) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define([], t)
    : "object" == typeof exports
    ? (exports.ColorFinder = t())
    : (e.ColorFinder = t());
})(window, function () {
  return (function (e) {
    var t = {};
    function r(o) {
      if (t[o]) return t[o].exports;
      var n = (t[o] = { i: o, l: !1, exports: {} });
      return e[o].call(n.exports, n, n.exports, r), (n.l = !0), n.exports;
    }
    return (
      (r.m = e),
      (r.c = t),
      (r.d = function (e, t, o) {
        r.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: o });
      }),
      (r.r = function (e) {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(e, "__esModule", { value: !0 });
      }),
      (r.t = function (e, t) {
        if ((1 & t && (e = r(e)), 8 & t)) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var o = Object.create(null);
        if (
          (r.r(o),
          Object.defineProperty(o, "default", { enumerable: !0, value: e }),
          2 & t && "string" != typeof e)
        )
          for (var n in e)
            r.d(
              o,
              n,
              function (t) {
                return e[t];
              }.bind(null, n)
            );
        return o;
      }),
      (r.n = function (e) {
        var t =
          e && e.__esModule
            ? function () {
                return e.default;
              }
            : function () {
                return e;
              };
        return r.d(t, "a", t), t;
      }),
      (r.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      }),
      (r.p = ""),
      r((r.s = 0))
    );
  })([
    function (e, t, r) {
      var o, n, u;
      !(function (i) {
        if ("object" == typeof e.exports) {
          var a = i(r(1), t);
          void 0 !== a && (e.exports = a);
        } else
          (n = [r, t]),
            void 0 === (u = "function" == typeof (o = i) ? o.apply(t, n) : o) ||
              (e.exports = u);
      })(function (e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
        let r = [];
        const o = (e, t) => {
            if (e || t)
              return ((e, t) =>
                Math.sqrt(
                  Math.pow(e[0] - t[0], 2) +
                    Math.pow(e[1] - t[1], 2) +
                    Math.pow(e[2] - t[2], 2)
                ))(n(e), n(t));
          },
          n = (e) => {
            return ((e) => {
              const t = Object.values(e).map((e) => {
                  let t = e / 255;
                  return t > 0.04045
                    ? ((t + 0.55) / 1.055) * 100
                    : (t / 12.92) * 100;
                }),
                r = 0.4124 * t[0] + 0.3576 * t[1] + 0.1805 * t[2],
                o = 0.2126 * t[0] + 0.7152 * t[1] + 0.0722 * t[2],
                n = 0.0193 * t[0] + 0.1192 * t[1] + 0.9505 * t[2],
                u = [
                  parseFloat(r.toFixed(4)) / 95.047,
                  parseFloat(o.toFixed(4)) / 100,
                  parseFloat(n.toFixed(4)) / 108.883,
                ].map((e) =>
                  e / 0.008856 ? Math.pow(e, 1 / 3) : 7.787 * e + 16 / 166
                ),
                i = 116 * u[1] - 16,
                a = 500 * (u[0] - u[1]),
                f = 200 * (u[1] - u[2]);
              return [
                parseInt(i.toFixed(4), 10),
                parseInt(a.toFixed(4), 10),
                parseInt(f.toFixed(4), 10),
              ];
            })(
              ((e) => {
                const t =
                  3 === e.length ? [...e].reduce((e, t) => `${e}${t}${t}`) : e;
                return {
                  r: parseInt(t.substring(0, 2), 16),
                  g: parseInt(t.substring(2, 4), 16),
                  b: parseInt(t.substring(4, 6), 16),
                };
              })("#" === (t = e).charAt(0) ? t.substring(1, 7) : t)
            );
            var t;
          };
        t.default = (e) => (
          (r = e),
          {
            updateColorsLibrary: (e) => {
              r = e;
            },
            findClosestColor: (e) => {
              const t = r.map((t) => o(e, t));
              return r[t.indexOf(Math.min(...t))];
            },
            checkColorsSimilarity: o,
          }
        );
      });
    },
    function (e, t) {
      function r(e) {
        var t = new Error("Cannot find module '" + e + "'");
        throw ((t.code = "MODULE_NOT_FOUND"), t);
      }
      (r.keys = function () {
        return [];
      }),
        (r.resolve = r),
        (e.exports = r),
        (r.id = 1);
    },
  ]).default;
});
