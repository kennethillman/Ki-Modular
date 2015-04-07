/////////////////////////////////////////////////////////////////////////////////////////////////////////
////// TOAST - ASYNC MODULAR LOADING WITH DEPENDENCIES HANDLING
/////////////////////////////////////////////////////////////////////////////////////////////////////////


/* 1kb - Modular load  - Async - https://github.com/pyrsmk/toast - MIT Licens - */
!function (a, b) { "undefined" != typeof module && module.exports ? module.exports = b() : "function" == typeof define && define.amd ? define(b) : a.toast = b() }(this, function () { var a = {}; return function () { var b, c = document, d = c.getElementsByTagName("head")[0], e = this.setTimeout, f = "createElement", g = "appendChild", h = "onreadystatechange", i = "styleSheet", j = 0, k = function () { --j }, l = function (a, c, f, g) { if (d) { if (a.length) { for (b = -1; f = a[++b];) { if ("function" == (g = typeof f)) { c = function () { return f(), !0 }; break } if ("string" == g) m(f); else if (f.pop) { m(f[0]), c = f[1]; break } } n(c, Array.prototype.slice.call(a, b + 1)) } } else e(function () { l(a) }, 10) }, m = function (b, e, l) { l = /(^.+\.\w+)(\?.*)?$/.exec(b)[1], a[l] || (a[l] = 1, ++j, /\.js$/.test(l) ? (e = c[f]("script"), e.src = b, d[g](e), null === e[h] ? e[h] = p : e.onload = k) : (e = c[f]("link"), e.rel = i, e.href = b, d[g](e), o(e))) }, n = function (a, b) { return j || a && !a() ? void e(function () { n(a, b) }, 10) : void l(b) }, o = function (a) { return a.sheet || a[i] ? void k() : void e(function () { o(a) }, 10) }, p = function () { /ded|co/.test(this.readyState) && k() }; l(arguments) } });


/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
////// FM - RW - FIRST STEPS
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////


(function (window, undefined) {

    console.log('fm.firstSteps');

    "use strict";

    // Scope set
 
    window.fm = window.fm || {};


    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////// FM - CUSTOM EVENTS
    /////////////////////////////////////////////////////////////////////////////////////////////////////////

    fm.listen = function (eventName, callback) {
        if (document.addEventListener) {
            document.addEventListener(eventName, callback, false);
        } else {
            document.documentElement.attachEvent('onpropertychange', function (e) {
                if (e.propertyName == eventName) {
                    callback();
                }
            });
        }
    };

    fm.trigger = function (eventName) {
        if (document.createEvent) {
            var event = document.createEvent('Event');
            event.initEvent(eventName, true, true);
            document.dispatchEvent(event);
        } else {
            document.documentElement[eventName]++;
        }
    };

   /* fm.test = function (msg) {
        alert(msg);
    };

    fm.test('Hello world'); */

    //fm.listen('coreLoaded', function() {
    //  console.log("coreLoaded vanilla");
    //});

    //fm.listen('compLoaded', function() {
    //  console.log("compLoaded vanilla");
    //});

    //fm.trigger('coreLoaded');
    //fm.trigger('compLoaded');

    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////// FM - IS MODERN BROWSER
    /////////////////////////////////////////////////////////////////////////////////////////////////////////


    fm.isModern = function () {
        if ('querySelector' in document
                    && 'addEventListener' in window
                    && 'localStorage' in window
                    && 'sessionStorage' in window
                    && 'bind' in Function
                    && (
                        ('XMLHttpRequest' in window && 'withCredentials' in new XMLHttpRequest())
                        || 'XDomainRequest' in window
                    )
                ) {
            return true;
        } else {
            return false;
        }
    }

    // Show value
    console.log("fm.isModern: " + fm.isModern());

    if (fm.isModern()) {

        var docClass = document.documentElement.className; // HTML tag

        // http://modernizr.com/download/#-svg
        function hasSvgSupport() {
            var ns = { 'svg': 'http://www.w3.org/2000/svg' };
            return !!document.createElementNS && !!document.createElementNS(ns.svg, 'svg').createSVGRect;
        }
        if (hasSvgSupport()) {
            docClass += ' svg';
        }

        document.documentElement.className = docClass.replace(/\bis-not-modern\b/g, 'is-modern');
    }






    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////// FM - GET META
    /////////////////////////////////////////////////////////////////////////////////////////////////////////


    // getMeta function: get a meta tag by name
    // NOTE: meta tag must be in the HTML source before this script is included in order to guarantee it'll be found
    fm.getMeta = function (metaname) {
        var metas = window.document.getElementsByTagName("meta");
        var meta;
        for (var i = 0; i < metas.length; i++) {
            if (metas[i].name && metas[i].name === metaname) {
                meta = metas[i];
                break;
            }
        }
        return meta;
    }



    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////// FM - LOAD CSS
    /////////////////////////////////////////////////////////////////////////////////////////////////////////


    fm.loadCSS = function (name) {
        var css = fm.getMeta(name);
        var cssURL = css.content;
        toast('' + cssURL + '');
    }

    if (fm.isModern()) {
        window.addEventListener('resize', loadCssMobilefirst);
    }


    // States for fire once handling
    var mfStateBig = false;
    var mfStateSmall = false;

    function loadCssMobilefirst() {

        var dw = document.documentElement.clientWidth;
        //console.log('re-width: ' + dw + '');

        if (dw >= 750 && fm.isModern()) {
            if (mfStateBig === false) {
                fm.loadCSS('cssBig');
                mfStateBig = true;
            }
            if (mfStateSmall === false) {
                fm.loadCSS('cssSmall');
                mfStateSmall = true;
            }
        } else {
            if (mfStateSmall === false) {
                fm.loadCSS('cssSmall');
                mfStateSmall = true;
            }
        }

    }

    fm.loadCSS('oldIndex');
    fm.loadCSS('oldModules');
    fm.loadCSS('oldSite');

   

    if (!fm.isModern()) {
        fm.loadCSS('notModern');
    } else {
        loadCssMobilefirst();
    }


    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////// FM - GET FONT FORMAT SUPPORT
    /////////////////////////////////////////////////////////////////////////////////////////////////////////

    fm.getFontFormatSupport = function (ua) {
        ua = ua.toLowerCase();
        var browserSupportsWoff2 = false,
            // for now only Chrome 36+ supports WOFF 2.0.
            woff2browsers = /Chrome\/([0-9]+)/i,
            chromeVersion;

        if (woff2browsers.test(ua)) {
            chromeVersion = parseInt(woff2browsers.exec(ua)[1], 10);

            if (chromeVersion >= 36) {
                browserSupportsWoff2 = true;
            }
        }

        if (browserSupportsWoff2) {
            return 'woff2';
        }

        if (ua.indexOf('android') > -1) {
            return 'ttf';
        }

        return 'woff';
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////// FM - LOAD FONTS
    /////////////////////////////////////////////////////////////////////////////////////////////////////////

    // FONT LOADING MOVE TO LATER/SECOND STEPS

    fm.loadFonts = function () {

        if (fm.isModern()) {



            /////

            var fonts = document.querySelectorAll("style.fmfont");
            var fontFormat = fm.getFontFormatSupport(navigator.userAgent);

            console.log("fm.fontModern: " + fontFormat);

            for (var i = 0, j = fonts.length; i < j; ++i) {
                var font = fonts[i],
                    fontPath = font.getAttribute('data-cache-file-' + fontFormat)
                toast(
                   fontPath
                );
            }

            /////

        } else {
            console.log("fm.fontNotModern: Fallback @font-face");
        }

    }

    fm.loadFonts();


}(this));


