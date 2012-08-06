﻿(function () {   
    var util = {
        toString: function (o) { return Object.prototype.toString.call(o); },
        isArray:  function (o) { return this.toString(o) === '[object Array]'; },
        isString: function (o) { return this.toString(o) === '[object String]'; },
        map: function (arr, fn) {
            for (var i = 0; i < arr.length; i++) {
                arr[i] = fn(arr[i]);
            }
            return arr;
        },
        pad: function (str, length, padding) {
            while (str.length < length) {
                str = padding + str;
            }
            return str;
        }
    };

    this.Color = function (color) {
        this.set(color);
    };

    Color.prototype = {
        rgba: [],
        getRgb: function () {
            var rgba = this.getRgba();
            if (rgba) {
                return rgba.slice(0, 3);
            } else {
                return null;
            }
        },
        getRgba: function () {
            return this.rgba || null;
        },
        getHex: function (withHash) {
            var rgb = this.getRgb();
            return rgb === null ? null : ((withHash === true ? "#" : "") + this.rgbToHex(rgb));
        },
        getHsv: function () {
            var rgb = this.getRgb();
            return rgb === null ? null : this.rgbToHsv(rgb);
        },
        set: function (obj) {
            /*
            /   Method that saves the passed color as hsv, rgb, rgba, and hex.
            /   hsv:  [0.0-1.0, 0.0-1.0, 0.0-1.0]
            /   rgb:  [0-255, 0-255, 0-255]
            /   rgba: [0-255, 0-255, 0-255, 0.0-1.0]
            /   hex:  "#aaa", "#aaaaaa", "aaa", or "aaaaaa"
            */
            if (obj && (obj.hsv || obj.rgb || obj.rgba || obj.hex)) {
                if (obj.hsv) {
                    this.rgba = this.hsvToRgba(obj.hsv);
                } else if (obj.rgb) {
                    this.rgba = this.rgbToRgba(obj.rgb);
                } else if (obj.rgba) {
                    this.rgba = obj.rgba;
                } else if (obj.hex) {
                    this.rgba = this.hexToRgba(obj.hex);
                }
            } else if (util.isArray(obj)) {
                // if obj is an array, we treat it as rgb or rgba
                this.rgba = this.rgbToRgba(obj);
            } else if (util.isString(obj)) {
                // if obj is a string, we treat it as hex unless in the format rgb(#,#,#) or rgba(#,#,#,#)
                if (obj[0] == "r") {
                    // this is an rgb(a) string
                    if (obj[3] != "a") {
                        this.rgba = util.map(this.rgbToRgba(obj.substring(4, obj.length - 1).split(",")), function (v) { return +v; });
                    } else {
                        this.rgba = util.map(obj.substring(5, obj.length - 1).split(","), function (v) { return +v; });
                    }
                } else {
                    // this is a hex string
                    this.rgba = this.hexToRgba(obj);
                }
            } else {
                this.rgba = [255, 255, 255, 1.0]; // if nothing is specified, return white
            }
            return this;
        },
        hsvToRgba: function (hsv) {
            var r, g, b,
                h = hsv[0],
                s = hsv[1],
                v = hsv[2],
                i = Math.floor(h * 6),
                f = h * 6 - i,
                p = v * (1 - s),
                q = v * (1 - f * s),
                t = v * (1 - (1 - f) * s);

            switch (i % 6) {
                case 0: r = v, g = t, b = p; break;
                case 1: r = q, g = v, b = p; break;
                case 2: r = p, g = v, b = t; break;
                case 3: r = p, g = q, b = v; break;
                case 4: r = t, g = p, b = v; break;
                case 5: r = v, g = p, b = q; break;
            }

            return [Math.floor(r * 255), Math.floor(g * 255), Math.floor(b * 255), 1];
        },
        rgbToHsv: function (rgb) {
            var r = rgb[0]/255,
                g = rgb[1]/255,
                b = rgb[2]/255,
                max = Math.max(r, g, b),
                min = Math.min(r, g, b),
                h = 0,
                v = max,
                d = max - min,
                s = max == 0 ? 0 : d / max;

            if(max == min){
                h = 0; // achromatic
            }else{
                switch(max){
                    case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                    case g: h = (b - r) / d + 2; break;
                    case b: h = (r - g) / d + 4; break;
                }
                h /= 6;
            }

            return [h, s, v];
        },
        rgbToHex: function(rgb) {
            return util.pad(rgb[0].toString(16), 2, "0") + 
                   util.pad(rgb[1].toString(16), 2, "0") +
                   util.pad(rgb[2].toString(16), 2, "0");
        },
        hexToRgba: function (hex) {
            hex = this.fixHex(hex);
            return [parseInt(hex.substr(0, 2), 16), 
                    parseInt(hex.substr(2, 2), 16), 
                    parseInt(hex.substr(4, 2), 16)];
        },
        rgbToRgba: function (rgb) {
            if (rgb.length == 3) {
                rgb.push(1.0);
            }
            return rgb;
        },
        rgbaToRgb: function (rgba) {
            rgba.pop();
            return rgba;
        },
        fixHex: function (hex) {
            hex = (hex[0] == "#" ? hex.substring(1) : hex); // remove # if it's there

            // if the length is 3 (e.g., ABA), return the 6 digit form (e.g., AABBAA)
            return hex.length == 3 ? (hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]) : hex;
        }
    };
}).call(this);

//ColorTests = (function () {
//    window.color = new Color({ hex: "fff" });
//    console.log("white: ", color.getHex(), color.getHsv(), color.getRgb(), color.getRgba());
//    color.set("ffffff");
//    console.log("white: ", color.getHex(), color.getHsv(), color.getRgb(), color.getRgba());
//    color.set("rgb(255,0,0)");
//    console.log("red: ", color.getHex(), color.getHsv(), color.getRgb(), color.getRgba());
//    color.set("rgb(255,0,0, 0.5)");
//    console.log("half red: ", color.getHex(), color.getHsv(), color.getRgb(), color.getRgba());
//    color.set([0, 0, 0, 0.5]);
//    console.log("half black: ", color.getHex(), color.getHsv(), color.getRgb(), color.getRgba());
//    color.set([0,0,0]);
//    console.log("black: ", color.getHex(), color.getHsv(), color.getRgb(), color.getRgba());
//    color.set({ hsv: color.getHsv() });
//    console.log("black: ", color.getHex(), color.getHsv(), color.getRgb(), color.getRgba());
//    color.set({ rgb: color.getRgb() });
//    console.log("black: ", color.getHex(), color.getHsv(), color.getRgb(), color.getRgba());
//    color.set({ rgba: [0,255,0,0.5] });
//    console.log("half lime: ", color.getHex(), color.getHsv(), color.getRgb(), color.getRgba());
//})();