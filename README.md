# Color.js
### A JavaScript class for working with colors.

## Static Methods
####Color.hsvToRgba(hsv) &nbsp;&nbsp;&nbsp;&nbsp; `Color.hsvToRgba([0, 0, 1])`
>Converts an _HSV array_ to an _RGBA array_.

	var rgba = Color.hsvToRgba([0, 0, 1]); // [255, 255, 255, 1]

####Color.rgbToHsv(rgb) &nbsp;&nbsp;&nbsp;&nbsp; `Color.rgbToHsv([255, 255, 255])`
>Converts an _RGB array_ to an _HSV array_.

	var hsv = Color.rgbToHsv([255, 255, 255]); // [0, 0, 1]

####Color.rgbToHex(rgb) &nbsp;&nbsp;&nbsp;&nbsp; `Color.rgbToHex([255, 255, 255])`
>Converts an _RGB array_ to a _Hex string without hash_.

	var hex = Color.rgbToHex([255, 255, 255]); // 'ffffff'

####Color.hexToRgba(hex) &nbsp;&nbsp;&nbsp;&nbsp; `Color.hexToRgba('#fff')`
>Converts a hex string to an _RGBA array_

	var rgba = Color.hexToRgba('#fff'); // [255, 255, 255, 1]

####Color.rgbaToRgb(rgba) &nbsp;&nbsp;&nbsp;&nbsp; `Color.rgbaToRgb([255, 255, 255, 1])`
>Converts an _RGBA array_ to an _RGB array_. (Basically just does a .pop() on the array and returns the array).

	var rgba = Color.rgbaToRgb([255, 255, 255, 1]); // [255, 255, 255]

####Color.rgbToRgba(rgb) &nbsp;&nbsp;&nbsp;&nbsp; `Color.rgbToRgba([255, 255, 255])`
>Converts an _RGB array_ to an _RGBA array_. (Basically just does a .push(1.0) on the array and returns the array).

	var rgba = Color.rgbToRgba([255, 255, 255]); // [255, 255, 255, 1]

####Color.fixHex(hex) &nbsp;&nbsp;&nbsp;&nbsp; `Color.fixHex('333')`
>Converts any valid normal or shorthand hex string, with or without hash, into a _Hex string without hash_.

	var hex = Color.fixHex('#fff'); // 'ffffff'

## Constructor
#### Color([value]) &nbsp;&nbsp;&nbsp;&nbsp; `var myColor = new Color('#fff')`
>Creates a new Color object based on the passed **value** parameter.

>**value** - _See .set([value])_  

## Instance Methods
####.set([value]) &nbsp;&nbsp;&nbsp;&nbsp; `myColor.set('#333')`
>Changes the Color object based on the passed **value** parameter and returns the new Color object.

>**value** - Can be a string, an object, or an array representing a color. If **value** is not specificed, the produced Color will be white. Any of the following **value**s can be used:
	
	/* String */
	new Color('rgb(255, 0, 0)'); 		// CSS-style RGB string
	new Color('rgba(255, 0, 0, 0.5)'); 	// CSS-style RGBA string
	new Color('fff');					// Shorthand hex string without hash
	new Color('ffffff');				// Hex string without hash
	new Color('#fff');					// Shorthand hex string with hash
	new Color('#ffffff');				// Hex string with hash

	/* Array */
	new Color([255, 255, 255]);			// RGB array
	new Color([255, 255, 255, 0.5])		// RGBA Array

	/* Object */
	new Color({ hsv: [0, 0, 1] })				// HSV array ~ values are in the range [0,1]
	new Color({ rgb: [255, 255, 255] });		// RGB
	new Color({ rgba: [255, 255, 255, 0.5] });	// RGBA
	new Color({ hex: "#fff" });					// Hex string
	
####.getRgb() &nbsp;&nbsp;&nbsp;&nbsp; `myColor.getRgb()`
>Returns the color as an _RGB array_.
	
	var rgb = myColor.getRgba(),
		r = rgba[0], 
		g = rgba[1], 
		b = rgba[2];

####.getRgba() &nbsp;&nbsp;&nbsp;&nbsp; `myColor.getRgba()`
>Returns the color as an _RGBA array_.
	
	var rgba = myColor.getRgba(),
		r = rgba[0], 
		g = rgba[1], 
		b = rgba[2], 
		a = rgba[3];

####.getHex([withHash]) &nbsp;&nbsp;&nbsp;&nbsp; `myColor.getHex()`
>Returns the color as a _Hex string without hash_. 

>**withHash** - If true, the returned value is a _Hex string with hash_. Otherwise, the returned hex string has no hash.
	
	var hex = myColor.getHex(true);

	document.getElementById("colorDiv").backgroundColor = hex;

####.getHsv() &nbsp;&nbsp;&nbsp;&nbsp; `myColor.getHsv()`
>Returns the color has an HSV array.

	var hsv = myColor.getHsv(),
		h = hsv[0],
		s = hsv[1],
		v = hsv[2];