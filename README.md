# Color.js
## A JavaScript class for working with colors.
### Constructor
#### Color([value]) &nbsp;&nbsp;&nbsp;&nbsp; `var myColor = new Color('#fff')`
>Creates a new Color object based on the passed **value** parameter.

>**value** - _See .set([value])_  

### Methods
####.set([value]) &nbsp;&nbsp;&nbsp;&nbsp; `myColor.set('#333')`
>Changes the Color object based on the passed **value** parameter and returns the new Color object.

>**value** - Can be a string, an object, or an array representing a color. If **value** is not specificed, the produced Color will be white. Any of the following **value**s can be used:
	
	/* String */
	new Color("rgb(255, 0, 0)"); 		// CSS-style RGB string
	new Color("rgba(255, 0, 0, 0.5)"); 	// CSS-style RGBA string
	new Color("fff");					// Shorthand hex string without hash
	new Color("ffffff");				// Hex string without hash
	new Color("#fff");					// Shorthand hex string with hash
	new Color("#ffffff");				// Hex string with hash

	/* Array */
	new Color([255, 255, 255]);			// RGB array
	new Color([255, 255, 255, 0.5])		// RGBA Array

	/* Object */
	new Color({ hsv: [0, 0, 1] })				// HSV array ~ values are in the range [0,1]
	new Color({ rgb: [255, 255, 255] });		// RGB
	new Color({ rgba: [255, 255, 255, 0.5] });	// RGBA
	new Color({ hex: "#fff" });					// Hex string
	
####.getRgb() &nbsp;&nbsp;&nbsp;&nbsp; `myColor.getRgb()`
>Returns the color as an RGB array

####.getRgba() &nbsp;&nbsp;&nbsp;&nbsp; `myColor.getRgba()`
>Returns the color as an RGBA array

####.getHex() &nbsp;&nbsp;&nbsp;&nbsp; `myColor.getHex()`
>Returns the color as a Hex string without hash

####.getHsv() &nbsp;&nbsp;&nbsp;&nbsp; `myColor.getHsv()`
>Returns the color has an HSV array