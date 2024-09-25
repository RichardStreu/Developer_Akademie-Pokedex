/*! For license information please see index.js.LICENSE.txt */
!(function (e, t) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define([], t)
    : "object" == typeof exports
    ? (exports.Pokedex = t())
    : (e.Pokedex = t());
})("undefined" != typeof self ? self : this, () =>
  (() => {
    var e = {
        790: (e, t, n) => {
          e.exports = (function e(t, n, r) {
            function o(a, s) {
              if (!n[a]) {
                if (!t[a]) {
                  if (i) return i(a, !0);
                  var c = new Error("Cannot find module '" + a + "'");
                  throw ((c.code = "MODULE_NOT_FOUND"), c);
                }
                var u = (n[a] = { exports: {} });
                t[a][0].call(
                  u.exports,
                  function (e) {
                    return o(t[a][1][e] || e);
                  },
                  u,
                  u.exports,
                  e,
                  t,
                  n,
                  r
                );
              }
              return n[a].exports;
            }
            for (var i = void 0, a = 0; a < r.length; a++) o(r[a]);
            return o;
          })(
            {
              1: [
                function (e, t, r) {
                  (function (e) {
                    "use strict";
                    var n,
                      r,
                      o = e.MutationObserver || e.WebKitMutationObserver;
                    if (o) {
                      var i = 0,
                        a = new o(f),
                        s = e.document.createTextNode("");
                      a.observe(s, { characterData: !0 }),
                        (n = function () {
                          s.data = i = ++i % 2;
                        });
                    } else if (e.setImmediate || void 0 === e.MessageChannel)
                      n =
                        "document" in e && "onreadystatechange" in e.document.createElement("script")
                          ? function () {
                              var t = e.document.createElement("script");
                              (t.onreadystatechange = function () {
                                f(), (t.onreadystatechange = null), t.parentNode.removeChild(t), (t = null);
                              }),
                                e.document.documentElement.appendChild(t);
                            }
                          : function () {
                              setTimeout(f, 0);
                            };
                    else {
                      var c = new e.MessageChannel();
                      (c.port1.onmessage = f),
                        (n = function () {
                          c.port2.postMessage(0);
                        });
                    }
                    var u = [];
                    function f() {
                      var e, t;
                      r = !0;
                      for (var n = u.length; n; ) {
                        for (t = u, u = [], e = -1; ++e < n; ) t[e]();
                        n = u.length;
                      }
                      r = !1;
                    }
                    t.exports = function (e) {
                      1 !== u.push(e) || r || n();
                    };
                  }).call(this, void 0 !== n.g ? n.g : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
                },
                {},
              ],
              2: [
                function (e, t, n) {
                  "use strict";
                  var r = e(1);
                  function o() {}
                  var i = {},
                    a = ["REJECTED"],
                    s = ["FULFILLED"],
                    c = ["PENDING"];
                  function u(e) {
                    if ("function" != typeof e) throw new TypeError("resolver must be a function");
                    (this.state = c), (this.queue = []), (this.outcome = void 0), e !== o && h(this, e);
                  }
                  function f(e, t, n) {
                    (this.promise = e),
                      "function" == typeof t && ((this.onFulfilled = t), (this.callFulfilled = this.otherCallFulfilled)),
                      "function" == typeof n && ((this.onRejected = n), (this.callRejected = this.otherCallRejected));
                  }
                  function l(e, t, n) {
                    r(function () {
                      var r;
                      try {
                        r = t(n);
                      } catch (t) {
                        return i.reject(e, t);
                      }
                      r === e ? i.reject(e, new TypeError("Cannot resolve promise with itself")) : i.resolve(e, r);
                    });
                  }
                  function d(e) {
                    var t = e && e.then;
                    if (e && ("object" == typeof e || "function" == typeof e) && "function" == typeof t)
                      return function () {
                        t.apply(e, arguments);
                      };
                  }
                  function h(e, t) {
                    var n = !1;
                    function r(t) {
                      n || ((n = !0), i.reject(e, t));
                    }
                    function o(t) {
                      n || ((n = !0), i.resolve(e, t));
                    }
                    var a = p(function () {
                      t(o, r);
                    });
                    "error" === a.status && r(a.value);
                  }
                  function p(e, t) {
                    var n = {};
                    try {
                      (n.value = e(t)), (n.status = "success");
                    } catch (e) {
                      (n.status = "error"), (n.value = e);
                    }
                    return n;
                  }
                  (t.exports = u),
                    (u.prototype.catch = function (e) {
                      return this.then(null, e);
                    }),
                    (u.prototype.then = function (e, t) {
                      if (("function" != typeof e && this.state === s) || ("function" != typeof t && this.state === a)) return this;
                      var n = new this.constructor(o);
                      return this.state !== c ? l(n, this.state === s ? e : t, this.outcome) : this.queue.push(new f(n, e, t)), n;
                    }),
                    (f.prototype.callFulfilled = function (e) {
                      i.resolve(this.promise, e);
                    }),
                    (f.prototype.otherCallFulfilled = function (e) {
                      l(this.promise, this.onFulfilled, e);
                    }),
                    (f.prototype.callRejected = function (e) {
                      i.reject(this.promise, e);
                    }),
                    (f.prototype.otherCallRejected = function (e) {
                      l(this.promise, this.onRejected, e);
                    }),
                    (i.resolve = function (e, t) {
                      var n = p(d, t);
                      if ("error" === n.status) return i.reject(e, n.value);
                      var r = n.value;
                      if (r) h(e, r);
                      else {
                        (e.state = s), (e.outcome = t);
                        for (var o = -1, a = e.queue.length; ++o < a; ) e.queue[o].callFulfilled(t);
                      }
                      return e;
                    }),
                    (i.reject = function (e, t) {
                      (e.state = a), (e.outcome = t);
                      for (var n = -1, r = e.queue.length; ++n < r; ) e.queue[n].callRejected(t);
                      return e;
                    }),
                    (u.resolve = function (e) {
                      return e instanceof this ? e : i.resolve(new this(o), e);
                    }),
                    (u.reject = function (e) {
                      var t = new this(o);
                      return i.reject(t, e);
                    }),
                    (u.all = function (e) {
                      var t = this;
                      if ("[object Array]" !== Object.prototype.toString.call(e)) return this.reject(new TypeError("must be an array"));
                      var n = e.length,
                        r = !1;
                      if (!n) return this.resolve([]);
                      for (var a = new Array(n), s = 0, c = -1, u = new this(o); ++c < n; ) f(e[c], c);
                      return u;
                      function f(e, o) {
                        t.resolve(e).then(
                          function (e) {
                            (a[o] = e), ++s !== n || r || ((r = !0), i.resolve(u, a));
                          },
                          function (e) {
                            r || ((r = !0), i.reject(u, e));
                          }
                        );
                      }
                    }),
                    (u.race = function (e) {
                      var t = this;
                      if ("[object Array]" !== Object.prototype.toString.call(e)) return this.reject(new TypeError("must be an array"));
                      var n,
                        r = e.length,
                        a = !1;
                      if (!r) return this.resolve([]);
                      for (var s = -1, c = new this(o); ++s < r; )
                        (n = e[s]),
                          t.resolve(n).then(
                            function (e) {
                              a || ((a = !0), i.resolve(c, e));
                            },
                            function (e) {
                              a || ((a = !0), i.reject(c, e));
                            }
                          );
                      return c;
                    });
                },
                { 1: 1 },
              ],
              3: [
                function (e, t, r) {
                  (function (t) {
                    "use strict";
                    "function" != typeof t.Promise && (t.Promise = e(2));
                  }).call(this, void 0 !== n.g ? n.g : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
                },
                { 2: 2 },
              ],
              4: [
                function (e, t, n) {
                  "use strict";
                  var r =
                    "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                      ? function (e) {
                          return typeof e;
                        }
                      : function (e) {
                          return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
                        };
                  var o = (function () {
                    try {
                      if ("undefined" != typeof indexedDB) return indexedDB;
                      if ("undefined" != typeof webkitIndexedDB) return webkitIndexedDB;
                      if ("undefined" != typeof mozIndexedDB) return mozIndexedDB;
                      if ("undefined" != typeof OIndexedDB) return OIndexedDB;
                      if ("undefined" != typeof msIndexedDB) return msIndexedDB;
                    } catch (e) {
                      return;
                    }
                  })();
                  function i(e, t) {
                    (e = e || []), (t = t || {});
                    try {
                      return new Blob(e, t);
                    } catch (o) {
                      if ("TypeError" !== o.name) throw o;
                      for (
                        var n = new (
                            "undefined" != typeof BlobBuilder
                              ? BlobBuilder
                              : "undefined" != typeof MSBlobBuilder
                              ? MSBlobBuilder
                              : "undefined" != typeof MozBlobBuilder
                              ? MozBlobBuilder
                              : WebKitBlobBuilder
                          )(),
                          r = 0;
                        r < e.length;
                        r += 1
                      )
                        n.append(e[r]);
                      return n.getBlob(t.type);
                    }
                  }
                  "undefined" == typeof Promise && e(3);
                  var a = Promise;
                  function s(e, t) {
                    t &&
                      e.then(
                        function (e) {
                          t(null, e);
                        },
                        function (e) {
                          t(e);
                        }
                      );
                  }
                  function c(e, t, n) {
                    "function" == typeof t && e.then(t), "function" == typeof n && e.catch(n);
                  }
                  function u(e) {
                    return "string" != typeof e && (console.warn(e + " used as a key, but it is not a string."), (e = String(e))), e;
                  }
                  function f() {
                    if (arguments.length && "function" == typeof arguments[arguments.length - 1]) return arguments[arguments.length - 1];
                  }
                  var l = "local-forage-detect-blob-support",
                    d = void 0,
                    h = {},
                    p = Object.prototype.toString,
                    m = "readonly",
                    g = "readwrite";
                  function y(e) {
                    for (var t = e.length, n = new ArrayBuffer(t), r = new Uint8Array(n), o = 0; o < t; o++) r[o] = e.charCodeAt(o);
                    return n;
                  }
                  function v(e) {
                    return "boolean" == typeof d
                      ? a.resolve(d)
                      : (function (e) {
                          return new a(function (t) {
                            var n = e.transaction(l, g),
                              r = i([""]);
                            n.objectStore(l).put(r, "key"),
                              (n.onabort = function (e) {
                                e.preventDefault(), e.stopPropagation(), t(!1);
                              }),
                              (n.oncomplete = function () {
                                var e = navigator.userAgent.match(/Chrome\/(\d+)/),
                                  n = navigator.userAgent.match(/Edge\//);
                                t(n || !e || parseInt(e[1], 10) >= 43);
                              });
                          }).catch(function () {
                            return !1;
                          });
                        })(e).then(function (e) {
                          return (d = e);
                        });
                  }
                  function b(e) {
                    var t = h[e.name],
                      n = {};
                    (n.promise = new a(function (e, t) {
                      (n.resolve = e), (n.reject = t);
                    })),
                      t.deferredOperations.push(n),
                      t.dbReady
                        ? (t.dbReady = t.dbReady.then(function () {
                            return n.promise;
                          }))
                        : (t.dbReady = n.promise);
                  }
                  function w(e) {
                    var t = h[e.name].deferredOperations.pop();
                    if (t) return t.resolve(), t.promise;
                  }
                  function E(e, t) {
                    var n = h[e.name].deferredOperations.pop();
                    if (n) return n.reject(t), n.promise;
                  }
                  function S(e, t) {
                    return new a(function (n, r) {
                      if (((h[e.name] = h[e.name] || { forages: [], db: null, dbReady: null, deferredOperations: [] }), e.db)) {
                        if (!t) return n(e.db);
                        b(e), e.db.close();
                      }
                      var i = [e.name];
                      t && i.push(e.version);
                      var a = o.open.apply(o, i);
                      t &&
                        (a.onupgradeneeded = function (t) {
                          var n = a.result;
                          try {
                            n.createObjectStore(e.storeName), t.oldVersion <= 1 && n.createObjectStore(l);
                          } catch (n) {
                            if ("ConstraintError" !== n.name) throw n;
                            console.warn(
                              'The database "' +
                                e.name +
                                '" has been upgraded from version ' +
                                t.oldVersion +
                                " to version " +
                                t.newVersion +
                                ', but the storage "' +
                                e.storeName +
                                '" already exists.'
                            );
                          }
                        }),
                        (a.onerror = function (e) {
                          e.preventDefault(), r(a.error);
                        }),
                        (a.onsuccess = function () {
                          var t = a.result;
                          (t.onversionchange = function (e) {
                            e.target.close();
                          }),
                            n(t),
                            w(e);
                        });
                    });
                  }
                  function _(e) {
                    return S(e, !1);
                  }
                  function O(e) {
                    return S(e, !0);
                  }
                  function R(e, t) {
                    if (!e.db) return !0;
                    var n = !e.db.objectStoreNames.contains(e.storeName),
                      r = e.version < e.db.version,
                      o = e.version > e.db.version;
                    if (
                      (r &&
                        (e.version !== t &&
                          console.warn('The database "' + e.name + "\" can't be downgraded from version " + e.db.version + " to version " + e.version + "."),
                        (e.version = e.db.version)),
                      o || n)
                    ) {
                      if (n) {
                        var i = e.db.version + 1;
                        i > e.version && (e.version = i);
                      }
                      return !0;
                    }
                    return !1;
                  }
                  function A(e) {
                    return i([y(atob(e.data))], { type: e.type });
                  }
                  function T(e) {
                    return e && e.__local_forage_encoded_blob;
                  }
                  function N(e) {
                    var t = this,
                      n = t._initReady().then(function () {
                        var e = h[t._dbInfo.name];
                        if (e && e.dbReady) return e.dbReady;
                      });
                    return c(n, e, e), n;
                  }
                  function I(e, t, n, r) {
                    void 0 === r && (r = 1);
                    try {
                      var o = e.db.transaction(e.storeName, t);
                      n(null, o);
                    } catch (o) {
                      if (r > 0 && (!e.db || "InvalidStateError" === o.name || "NotFoundError" === o.name))
                        return a
                          .resolve()
                          .then(function () {
                            if (!e.db || ("NotFoundError" === o.name && !e.db.objectStoreNames.contains(e.storeName) && e.version <= e.db.version))
                              return e.db && (e.version = e.db.version + 1), O(e);
                          })
                          .then(function () {
                            return (function (e) {
                              b(e);
                              for (var t = h[e.name], n = t.forages, r = 0; r < n.length; r++) {
                                var o = n[r];
                                o._dbInfo.db && (o._dbInfo.db.close(), (o._dbInfo.db = null));
                              }
                              return (
                                (e.db = null),
                                _(e)
                                  .then(function (t) {
                                    return (e.db = t), R(e) ? O(e) : t;
                                  })
                                  .then(function (r) {
                                    e.db = t.db = r;
                                    for (var o = 0; o < n.length; o++) n[o]._dbInfo.db = r;
                                  })
                                  .catch(function (t) {
                                    throw (E(e, t), t);
                                  })
                              );
                            })(e).then(function () {
                              I(e, t, n, r - 1);
                            });
                          })
                          .catch(n);
                      n(o);
                    }
                  }
                  var j = {
                    _driver: "asyncStorage",
                    _initStorage: function (e) {
                      var t = this,
                        n = { db: null };
                      if (e) for (var r in e) n[r] = e[r];
                      var o = h[n.name];
                      o || ((o = { forages: [], db: null, dbReady: null, deferredOperations: [] }), (h[n.name] = o)),
                        o.forages.push(t),
                        t._initReady || ((t._initReady = t.ready), (t.ready = N));
                      var i = [];
                      function s() {
                        return a.resolve();
                      }
                      for (var c = 0; c < o.forages.length; c++) {
                        var u = o.forages[c];
                        u !== t && i.push(u._initReady().catch(s));
                      }
                      var f = o.forages.slice(0);
                      return a
                        .all(i)
                        .then(function () {
                          return (n.db = o.db), _(n);
                        })
                        .then(function (e) {
                          return (n.db = e), R(n, t._defaultConfig.version) ? O(n) : e;
                        })
                        .then(function (e) {
                          (n.db = o.db = e), (t._dbInfo = n);
                          for (var r = 0; r < f.length; r++) {
                            var i = f[r];
                            i !== t && ((i._dbInfo.db = n.db), (i._dbInfo.version = n.version));
                          }
                        });
                    },
                    _support: (function () {
                      try {
                        if (!o || !o.open) return !1;
                        var e =
                            "undefined" != typeof openDatabase &&
                            /(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent) &&
                            !/Chrome/.test(navigator.userAgent) &&
                            !/BlackBerry/.test(navigator.platform),
                          t = "function" == typeof fetch && -1 !== fetch.toString().indexOf("[native code");
                        return (!e || t) && "undefined" != typeof indexedDB && "undefined" != typeof IDBKeyRange;
                      } catch (e) {
                        return !1;
                      }
                    })(),
                    iterate: function (e, t) {
                      var n = this,
                        r = new a(function (t, r) {
                          n.ready()
                            .then(function () {
                              I(n._dbInfo, m, function (o, i) {
                                if (o) return r(o);
                                try {
                                  var a = i.objectStore(n._dbInfo.storeName).openCursor(),
                                    s = 1;
                                  (a.onsuccess = function () {
                                    var n = a.result;
                                    if (n) {
                                      var r = n.value;
                                      T(r) && (r = A(r));
                                      var o = e(r, n.key, s++);
                                      void 0 !== o ? t(o) : n.continue();
                                    } else t();
                                  }),
                                    (a.onerror = function () {
                                      r(a.error);
                                    });
                                } catch (e) {
                                  r(e);
                                }
                              });
                            })
                            .catch(r);
                        });
                      return s(r, t), r;
                    },
                    getItem: function (e, t) {
                      var n = this;
                      e = u(e);
                      var r = new a(function (t, r) {
                        n.ready()
                          .then(function () {
                            I(n._dbInfo, m, function (o, i) {
                              if (o) return r(o);
                              try {
                                var a = i.objectStore(n._dbInfo.storeName).get(e);
                                (a.onsuccess = function () {
                                  var e = a.result;
                                  void 0 === e && (e = null), T(e) && (e = A(e)), t(e);
                                }),
                                  (a.onerror = function () {
                                    r(a.error);
                                  });
                              } catch (e) {
                                r(e);
                              }
                            });
                          })
                          .catch(r);
                      });
                      return s(r, t), r;
                    },
                    setItem: function (e, t, n) {
                      var r = this;
                      e = u(e);
                      var o = new a(function (n, o) {
                        var i;
                        r.ready()
                          .then(function () {
                            return (
                              (i = r._dbInfo),
                              "[object Blob]" === p.call(t)
                                ? v(i.db).then(function (e) {
                                    return e
                                      ? t
                                      : ((n = t),
                                        new a(function (e, t) {
                                          var r = new FileReader();
                                          (r.onerror = t),
                                            (r.onloadend = function (t) {
                                              var r = btoa(t.target.result || "");
                                              e({ __local_forage_encoded_blob: !0, data: r, type: n.type });
                                            }),
                                            r.readAsBinaryString(n);
                                        }));
                                    var n;
                                  })
                                : t
                            );
                          })
                          .then(function (t) {
                            I(r._dbInfo, g, function (i, a) {
                              if (i) return o(i);
                              try {
                                var s = a.objectStore(r._dbInfo.storeName);
                                null === t && (t = void 0);
                                var c = s.put(t, e);
                                (a.oncomplete = function () {
                                  void 0 === t && (t = null), n(t);
                                }),
                                  (a.onabort = a.onerror =
                                    function () {
                                      var e = c.error ? c.error : c.transaction.error;
                                      o(e);
                                    });
                              } catch (e) {
                                o(e);
                              }
                            });
                          })
                          .catch(o);
                      });
                      return s(o, n), o;
                    },
                    removeItem: function (e, t) {
                      var n = this;
                      e = u(e);
                      var r = new a(function (t, r) {
                        n.ready()
                          .then(function () {
                            I(n._dbInfo, g, function (o, i) {
                              if (o) return r(o);
                              try {
                                var a = i.objectStore(n._dbInfo.storeName).delete(e);
                                (i.oncomplete = function () {
                                  t();
                                }),
                                  (i.onerror = function () {
                                    r(a.error);
                                  }),
                                  (i.onabort = function () {
                                    var e = a.error ? a.error : a.transaction.error;
                                    r(e);
                                  });
                              } catch (e) {
                                r(e);
                              }
                            });
                          })
                          .catch(r);
                      });
                      return s(r, t), r;
                    },
                    clear: function (e) {
                      var t = this,
                        n = new a(function (e, n) {
                          t.ready()
                            .then(function () {
                              I(t._dbInfo, g, function (r, o) {
                                if (r) return n(r);
                                try {
                                  var i = o.objectStore(t._dbInfo.storeName).clear();
                                  (o.oncomplete = function () {
                                    e();
                                  }),
                                    (o.onabort = o.onerror =
                                      function () {
                                        var e = i.error ? i.error : i.transaction.error;
                                        n(e);
                                      });
                                } catch (e) {
                                  n(e);
                                }
                              });
                            })
                            .catch(n);
                        });
                      return s(n, e), n;
                    },
                    length: function (e) {
                      var t = this,
                        n = new a(function (e, n) {
                          t.ready()
                            .then(function () {
                              I(t._dbInfo, m, function (r, o) {
                                if (r) return n(r);
                                try {
                                  var i = o.objectStore(t._dbInfo.storeName).count();
                                  (i.onsuccess = function () {
                                    e(i.result);
                                  }),
                                    (i.onerror = function () {
                                      n(i.error);
                                    });
                                } catch (e) {
                                  n(e);
                                }
                              });
                            })
                            .catch(n);
                        });
                      return s(n, e), n;
                    },
                    key: function (e, t) {
                      var n = this,
                        r = new a(function (t, r) {
                          e < 0
                            ? t(null)
                            : n
                                .ready()
                                .then(function () {
                                  I(n._dbInfo, m, function (o, i) {
                                    if (o) return r(o);
                                    try {
                                      var a = i.objectStore(n._dbInfo.storeName),
                                        s = !1,
                                        c = a.openKeyCursor();
                                      (c.onsuccess = function () {
                                        var n = c.result;
                                        n ? (0 === e || s ? t(n.key) : ((s = !0), n.advance(e))) : t(null);
                                      }),
                                        (c.onerror = function () {
                                          r(c.error);
                                        });
                                    } catch (e) {
                                      r(e);
                                    }
                                  });
                                })
                                .catch(r);
                        });
                      return s(r, t), r;
                    },
                    keys: function (e) {
                      var t = this,
                        n = new a(function (e, n) {
                          t.ready()
                            .then(function () {
                              I(t._dbInfo, m, function (r, o) {
                                if (r) return n(r);
                                try {
                                  var i = o.objectStore(t._dbInfo.storeName).openKeyCursor(),
                                    a = [];
                                  (i.onsuccess = function () {
                                    var t = i.result;
                                    t ? (a.push(t.key), t.continue()) : e(a);
                                  }),
                                    (i.onerror = function () {
                                      n(i.error);
                                    });
                                } catch (e) {
                                  n(e);
                                }
                              });
                            })
                            .catch(n);
                        });
                      return s(n, e), n;
                    },
                    dropInstance: function (e, t) {
                      t = f.apply(this, arguments);
                      var n,
                        r = this.config();
                      if (
                        ((e = ("function" != typeof e && e) || {}).name || ((e.name = e.name || r.name), (e.storeName = e.storeName || r.storeName)), e.name)
                      ) {
                        var i =
                          e.name === r.name && this._dbInfo.db
                            ? a.resolve(this._dbInfo.db)
                            : _(e).then(function (t) {
                                var n = h[e.name],
                                  r = n.forages;
                                n.db = t;
                                for (var o = 0; o < r.length; o++) r[o]._dbInfo.db = t;
                                return t;
                              });
                        n = e.storeName
                          ? i.then(function (t) {
                              if (t.objectStoreNames.contains(e.storeName)) {
                                var n = t.version + 1;
                                b(e);
                                var r = h[e.name],
                                  i = r.forages;
                                t.close();
                                for (var s = 0; s < i.length; s++) {
                                  var c = i[s];
                                  (c._dbInfo.db = null), (c._dbInfo.version = n);
                                }
                                var u = new a(function (t, r) {
                                  var i = o.open(e.name, n);
                                  (i.onerror = function (e) {
                                    i.result.close(), r(e);
                                  }),
                                    (i.onupgradeneeded = function () {
                                      i.result.deleteObjectStore(e.storeName);
                                    }),
                                    (i.onsuccess = function () {
                                      var e = i.result;
                                      e.close(), t(e);
                                    });
                                });
                                return u
                                  .then(function (e) {
                                    r.db = e;
                                    for (var t = 0; t < i.length; t++) {
                                      var n = i[t];
                                      (n._dbInfo.db = e), w(n._dbInfo);
                                    }
                                  })
                                  .catch(function (t) {
                                    throw ((E(e, t) || a.resolve()).catch(function () {}), t);
                                  });
                              }
                            })
                          : i.then(function (t) {
                              b(e);
                              var n = h[e.name],
                                r = n.forages;
                              t.close();
                              for (var i = 0; i < r.length; i++) r[i]._dbInfo.db = null;
                              var s = new a(function (t, n) {
                                var r = o.deleteDatabase(e.name);
                                (r.onerror = function () {
                                  var e = r.result;
                                  e && e.close(), n(r.error);
                                }),
                                  (r.onblocked = function () {
                                    console.warn('dropInstance blocked for database "' + e.name + '" until all open connections are closed');
                                  }),
                                  (r.onsuccess = function () {
                                    var e = r.result;
                                    e && e.close(), t(e);
                                  });
                              });
                              return s
                                .then(function (e) {
                                  n.db = e;
                                  for (var t = 0; t < r.length; t++) w(r[t]._dbInfo);
                                })
                                .catch(function (t) {
                                  throw ((E(e, t) || a.resolve()).catch(function () {}), t);
                                });
                            });
                      } else n = a.reject("Invalid arguments");
                      return s(n, t), n;
                    },
                  };
                  var C = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
                    k = /^~~local_forage_type~([^~]+)~/,
                    P = "__lfsc__:",
                    x = "arbf",
                    B = "blob",
                    D = "si08",
                    L = "ui08",
                    F = "uic8",
                    U = "si16",
                    M = "si32",
                    q = "ur16",
                    z = "ui32",
                    W = "fl32",
                    H = "fl64",
                    $ = Object.prototype.toString;
                  function J(e) {
                    var t,
                      n,
                      r,
                      o,
                      i,
                      a = 0.75 * e.length,
                      s = e.length,
                      c = 0;
                    "=" === e[e.length - 1] && (a--, "=" === e[e.length - 2] && a--);
                    var u = new ArrayBuffer(a),
                      f = new Uint8Array(u);
                    for (t = 0; t < s; t += 4)
                      (n = C.indexOf(e[t])),
                        (r = C.indexOf(e[t + 1])),
                        (o = C.indexOf(e[t + 2])),
                        (i = C.indexOf(e[t + 3])),
                        (f[c++] = (n << 2) | (r >> 4)),
                        (f[c++] = ((15 & r) << 4) | (o >> 2)),
                        (f[c++] = ((3 & o) << 6) | (63 & i));
                    return u;
                  }
                  function V(e) {
                    var t,
                      n = new Uint8Array(e),
                      r = "";
                    for (t = 0; t < n.length; t += 3)
                      (r += C[n[t] >> 2]),
                        (r += C[((3 & n[t]) << 4) | (n[t + 1] >> 4)]),
                        (r += C[((15 & n[t + 1]) << 2) | (n[t + 2] >> 6)]),
                        (r += C[63 & n[t + 2]]);
                    return n.length % 3 == 2 ? (r = r.substring(0, r.length - 1) + "=") : n.length % 3 == 1 && (r = r.substring(0, r.length - 2) + "=="), r;
                  }
                  var K = {
                    serialize: function (e, t) {
                      var n = "";
                      if ((e && (n = $.call(e)), e && ("[object ArrayBuffer]" === n || (e.buffer && "[object ArrayBuffer]" === $.call(e.buffer))))) {
                        var r,
                          o = P;
                        e instanceof ArrayBuffer
                          ? ((r = e), (o += x))
                          : ((r = e.buffer),
                            "[object Int8Array]" === n
                              ? (o += D)
                              : "[object Uint8Array]" === n
                              ? (o += L)
                              : "[object Uint8ClampedArray]" === n
                              ? (o += F)
                              : "[object Int16Array]" === n
                              ? (o += U)
                              : "[object Uint16Array]" === n
                              ? (o += q)
                              : "[object Int32Array]" === n
                              ? (o += M)
                              : "[object Uint32Array]" === n
                              ? (o += z)
                              : "[object Float32Array]" === n
                              ? (o += W)
                              : "[object Float64Array]" === n
                              ? (o += H)
                              : t(new Error("Failed to get type for BinaryArray"))),
                          t(o + V(r));
                      } else if ("[object Blob]" === n) {
                        var i = new FileReader();
                        (i.onload = function () {
                          var n = "~~local_forage_type~" + e.type + "~" + V(this.result);
                          t(P + B + n);
                        }),
                          i.readAsArrayBuffer(e);
                      } else
                        try {
                          t(JSON.stringify(e));
                        } catch (n) {
                          console.error("Couldn't convert value into a JSON string: ", e), t(null, n);
                        }
                    },
                    deserialize: function (e) {
                      if (e.substring(0, 9) !== P) return JSON.parse(e);
                      var t,
                        n = e.substring(13),
                        r = e.substring(9, 13);
                      if (r === B && k.test(n)) {
                        var o = n.match(k);
                        (t = o[1]), (n = n.substring(o[0].length));
                      }
                      var a = J(n);
                      switch (r) {
                        case x:
                          return a;
                        case B:
                          return i([a], { type: t });
                        case D:
                          return new Int8Array(a);
                        case L:
                          return new Uint8Array(a);
                        case F:
                          return new Uint8ClampedArray(a);
                        case U:
                          return new Int16Array(a);
                        case q:
                          return new Uint16Array(a);
                        case M:
                          return new Int32Array(a);
                        case z:
                          return new Uint32Array(a);
                        case W:
                          return new Float32Array(a);
                        case H:
                          return new Float64Array(a);
                        default:
                          throw new Error("Unkown type: " + r);
                      }
                    },
                    stringToBuffer: J,
                    bufferToString: V,
                  };
                  function G(e, t, n, r) {
                    e.executeSql("CREATE TABLE IF NOT EXISTS " + t.storeName + " (id INTEGER PRIMARY KEY, key unique, value)", [], n, r);
                  }
                  function X(e, t, n, r, o, i) {
                    e.executeSql(
                      n,
                      r,
                      o,
                      function (e, a) {
                        a.code === a.SYNTAX_ERR
                          ? e.executeSql(
                              "SELECT name FROM sqlite_master WHERE type='table' AND name = ?",
                              [t.storeName],
                              function (e, s) {
                                s.rows.length
                                  ? i(e, a)
                                  : G(
                                      e,
                                      t,
                                      function () {
                                        e.executeSql(n, r, o, i);
                                      },
                                      i
                                    );
                              },
                              i
                            )
                          : i(e, a);
                      },
                      i
                    );
                  }
                  function Q(e, t, n, r) {
                    var o = this;
                    e = u(e);
                    var i = new a(function (i, a) {
                      o.ready()
                        .then(function () {
                          void 0 === t && (t = null);
                          var s = t,
                            c = o._dbInfo;
                          c.serializer.serialize(t, function (t, u) {
                            u
                              ? a(u)
                              : c.db.transaction(
                                  function (n) {
                                    X(
                                      n,
                                      c,
                                      "INSERT OR REPLACE INTO " + c.storeName + " (key, value) VALUES (?, ?)",
                                      [e, t],
                                      function () {
                                        i(s);
                                      },
                                      function (e, t) {
                                        a(t);
                                      }
                                    );
                                  },
                                  function (t) {
                                    if (t.code === t.QUOTA_ERR) {
                                      if (r > 0) return void i(Q.apply(o, [e, s, n, r - 1]));
                                      a(t);
                                    }
                                  }
                                );
                          });
                        })
                        .catch(a);
                    });
                    return s(i, n), i;
                  }
                  var Y = {
                    _driver: "webSQLStorage",
                    _initStorage: function (e) {
                      var t = this,
                        n = { db: null };
                      if (e) for (var r in e) n[r] = "string" != typeof e[r] ? e[r].toString() : e[r];
                      var o = new a(function (e, r) {
                        try {
                          n.db = openDatabase(n.name, String(n.version), n.description, n.size);
                        } catch (e) {
                          return r(e);
                        }
                        n.db.transaction(function (o) {
                          G(
                            o,
                            n,
                            function () {
                              (t._dbInfo = n), e();
                            },
                            function (e, t) {
                              r(t);
                            }
                          );
                        }, r);
                      });
                      return (n.serializer = K), o;
                    },
                    _support: "function" == typeof openDatabase,
                    iterate: function (e, t) {
                      var n = this,
                        r = new a(function (t, r) {
                          n.ready()
                            .then(function () {
                              var o = n._dbInfo;
                              o.db.transaction(function (n) {
                                X(
                                  n,
                                  o,
                                  "SELECT * FROM " + o.storeName,
                                  [],
                                  function (n, r) {
                                    for (var i = r.rows, a = i.length, s = 0; s < a; s++) {
                                      var c = i.item(s),
                                        u = c.value;
                                      if ((u && (u = o.serializer.deserialize(u)), void 0 !== (u = e(u, c.key, s + 1)))) return void t(u);
                                    }
                                    t();
                                  },
                                  function (e, t) {
                                    r(t);
                                  }
                                );
                              });
                            })
                            .catch(r);
                        });
                      return s(r, t), r;
                    },
                    getItem: function (e, t) {
                      var n = this;
                      e = u(e);
                      var r = new a(function (t, r) {
                        n.ready()
                          .then(function () {
                            var o = n._dbInfo;
                            o.db.transaction(function (n) {
                              X(
                                n,
                                o,
                                "SELECT * FROM " + o.storeName + " WHERE key = ? LIMIT 1",
                                [e],
                                function (e, n) {
                                  var r = n.rows.length ? n.rows.item(0).value : null;
                                  r && (r = o.serializer.deserialize(r)), t(r);
                                },
                                function (e, t) {
                                  r(t);
                                }
                              );
                            });
                          })
                          .catch(r);
                      });
                      return s(r, t), r;
                    },
                    setItem: function (e, t, n) {
                      return Q.apply(this, [e, t, n, 1]);
                    },
                    removeItem: function (e, t) {
                      var n = this;
                      e = u(e);
                      var r = new a(function (t, r) {
                        n.ready()
                          .then(function () {
                            var o = n._dbInfo;
                            o.db.transaction(function (n) {
                              X(
                                n,
                                o,
                                "DELETE FROM " + o.storeName + " WHERE key = ?",
                                [e],
                                function () {
                                  t();
                                },
                                function (e, t) {
                                  r(t);
                                }
                              );
                            });
                          })
                          .catch(r);
                      });
                      return s(r, t), r;
                    },
                    clear: function (e) {
                      var t = this,
                        n = new a(function (e, n) {
                          t.ready()
                            .then(function () {
                              var r = t._dbInfo;
                              r.db.transaction(function (t) {
                                X(
                                  t,
                                  r,
                                  "DELETE FROM " + r.storeName,
                                  [],
                                  function () {
                                    e();
                                  },
                                  function (e, t) {
                                    n(t);
                                  }
                                );
                              });
                            })
                            .catch(n);
                        });
                      return s(n, e), n;
                    },
                    length: function (e) {
                      var t = this,
                        n = new a(function (e, n) {
                          t.ready()
                            .then(function () {
                              var r = t._dbInfo;
                              r.db.transaction(function (t) {
                                X(
                                  t,
                                  r,
                                  "SELECT COUNT(key) as c FROM " + r.storeName,
                                  [],
                                  function (t, n) {
                                    var r = n.rows.item(0).c;
                                    e(r);
                                  },
                                  function (e, t) {
                                    n(t);
                                  }
                                );
                              });
                            })
                            .catch(n);
                        });
                      return s(n, e), n;
                    },
                    key: function (e, t) {
                      var n = this,
                        r = new a(function (t, r) {
                          n.ready()
                            .then(function () {
                              var o = n._dbInfo;
                              o.db.transaction(function (n) {
                                X(
                                  n,
                                  o,
                                  "SELECT key FROM " + o.storeName + " WHERE id = ? LIMIT 1",
                                  [e + 1],
                                  function (e, n) {
                                    var r = n.rows.length ? n.rows.item(0).key : null;
                                    t(r);
                                  },
                                  function (e, t) {
                                    r(t);
                                  }
                                );
                              });
                            })
                            .catch(r);
                        });
                      return s(r, t), r;
                    },
                    keys: function (e) {
                      var t = this,
                        n = new a(function (e, n) {
                          t.ready()
                            .then(function () {
                              var r = t._dbInfo;
                              r.db.transaction(function (t) {
                                X(
                                  t,
                                  r,
                                  "SELECT key FROM " + r.storeName,
                                  [],
                                  function (t, n) {
                                    for (var r = [], o = 0; o < n.rows.length; o++) r.push(n.rows.item(o).key);
                                    e(r);
                                  },
                                  function (e, t) {
                                    n(t);
                                  }
                                );
                              });
                            })
                            .catch(n);
                        });
                      return s(n, e), n;
                    },
                    dropInstance: function (e, t) {
                      t = f.apply(this, arguments);
                      var n = this.config();
                      (e = ("function" != typeof e && e) || {}).name || ((e.name = e.name || n.name), (e.storeName = e.storeName || n.storeName));
                      var r,
                        o = this;
                      return (
                        s(
                          (r = e.name
                            ? new a(function (t) {
                                var r;
                                (r = e.name === n.name ? o._dbInfo.db : openDatabase(e.name, "", "", 0)),
                                  e.storeName
                                    ? t({ db: r, storeNames: [e.storeName] })
                                    : t(
                                        (function (e) {
                                          return new a(function (t, n) {
                                            e.transaction(
                                              function (r) {
                                                r.executeSql(
                                                  "SELECT name FROM sqlite_master WHERE type='table' AND name <> '__WebKitDatabaseInfoTable__'",
                                                  [],
                                                  function (n, r) {
                                                    for (var o = [], i = 0; i < r.rows.length; i++) o.push(r.rows.item(i).name);
                                                    t({ db: e, storeNames: o });
                                                  },
                                                  function (e, t) {
                                                    n(t);
                                                  }
                                                );
                                              },
                                              function (e) {
                                                n(e);
                                              }
                                            );
                                          });
                                        })(r)
                                      );
                              }).then(function (e) {
                                return new a(function (t, n) {
                                  e.db.transaction(
                                    function (r) {
                                      function o(e) {
                                        return new a(function (t, n) {
                                          r.executeSql(
                                            "DROP TABLE IF EXISTS " + e,
                                            [],
                                            function () {
                                              t();
                                            },
                                            function (e, t) {
                                              n(t);
                                            }
                                          );
                                        });
                                      }
                                      for (var i = [], s = 0, c = e.storeNames.length; s < c; s++) i.push(o(e.storeNames[s]));
                                      a.all(i)
                                        .then(function () {
                                          t();
                                        })
                                        .catch(function (e) {
                                          n(e);
                                        });
                                    },
                                    function (e) {
                                      n(e);
                                    }
                                  );
                                });
                              })
                            : a.reject("Invalid arguments")),
                          t
                        ),
                        r
                      );
                    },
                  };
                  function Z(e, t) {
                    var n = e.name + "/";
                    return e.storeName !== t.storeName && (n += e.storeName + "/"), n;
                  }
                  function ee() {
                    return (
                      !(function () {
                        var e = "_localforage_support_test";
                        try {
                          return localStorage.setItem(e, !0), localStorage.removeItem(e), !1;
                        } catch (e) {
                          return !0;
                        }
                      })() || localStorage.length > 0
                    );
                  }
                  var te = {
                      _driver: "localStorageWrapper",
                      _initStorage: function (e) {
                        var t = {};
                        if (e) for (var n in e) t[n] = e[n];
                        return (t.keyPrefix = Z(e, this._defaultConfig)), ee() ? ((this._dbInfo = t), (t.serializer = K), a.resolve()) : a.reject();
                      },
                      _support: (function () {
                        try {
                          return "undefined" != typeof localStorage && "setItem" in localStorage && !!localStorage.setItem;
                        } catch (e) {
                          return !1;
                        }
                      })(),
                      iterate: function (e, t) {
                        var n = this,
                          r = n.ready().then(function () {
                            for (var t = n._dbInfo, r = t.keyPrefix, o = r.length, i = localStorage.length, a = 1, s = 0; s < i; s++) {
                              var c = localStorage.key(s);
                              if (0 === c.indexOf(r)) {
                                var u = localStorage.getItem(c);
                                if ((u && (u = t.serializer.deserialize(u)), void 0 !== (u = e(u, c.substring(o), a++)))) return u;
                              }
                            }
                          });
                        return s(r, t), r;
                      },
                      getItem: function (e, t) {
                        var n = this;
                        e = u(e);
                        var r = n.ready().then(function () {
                          var t = n._dbInfo,
                            r = localStorage.getItem(t.keyPrefix + e);
                          return r && (r = t.serializer.deserialize(r)), r;
                        });
                        return s(r, t), r;
                      },
                      setItem: function (e, t, n) {
                        var r = this;
                        e = u(e);
                        var o = r.ready().then(function () {
                          void 0 === t && (t = null);
                          var n = t;
                          return new a(function (o, i) {
                            var a = r._dbInfo;
                            a.serializer.serialize(t, function (t, r) {
                              if (r) i(r);
                              else
                                try {
                                  localStorage.setItem(a.keyPrefix + e, t), o(n);
                                } catch (e) {
                                  ("QuotaExceededError" !== e.name && "NS_ERROR_DOM_QUOTA_REACHED" !== e.name) || i(e), i(e);
                                }
                            });
                          });
                        });
                        return s(o, n), o;
                      },
                      removeItem: function (e, t) {
                        var n = this;
                        e = u(e);
                        var r = n.ready().then(function () {
                          var t = n._dbInfo;
                          localStorage.removeItem(t.keyPrefix + e);
                        });
                        return s(r, t), r;
                      },
                      clear: function (e) {
                        var t = this,
                          n = t.ready().then(function () {
                            for (var e = t._dbInfo.keyPrefix, n = localStorage.length - 1; n >= 0; n--) {
                              var r = localStorage.key(n);
                              0 === r.indexOf(e) && localStorage.removeItem(r);
                            }
                          });
                        return s(n, e), n;
                      },
                      length: function (e) {
                        var t = this.keys().then(function (e) {
                          return e.length;
                        });
                        return s(t, e), t;
                      },
                      key: function (e, t) {
                        var n = this,
                          r = n.ready().then(function () {
                            var t,
                              r = n._dbInfo;
                            try {
                              t = localStorage.key(e);
                            } catch (e) {
                              t = null;
                            }
                            return t && (t = t.substring(r.keyPrefix.length)), t;
                          });
                        return s(r, t), r;
                      },
                      keys: function (e) {
                        var t = this,
                          n = t.ready().then(function () {
                            for (var e = t._dbInfo, n = localStorage.length, r = [], o = 0; o < n; o++) {
                              var i = localStorage.key(o);
                              0 === i.indexOf(e.keyPrefix) && r.push(i.substring(e.keyPrefix.length));
                            }
                            return r;
                          });
                        return s(n, e), n;
                      },
                      dropInstance: function (e, t) {
                        if (((t = f.apply(this, arguments)), !(e = ("function" != typeof e && e) || {}).name)) {
                          var n = this.config();
                          (e.name = e.name || n.name), (e.storeName = e.storeName || n.storeName);
                        }
                        var r,
                          o = this;
                        return (
                          (r = e.name
                            ? new a(function (t) {
                                e.storeName ? t(Z(e, o._defaultConfig)) : t(e.name + "/");
                              }).then(function (e) {
                                for (var t = localStorage.length - 1; t >= 0; t--) {
                                  var n = localStorage.key(t);
                                  0 === n.indexOf(e) && localStorage.removeItem(n);
                                }
                              })
                            : a.reject("Invalid arguments")),
                          s(r, t),
                          r
                        );
                      },
                    },
                    ne = function (e, t) {
                      for (var n = e.length, r = 0; r < n; ) {
                        if ((o = e[r]) === (i = t) || ("number" == typeof o && "number" == typeof i && isNaN(o) && isNaN(i))) return !0;
                        r++;
                      }
                      var o, i;
                      return !1;
                    },
                    re =
                      Array.isArray ||
                      function (e) {
                        return "[object Array]" === Object.prototype.toString.call(e);
                      },
                    oe = {},
                    ie = {},
                    ae = { INDEXEDDB: j, WEBSQL: Y, LOCALSTORAGE: te },
                    se = [ae.INDEXEDDB._driver, ae.WEBSQL._driver, ae.LOCALSTORAGE._driver],
                    ce = ["dropInstance"],
                    ue = ["clear", "getItem", "iterate", "key", "keys", "length", "removeItem", "setItem"].concat(ce),
                    fe = { description: "", driver: se.slice(), name: "localforage", size: 4980736, storeName: "keyvaluepairs", version: 1 };
                  function le(e, t) {
                    e[t] = function () {
                      var n = arguments;
                      return e.ready().then(function () {
                        return e[t].apply(e, n);
                      });
                    };
                  }
                  function de() {
                    for (var e = 1; e < arguments.length; e++) {
                      var t = arguments[e];
                      if (t) for (var n in t) t.hasOwnProperty(n) && (re(t[n]) ? (arguments[0][n] = t[n].slice()) : (arguments[0][n] = t[n]));
                    }
                    return arguments[0];
                  }
                  var he = (function () {
                      function e(t) {
                        for (var n in ((function (e, t) {
                          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
                        })(this, e),
                        ae))
                          if (ae.hasOwnProperty(n)) {
                            var r = ae[n],
                              o = r._driver;
                            (this[n] = o), oe[o] || this.defineDriver(r);
                          }
                        (this._defaultConfig = de({}, fe)),
                          (this._config = de({}, this._defaultConfig, t)),
                          (this._driverSet = null),
                          (this._initDriver = null),
                          (this._ready = !1),
                          (this._dbInfo = null),
                          this._wrapLibraryMethodsWithReady(),
                          this.setDriver(this._config.driver).catch(function () {});
                      }
                      return (
                        (e.prototype.config = function (e) {
                          if ("object" === (void 0 === e ? "undefined" : r(e))) {
                            if (this._ready) return new Error("Can't call config() after localforage has been used.");
                            for (var t in e) {
                              if (("storeName" === t && (e[t] = e[t].replace(/\W/g, "_")), "version" === t && "number" != typeof e[t]))
                                return new Error("Database version must be a number.");
                              this._config[t] = e[t];
                            }
                            return !("driver" in e) || !e.driver || this.setDriver(this._config.driver);
                          }
                          return "string" == typeof e ? this._config[e] : this._config;
                        }),
                        (e.prototype.defineDriver = function (e, t, n) {
                          var r = new a(function (t, n) {
                            try {
                              var r = e._driver,
                                o = new Error("Custom driver not compliant; see https://mozilla.github.io/localForage/#definedriver");
                              if (!e._driver) return void n(o);
                              for (var i = ue.concat("_initStorage"), c = 0, u = i.length; c < u; c++) {
                                var f = i[c];
                                if ((!ne(ce, f) || e[f]) && "function" != typeof e[f]) return void n(o);
                              }
                              !(function () {
                                for (
                                  var t = function (e) {
                                      return function () {
                                        var t = new Error("Method " + e + " is not implemented by the current driver"),
                                          n = a.reject(t);
                                        return s(n, arguments[arguments.length - 1]), n;
                                      };
                                    },
                                    n = 0,
                                    r = ce.length;
                                  n < r;
                                  n++
                                ) {
                                  var o = ce[n];
                                  e[o] || (e[o] = t(o));
                                }
                              })();
                              var l = function (n) {
                                oe[r] && console.info("Redefining LocalForage driver: " + r), (oe[r] = e), (ie[r] = n), t();
                              };
                              "_support" in e ? (e._support && "function" == typeof e._support ? e._support().then(l, n) : l(!!e._support)) : l(!0);
                            } catch (e) {
                              n(e);
                            }
                          });
                          return c(r, t, n), r;
                        }),
                        (e.prototype.driver = function () {
                          return this._driver || null;
                        }),
                        (e.prototype.getDriver = function (e, t, n) {
                          var r = oe[e] ? a.resolve(oe[e]) : a.reject(new Error("Driver not found."));
                          return c(r, t, n), r;
                        }),
                        (e.prototype.getSerializer = function (e) {
                          var t = a.resolve(K);
                          return c(t, e), t;
                        }),
                        (e.prototype.ready = function (e) {
                          var t = this,
                            n = t._driverSet.then(function () {
                              return null === t._ready && (t._ready = t._initDriver()), t._ready;
                            });
                          return c(n, e, e), n;
                        }),
                        (e.prototype.setDriver = function (e, t, n) {
                          var r = this;
                          re(e) || (e = [e]);
                          var o = this._getSupportedDrivers(e);
                          function i() {
                            r._config.driver = r.driver();
                          }
                          function s(e) {
                            return r._extend(e), i(), (r._ready = r._initStorage(r._config)), r._ready;
                          }
                          var u =
                            null !== this._driverSet
                              ? this._driverSet.catch(function () {
                                  return a.resolve();
                                })
                              : a.resolve();
                          return (
                            (this._driverSet = u
                              .then(function () {
                                var e = o[0];
                                return (
                                  (r._dbInfo = null),
                                  (r._ready = null),
                                  r.getDriver(e).then(function (e) {
                                    (r._driver = e._driver),
                                      i(),
                                      r._wrapLibraryMethodsWithReady(),
                                      (r._initDriver = (function (e) {
                                        return function () {
                                          var t = 0;
                                          return (function n() {
                                            for (; t < e.length; ) {
                                              var o = e[t];
                                              return t++, (r._dbInfo = null), (r._ready = null), r.getDriver(o).then(s).catch(n);
                                            }
                                            i();
                                            var c = new Error("No available storage method found.");
                                            return (r._driverSet = a.reject(c)), r._driverSet;
                                          })();
                                        };
                                      })(o));
                                  })
                                );
                              })
                              .catch(function () {
                                i();
                                var e = new Error("No available storage method found.");
                                return (r._driverSet = a.reject(e)), r._driverSet;
                              })),
                            c(this._driverSet, t, n),
                            this._driverSet
                          );
                        }),
                        (e.prototype.supports = function (e) {
                          return !!ie[e];
                        }),
                        (e.prototype._extend = function (e) {
                          de(this, e);
                        }),
                        (e.prototype._getSupportedDrivers = function (e) {
                          for (var t = [], n = 0, r = e.length; n < r; n++) {
                            var o = e[n];
                            this.supports(o) && t.push(o);
                          }
                          return t;
                        }),
                        (e.prototype._wrapLibraryMethodsWithReady = function () {
                          for (var e = 0, t = ue.length; e < t; e++) le(this, ue[e]);
                        }),
                        (e.prototype.createInstance = function (t) {
                          return new e(t);
                        }),
                        e
                      );
                    })(),
                    pe = new he();
                  t.exports = pe;
                },
                { 3: 3 },
              ],
            },
            {},
            [4]
          )(4);
        },
      },
      t = {};
    function n(r) {
      var o = t[r];
      if (void 0 !== o) return o.exports;
      var i = (t[r] = { exports: {} });
      return e[r](i, i.exports, n), i.exports;
    }
    (n.n = (e) => {
      var t = e && e.__esModule ? () => e.default : () => e;
      return n.d(t, { a: t }), t;
    }),
      (n.d = (e, t) => {
        for (var r in t) n.o(t, r) && !n.o(e, r) && Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
      }),
      (n.g = (function () {
        if ("object" == typeof globalThis) return globalThis;
        try {
          return this || new Function("return this")();
        } catch (e) {
          if ("object" == typeof window) return window;
        }
      })()),
      (n.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
      (n.r = (e) => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(e, "__esModule", { value: !0 });
      });
    var r = {};
    return (
      (() => {
        "use strict";
        n.r(r), n.d(r, { Pokedex: () => Tt });
        var e = {};
        n.r(e),
          n.d(e, { hasBrowserEnv: () => ge, hasStandardBrowserEnv: () => ve, hasStandardBrowserWebWorkerEnv: () => be, navigator: () => ye, origin: () => we });
        var t = n(790),
          o = n.n(t);
        const i = JSON.parse(
            '[["getBerry","name","berry/:id/"],["getBerryFirmness","name","berry-firmness/:id/"],["getBerryFlavor","name","berry-flavor/:id/"],["getContestType","name","contest-type/:id/"],["getContestEffect","id","contest-effect/:id/"],["getSuperContestEffect","id","super-contest-effect/:id/"],["getEncounterMethod","name","encounter-method/:id/"],["getEncounterCondition","name","encounter-condition/:id/"],["getEncounterConditionValue","name","encounter-condition-value/:id/"],["getEvolutionChain","id","evolution-chain/:id/"],["getEvolutionTrigger","name","evolution-trigger/:id/"],["getGeneration","name","generation/:id/"],["getPokedex","name","pokedex/:id/"],["getVersion","name","version/:id/"],["getVersionGroup","name","version-group/:id/"],["getItem","name","item/:id/"],["getItemAttribute","name","item-attribute/:id/"],["getItemCategory","name","item-category/:id/"],["getItemFlingEffect","name","item-fling-effect/:id/"],["getItemPocket","name","item-pocket/:id/"],["getMachine","id","machine/:id/"],["getMove","name","move/:id/"],["getMoveAilment","name","move-ailment/:id/"],["getMoveBattleStyle","name","move-battle-style/:id/"],["getMoveCategory","name","move-category/:id/"],["getMoveDamageClass","name","move-damage-class/:id/"],["getMoveLearnMethod","name","move-learn-method/:id/"],["getMoveTarget","name","move-target/:id/"],["getLocation","name","location/:id/"],["getLocationArea","name","location-area/:id/"],["getPalParkArea","name","pal-park-area/:id/"],["getRegion","name","region/:id/"],["getAbility","name","ability/:id/"],["getCharacteristic","id","characteristic/:id/"],["getEggGroup","name","egg-group/:id/"],["getGender","name","gender/:id/"],["getGrowthRate","name","growth-rate/:id/"],["getNature","name","nature/:id/"],["getPokeathlonStat","name","pokeathlon-stat/:id/"],["getPokemon","name","pokemon/:id/"],["getPokemonEncounterAreas","name","pokemon/:id/encounters/"],["getPokemonColor","name","pokemon-color/:id/"],["getPokemonForm","name","pokemon-form/:id/"],["getPokemonHabitat","name","pokemon-habitat/:id/"],["getPokemonShape","name","pokemon-shape/:id/"],["getPokemonSpecies","name","pokemon-species/:id/"],["getStat","name","stat/:id/"],["getType","name","type/:id/"],["getLanguage","name","language/:id/"]]'
          ),
          a = JSON.parse(
            '[["getEndpoints",""],["getBerries","berry/"],["getBerriesFirmnesss","berry-firmness/"],["getBerriesFlavors","berry-flavor/"],["getContestTypes","contest-type/"],["getContestEffects","contest-effect/"],["getSuperContestEffects","super-contest-effect/"],["getEncounterMethods","encounter-method/"],["getEncounterConditions","encounter-condition/"],["getEncounterConditionValues","encounter-condition-value/"],["getEvolutionChains","evolution-chain/"],["getEvolutionTriggers","evolution-trigger/"],["getGenerations","generation/"],["getPokedexs","pokedex/"],["getVersions","version/"],["getVersionGroups","version-group/"],["getItems","item/"],["getItemAttributes","item-attribute/"],["getItemCategories","item-category/"],["getItemFlingEffects","item-fling-effect/"],["getItemPockets","item-pocket/"],["getMachines","machine/"],["getMoves","move/"],["getMoveAilments","move-ailment/"],["getMoveBattleStyles","move-battle-style/"],["getMoveCategories","move-category/"],["getMoveDamageClasses","move-damage-class/"],["getMoveLearnMethods","move-learn-method/"],["getMoveTargets","move-target/"],["getLocations","location/"],["getLocationAreas","location-area/"],["getPalParkAreas","pal-park-area/"],["getRegions","region/"],["getAbilities","ability/"],["getCharacteristics","characteristic/"],["getEggGroups","egg-group/"],["getGenders","gender/"],["getGrowthRates","growth-rate/"],["getNatures","nature/"],["getPokeathlonStats","pokeathlon-stat/"],["getPokemons","pokemon/"],["getPokemonColors","pokemon-color/"],["getPokemonForms","pokemon-form/"],["getPokemonHabitats","pokemon-habitat/"],["getPokemonShapes","pokemon-shape/"],["getPokemonSpecies","pokemon-species/"],["getStats","stat/"],["getTypes","type/"],["getLanguages","language/"]]'
          );
        function s(e, t) {
          return function () {
            return e.apply(t, arguments);
          };
        }
        const { toString: c } = Object.prototype,
          { getPrototypeOf: u } = Object,
          f =
            ((l = Object.create(null)),
            (e) => {
              const t = c.call(e);
              return l[t] || (l[t] = t.slice(8, -1).toLowerCase());
            });
        var l;
        const d = (e) => ((e = e.toLowerCase()), (t) => f(t) === e),
          h = (e) => (t) => typeof t === e,
          { isArray: p } = Array,
          m = h("undefined"),
          g = d("ArrayBuffer"),
          y = h("string"),
          v = h("function"),
          b = h("number"),
          w = (e) => null !== e && "object" == typeof e,
          E = (e) => {
            if ("object" !== f(e)) return !1;
            const t = u(e);
            return !((null !== t && t !== Object.prototype && null !== Object.getPrototypeOf(t)) || Symbol.toStringTag in e || Symbol.iterator in e);
          },
          S = d("Date"),
          _ = d("File"),
          O = d("Blob"),
          R = d("FileList"),
          A = d("URLSearchParams"),
          [T, N, I, j] = ["ReadableStream", "Request", "Response", "Headers"].map(d);
        function C(e, t, { allOwnKeys: n = !1 } = {}) {
          if (null == e) return;
          let r, o;
          if (("object" != typeof e && (e = [e]), p(e))) for (r = 0, o = e.length; r < o; r++) t.call(null, e[r], r, e);
          else {
            const o = n ? Object.getOwnPropertyNames(e) : Object.keys(e),
              i = o.length;
            let a;
            for (r = 0; r < i; r++) (a = o[r]), t.call(null, e[a], a, e);
          }
        }
        function k(e, t) {
          t = t.toLowerCase();
          const n = Object.keys(e);
          let r,
            o = n.length;
          for (; o-- > 0; ) if (((r = n[o]), t === r.toLowerCase())) return r;
          return null;
        }
        const P = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : "undefined" != typeof window ? window : global,
          x = (e) => !m(e) && e !== P,
          B = ((D = "undefined" != typeof Uint8Array && u(Uint8Array)), (e) => D && e instanceof D);
        var D;
        const L = d("HTMLFormElement"),
          F = (
            ({ hasOwnProperty: e }) =>
            (t, n) =>
              e.call(t, n)
          )(Object.prototype),
          U = d("RegExp"),
          M = (e, t) => {
            const n = Object.getOwnPropertyDescriptors(e),
              r = {};
            C(n, (n, o) => {
              let i;
              !1 !== (i = t(n, o, e)) && (r[o] = i || n);
            }),
              Object.defineProperties(e, r);
          },
          q = "abcdefghijklmnopqrstuvwxyz",
          z = "0123456789",
          W = { DIGIT: z, ALPHA: q, ALPHA_DIGIT: q + q.toUpperCase() + z },
          H = d("AsyncFunction"),
          $ =
            ((J = "function" == typeof setImmediate),
            (V = v(P.postMessage)),
            J
              ? setImmediate
              : V
              ? ((K = `axios@${Math.random()}`),
                (G = []),
                P.addEventListener(
                  "message",
                  ({ source: e, data: t }) => {
                    e === P && t === K && G.length && G.shift()();
                  },
                  !1
                ),
                (e) => {
                  G.push(e), P.postMessage(K, "*");
                })
              : (e) => setTimeout(e));
        var J, V, K, G;
        const X = "undefined" != typeof queueMicrotask ? queueMicrotask.bind(P) : ("undefined" != typeof process && process.nextTick) || $,
          Q = {
            isArray: p,
            isArrayBuffer: g,
            isBuffer: function (e) {
              return null !== e && !m(e) && null !== e.constructor && !m(e.constructor) && v(e.constructor.isBuffer) && e.constructor.isBuffer(e);
            },
            isFormData: (e) => {
              let t;
              return (
                e &&
                (("function" == typeof FormData && e instanceof FormData) ||
                  (v(e.append) && ("formdata" === (t = f(e)) || ("object" === t && v(e.toString) && "[object FormData]" === e.toString()))))
              );
            },
            isArrayBufferView: function (e) {
              let t;
              return (t = "undefined" != typeof ArrayBuffer && ArrayBuffer.isView ? ArrayBuffer.isView(e) : e && e.buffer && g(e.buffer)), t;
            },
            isString: y,
            isNumber: b,
            isBoolean: (e) => !0 === e || !1 === e,
            isObject: w,
            isPlainObject: E,
            isReadableStream: T,
            isRequest: N,
            isResponse: I,
            isHeaders: j,
            isUndefined: m,
            isDate: S,
            isFile: _,
            isBlob: O,
            isRegExp: U,
            isFunction: v,
            isStream: (e) => w(e) && v(e.pipe),
            isURLSearchParams: A,
            isTypedArray: B,
            isFileList: R,
            forEach: C,
            merge: function e() {
              const { caseless: t } = (x(this) && this) || {},
                n = {},
                r = (r, o) => {
                  const i = (t && k(n, o)) || o;
                  E(n[i]) && E(r) ? (n[i] = e(n[i], r)) : E(r) ? (n[i] = e({}, r)) : p(r) ? (n[i] = r.slice()) : (n[i] = r);
                };
              for (let e = 0, t = arguments.length; e < t; e++) arguments[e] && C(arguments[e], r);
              return n;
            },
            extend: (e, t, n, { allOwnKeys: r } = {}) => (
              C(
                t,
                (t, r) => {
                  n && v(t) ? (e[r] = s(t, n)) : (e[r] = t);
                },
                { allOwnKeys: r }
              ),
              e
            ),
            trim: (e) => (e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")),
            stripBOM: (e) => (65279 === e.charCodeAt(0) && (e = e.slice(1)), e),
            inherits: (e, t, n, r) => {
              (e.prototype = Object.create(t.prototype, r)),
                (e.prototype.constructor = e),
                Object.defineProperty(e, "super", { value: t.prototype }),
                n && Object.assign(e.prototype, n);
            },
            toFlatObject: (e, t, n, r) => {
              let o, i, a;
              const s = {};
              if (((t = t || {}), null == e)) return t;
              do {
                for (o = Object.getOwnPropertyNames(e), i = o.length; i-- > 0; ) (a = o[i]), (r && !r(a, e, t)) || s[a] || ((t[a] = e[a]), (s[a] = !0));
                e = !1 !== n && u(e);
              } while (e && (!n || n(e, t)) && e !== Object.prototype);
              return t;
            },
            kindOf: f,
            kindOfTest: d,
            endsWith: (e, t, n) => {
              (e = String(e)), (void 0 === n || n > e.length) && (n = e.length), (n -= t.length);
              const r = e.indexOf(t, n);
              return -1 !== r && r === n;
            },
            toArray: (e) => {
              if (!e) return null;
              if (p(e)) return e;
              let t = e.length;
              if (!b(t)) return null;
              const n = new Array(t);
              for (; t-- > 0; ) n[t] = e[t];
              return n;
            },
            forEachEntry: (e, t) => {
              const n = (e && e[Symbol.iterator]).call(e);
              let r;
              for (; (r = n.next()) && !r.done; ) {
                const n = r.value;
                t.call(e, n[0], n[1]);
              }
            },
            matchAll: (e, t) => {
              let n;
              const r = [];
              for (; null !== (n = e.exec(t)); ) r.push(n);
              return r;
            },
            isHTMLForm: L,
            hasOwnProperty: F,
            hasOwnProp: F,
            reduceDescriptors: M,
            freezeMethods: (e) => {
              M(e, (t, n) => {
                if (v(e) && -1 !== ["arguments", "caller", "callee"].indexOf(n)) return !1;
                const r = e[n];
                v(r) &&
                  ((t.enumerable = !1),
                  "writable" in t
                    ? (t.writable = !1)
                    : t.set ||
                      (t.set = () => {
                        throw Error("Can not rewrite read-only method '" + n + "'");
                      }));
              });
            },
            toObjectSet: (e, t) => {
              const n = {},
                r = (e) => {
                  e.forEach((e) => {
                    n[e] = !0;
                  });
                };
              return p(e) ? r(e) : r(String(e).split(t)), n;
            },
            toCamelCase: (e) =>
              e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function (e, t, n) {
                return t.toUpperCase() + n;
              }),
            noop: () => {},
            toFiniteNumber: (e, t) => (null != e && Number.isFinite((e = +e)) ? e : t),
            findKey: k,
            global: P,
            isContextDefined: x,
            ALPHABET: W,
            generateString: (e = 16, t = W.ALPHA_DIGIT) => {
              let n = "";
              const { length: r } = t;
              for (; e--; ) n += t[(Math.random() * r) | 0];
              return n;
            },
            isSpecCompliantForm: function (e) {
              return !!(e && v(e.append) && "FormData" === e[Symbol.toStringTag] && e[Symbol.iterator]);
            },
            toJSONObject: (e) => {
              const t = new Array(10),
                n = (e, r) => {
                  if (w(e)) {
                    if (t.indexOf(e) >= 0) return;
                    if (!("toJSON" in e)) {
                      t[r] = e;
                      const o = p(e) ? [] : {};
                      return (
                        C(e, (e, t) => {
                          const i = n(e, r + 1);
                          !m(i) && (o[t] = i);
                        }),
                        (t[r] = void 0),
                        o
                      );
                    }
                  }
                  return e;
                };
              return n(e, 0);
            },
            isAsyncFn: H,
            isThenable: (e) => e && (w(e) || v(e)) && v(e.then) && v(e.catch),
            setImmediate: $,
            asap: X,
          };
        function Y(e, t, n, r, o) {
          Error.call(this),
            Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : (this.stack = new Error().stack),
            (this.message = e),
            (this.name = "AxiosError"),
            t && (this.code = t),
            n && (this.config = n),
            r && (this.request = r),
            o && ((this.response = o), (this.status = o.status ? o.status : null));
        }
        Q.inherits(Y, Error, {
          toJSON: function () {
            return {
              message: this.message,
              name: this.name,
              description: this.description,
              number: this.number,
              fileName: this.fileName,
              lineNumber: this.lineNumber,
              columnNumber: this.columnNumber,
              stack: this.stack,
              config: Q.toJSONObject(this.config),
              code: this.code,
              status: this.status,
            };
          },
        });
        const Z = Y.prototype,
          ee = {};
        [
          "ERR_BAD_OPTION_VALUE",
          "ERR_BAD_OPTION",
          "ECONNABORTED",
          "ETIMEDOUT",
          "ERR_NETWORK",
          "ERR_FR_TOO_MANY_REDIRECTS",
          "ERR_DEPRECATED",
          "ERR_BAD_RESPONSE",
          "ERR_BAD_REQUEST",
          "ERR_CANCELED",
          "ERR_NOT_SUPPORT",
          "ERR_INVALID_URL",
        ].forEach((e) => {
          ee[e] = { value: e };
        }),
          Object.defineProperties(Y, ee),
          Object.defineProperty(Z, "isAxiosError", { value: !0 }),
          (Y.from = (e, t, n, r, o, i) => {
            const a = Object.create(Z);
            return (
              Q.toFlatObject(
                e,
                a,
                function (e) {
                  return e !== Error.prototype;
                },
                (e) => "isAxiosError" !== e
              ),
              Y.call(a, e.message, t, n, r, o),
              (a.cause = e),
              (a.name = e.name),
              i && Object.assign(a, i),
              a
            );
          });
        const te = Y;
        function ne(e) {
          return Q.isPlainObject(e) || Q.isArray(e);
        }
        function re(e) {
          return Q.endsWith(e, "[]") ? e.slice(0, -2) : e;
        }
        function oe(e, t, n) {
          return e
            ? e
                .concat(t)
                .map(function (e, t) {
                  return (e = re(e)), !n && t ? "[" + e + "]" : e;
                })
                .join(n ? "." : "")
            : t;
        }
        const ie = Q.toFlatObject(Q, {}, null, function (e) {
            return /^is[A-Z]/.test(e);
          }),
          ae = function (e, t, n) {
            if (!Q.isObject(e)) throw new TypeError("target must be an object");
            t = t || new FormData();
            const r = (n = Q.toFlatObject(n, { metaTokens: !0, dots: !1, indexes: !1 }, !1, function (e, t) {
                return !Q.isUndefined(t[e]);
              })).metaTokens,
              o = n.visitor || u,
              i = n.dots,
              a = n.indexes,
              s = (n.Blob || ("undefined" != typeof Blob && Blob)) && Q.isSpecCompliantForm(t);
            if (!Q.isFunction(o)) throw new TypeError("visitor must be a function");
            function c(e) {
              if (null === e) return "";
              if (Q.isDate(e)) return e.toISOString();
              if (!s && Q.isBlob(e)) throw new te("Blob is not supported. Use a Buffer instead.");
              return Q.isArrayBuffer(e) || Q.isTypedArray(e) ? (s && "function" == typeof Blob ? new Blob([e]) : Buffer.from(e)) : e;
            }
            function u(e, n, o) {
              let s = e;
              if (e && !o && "object" == typeof e)
                if (Q.endsWith(n, "{}")) (n = r ? n : n.slice(0, -2)), (e = JSON.stringify(e));
                else if (
                  (Q.isArray(e) &&
                    (function (e) {
                      return Q.isArray(e) && !e.some(ne);
                    })(e)) ||
                  ((Q.isFileList(e) || Q.endsWith(n, "[]")) && (s = Q.toArray(e)))
                )
                  return (
                    (n = re(n)),
                    s.forEach(function (e, r) {
                      !Q.isUndefined(e) && null !== e && t.append(!0 === a ? oe([n], r, i) : null === a ? n : n + "[]", c(e));
                    }),
                    !1
                  );
              return !!ne(e) || (t.append(oe(o, n, i), c(e)), !1);
            }
            const f = [],
              l = Object.assign(ie, { defaultVisitor: u, convertValue: c, isVisitable: ne });
            if (!Q.isObject(e)) throw new TypeError("data must be an object");
            return (
              (function e(n, r) {
                if (!Q.isUndefined(n)) {
                  if (-1 !== f.indexOf(n)) throw Error("Circular reference detected in " + r.join("."));
                  f.push(n),
                    Q.forEach(n, function (n, i) {
                      !0 === (!(Q.isUndefined(n) || null === n) && o.call(t, n, Q.isString(i) ? i.trim() : i, r, l)) && e(n, r ? r.concat(i) : [i]);
                    }),
                    f.pop();
                }
              })(e),
              t
            );
          };
        function se(e) {
          const t = { "!": "%21", "'": "%27", "(": "%28", ")": "%29", "~": "%7E", "%20": "+", "%00": "\0" };
          return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function (e) {
            return t[e];
          });
        }
        function ce(e, t) {
          (this._pairs = []), e && ae(e, this, t);
        }
        const ue = ce.prototype;
        (ue.append = function (e, t) {
          this._pairs.push([e, t]);
        }),
          (ue.toString = function (e) {
            const t = e
              ? function (t) {
                  return e.call(this, t, se);
                }
              : se;
            return this._pairs
              .map(function (e) {
                return t(e[0]) + "=" + t(e[1]);
              }, "")
              .join("&");
          });
        const fe = ce;
        function le(e) {
          return encodeURIComponent(e)
            .replace(/%3A/gi, ":")
            .replace(/%24/g, "$")
            .replace(/%2C/gi, ",")
            .replace(/%20/g, "+")
            .replace(/%5B/gi, "[")
            .replace(/%5D/gi, "]");
        }
        function de(e, t, n) {
          if (!t) return e;
          const r = (n && n.encode) || le,
            o = n && n.serialize;
          let i;
          if (((i = o ? o(t, n) : Q.isURLSearchParams(t) ? t.toString() : new fe(t, n).toString(r)), i)) {
            const t = e.indexOf("#");
            -1 !== t && (e = e.slice(0, t)), (e += (-1 === e.indexOf("?") ? "?" : "&") + i);
          }
          return e;
        }
        const he = class {
            constructor() {
              this.handlers = [];
            }
            use(e, t, n) {
              return (
                this.handlers.push({ fulfilled: e, rejected: t, synchronous: !!n && n.synchronous, runWhen: n ? n.runWhen : null }), this.handlers.length - 1
              );
            }
            eject(e) {
              this.handlers[e] && (this.handlers[e] = null);
            }
            clear() {
              this.handlers && (this.handlers = []);
            }
            forEach(e) {
              Q.forEach(this.handlers, function (t) {
                null !== t && e(t);
              });
            }
          },
          pe = { silentJSONParsing: !0, forcedJSONParsing: !0, clarifyTimeoutError: !1 },
          me = {
            isBrowser: !0,
            classes: {
              URLSearchParams: "undefined" != typeof URLSearchParams ? URLSearchParams : fe,
              FormData: "undefined" != typeof FormData ? FormData : null,
              Blob: "undefined" != typeof Blob ? Blob : null,
            },
            protocols: ["http", "https", "file", "blob", "url", "data"],
          },
          ge = "undefined" != typeof window && "undefined" != typeof document,
          ye = ("object" == typeof navigator && navigator) || void 0,
          ve = ge && (!ye || ["ReactNative", "NativeScript", "NS"].indexOf(ye.product) < 0),
          be = "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope && "function" == typeof self.importScripts,
          we = (ge && window.location.href) || "http://localhost",
          Ee = { ...e, ...me },
          Se = function (e) {
            function t(e, n, r, o) {
              let i = e[o++];
              if ("__proto__" === i) return !0;
              const a = Number.isFinite(+i),
                s = o >= e.length;
              return (
                (i = !i && Q.isArray(r) ? r.length : i),
                s
                  ? (Q.hasOwnProp(r, i) ? (r[i] = [r[i], n]) : (r[i] = n), !a)
                  : ((r[i] && Q.isObject(r[i])) || (r[i] = []),
                    t(e, n, r[i], o) &&
                      Q.isArray(r[i]) &&
                      (r[i] = (function (e) {
                        const t = {},
                          n = Object.keys(e);
                        let r;
                        const o = n.length;
                        let i;
                        for (r = 0; r < o; r++) (i = n[r]), (t[i] = e[i]);
                        return t;
                      })(r[i])),
                    !a)
              );
            }
            if (Q.isFormData(e) && Q.isFunction(e.entries)) {
              const n = {};
              return (
                Q.forEachEntry(e, (e, r) => {
                  t(
                    (function (e) {
                      return Q.matchAll(/\w+|\[(\w*)]/g, e).map((e) => ("[]" === e[0] ? "" : e[1] || e[0]));
                    })(e),
                    r,
                    n,
                    0
                  );
                }),
                n
              );
            }
            return null;
          },
          _e = {
            transitional: pe,
            adapter: ["xhr", "http", "fetch"],
            transformRequest: [
              function (e, t) {
                const n = t.getContentType() || "",
                  r = n.indexOf("application/json") > -1,
                  o = Q.isObject(e);
                if ((o && Q.isHTMLForm(e) && (e = new FormData(e)), Q.isFormData(e))) return r ? JSON.stringify(Se(e)) : e;
                if (Q.isArrayBuffer(e) || Q.isBuffer(e) || Q.isStream(e) || Q.isFile(e) || Q.isBlob(e) || Q.isReadableStream(e)) return e;
                if (Q.isArrayBufferView(e)) return e.buffer;
                if (Q.isURLSearchParams(e)) return t.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), e.toString();
                let i;
                if (o) {
                  if (n.indexOf("application/x-www-form-urlencoded") > -1)
                    return (function (e, t) {
                      return ae(
                        e,
                        new Ee.classes.URLSearchParams(),
                        Object.assign(
                          {
                            visitor: function (e, t, n, r) {
                              return Ee.isNode && Q.isBuffer(e) ? (this.append(t, e.toString("base64")), !1) : r.defaultVisitor.apply(this, arguments);
                            },
                          },
                          t
                        )
                      );
                    })(e, this.formSerializer).toString();
                  if ((i = Q.isFileList(e)) || n.indexOf("multipart/form-data") > -1) {
                    const t = this.env && this.env.FormData;
                    return ae(i ? { "files[]": e } : e, t && new t(), this.formSerializer);
                  }
                }
                return o || r
                  ? (t.setContentType("application/json", !1),
                    (function (e, t, n) {
                      if (Q.isString(e))
                        try {
                          return (0, JSON.parse)(e), Q.trim(e);
                        } catch (e) {
                          if ("SyntaxError" !== e.name) throw e;
                        }
                      return (0, JSON.stringify)(e);
                    })(e))
                  : e;
              },
            ],
            transformResponse: [
              function (e) {
                const t = this.transitional || _e.transitional,
                  n = t && t.forcedJSONParsing,
                  r = "json" === this.responseType;
                if (Q.isResponse(e) || Q.isReadableStream(e)) return e;
                if (e && Q.isString(e) && ((n && !this.responseType) || r)) {
                  const n = !(t && t.silentJSONParsing) && r;
                  try {
                    return JSON.parse(e);
                  } catch (e) {
                    if (n) {
                      if ("SyntaxError" === e.name) throw te.from(e, te.ERR_BAD_RESPONSE, this, null, this.response);
                      throw e;
                    }
                  }
                }
                return e;
              },
            ],
            timeout: 0,
            xsrfCookieName: "XSRF-TOKEN",
            xsrfHeaderName: "X-XSRF-TOKEN",
            maxContentLength: -1,
            maxBodyLength: -1,
            env: { FormData: Ee.classes.FormData, Blob: Ee.classes.Blob },
            validateStatus: function (e) {
              return e >= 200 && e < 300;
            },
            headers: { common: { Accept: "application/json, text/plain, */*", "Content-Type": void 0 } },
          };
        Q.forEach(["delete", "get", "head", "post", "put", "patch"], (e) => {
          _e.headers[e] = {};
        });
        const Oe = _e,
          Re = Q.toObjectSet([
            "age",
            "authorization",
            "content-length",
            "content-type",
            "etag",
            "expires",
            "from",
            "host",
            "if-modified-since",
            "if-unmodified-since",
            "last-modified",
            "location",
            "max-forwards",
            "proxy-authorization",
            "referer",
            "retry-after",
            "user-agent",
          ]),
          Ae = Symbol("internals");
        function Te(e) {
          return e && String(e).trim().toLowerCase();
        }
        function Ne(e) {
          return !1 === e || null == e ? e : Q.isArray(e) ? e.map(Ne) : String(e);
        }
        function Ie(e, t, n, r, o) {
          return Q.isFunction(r)
            ? r.call(this, t, n)
            : (o && (t = n), Q.isString(t) ? (Q.isString(r) ? -1 !== t.indexOf(r) : Q.isRegExp(r) ? r.test(t) : void 0) : void 0);
        }
        class je {
          constructor(e) {
            e && this.set(e);
          }
          set(e, t, n) {
            const r = this;
            function o(e, t, n) {
              const o = Te(t);
              if (!o) throw new Error("header name must be a non-empty string");
              const i = Q.findKey(r, o);
              (!i || void 0 === r[i] || !0 === n || (void 0 === n && !1 !== r[i])) && (r[i || t] = Ne(e));
            }
            const i = (e, t) => Q.forEach(e, (e, n) => o(e, n, t));
            if (Q.isPlainObject(e) || e instanceof this.constructor) i(e, t);
            else if (Q.isString(e) && (e = e.trim()) && !/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim()))
              i(
                ((e) => {
                  const t = {};
                  let n, r, o;
                  return (
                    e &&
                      e.split("\n").forEach(function (e) {
                        (o = e.indexOf(":")),
                          (n = e.substring(0, o).trim().toLowerCase()),
                          (r = e.substring(o + 1).trim()),
                          !n || (t[n] && Re[n]) || ("set-cookie" === n ? (t[n] ? t[n].push(r) : (t[n] = [r])) : (t[n] = t[n] ? t[n] + ", " + r : r));
                      }),
                    t
                  );
                })(e),
                t
              );
            else if (Q.isHeaders(e)) for (const [t, r] of e.entries()) o(r, t, n);
            else null != e && o(t, e, n);
            return this;
          }
          get(e, t) {
            if ((e = Te(e))) {
              const n = Q.findKey(this, e);
              if (n) {
                const e = this[n];
                if (!t) return e;
                if (!0 === t)
                  return (function (e) {
                    const t = Object.create(null),
                      n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
                    let r;
                    for (; (r = n.exec(e)); ) t[r[1]] = r[2];
                    return t;
                  })(e);
                if (Q.isFunction(t)) return t.call(this, e, n);
                if (Q.isRegExp(t)) return t.exec(e);
                throw new TypeError("parser must be boolean|regexp|function");
              }
            }
          }
          has(e, t) {
            if ((e = Te(e))) {
              const n = Q.findKey(this, e);
              return !(!n || void 0 === this[n] || (t && !Ie(0, this[n], n, t)));
            }
            return !1;
          }
          delete(e, t) {
            const n = this;
            let r = !1;
            function o(e) {
              if ((e = Te(e))) {
                const o = Q.findKey(n, e);
                !o || (t && !Ie(0, n[o], o, t)) || (delete n[o], (r = !0));
              }
            }
            return Q.isArray(e) ? e.forEach(o) : o(e), r;
          }
          clear(e) {
            const t = Object.keys(this);
            let n = t.length,
              r = !1;
            for (; n--; ) {
              const o = t[n];
              (e && !Ie(0, this[o], o, e, !0)) || (delete this[o], (r = !0));
            }
            return r;
          }
          normalize(e) {
            const t = this,
              n = {};
            return (
              Q.forEach(this, (r, o) => {
                const i = Q.findKey(n, o);
                if (i) return (t[i] = Ne(r)), void delete t[o];
                const a = e
                  ? (function (e) {
                      return e
                        .trim()
                        .toLowerCase()
                        .replace(/([a-z\d])(\w*)/g, (e, t, n) => t.toUpperCase() + n);
                    })(o)
                  : String(o).trim();
                a !== o && delete t[o], (t[a] = Ne(r)), (n[a] = !0);
              }),
              this
            );
          }
          concat(...e) {
            return this.constructor.concat(this, ...e);
          }
          toJSON(e) {
            const t = Object.create(null);
            return (
              Q.forEach(this, (n, r) => {
                null != n && !1 !== n && (t[r] = e && Q.isArray(n) ? n.join(", ") : n);
              }),
              t
            );
          }
          [Symbol.iterator]() {
            return Object.entries(this.toJSON())[Symbol.iterator]();
          }
          toString() {
            return Object.entries(this.toJSON())
              .map(([e, t]) => e + ": " + t)
              .join("\n");
          }
          get [Symbol.toStringTag]() {
            return "AxiosHeaders";
          }
          static from(e) {
            return e instanceof this ? e : new this(e);
          }
          static concat(e, ...t) {
            const n = new this(e);
            return t.forEach((e) => n.set(e)), n;
          }
          static accessor(e) {
            const t = (this[Ae] = this[Ae] = { accessors: {} }).accessors,
              n = this.prototype;
            function r(e) {
              const r = Te(e);
              t[r] ||
                ((function (e, t) {
                  const n = Q.toCamelCase(" " + t);
                  ["get", "set", "has"].forEach((r) => {
                    Object.defineProperty(e, r + n, {
                      value: function (e, n, o) {
                        return this[r].call(this, t, e, n, o);
                      },
                      configurable: !0,
                    });
                  });
                })(n, e),
                (t[r] = !0));
            }
            return Q.isArray(e) ? e.forEach(r) : r(e), this;
          }
        }
        je.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]),
          Q.reduceDescriptors(je.prototype, ({ value: e }, t) => {
            let n = t[0].toUpperCase() + t.slice(1);
            return {
              get: () => e,
              set(e) {
                this[n] = e;
              },
            };
          }),
          Q.freezeMethods(je);
        const Ce = je;
        function ke(e, t) {
          const n = this || Oe,
            r = t || n,
            o = Ce.from(r.headers);
          let i = r.data;
          return (
            Q.forEach(e, function (e) {
              i = e.call(n, i, o.normalize(), t ? t.status : void 0);
            }),
            o.normalize(),
            i
          );
        }
        function Pe(e) {
          return !(!e || !e.__CANCEL__);
        }
        function xe(e, t, n) {
          te.call(this, null == e ? "canceled" : e, te.ERR_CANCELED, t, n), (this.name = "CanceledError");
        }
        Q.inherits(xe, te, { __CANCEL__: !0 });
        const Be = xe;
        function De(e, t, n) {
          const r = n.config.validateStatus;
          n.status && r && !r(n.status)
            ? t(
                new te(
                  "Request failed with status code " + n.status,
                  [te.ERR_BAD_REQUEST, te.ERR_BAD_RESPONSE][Math.floor(n.status / 100) - 4],
                  n.config,
                  n.request,
                  n
                )
              )
            : e(n);
        }
        const Le = (e, t, n = 3) => {
            let r = 0;
            const o = (function (e, t) {
              e = e || 10;
              const n = new Array(e),
                r = new Array(e);
              let o,
                i = 0,
                a = 0;
              return (
                (t = void 0 !== t ? t : 1e3),
                function (s) {
                  const c = Date.now(),
                    u = r[a];
                  o || (o = c), (n[i] = s), (r[i] = c);
                  let f = a,
                    l = 0;
                  for (; f !== i; ) (l += n[f++]), (f %= e);
                  if (((i = (i + 1) % e), i === a && (a = (a + 1) % e), c - o < t)) return;
                  const d = u && c - u;
                  return d ? Math.round((1e3 * l) / d) : void 0;
                }
              );
            })(50, 250);
            return (function (e, t) {
              let n,
                r,
                o = 0,
                i = 1e3 / t;
              const a = (t, i = Date.now()) => {
                (o = i), (n = null), r && (clearTimeout(r), (r = null)), e.apply(null, t);
              };
              return [
                (...e) => {
                  const t = Date.now(),
                    s = t - o;
                  s >= i
                    ? a(e, t)
                    : ((n = e),
                      r ||
                        (r = setTimeout(() => {
                          (r = null), a(n);
                        }, i - s)));
                },
                () => n && a(n),
              ];
            })((n) => {
              const i = n.loaded,
                a = n.lengthComputable ? n.total : void 0,
                s = i - r,
                c = o(s);
              (r = i),
                e({
                  loaded: i,
                  total: a,
                  progress: a ? i / a : void 0,
                  bytes: s,
                  rate: c || void 0,
                  estimated: c && a && i <= a ? (a - i) / c : void 0,
                  event: n,
                  lengthComputable: null != a,
                  [t ? "download" : "upload"]: !0,
                });
            }, n);
          },
          Fe = (e, t) => {
            const n = null != e;
            return [(r) => t[0]({ lengthComputable: n, total: e, loaded: r }), t[1]];
          },
          Ue =
            (e) =>
            (...t) =>
              Q.asap(() => e(...t)),
          Me = Ee.hasStandardBrowserEnv
            ? (function () {
                const e = Ee.navigator && /(msie|trident)/i.test(Ee.navigator.userAgent),
                  t = document.createElement("a");
                let n;
                function r(n) {
                  let r = n;
                  return (
                    e && (t.setAttribute("href", r), (r = t.href)),
                    t.setAttribute("href", r),
                    {
                      href: t.href,
                      protocol: t.protocol ? t.protocol.replace(/:$/, "") : "",
                      host: t.host,
                      search: t.search ? t.search.replace(/^\?/, "") : "",
                      hash: t.hash ? t.hash.replace(/^#/, "") : "",
                      hostname: t.hostname,
                      port: t.port,
                      pathname: "/" === t.pathname.charAt(0) ? t.pathname : "/" + t.pathname,
                    }
                  );
                }
                return (
                  (n = r(window.location.href)),
                  function (e) {
                    const t = Q.isString(e) ? r(e) : e;
                    return t.protocol === n.protocol && t.host === n.host;
                  }
                );
              })()
            : function () {
                return !0;
              },
          qe = Ee.hasStandardBrowserEnv
            ? {
                write(e, t, n, r, o, i) {
                  const a = [e + "=" + encodeURIComponent(t)];
                  Q.isNumber(n) && a.push("expires=" + new Date(n).toGMTString()),
                    Q.isString(r) && a.push("path=" + r),
                    Q.isString(o) && a.push("domain=" + o),
                    !0 === i && a.push("secure"),
                    (document.cookie = a.join("; "));
                },
                read(e) {
                  const t = document.cookie.match(new RegExp("(^|;\\s*)(" + e + ")=([^;]*)"));
                  return t ? decodeURIComponent(t[3]) : null;
                },
                remove(e) {
                  this.write(e, "", Date.now() - 864e5);
                },
              }
            : { write() {}, read: () => null, remove() {} };
        function ze(e, t) {
          return e && !/^([a-z][a-z\d+\-.]*:)?\/\//i.test(t)
            ? (function (e, t) {
                return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e;
              })(e, t)
            : t;
        }
        const We = (e) => (e instanceof Ce ? { ...e } : e);
        function He(e, t) {
          t = t || {};
          const n = {};
          function r(e, t, n) {
            return Q.isPlainObject(e) && Q.isPlainObject(t)
              ? Q.merge.call({ caseless: n }, e, t)
              : Q.isPlainObject(t)
              ? Q.merge({}, t)
              : Q.isArray(t)
              ? t.slice()
              : t;
          }
          function o(e, t, n) {
            return Q.isUndefined(t) ? (Q.isUndefined(e) ? void 0 : r(void 0, e, n)) : r(e, t, n);
          }
          function i(e, t) {
            if (!Q.isUndefined(t)) return r(void 0, t);
          }
          function a(e, t) {
            return Q.isUndefined(t) ? (Q.isUndefined(e) ? void 0 : r(void 0, e)) : r(void 0, t);
          }
          function s(n, o, i) {
            return i in t ? r(n, o) : i in e ? r(void 0, n) : void 0;
          }
          const c = {
            url: i,
            method: i,
            data: i,
            baseURL: a,
            transformRequest: a,
            transformResponse: a,
            paramsSerializer: a,
            timeout: a,
            timeoutMessage: a,
            withCredentials: a,
            withXSRFToken: a,
            adapter: a,
            responseType: a,
            xsrfCookieName: a,
            xsrfHeaderName: a,
            onUploadProgress: a,
            onDownloadProgress: a,
            decompress: a,
            maxContentLength: a,
            maxBodyLength: a,
            beforeRedirect: a,
            transport: a,
            httpAgent: a,
            httpsAgent: a,
            cancelToken: a,
            socketPath: a,
            responseEncoding: a,
            validateStatus: s,
            headers: (e, t) => o(We(e), We(t), !0),
          };
          return (
            Q.forEach(Object.keys(Object.assign({}, e, t)), function (r) {
              const i = c[r] || o,
                a = i(e[r], t[r], r);
              (Q.isUndefined(a) && i !== s) || (n[r] = a);
            }),
            n
          );
        }
        const $e = (e) => {
            const t = He({}, e);
            let n,
              { data: r, withXSRFToken: o, xsrfHeaderName: i, xsrfCookieName: a, headers: s, auth: c } = t;
            if (
              ((t.headers = s = Ce.from(s)),
              (t.url = de(ze(t.baseURL, t.url), e.params, e.paramsSerializer)),
              c && s.set("Authorization", "Basic " + btoa((c.username || "") + ":" + (c.password ? unescape(encodeURIComponent(c.password)) : ""))),
              Q.isFormData(r))
            )
              if (Ee.hasStandardBrowserEnv || Ee.hasStandardBrowserWebWorkerEnv) s.setContentType(void 0);
              else if (!1 !== (n = s.getContentType())) {
                const [e, ...t] = n
                  ? n
                      .split(";")
                      .map((e) => e.trim())
                      .filter(Boolean)
                  : [];
                s.setContentType([e || "multipart/form-data", ...t].join("; "));
              }
            if (Ee.hasStandardBrowserEnv && (o && Q.isFunction(o) && (o = o(t)), o || (!1 !== o && Me(t.url)))) {
              const e = i && a && qe.read(a);
              e && s.set(i, e);
            }
            return t;
          },
          Je =
            "undefined" != typeof XMLHttpRequest &&
            function (e) {
              return new Promise(function (t, n) {
                const r = $e(e);
                let o = r.data;
                const i = Ce.from(r.headers).normalize();
                let a,
                  s,
                  c,
                  u,
                  f,
                  { responseType: l, onUploadProgress: d, onDownloadProgress: h } = r;
                function p() {
                  u && u(), f && f(), r.cancelToken && r.cancelToken.unsubscribe(a), r.signal && r.signal.removeEventListener("abort", a);
                }
                let m = new XMLHttpRequest();
                function g() {
                  if (!m) return;
                  const r = Ce.from("getAllResponseHeaders" in m && m.getAllResponseHeaders());
                  De(
                    function (e) {
                      t(e), p();
                    },
                    function (e) {
                      n(e), p();
                    },
                    {
                      data: l && "text" !== l && "json" !== l ? m.response : m.responseText,
                      status: m.status,
                      statusText: m.statusText,
                      headers: r,
                      config: e,
                      request: m,
                    }
                  ),
                    (m = null);
                }
                m.open(r.method.toUpperCase(), r.url, !0),
                  (m.timeout = r.timeout),
                  "onloadend" in m
                    ? (m.onloadend = g)
                    : (m.onreadystatechange = function () {
                        m && 4 === m.readyState && (0 !== m.status || (m.responseURL && 0 === m.responseURL.indexOf("file:"))) && setTimeout(g);
                      }),
                  (m.onabort = function () {
                    m && (n(new te("Request aborted", te.ECONNABORTED, e, m)), (m = null));
                  }),
                  (m.onerror = function () {
                    n(new te("Network Error", te.ERR_NETWORK, e, m)), (m = null);
                  }),
                  (m.ontimeout = function () {
                    let t = r.timeout ? "timeout of " + r.timeout + "ms exceeded" : "timeout exceeded";
                    const o = r.transitional || pe;
                    r.timeoutErrorMessage && (t = r.timeoutErrorMessage),
                      n(new te(t, o.clarifyTimeoutError ? te.ETIMEDOUT : te.ECONNABORTED, e, m)),
                      (m = null);
                  }),
                  void 0 === o && i.setContentType(null),
                  "setRequestHeader" in m &&
                    Q.forEach(i.toJSON(), function (e, t) {
                      m.setRequestHeader(t, e);
                    }),
                  Q.isUndefined(r.withCredentials) || (m.withCredentials = !!r.withCredentials),
                  l && "json" !== l && (m.responseType = r.responseType),
                  h && (([c, f] = Le(h, !0)), m.addEventListener("progress", c)),
                  d && m.upload && (([s, u] = Le(d)), m.upload.addEventListener("progress", s), m.upload.addEventListener("loadend", u)),
                  (r.cancelToken || r.signal) &&
                    ((a = (t) => {
                      m && (n(!t || t.type ? new Be(null, e, m) : t), m.abort(), (m = null));
                    }),
                    r.cancelToken && r.cancelToken.subscribe(a),
                    r.signal && (r.signal.aborted ? a() : r.signal.addEventListener("abort", a)));
                const y = (function (e) {
                  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
                  return (t && t[1]) || "";
                })(r.url);
                y && -1 === Ee.protocols.indexOf(y) ? n(new te("Unsupported protocol " + y + ":", te.ERR_BAD_REQUEST, e)) : m.send(o || null);
              });
            },
          Ve = (e, t) => {
            const { length: n } = (e = e ? e.filter(Boolean) : []);
            if (t || n) {
              let n,
                r = new AbortController();
              const o = function (e) {
                if (!n) {
                  (n = !0), a();
                  const t = e instanceof Error ? e : this.reason;
                  r.abort(t instanceof te ? t : new Be(t instanceof Error ? t.message : t));
                }
              };
              let i =
                t &&
                setTimeout(() => {
                  (i = null), o(new te(`timeout ${t} of ms exceeded`, te.ETIMEDOUT));
                }, t);
              const a = () => {
                e &&
                  (i && clearTimeout(i),
                  (i = null),
                  e.forEach((e) => {
                    e.unsubscribe ? e.unsubscribe(o) : e.removeEventListener("abort", o);
                  }),
                  (e = null));
              };
              e.forEach((e) => e.addEventListener("abort", o));
              const { signal: s } = r;
              return (s.unsubscribe = () => Q.asap(a)), s;
            }
          },
          Ke = function* (e, t) {
            let n = e.byteLength;
            if (!t || n < t) return void (yield e);
            let r,
              o = 0;
            for (; o < n; ) (r = o + t), yield e.slice(o, r), (o = r);
          },
          Ge = (e, t, n, r) => {
            const o = (async function* (e, t) {
              for await (const n of (async function* (e) {
                if (e[Symbol.asyncIterator]) return void (yield* e);
                const t = e.getReader();
                try {
                  for (;;) {
                    const { done: e, value: n } = await t.read();
                    if (e) break;
                    yield n;
                  }
                } finally {
                  await t.cancel();
                }
              })(e))
                yield* Ke(n, t);
            })(e, t);
            let i,
              a = 0,
              s = (e) => {
                i || ((i = !0), r && r(e));
              };
            return new ReadableStream(
              {
                async pull(e) {
                  try {
                    const { done: t, value: r } = await o.next();
                    if (t) return s(), void e.close();
                    let i = r.byteLength;
                    if (n) {
                      let e = (a += i);
                      n(e);
                    }
                    e.enqueue(new Uint8Array(r));
                  } catch (e) {
                    throw (s(e), e);
                  }
                },
                cancel: (e) => (s(e), o.return()),
              },
              { highWaterMark: 2 }
            );
          },
          Xe = "function" == typeof fetch && "function" == typeof Request && "function" == typeof Response,
          Qe = Xe && "function" == typeof ReadableStream,
          Ye =
            Xe &&
            ("function" == typeof TextEncoder
              ? ((Ze = new TextEncoder()), (e) => Ze.encode(e))
              : async (e) => new Uint8Array(await new Response(e).arrayBuffer()));
        var Ze;
        const et = (e, ...t) => {
            try {
              return !!e(...t);
            } catch (e) {
              return !1;
            }
          },
          tt =
            Qe &&
            et(() => {
              let e = !1;
              const t = new Request(Ee.origin, {
                body: new ReadableStream(),
                method: "POST",
                get duplex() {
                  return (e = !0), "half";
                },
              }).headers.has("Content-Type");
              return e && !t;
            }),
          nt = Qe && et(() => Q.isReadableStream(new Response("").body)),
          rt = { stream: nt && ((e) => e.body) };
        var ot;
        Xe &&
          ((ot = new Response()),
          ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((e) => {
            !rt[e] &&
              (rt[e] = Q.isFunction(ot[e])
                ? (t) => t[e]()
                : (t, n) => {
                    throw new te(`Response type '${e}' is not supported`, te.ERR_NOT_SUPPORT, n);
                  });
          }));
        const it = {
          http: null,
          xhr: Je,
          fetch:
            Xe &&
            (async (e) => {
              let {
                url: t,
                method: n,
                data: r,
                signal: o,
                cancelToken: i,
                timeout: a,
                onDownloadProgress: s,
                onUploadProgress: c,
                responseType: u,
                headers: f,
                withCredentials: l = "same-origin",
                fetchOptions: d,
              } = $e(e);
              u = u ? (u + "").toLowerCase() : "text";
              let h,
                p = Ve([o, i && i.toAbortSignal()], a);
              const m =
                p &&
                p.unsubscribe &&
                (() => {
                  p.unsubscribe();
                });
              let g;
              try {
                if (
                  c &&
                  tt &&
                  "get" !== n &&
                  "head" !== n &&
                  0 !==
                    (g = await (async (e, t) => {
                      const n = Q.toFiniteNumber(e.getContentLength());
                      return null == n
                        ? (async (e) => {
                            if (null == e) return 0;
                            if (Q.isBlob(e)) return e.size;
                            if (Q.isSpecCompliantForm(e)) {
                              const t = new Request(Ee.origin, { method: "POST", body: e });
                              return (await t.arrayBuffer()).byteLength;
                            }
                            return Q.isArrayBufferView(e) || Q.isArrayBuffer(e)
                              ? e.byteLength
                              : (Q.isURLSearchParams(e) && (e += ""), Q.isString(e) ? (await Ye(e)).byteLength : void 0);
                          })(t)
                        : n;
                    })(f, r))
                ) {
                  let e,
                    n = new Request(t, { method: "POST", body: r, duplex: "half" });
                  if ((Q.isFormData(r) && (e = n.headers.get("content-type")) && f.setContentType(e), n.body)) {
                    const [e, t] = Fe(g, Le(Ue(c)));
                    r = Ge(n.body, 65536, e, t);
                  }
                }
                Q.isString(l) || (l = l ? "include" : "omit");
                const o = "credentials" in Request.prototype;
                h = new Request(t, {
                  ...d,
                  signal: p,
                  method: n.toUpperCase(),
                  headers: f.normalize().toJSON(),
                  body: r,
                  duplex: "half",
                  credentials: o ? l : void 0,
                });
                let i = await fetch(h);
                const a = nt && ("stream" === u || "response" === u);
                if (nt && (s || (a && m))) {
                  const e = {};
                  ["status", "statusText", "headers"].forEach((t) => {
                    e[t] = i[t];
                  });
                  const t = Q.toFiniteNumber(i.headers.get("content-length")),
                    [n, r] = (s && Fe(t, Le(Ue(s), !0))) || [];
                  i = new Response(
                    Ge(i.body, 65536, n, () => {
                      r && r(), m && m();
                    }),
                    e
                  );
                }
                u = u || "text";
                let y = await rt[Q.findKey(rt, u) || "text"](i, e);
                return (
                  !a && m && m(),
                  await new Promise((t, n) => {
                    De(t, n, { data: y, headers: Ce.from(i.headers), status: i.status, statusText: i.statusText, config: e, request: h });
                  })
                );
              } catch (t) {
                if ((m && m(), t && "TypeError" === t.name && /fetch/i.test(t.message)))
                  throw Object.assign(new te("Network Error", te.ERR_NETWORK, e, h), { cause: t.cause || t });
                throw te.from(t, t && t.code, e, h);
              }
            }),
        };
        Q.forEach(it, (e, t) => {
          if (e) {
            try {
              Object.defineProperty(e, "name", { value: t });
            } catch (e) {}
            Object.defineProperty(e, "adapterName", { value: t });
          }
        });
        const at = (e) => `- ${e}`,
          st = (e) => Q.isFunction(e) || null === e || !1 === e,
          ct = (e) => {
            e = Q.isArray(e) ? e : [e];
            const { length: t } = e;
            let n, r;
            const o = {};
            for (let i = 0; i < t; i++) {
              let t;
              if (((n = e[i]), (r = n), !st(n) && ((r = it[(t = String(n)).toLowerCase()]), void 0 === r))) throw new te(`Unknown adapter '${t}'`);
              if (r) break;
              o[t || "#" + i] = r;
            }
            if (!r) {
              const e = Object.entries(o).map(
                ([e, t]) => `adapter ${e} ` + (!1 === t ? "is not supported by the environment" : "is not available in the build")
              );
              let n = t ? (e.length > 1 ? "since :\n" + e.map(at).join("\n") : " " + at(e[0])) : "as no adapter specified";
              throw new te("There is no suitable adapter to dispatch the request " + n, "ERR_NOT_SUPPORT");
            }
            return r;
          };
        function ut(e) {
          if ((e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)) throw new Be(null, e);
        }
        function ft(e) {
          return (
            ut(e),
            (e.headers = Ce.from(e.headers)),
            (e.data = ke.call(e, e.transformRequest)),
            -1 !== ["post", "put", "patch"].indexOf(e.method) && e.headers.setContentType("application/x-www-form-urlencoded", !1),
            ct(e.adapter || Oe.adapter)(e).then(
              function (t) {
                return ut(e), (t.data = ke.call(e, e.transformResponse, t)), (t.headers = Ce.from(t.headers)), t;
              },
              function (t) {
                return (
                  Pe(t) ||
                    (ut(e),
                    t && t.response && ((t.response.data = ke.call(e, e.transformResponse, t.response)), (t.response.headers = Ce.from(t.response.headers)))),
                  Promise.reject(t)
                );
              }
            )
          );
        }
        const lt = {};
        ["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
          lt[e] = function (n) {
            return typeof n === e || "a" + (t < 1 ? "n " : " ") + e;
          };
        });
        const dt = {};
        lt.transitional = function (e, t, n) {
          function r(e, t) {
            return "[Axios v1.7.7] Transitional option '" + e + "'" + t + (n ? ". " + n : "");
          }
          return (n, o, i) => {
            if (!1 === e) throw new te(r(o, " has been removed" + (t ? " in " + t : "")), te.ERR_DEPRECATED);
            return (
              t && !dt[o] && ((dt[o] = !0), console.warn(r(o, " has been deprecated since v" + t + " and will be removed in the near future"))),
              !e || e(n, o, i)
            );
          };
        };
        const ht = {
            assertOptions: function (e, t, n) {
              if ("object" != typeof e) throw new te("options must be an object", te.ERR_BAD_OPTION_VALUE);
              const r = Object.keys(e);
              let o = r.length;
              for (; o-- > 0; ) {
                const i = r[o],
                  a = t[i];
                if (a) {
                  const t = e[i],
                    n = void 0 === t || a(t, i, e);
                  if (!0 !== n) throw new te("option " + i + " must be " + n, te.ERR_BAD_OPTION_VALUE);
                } else if (!0 !== n) throw new te("Unknown option " + i, te.ERR_BAD_OPTION);
              }
            },
            validators: lt,
          },
          pt = ht.validators;
        class mt {
          constructor(e) {
            (this.defaults = e), (this.interceptors = { request: new he(), response: new he() });
          }
          async request(e, t) {
            try {
              return await this._request(e, t);
            } catch (e) {
              if (e instanceof Error) {
                let t;
                Error.captureStackTrace ? Error.captureStackTrace((t = {})) : (t = new Error());
                const n = t.stack ? t.stack.replace(/^.+\n/, "") : "";
                try {
                  e.stack ? n && !String(e.stack).endsWith(n.replace(/^.+\n.+\n/, "")) && (e.stack += "\n" + n) : (e.stack = n);
                } catch (e) {}
              }
              throw e;
            }
          }
          _request(e, t) {
            "string" == typeof e ? ((t = t || {}).url = e) : (t = e || {}), (t = He(this.defaults, t));
            const { transitional: n, paramsSerializer: r, headers: o } = t;
            void 0 !== n &&
              ht.assertOptions(
                n,
                {
                  silentJSONParsing: pt.transitional(pt.boolean),
                  forcedJSONParsing: pt.transitional(pt.boolean),
                  clarifyTimeoutError: pt.transitional(pt.boolean),
                },
                !1
              ),
              null != r &&
                (Q.isFunction(r) ? (t.paramsSerializer = { serialize: r }) : ht.assertOptions(r, { encode: pt.function, serialize: pt.function }, !0)),
              (t.method = (t.method || this.defaults.method || "get").toLowerCase());
            let i = o && Q.merge(o.common, o[t.method]);
            o &&
              Q.forEach(["delete", "get", "head", "post", "put", "patch", "common"], (e) => {
                delete o[e];
              }),
              (t.headers = Ce.concat(i, o));
            const a = [];
            let s = !0;
            this.interceptors.request.forEach(function (e) {
              ("function" == typeof e.runWhen && !1 === e.runWhen(t)) || ((s = s && e.synchronous), a.unshift(e.fulfilled, e.rejected));
            });
            const c = [];
            let u;
            this.interceptors.response.forEach(function (e) {
              c.push(e.fulfilled, e.rejected);
            });
            let f,
              l = 0;
            if (!s) {
              const e = [ft.bind(this), void 0];
              for (e.unshift.apply(e, a), e.push.apply(e, c), f = e.length, u = Promise.resolve(t); l < f; ) u = u.then(e[l++], e[l++]);
              return u;
            }
            f = a.length;
            let d = t;
            for (l = 0; l < f; ) {
              const e = a[l++],
                t = a[l++];
              try {
                d = e(d);
              } catch (e) {
                t.call(this, e);
                break;
              }
            }
            try {
              u = ft.call(this, d);
            } catch (e) {
              return Promise.reject(e);
            }
            for (l = 0, f = c.length; l < f; ) u = u.then(c[l++], c[l++]);
            return u;
          }
          getUri(e) {
            return de(ze((e = He(this.defaults, e)).baseURL, e.url), e.params, e.paramsSerializer);
          }
        }
        Q.forEach(["delete", "get", "head", "options"], function (e) {
          mt.prototype[e] = function (t, n) {
            return this.request(He(n || {}, { method: e, url: t, data: (n || {}).data }));
          };
        }),
          Q.forEach(["post", "put", "patch"], function (e) {
            function t(t) {
              return function (n, r, o) {
                return this.request(He(o || {}, { method: e, headers: t ? { "Content-Type": "multipart/form-data" } : {}, url: n, data: r }));
              };
            }
            (mt.prototype[e] = t()), (mt.prototype[e + "Form"] = t(!0));
          });
        const gt = mt;
        class yt {
          constructor(e) {
            if ("function" != typeof e) throw new TypeError("executor must be a function.");
            let t;
            this.promise = new Promise(function (e) {
              t = e;
            });
            const n = this;
            this.promise.then((e) => {
              if (!n._listeners) return;
              let t = n._listeners.length;
              for (; t-- > 0; ) n._listeners[t](e);
              n._listeners = null;
            }),
              (this.promise.then = (e) => {
                let t;
                const r = new Promise((e) => {
                  n.subscribe(e), (t = e);
                }).then(e);
                return (
                  (r.cancel = function () {
                    n.unsubscribe(t);
                  }),
                  r
                );
              }),
              e(function (e, r, o) {
                n.reason || ((n.reason = new Be(e, r, o)), t(n.reason));
              });
          }
          throwIfRequested() {
            if (this.reason) throw this.reason;
          }
          subscribe(e) {
            this.reason ? e(this.reason) : this._listeners ? this._listeners.push(e) : (this._listeners = [e]);
          }
          unsubscribe(e) {
            if (!this._listeners) return;
            const t = this._listeners.indexOf(e);
            -1 !== t && this._listeners.splice(t, 1);
          }
          toAbortSignal() {
            const e = new AbortController(),
              t = (t) => {
                e.abort(t);
              };
            return this.subscribe(t), (e.signal.unsubscribe = () => this.unsubscribe(t)), e.signal;
          }
          static source() {
            let e;
            return {
              token: new yt(function (t) {
                e = t;
              }),
              cancel: e,
            };
          }
        }
        const vt = yt,
          bt = {
            Continue: 100,
            SwitchingProtocols: 101,
            Processing: 102,
            EarlyHints: 103,
            Ok: 200,
            Created: 201,
            Accepted: 202,
            NonAuthoritativeInformation: 203,
            NoContent: 204,
            ResetContent: 205,
            PartialContent: 206,
            MultiStatus: 207,
            AlreadyReported: 208,
            ImUsed: 226,
            MultipleChoices: 300,
            MovedPermanently: 301,
            Found: 302,
            SeeOther: 303,
            NotModified: 304,
            UseProxy: 305,
            Unused: 306,
            TemporaryRedirect: 307,
            PermanentRedirect: 308,
            BadRequest: 400,
            Unauthorized: 401,
            PaymentRequired: 402,
            Forbidden: 403,
            NotFound: 404,
            MethodNotAllowed: 405,
            NotAcceptable: 406,
            ProxyAuthenticationRequired: 407,
            RequestTimeout: 408,
            Conflict: 409,
            Gone: 410,
            LengthRequired: 411,
            PreconditionFailed: 412,
            PayloadTooLarge: 413,
            UriTooLong: 414,
            UnsupportedMediaType: 415,
            RangeNotSatisfiable: 416,
            ExpectationFailed: 417,
            ImATeapot: 418,
            MisdirectedRequest: 421,
            UnprocessableEntity: 422,
            Locked: 423,
            FailedDependency: 424,
            TooEarly: 425,
            UpgradeRequired: 426,
            PreconditionRequired: 428,
            TooManyRequests: 429,
            RequestHeaderFieldsTooLarge: 431,
            UnavailableForLegalReasons: 451,
            InternalServerError: 500,
            NotImplemented: 501,
            BadGateway: 502,
            ServiceUnavailable: 503,
            GatewayTimeout: 504,
            HttpVersionNotSupported: 505,
            VariantAlsoNegotiates: 506,
            InsufficientStorage: 507,
            LoopDetected: 508,
            NotExtended: 510,
            NetworkAuthenticationRequired: 511,
          };
        Object.entries(bt).forEach(([e, t]) => {
          bt[t] = e;
        });
        const wt = bt,
          Et = (function e(t) {
            const n = new gt(t),
              r = s(gt.prototype.request, n);
            return (
              Q.extend(r, gt.prototype, n, { allOwnKeys: !0 }),
              Q.extend(r, n, null, { allOwnKeys: !0 }),
              (r.create = function (n) {
                return e(He(t, n));
              }),
              r
            );
          })(Oe);
        (Et.Axios = gt),
          (Et.CanceledError = Be),
          (Et.CancelToken = vt),
          (Et.isCancel = Pe),
          (Et.VERSION = "1.7.7"),
          (Et.toFormData = ae),
          (Et.AxiosError = te),
          (Et.Cancel = Et.CanceledError),
          (Et.all = function (e) {
            return Promise.all(e);
          }),
          (Et.spread = function (e) {
            return function (t) {
              return e.apply(null, t);
            };
          }),
          (Et.isAxiosError = function (e) {
            return Q.isObject(e) && !0 === e.isAxiosError;
          }),
          (Et.mergeConfig = He),
          (Et.AxiosHeaders = Ce),
          (Et.formToJSON = (e) => Se(Q.isHTMLForm(e) ? new FormData(e) : e)),
          (Et.getAdapter = ct),
          (Et.HttpStatusCode = wt),
          (Et.default = Et);
        const St = Et,
          _t = "pokeapi-js-wrapper-";
        function Ot(e, t) {
          return new Promise((n, r) => {
            o()
              .ready()
              .then(() => {
                o()
                  .getItem(`${_t}${t}`)
                  .then((o) => {
                    null === o
                      ? Rt(e, t)
                          .then((e) => {
                            n(e);
                          })
                          .catch((e) => {
                            r(e);
                          })
                      : n(addCacheMark(o));
                  })
                  .catch((o) => {
                    Rt(e, t)
                      .then((e) => {
                        n(e);
                      })
                      .catch((e) => {
                        r(e);
                      });
                  });
              })
              .catch((o) => {
                Rt(e, t)
                  .then((e) => {
                    n(e);
                  })
                  .catch((e) => {
                    r(e);
                  });
              });
          });
        }
        function Rt(e, t) {
          return new Promise((n, r) => {
            let i = { baseURL: `${e.protocol}://${e.hostName}/`, timeout: e.timeout };
            St.get(t, i)
              .then((i) => {
                i.status >= 400 ? r(i) : (e.cache && o().setItem(`${_t}${t}`, i.data), n(i.data));
              })
              .catch((e) => {
                r(e);
              });
          });
        }
        class At {
          constructor(e = {}) {
            (this.protocol = "https"),
              (this.hostName = "pokeapi.co"),
              (this.versionPath = "/api/v2/"),
              (this.offset = 0),
              (this.limit = 1e5),
              (this.timeout = 1e4),
              (this.cache = !0),
              (this.cacheImages = !1),
              e.hasOwnProperty("protocol") && (this.protocol = e.protocol),
              e.hasOwnProperty("hostName") && (this.hostName = e.hostName),
              e.hasOwnProperty("versionPath") && (this.versionPath = e.versionPath),
              e.hasOwnProperty("offset") && (this.offset = e.offset - 1),
              e.hasOwnProperty("limit") && (this.limit = e.limit),
              e.hasOwnProperty("timeout") && (this.timeout = e.timeout),
              e.hasOwnProperty("cache") && (this.cache = e.cache),
              e.hasOwnProperty("cacheImages") && (this.cacheImages = e.cacheImages);
          }
        }
        o().config({ name: "pokeapi-js-wrapper" });
        class Tt {
          constructor(e) {
            (this.config = new At(e)),
              i.forEach((e) => {
                const t = (function (e) {
                  return `${e[0]}By${(function ([e, ...t]) {
                    return e.toUpperCase() + t.join("").toLowerCase();
                  })(e[1])}`;
                })(e);
                (this[t] = (t) => {
                  if (t) {
                    if ("number" == typeof t || "string" == typeof t) return Ot(this.config, `${this.config.versionPath}${e[2].replace(":id", t)}`);
                    if ("object" == typeof t)
                      return Promise.all(
                        (function (e, t, n) {
                          return n.map((n) => Ot(e, `${e.versionPath}${t[2].replace(":id", n)}`));
                        })(this.config, e, t)
                      );
                  }
                }),
                  (this[
                    (function (e) {
                      return `${e[0]}`;
                    })(e)
                  ] = this[t]);
              }),
              a.forEach((e) => {
                const t = `${e[0]}List`;
                (this[t] = (t) => {
                  var n = this.config.limit,
                    r = this.config.offset;
                  return (
                    t && (t.hasOwnProperty("offset") && (r = t.offset), t.hasOwnProperty("limit") && (n = t.limit)),
                    Ot(this.config, `${this.config.versionPath}${e[1]}?limit=${n}&offset=${r}`)
                  );
                }),
                  (this[e[0]] = this[t]);
              }),
              this.config.cacheImages &&
                navigator &&
                window &&
                "serviceWorker" in navigator &&
                window.addEventListener("load", function () {
                  navigator.serviceWorker.register("./pokeapi-js-wrapper-sw.js", { scope: "./" }).catch((e) => {
                    console.log("Pokeapi-js-wrapper SW installation failed with the following error:"), console.error(e);
                  });
                });
          }
          getConfig() {
            return this.config;
          }
          getCacheLength() {
            return o().length();
          }
          clearCache() {
            return o().clear();
          }
          resource(e) {
            return "string" == typeof e ? Ot(this.config, e) : Array.isArray(e) ? Promise.all(e.map((e) => Ot(this.config, e))) : "String or Array is required";
          }
        }
      })(),
      r
    );
  })()
);
//# sourceMappingURL=index.js.map
