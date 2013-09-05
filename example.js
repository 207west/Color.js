(function () {

   var body = document.getElementsByTagName('body')[0];

   function outputColorTest (testName, color, expectedHex, expectedHsv, expectedRgb, expectedRgba) {
      var html = '<div class="panel panel-default"><div class="panel-heading"><h4>' + testName + '</h4></div>';

      var hex = color.getHex(),
         hsv = color.getHsv().toString(),
         rgb = color.getRgb().toString(),
         rgba = color.getRgba().toString();

      html += '<div class="panel-body"><table class="table"><thead><tr><th></th><th>Expected</th><th>Result</th></tr></thead>';
      html += '<tbody><tr class="' + (hex === expectedHex ? 'success' : 'danger') + '"><td>Hex</td>';


      // hex
      html += ('<td>' + expectedHex + '</td>');
      html += ('<td>' + hex + '</td></tr>');

      // hsv
      html += ('<tr class="' + (hsv === expectedHsv ? 'success' : 'danger') + '"><td>Hsv</td>');
      html += ('<td>' + expectedHsv + '</td>');
      html += ('<td>' + hsv + '</td></tr>');

      // rgb
      html += ('<tr class="' + (rgb === expectedRgb ? 'success' : 'danger') + '"><td>Rgb</td>');
      html += ('<td>' + expectedRgb + '</td>');
      html += ('<td>' + rgb + '</td></tr>');

      // rgba
      html += ('<tr class="' + (rgba === expectedRgba ? 'success' : 'danger') + '"><td>Rgba</td>');
      html += ('<td>' + expectedRgba + '</td>');
      html += ('<td>' + rgba + '</td></tr>');

      html += '</tbody></table></div></div>';

      body.innerHTML += html;
   }

   window.color = new Color({ hex: "fff" });
   outputColorTest('window.color = new Color({ hex: "fff" })', color, 'ffffff', '0,0,1', '255,255,255', '255,255,255,1');
   color.set("ffffff");
   outputColorTest('color.set("ffffff")', color, 'ffffff', '0,0,1', '255,255,255', '255,255,255,1');
   color.set("rgb(255,0,0)");
   outputColorTest('color.set("rgb(255,0,0)")', color, 'ff0000', '0,1,1', '255,0,0', '255,0,0,1');
   color.set("rgb(255,0,0, 0.5)");
   outputColorTest('color.set("rgb(255,0,0,0.5)")', color, 'ff0000', '0,1,1', '255,0,0', '255,0,0,0.5');
   color.set([0, 0, 0, 0.5]);
   outputColorTest('color.set([0, 0, 0, 0.5])', color, '000000', '0,0,0', '0,0,0', '0,0,0,0.5');
   color.set([0,0,0]);
   outputColorTest('color.set([0, 0, 0])', color, '000000', '0,0,0', '0,0,0', '0,0,0,1');
   color.set({ hsv: color.getHsv() });
   outputColorTest('color.set({ hsv: color.getHsv() })', color, '000000', '0,0,0', '0,0,0', '0,0,0,1');
   color.set({ rgb: color.getRgb() });
   outputColorTest('color.set({ rgb: color.getRgb() })', color, '000000', '0,0,0', '0,0,0', '0,0,0,1');
   color.set({ rgba: [0,255,0,0.5] });
   outputColorTest('color.set({ rgba: [0,255,0,0.5] })', color, '00ff00', '0.3333333333333333,1,1', '0,255,0', '0,255,0,0.5');
   color = new Color();
   outputColorTest('color = new Color()', color, '000000', '0,0,0', '0,0,0', '0,0,0,0');
   
})();