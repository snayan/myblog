/**
 * Created by zhangyang on 8/29/16.
 */

"undefined" == typeof requestAnimationFrame && (requestAnimationFrame = "undefined" != typeof window && (window.msRequestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.oRequestAnimationFrame) || function (e) {
        return setTimeout(e, 17)
    }), 
    function (e, n) {
    "object" == typeof exports && "undefined" != typeof module ? n(exports) : "function" == typeof define && define.amd ? define(["exports"], n) : n(e.timer = {})
}(this, function (e) {
    "use strict";
    function n() {
        r = m = 0, c = 1 / 0, t(u())
    }

    function t(e) {
        if (!r) {
            var t = e - Date.now();
            t > 24 ? c > e && (m && clearTimeout(m), m = setTimeout(n, t), c = e) : (m && (m = clearTimeout(m), c = 1 / 0), r = requestAnimationFrame(n))
        }
    }

    function i(e, n, i) {
        i = null == i ? Date.now() : +i, null != n && (i += +n);
        var o = {callback: e, time: i, flush: !1, next: null};
        a ? a.next = o : f = o, a = o, t(i)
    }

    function o(e, n, t) {
        t = null == t ? Date.now() : +t, null != n && (t += +n), l.callback = e, l.time = t
    }

    function u(e) {
        e = null == e ? Date.now() : +e;
        var n = l;
        for (l = f; l;)e >= l.time && (l.flush = l.callback(e - l.time, e)), l = l.next;
        l = n, e = 1 / 0;
        for (var t, i = f; i;)i.flush ? i = t ? t.next = i.next : f = i.next : (i.time < e && (e = i.time), i = (t = i).next);
        return a = t, e
    }

    var a, m, r, f, l, c = 1 / 0;
    e.timer = i, e.timerReplace = o, e.timerFlush = u
});

