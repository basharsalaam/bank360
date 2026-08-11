! function (e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports["@mono.co/connect.js"] = t() : e["@mono.co/connect.js"] = t()
}(this, (function () {
    return function (e) {
        var t = {};

        function n(o) {
            if (t[o]) return t[o].exports;
            var i = t[o] = {
                i: o,
                l: !1,
                exports: {}
            };
            return e[o].call(i.exports, i, i.exports, n), i.l = !0, i.exports
        }
        return n.m = e, n.c = t, n.d = function (e, t, o) {
            n.o(e, t) || Object.defineProperty(e, t, {
                enumerable: !0,
                get: o
            })
        }, n.r = function (e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                value: "Module"
            }), Object.defineProperty(e, "__esModule", {
                value: !0
            })
        }, n.t = function (e, t) {
            if (1 & t && (e = n(e)), 8 & t) return e;
            if (4 & t && "object" == typeof e && e && e.__esModule) return e;
            var o = Object.create(null);
            if (n.r(o), Object.defineProperty(o, "default", {
                    enumerable: !0,
                    value: e
                }), 2 & t && "string" != typeof e)
                for (var i in e) n.d(o, i, function (t) {
                    return e[t]
                }.bind(null, i));351
            return o
        }, n.n = function (e) {
            var t = e && e.__esModule ? function () {
                return e.default
            } : function () {
                return e
            };
            return n.d(t, "a", t), t
        }, n.o = function (e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }, n.p = "", n(n.s = 1)
    }([function (e, t, n) {
        "use strict";
        e.exports = () => {
            function e() {
                let e = document.createElement("div"),
                    t = document.createElement("div");
                e.setAttribute("id", "mono-connect-app-loader"), e.classList.add("app-loader"), t.classList.add("app-loader__spinner");
                for (let e = 0; e < 12; e++) {
                    let e = document.createElement("div");
                    t.appendChild(e)
                }
                return e.appendChild(t), e
            }
            return {
                openWidget: function () {
                    var e = document.getElementById("mono-connect--widget-div"),
                        t = document.getElementById("mono-connect-app-loader"),
                        n = document.getElementById("mono-connect--frame-id");
                    e.style.visibility = "visible", e.style.display = "flex", t.style.display = "block", setTimeout(() => {
                        ! function () {
                            var e = document.getElementById("mono-connect--widget-div"),
                                t = document.getElementById("mono-connect--frame-id");
                            e.style.display = "flex", t.style.display = "block", e.style.visibility = "visible", t.style.visibility = "visible"
                        }(), n.focus({
                            preventScroll: !1
                        }), e.focus({
                            preventScroll: !1
                        });
                        let t = new Event("message"),
                            o = {
                                type: "mono.connect.widget_opened",
                                data: {
                                    timestamp: Date.now()
                                }
                            };
                        t.data = Object.assign({}, o), window.dispatchEvent(t)
                    }, 2e3)
                },
                closeWidget: function () {
                    var e, t;
                    e = document.getElementById("mono-connect--widget-div"), t = document.getElementById("mono-connect--frame-id"), e.style.display = "none", t.style.display = "none", e.style.visibility = "hidden", t.style.visibility = "hidden"
                },
                createLoader: e,
                addStyle: function () {
                    let e = document.createElement("style");
                    e.type = "text/css", e.innerText = a, document.head.appendChild(e)
                },
                init: function (t) {
                    document.getElementById("mono-connect--widget-div") && document.getElementById("mono-connect--frame-id") && document.getElementById("mono-connect--widget-div").remove();
                    const {
                        key: n,
                        onload: a,
                        qs: r,
                        onevent: d
                    } = t, s = ["data"];
                    var c = new URL("https://connect.withmono.com");
                    c.searchParams.set("key", n), c.searchParams.set("referrer", window.location.href), c.searchParams.set("version", "2021-06-03"), Object.keys(r).map(e => {
                        if (s.includes(e)) {
                            const t = encodeURIComponent(JSON.stringify(r[e]));
                            return c.searchParams.set(e, t)
                        }
                        c.searchParams.set(e, r[e])
                    });
                    var l = document.createElement("div");
                    l.setAttribute("id", "mono-connect--widget-div"), l.setAttribute("style", o), document.body.insertBefore(l, document.body.childNodes[0]);
                    var p = document.createElement("IFRAME");
                    p.setAttribute("src", "" + c.href), p.setAttribute("style", i), p.setAttribute("id", "mono-connect--frame-id"), p.setAttribute("allowfullscreen", "true"), p.setAttribute("frameborder", 0), p.setAttribute("title", "Mono connect"), p.setAttribute("sandbox", "allow-forms allow-scripts allow-same-origin allow-top-navigation-by-user-activation allow-popups"), p.onload = function () {
                        var e = document.getElementById("mono-connect-app-loader");
                        "visible" === p.style.visibility && (e.style.display = "none"), a();
                        let t = new Event("message"),
                            n = {
                                type: "mono.connect.widget_loaded",
                                data: {
                                    timestamp: Date.now()
                                }
                            };
                        t.data = Object.assign({}, n), window.dispatchEvent(t), d("LOADED", t.data.data)
                    };
                    var m = e();
                    document.getElementById("mono-connect--widget-div").appendChild(m), document.getElementById("mono-connect--widget-div").appendChild(p)
                }
            }
        };
        const o = "position:fixed;overflow: hidden;display: none;justify-content: center;align-items: center;z-index: 999999999;height: 100%;width: 100%;color: transparent;background: rgba(0, 0, 0, 0.6);visibility:hidden;margin: 0;top:0;right:0;bottom:0;left:0;",
            i = "position: fixed;display: none;overflow: hidden;z-index: 999999999;width: 100%;height: 100%;transition: opacity 0.3s ease 0s;visibility:hidden;margin: 0;top:0;right:0;bottom:0;left:0;",
            a = ".app-loader {\n  text-align: center;\n  color: white;\n  margin-right: -30px;\n  width: 100%;\n  position: fixed;\n}\n\n@-webkit-keyframes app-loader__spinner {\n  0% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0;\n  }\n}\n\n.app-loader__spinner {\n  position: relative;\n  display: inline-block;\n  width: fit-content;\n}\n\n.app-loader__spinner div {\n  position: absolute;\n  -webkit-animation: app-loader__spinner linear 1s infinite;\n  animation: app-loader__spinner linear 1s infinite;\n  background: white;\n  width: 10px;\n  height: 30px;\n  border-radius: 40%;\n  -webkit-transform-origin: 5px 65px;\n  transform-origin: 5px 65px;\n}\n\n.app-loader__spinner div:nth-child(1) {\n  -webkit-transform: rotate(0deg);\n  transform: rotate(0deg);\n  -webkit-animation-delay: -0.916666666666667s;\n  animation-delay: -0.916666666666667s;\n}\n\n.app-loader__spinner div:nth-child(2) {\n  -webkit-transform: rotate(30deg);\n  transform: rotate(30deg);\n  -webkit-animation-delay: -0.833333333333333s;\n  animation-delay: -0.833333333333333s;\n}\n\n.app-loader__spinner div:nth-child(3) {\n  -webkit-transform: rotate(60deg);\n  transform: rotate(60deg);\n  -webkit-animation-delay: -0.75s;\n  animation-delay: -0.75s;\n}\n\n.app-loader__spinner div:nth-child(4) {\n  -webkit-transform: rotate(90deg);\n  transform: rotate(90deg);\n  -webkit-animation-delay: -0.666666666666667s;\n  animation-delay: -0.666666666666667s;\n}\n\n.app-loader__spinner div:nth-child(5) {\n  -webkit-transform: rotate(120deg);\n  transform: rotate(120deg);\n  -webkit-animation-delay: -0.583333333333333s;\n  animation-delay: -0.583333333333333s;\n}\n\n.app-loader__spinner div:nth-child(6) {\n  -webkit-transform: rotate(150deg);\n  transform: rotate(150deg);\n  -webkit-animation-delay: -0.5s;\n  animation-delay: -0.5s;\n}\n\n.app-loader__spinner div:nth-child(7) {\n  -webkit-transform: rotate(180deg);\n  transform: rotate(180deg);\n  -webkit-animation-delay: -0.416666666666667s;\n  animation-delay: -0.416666666666667s;\n}\n\n.app-loader__spinner div:nth-child(8) {\n  -webkit-transform: rotate(210deg);\n  transform: rotate(210deg);\n  -webkit-animation-delay: -0.333333333333333s;\n  animation-delay: -0.333333333333333s;\n}\n\n.app-loader__spinner div:nth-child(9) {\n  -webkit-transform: rotate(240deg);\n  transform: rotate(240deg);\n  -webkit-animation-delay: -0.25s;\n  animation-delay: -0.25s;\n}\n\n.app-loader__spinner div:nth-child(10) {\n  -webkit-transform: rotate(270deg);\n  transform: rotate(270deg);\n  -webkit-animation-delay: -0.166666666666667s;\n  animation-delay: -0.166666666666667s;\n}\n\n.app-loader__spinner div:nth-child(11) {\n  -webkit-transform: rotate(300deg);\n  transform: rotate(300deg);\n  -webkit-animation-delay: -0.083333333333333s;\n  animation-delay: -0.083333333333333s;\n}\n\n.app-loader__spinner div:nth-child(12) {\n  -webkit-transform: rotate(330deg);\n  transform: rotate(330deg);\n  -webkit-animation-delay: 0s;\n  animation-delay: 0s;\n}\n\n.app-loader__spinner {\n  -webkit-transform: translate(-20px, -20px) scale(0.2) translate(20px, 20px);\n  transform: translate(-20px, -20px) scale(0.2) translate(20px, 20px);\n}\n"
    }, function (e, t, n) {
        n(0), e.exports = n(2)
    }, function (e, t, n) {
        "use strict";
        var o = n(0);
        const i = () => {},
            a = e => {
                throw new Error(e + " is required")
            };

        function r({
            key: e,
            onClose: t = i,
            onSuccess: n,
            onLoad: d = i,
            onEvent: s = i,
            ...c
        }) {
            if ("object" != typeof arguments[0] && (console.warn("DEPRECATED: MONO CONNECT EXPECTED 1 ARGUMENT, BUT GOT " + arguments.length), e = arguments[0] || a("PUBLIC_KEY"), t = arguments[1].onClose || i, n = arguments[1].onSuccess || a("onSuccess callback"), d = arguments[1].onLoad || i, c = {}), !(this instanceof r)) return new r({
                key: e,
                onClose: t,
                onSuccess: n,
                onLoad: d,
                onEvent: s,
                ...c
            });
            this.key = e || a("PUBLIC_KEY"), this.config = {
                ...c
            }, r.prototype.onLoad = d, r.prototype.onClose = t, r.prototype.onSuccess = n || a("onSuccess callback"), r.prototype.onEvent = s, r.prototype.utils = o()
        }
        r.prototype.setup = function () {
            r.prototype.utils.addStyle(), r.prototype.utils.init({
                key: this.key,
                qs: this.config,
                onload: this.onLoad,
                onevent: this.onEvent
            })
        }, r.prototype.reauthorise = function (e) {
            if (!e) throw new Error("Re-auth token is required for reauthorisation");
            r.prototype.utils.addStyle(), r.prototype.utils.init({
                key: this.key,
                qs: {
                    ...this.config,
                    reauth_token: e
                },
                onload: this.onLoad,
                onevent: this.onEvent
            })
        }, r.prototype.open = function () {
            r.prototype.utils.openWidget(), r.prototype.eventHandler = function (e) {
                switch (e.data.type) {
                    case "mono.connect.widget.account_linked":
                        this.onSuccess({
                            ...e.data.data
                        }), this.onEvent("SUCCESS", e.data.data), r.prototype.close();
                        break;
                    case "mono.connect.widget.closed":
                        r.prototype.close();
                        break;
                    case "mono.connect.widget_opened":
                        this.onEvent("OPENED", e.data.data);
                        break;
                    case "mono.connect.error_occured":
                        this.onEvent("ERROR", e.data.data);
                        break;
                    case "mono.connect.institution_selected":
                        this.onEvent("INSTITUTION_SELECTED", e.data.data);
                        break;
                    case "mono.connect.auth_method_switched":
                        this.onEvent("AUTH_METHOD_SWITCHED", e.data.data);
                        break;
                    case "mono.connect.on_exit":
                        this.onEvent("EXIT", e.data.data);
                        break;
                    case "mono.connect.login_attempt":
                        this.onEvent("SUBMIT_CREDENTIALS", e.data.data);
                        break;
                    case "mono.connect.mfa_submitted":
                        this.onEvent("SUBMIT_MFA", e.data.data);
                        break;
                    case "mono.connect.account_linked":
                        this.onEvent("ACCOUNT_LINKED", e.data.data);
                        break;
                    case "mono.connect.account_selected":
                        this.onEvent("ACCOUNT_SELECTED", e.data.data)
                }
            }.bind(this), window.addEventListener("message", this.eventHandler, !1)
        }, r.prototype.close = function () {
            window.removeEventListener("message", this.eventHandler, !1), r.prototype.utils.closeWidget(), this.onClose()
        }, "undefined" != typeof window && (window.Connect = r), e.exports = r
    }])
}));