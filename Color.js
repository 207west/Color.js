 /*!
 * Color.js
 * Javascript class for working with colors.
 *
 * by Adam Drago
 */

(function () {   
    this.Color = function (color) {
        this.set(color);
    };

    Color.prototype = {
        hsva: [],
        getRgb: function () {
            var hsv = this.getHsv();
            return hsv === null ? null : hsvToRgb(hsv);
        },
        getRgba: function () {
            var hsva = this.getHsva();
            return hsva === null ? null : hsvaToRgba(hsva);
        },
        getHex: function (withHash) {
            var hsv = this.getHsv(),
                hex = hsv === null ? null : hsvToHex(hsv); 

            if (hex && withHash) {
                hex = '#' + hex;
            }

            return hex;
        },
        getHsv: function () {
            var hsva = this.hsva;
            return hsva === null ? null : hsva.slice(0, 3);
        },
        getHsva: function () {
            return this.hsva || null;
        },
        set: function (obj) {
            /*
            /   Method that saves the passed color as hsv, rgb, rgba, and hex.
            /   hsv:  [0.0-1.0, 0.0-1.0, 0.0-1.0]
            /   rgb:  [0-255, 0-255, 0-255]
            /   rgba: [0-255, 0-255, 0-255, 0.0-1.0]
            /   hex:  "#aaa", "#aaaaaa", "aaa", or "aaaaaa"
            */
            if (obj && (obj.hsv || obj.hsva || obj.rgb || obj.rgba || obj.hex)) {
                if (obj.hsv) {
                    this.hsva = hsvToHsva(obj.hsv);
                } else if (obj.hsva) {
                    this.hsva = obj.hsva;
                } else if (obj.rgb) {
                    this.hsva = rgbToHsva(obj.rgb);
                } else if (obj.rgba) {
                    this.hsva = rgbaToHsva(obj.rgba);
                } else if (obj.hex) {
                    this.hsva = hexToHsva(obj.hex);
                }
            } else if (isArray(obj)) {
                // if obj is an array, we treat it as rgb or rgba
                if (obj.length === 3) {
                    this.hsva = rgbToHsva(obj);
                } else {
                    this.hsva = rgbaToHsva(obj);
                }
            } else if (isString(obj)) {
                // if obj is a string, we check if it's a named color, if not, then treat it as hex unless in the format rgb(#,#,#) or rgba(#,#,#,#)
                if (colorNames[obj]) {
                    this.hsva = nameToHsva(obj);
                } else {
                    if (obj[0] == "r") {
                        // this is an rgb(a) string
                        if (obj[3] != "a") {
                            this.hsva = rgbaToHsva(map(rgbToRgba(obj.substring(4, obj.length - 1).split(",")), function (v) { return +v; }));
                        } else {
                            this.hsva = rgbaToHsva(map(obj.substring(5, obj.length - 1).split(","), function (v) { return +v; }));
                        }
                    } else {
                        // this is a hex string
                        this.hsva = hexToHsva(obj);
                    }
                }
            } else {
                this.hsva = [0, 0, 0, 0]; // if nothing is specified, return transparent black
            }
            return this;
        }
    };

    // Local helper functions
    var MathFloor = function (n) {
            return n | n;
        },
        MathMin = function () {
            var min = arguments[0];

            for (var i = arguments.length - 1; i > 0; i--) {
                var arg = arguments[i];
                
                if (arg < min) {
                    min = arg;
                }
            }

            return min;
        },
        MathMax = function () {
            var max = arguments[0];

            for (var i = arguments.length - 1; i > 0; i--) {
                var arg = arguments[i];
                
                if (arg > max) {
                    max = arg;
                }
            }

            return max;
        },
        toString = function (o) {
            return Object.prototype.toString.call(o);
        },
        isArray = function (o) {
            return toString(o) === '[object Array]';
        },
        isString = function (o) {
            return toString(o) === '[object String]';
        },
        isUndefined = function (o) {
            return o === void 0;
        },
        map = function (arr, fn) {
            for (var i = 0; i < arr.length; i++) {
                arr[i] = fn(arr[i]);
            }
            return arr;
        },
        pad = function (str, length, padding) {
            while (str.length < length) {
                str = padding + str;
            }
            return str;
        },
        hsvToRgb = function (hsv) {
            var r, g, b,
                h = hsv[0],
                s = hsv[1],
                v = hsv[2],
                i = MathFloor(h * 6),
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

            return [MathFloor(r * 255), MathFloor(g * 255), MathFloor(b * 255)];
        },
        rgbToHsv = function (rgb) {
            var r = rgb[0]/255,
                g = rgb[1]/255,
                b = rgb[2]/255,
                max = MathMax(r, g, b),
                min = MathMin(r, g, b),
                h = 0,
                v = max,
                d = max - min,
                s = max == 0 ? 0 : d / max;

            if (max == min) {
                h = 0;
            } else {
                switch (max) {
                    case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                    case g: h = (b - r) / d + 2; break;
                    case b: h = (r - g) / d + 4; break;
                }
                h /= 6;
            }

            return [h, s, v];
        },
        rgbaToHsva = function (rgba) {
            var a = isUndefined(rgba[3]) ? 1 : rgba[3],
                hsv = rgbToHsv(rgba);

            hsv.push(a);

            return hsv;
        },
        hsvaToRgba = function (hsva) {
            var a = isUndefined(hsva[3]) ? 1 : hsva[3],
                rgb = hsvToRgb(hsva);

            rgb.push(a);

            return rgb;
        },
        rgbToHsva = function (rgb) {
            var hsv = rgbToHsv(rgb);
            hsv.push(1.0);

            return hsv;
        },
        rgbToHex = function (rgb) {
            return pad(rgb[0].toString(16), 2, "0") + 
                   pad(rgb[1].toString(16), 2, "0") +
                   pad(rgb[2].toString(16), 2, "0");
        },
        hexToRgba = function (hex) {
            hex = fixHex(hex);
            return [parseInt(hex.substr(0, 2), 16), 
                    parseInt(hex.substr(2, 2), 16), 
                    parseInt(hex.substr(4, 2), 16)];
        },
        hexToHsv = function (hex) {
            var rgb;

            hex = fixHex(hex);
            rgb = [parseInt(hex.substr(0, 2), 16), 
                   parseInt(hex.substr(2, 2), 16), 
                   parseInt(hex.substr(4, 2), 16)];

            return rgbToHsv(rgb);
        },
        hexToHsva = function (hex) {
            var hsv = hexToHsv(hex);
            hsv.push(1.0);
            return hsv;
        },
        hsvToHex = function (hsv) {
            return rgbToHex(hsvToRgb(hsv));
        },
        hsvToHsva = function (hsv) {
            if (hsv.length == 3) {
                hsv.push(1.0);
            }
            return hsv;
        },
        rgbaToRgb = function (rgba) {
            rgba.pop();
            return rgba;
        },
        rgbToRgba = function (rgb) {
            if (rgb.length == 3) {
                rgb.push(1.0);
            }
            return rgb;
        },
        fixHex = function (hex) {
            var hex1, hex2, hex3;

            hex = (hex[0] == "#" ? hex.substring(1) : hex); // remove # if it's there

            hex1 = hex[0];
            hex2 = hex[1];
            hex3 = hex[2];

            // if the length is 3 (e.g., ABA), return the 6 digit form (e.g., AABBAA)
            return hex.length == 3 ? (hex1 + hex1 + hex2 + hex2 + hex3 + hex3) : hex;
        },
        colorNames = {
            'aliceblue':'#f0f8ff',
            'antiquewhite':'#faebd7',
            'aqua':'#00ffff',
            'aquamarine':'#7fffd4',
            'azure':'#f0ffff',
            'beige':'#f5f5dc',
            'bisque':'#ffe4c4',
            'black':'#000000',
            'blanchedalmond':'#ffebcd',
            'blue':'#0000ff',
            'blueviolet':'#8a2be2',
            'brown':'#a52a2a',
            'burlywood':'#deb887',
            'cadetblue':'#5f9ea0',
            'chartreuse':'#7fff00',
            'chocolate':'#d2691e',
            'coral':'#ff7f50',
            'cornflowerblue':'#6495ed',
            'cornsilk':'#fff8dc',
            'crimson':'#dc143c',
            'cyan':'#00ffff',
            'darkblue':'#00008b',
            'darkcyan':'#008b8b',
            'darkgoldenrod':'#b8860b',
            'darkgray':'#a9a9a9',
            'darkgreen':'#006400',
            'darkkhaki':'#bdb76b',
            'darkmagenta':'#8b008b',
            'darkolivegreen':'#556b2f',
            'darkorange':'#ff8c00',
            'darkorchid':'#9932cc',
            'darkred':'#8b0000',
            'darksalmon':'#e9967a',
            'darkseagreen':'#8fbc8f',
            'darkslateblue':'#483d8b',
            'darkslategray':'#2f4f4f',
            'darkturquoise':'#00ced1',
            'darkviolet':'#9400d3',
            'deeppink':'#ff1493',
            'deepskyblue':'#00bfff',
            'dimgray':'#696969',
            'dodgerblue':'#1e90ff',
            'firebrick':'#b22222',
            'floralwhite':'#fffaf0',
            'forestgreen':'#228b22',
            'fuchsia':'#ff00ff',
            'gainsboro':'#dcdcdc',
            'ghostwhite':'#f8f8ff',
            'gold':'#ffd700',
            'goldenrod':'#daa520',
            'gray':'#808080',
            'green':'#008000',
            'greenyellow':'#adff2f',
            'honeydew':'#f0fff0',
            'hotpink':'#ff69b4',
            'indianred':'#cd5c5c',
            'indigo':'#4b0082',
            'ivory':'#fffff0',
            'khaki':'#f0e68c',
            'lavender':'#e6e6fa',
            'lavenderblush':'#fff0f5',
            'lawngreen':'#7cfc00',
            'lemonchiffon':'#fffacd',
            'lightblue':'#add8e6',
            'lightcoral':'#f08080',
            'lightcyan':'#e0ffff',
            'lightgoldenrodyellow':'#fafad2',
            'lightgrey':'#d3d3d3',
            'lightgreen':'#90ee90',
            'lightpink':'#ffb6c1',
            'lightsalmon':'#ffa07a',
            'lightseagreen':'#20b2aa',
            'lightskyblue':'#87cefa',
            'lightslategray':'#778899',
            'lightsteelblue':'#b0c4de',
            'lightyellow':'#ffffe0',
            'lime':'#00ff00',
            'limegreen':'#32cd32',
            'linen':'#faf0e6',
            'magenta':'#ff00ff',
            'maroon':'#800000',
            'mediumaquamarine':'#66cdaa',
            'mediumblue':'#0000cd',
            'mediumorchid':'#ba55d3',
            'mediumpurple':'#9370d8',
            'mediumseagreen':'#3cb371',
            'mediumslateblue':'#7b68ee',
            'mediumspringgreen':'#00fa9a',
            'mediumturquoise':'#48d1cc',
            'mediumvioletred':'#c71585',
            'midnightblue':'#191970',
            'mintcream':'#f5fffa',
            'mistyrose':'#ffe4e1',
            'moccasin':'#ffe4b5',
            'navajowhite':'#ffdead',
            'navy':'#000080',
            'oldlace':'#fdf5e6',
            'olive':'#808000',
            'olivedrab':'#6b8e23',
            'orange':'#ffa500',
            'orangered':'#ff4500',
            'orchid':'#da70d6',
            'palegoldenrod':'#eee8aa',
            'palegreen':'#98fb98',
            'paleturquoise':'#afeeee',
            'palevioletred':'#d87093',
            'papayawhip':'#ffefd5',
            'peachpuff':'#ffdab9',
            'peru':'#cd853f',
            'pink':'#ffc0cb',
            'plum':'#dda0dd',
            'powderblue':'#b0e0e6',
            'purple':'#800080',
            'red':'#ff0000',
            'rosybrown':'#bc8f8f',
            'royalblue':'#4169e1',
            'saddlebrown':'#8b4513',
            'salmon':'#fa8072',
            'sandybrown':'#f4a460',
            'seagreen':'#2e8b57',
            'seashell':'#fff5ee',
            'sienna':'#a0522d',
            'silver':'#c0c0c0',
            'skyblue':'#87ceeb',
            'slateblue':'#6a5acd',
            'slategray':'#708090',
            'snow':'#fffafa',
            'springgreen':'#00ff7f',
            'steelblue':'#4682b4',
            'tan':'#d2b48c',
            'teal':'#008080',
            'thistle':'#d8bfd8',
            'tomato':'#ff6347',
            'turquoise':'#40e0d0',
            'violet':'#ee82ee',
            'wheat':'#f5deb3',
            'white':'#ffffff',
            'whitesmoke':'#f5f5f5',
            'yellow':'#ffff00',
            'yellowgreen':'#9acd32'
        },
        nameToHex = function (name) {
            var hex = colorNames[name.toLowerCase()];
        
            if (hex) {
                return fixHex(hex);
            }

            return false;
        },
        nameToHsv = function (name) {
            var hex = nameToHex(name);

            if (hex) {
                return hexToHsv(hex);
            }
            
            return false;
        },
        nameToHsva = function (name) {
            return hsvToHsva(nameToHsv(name));
        };

    // Color Static methods
    Color.hsvToRgb = hsvToRgb;
    Color.rgbToHsv = rgbToHsv;
    Color.rgbaToHsva = rgbaToHsva;
    Color.rgbToHsva = rgbToHsva;
    Color.rgbToHex = rgbToHex;
    Color.hexToRgba = hexToRgba;
    Color.hexToHsv = hexToHsv;
    Color.hexToHsva = hexToHsva;
    Color.hsvToHex = hsvToHex;
    Color.hsvToHex = hsvToHsva;
    Color.hsvaToRgba = hsvaToRgba;
    Color.rgbaToRgb = rgbaToRgb;
    Color.rgbToRgba = rgbToRgba;
    Color.fixHex = fixHex;
    Color.colorNames = colorNames;
    Color.nameToHex = nameToHex;
    Color.nameToHsv = nameToHsv;
    Color.nameToHsva = nameToHsva;
}).call(this);