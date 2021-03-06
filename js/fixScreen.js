window.mobileUtil = function(e, i) {
    var t = navigator.userAgent
      , n = /android|adr/gi.test(t)
      , s = /iphone|ipod|ipad/gi.test(t) && !n
      , a = n || s;
    return {
        isAndroid: n,
        isIos: s,
        isMobile: a,
        isNewsApp: /NewsApp\/[\d\.]+/gi.test(t),
        isWeixin: /MicroMessenger/gi.test(t),
        isQQ: /QQ\/\d/gi.test(t),
        isYixin: /YiXin/gi.test(t),
        isWeibo: /Weibo/gi.test(t),
        isTXWeibo: /T(?:X|encent)MicroBlog/gi.test(t),
        tapEvent: a ? "tap" : "click",
        useREM: !1,
        fixScreen: function() {
            function t(e) {
                return "initial-scale=" + e + ",maximum-scale=" + e + ",minimum-scale=" + e + ",user-scalable=no"
            }
            this.useREM = !0;
            var n, a = i.documentElement, o = a.dataset.mw || 750, r = s ? Math.min(e.devicePixelRatio, 3) : 1, d = 1 / r;
            a.removeAttribute("data-mw"),
            a.dataset.dpr = r,
            metaEl = i.createElement("meta"),
            metaEl.name = "viewport",
            metaEl.content = t(d),
            a.firstElementChild.appendChild(metaEl);
            var l = function() {
                var e = a.getBoundingClientRect().width;
                e / r > o && (e = o * r);
                var i = e / 7.2;
                a.style.fontSize = i + "px"
            }
            ;
            e.addEventListener("resize", function() {
                clearTimeout(n),
                n = setTimeout(l, 300)
            }, !1),
            e.addEventListener("pageshow", function(e) {
                e.persisted && (clearTimeout(n),
                n = setTimeout(l, 300))
            }, !1),
            l()
        }
    }
}(window, document),
mobileUtil.fixScreen();
