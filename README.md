# Color.js
### A JavaScript class for working with colors.

## Constructor
#### Color([value])
>Creates a new Color object based on the passed **value** parameter.

>**value** - Can be a string, an object, or an array representing a color. If **value** is not specificed, the produced Color will be white. 

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

## Instance Methods
####.set([value])
>Changes the Color object based on the passed **value** parameter and returns the new Color object.

>**value** - Can be a string, an object, or an array representing a color. If **value** is not specificed, the produced Color will be white.

	var myColor = new Color();
	myColor.set("#000");
	
####.getRgb()
>Returns the color as an _RGB array_.
	
	var myColor = new Color("#000"),
		rgb = myColor.getRgba(),
		r = rgba[0], 
		g = rgba[1], 
		b = rgba[2];

####.getRgba()
>Returns the color as an _RGBA array_.
	
	var myColor = new Color("#000"),
		rgba = myColor.getRgba(),
		r = rgba[0], 
		g = rgba[1], 
		b = rgba[2], 
		a = rgba[3];

####.getHex([withHash])
>Returns the color as a _Hex string without hash_. 

>**withHash** - If true, the returned value is a _Hex string with hash_. Otherwise, the returned hex string has no hash.
	
	var myColor = new Color("#000"),
		hex = myColor.getHex(true);

	document.getElementById("colorDiv").backgroundColor = hex;

####.getHsv()
>Returns the color has an HSV array.

	var myColor = new Color("#000"),
		hsv = myColor.getHsv(),
		h = hsv[0],
		s = hsv[1],
		v = hsv[2];

## Static Methods
####Color.hsvToRgba(hsv)
>Converts an _HSV array_ to an _RGBA array_.

	var rgba = Color.hsvToRgba([0, 0, 1]); // [255, 255, 255, 1]

####Color.rgbToHsv(rgb)
>Converts an _RGB array_ to an _HSV array_.

	var hsv = Color.rgbToHsv([255, 255, 255]); // [0, 0, 1]

####Color.rgbToHex(rgb)
>Converts an _RGB array_ to a _Hex string without hash_.

	var hex = Color.rgbToHex([255, 255, 255]); // 'ffffff'

####Color.hexToRgba(hex)
>Converts a hex string to an _RGBA array_

	var rgba = Color.hexToRgba('#fff'); // [255, 255, 255, 1]

####Color.rgbaToRgb(rgba)
>Converts an _RGBA array_ to an _RGB array_. (Basically just does a .pop() on the array and returns the array).

	var rgba = Color.rgbaToRgb([255, 255, 255, 1]); // [255, 255, 255]

####Color.rgbToRgba(rgb)
>Converts an _RGB array_ to an _RGBA array_. (Basically just does a .push(1.0) on the array and returns the array).

	var rgba = Color.rgbToRgba([255, 255, 255]); // [255, 255, 255, 1]

####Color.fixHex(hex)
>Converts any valid normal or shorthand hex string, with or without hash, into a _Hex string without hash_.

	var hex = Color.fixHex('#fff'); // 'ffffff'
