var fgimage = null;
var bgimage = null;
var greenThreshold = 240;

function loadfor() {
  var file = document.getElementById("foreground");
  fgimage = new SimpleImage(file);
  var canvas = document.getElementById("normal");
  fgimage.drawTo(canvas);
}

function loadback() {
  var file = document.getElementById("background");
  bgimage = new SimpleImage(file);
  var canvas = document.getElementById("green");
  bgimage.drawTo(canvas);
}

function convertion() {
  if (fgimage == null || !fgimage.complete()) {
    alert("Foreground image not loaded.");
    return;
  }
  if (bgimage == null || !bgimage.complete()) {
    alert("Background image not loaded.");
    return;
  }

  let container = document.getElementById("canvas-container");
  container.innerHTML = '';

  let resultCanvas = document.createElement("canvas");
  resultCanvas.id = "result";
  resultCanvas.width = fgimage.getWidth();
  resultCanvas.height = fgimage.getHeight();
  container.appendChild(resultCanvas);

  var output = new SimpleImage(fgimage.getWidth(), fgimage.getHeight());
  for (var pix of fgimage.values()) {
    var x = pix.getX();
    var y = pix.getY();
    if (pix.getGreen() > greenThreshold) {
      var bgpix = bgimage.getPixel(x, y);
      output.setPixel(x, y, bgpix);
    } else {
      output.setPixel(x, y, pix);
    }
  }

  output.drawTo(resultCanvas);
}

function clearCanvas() {
  let container = document.getElementById("canvas-container");
  container.innerHTML = '';

  let normalCanvas = document.createElement("canvas");
  normalCanvas.id = "normal";
  normalCanvas.width = 300;
  normalCanvas.height = 300;

  let greenCanvas = document.createElement("canvas");
  greenCanvas.id = "green";
  greenCanvas.width = 300;
  greenCanvas.height = 300;

  container.appendChild(normalCanvas);
  container.appendChild(greenCanvas);

  fgimage = null;
  bgimage = null;
}
