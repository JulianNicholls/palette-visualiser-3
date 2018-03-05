const CONST = {
  ratio_threshold: 4.4    // Officially, it's 4.5:1
};

/*
function setFromRGB(event) {
  const elem = event.target;
  const id = elem.id;
  const input_num = parseInt(id[id.length - 1]);

  colours[input_num] = elem.value;

  localStorage.setItem('show49', JSON.stringify(colours));

  setHSLsFromRGBs();
  setTableFromColours();
  setBlocksFromColours();
}

function setFromHSL(event) {
  const toHexStr = dec => {
    const str = dec.toString(16).toUpperCase();

    return dec < 16 ? '0' + str : str;
  };

  const id = event.target.id;
  const input_num = parseInt(id[id.length - 1]);

  const h = parseInt(document.getElementById(`input-h${input_num}`).value, 10);
  const s = parseInt(document.getElementById(`input-s${input_num}`).value, 10);
  const l = parseInt(document.getElementById(`input-l${input_num}`).value, 10);

  const rgb = HSLtoRGB(h, s, l);
  const rgbStr = '#' + rgb.map(value => toHexStr(value)).join('');

  colours[input_num] = rgbStr;
  rgb_inputs[input_num - 1].value = rgbStr;

  localStorage.setItem('show49', JSON.stringify(colours));

  setTableFromColours();
  setBlocksFromColours();
}

function setHSLsFromRGBs() {
  for (let i = 1; i <= 5; ++i) {
    const rgb = rgbStrToArray(colours[i]);
    const hsv = RGBtoHSV(rgb[0], rgb[1], rgb[2]);
    const hsl = HSVtoHSL(hsv[0], hsv[1], hsv[2]);

    document.getElementById(`input-h${i}`).value = hsl[0];
    document.getElementById(`input-s${i}`).value = hsl[1];
    document.getElementById(`input-l${i}`).value = hsl[2];
  }
}

function setTableFromColours() {
  for (let i = 1; i <= 5; ++i) {
    const rgb = rgbStrToArray(colours[i]);
    const hsv = RGBtoHSV(rgb[0], rgb[1], rgb[2]);
    const row = document.querySelector(`tr#line-${i}`);

    row.querySelector('td.r').textContent = rgb[0];
    row.querySelector('td.g').textContent = rgb[1];
    row.querySelector('td.b').textContent = rgb[2];

    row.querySelector('td.luma').textContent = sRGBLuminance(rgb).toFixed(3);

    row.querySelector('td.h').innerHTML = hsv[0] + '&deg;';
    row.querySelector('td.s').textContent = hsv[1] + '%';
    row.querySelector('td.v').textContent = hsv[2] + '%';
  }
}

function setBlocksFromColours() {
  const suppress = document.querySelector('input:checked');

  for (let bg = 1; bg <= 7; ++bg) {
    for (let fg = 1; fg <= 7; ++fg) {
      const rgbB = rgbStrToArray(colours[bg]);
      const rgbF = rgbStrToArray(colours[fg]);
      const lumaD = contrastRatio(rgbB, rgbF);
      const lumaStr = `<br />${lumaD}:1`;

      const block = document.querySelector(`#block-${bg}${fg} p`);

      if (fg === bg || (suppress && lumaD < CONST.ratio_threshold)) {
        block.style.backgroundColor = '#999';
        block.style.color = '#999';
      } else {
        if (colours[bg][0] !== '#') colours[bg] = `#${colours[bg]}`;

        block.style.backgroundColor = colours[bg];

        if (fg !== bg) {
          if (colours[fg][0] !== '#') colours[fg] = `#${colours[fg]}`;

          block.style.color = colours[fg];
        }

        block.innerHTML = `${colours[bg]}<br/>${colours[fg]}${lumaStr}`;
      }
    }
  }
}

function colourTextDisplay(event) {
  const td = document.getElementById('text-display');
  const style = event.target.style;

  td.style.backgroundColor = style.backgroundColor;
  td.style.color = style.color;
}

*/

export function rgbStrToArray(colour) {
  const rgb = colour.match(/#?(..)(..)(..)/);

  for (let i = 0; i < 3; ++i) {
    rgb[i] = parseInt(rgb[i + 1], 16);
  }

  return rgb;
}

/**
 * Contrast Ratio = (Lighter + 0.05) / (Darker + 0.05)
 */

export function contrastRatio(rgbA, rgbB) {
  const a = sRGBLuminance(rgbA) + 0.05;
  const b = sRGBLuminance(rgbB) + 0.05;

  if (a > b) return (a / b).toFixed(2);

  return (b / a).toFixed(2);
}

/**
 * The relative brightness of any point in a colourspace, normalised to 0 for
 * darkest black and 1 for lightest white.
 
 * Note 1: For the sRGB colourspace, the relative luminance of a colour is defined as
 *   L = 0.2126 * R + 0.7152 * G + 0.0722 * B where R, G and B are defined as:
 
 * if RsRGB <= 0.03928 then R = RsRGB/12.92 else R = ((RsRGB+0.055)/1.055) ^ 2.4
 * if GsRGB <= 0.03928 then G = GsRGB/12.92 else G = ((GsRGB+0.055)/1.055) ^ 2.4
 * if BsRGB <= 0.03928 then B = BsRGB/12.92 else B = ((BsRGB+0.055)/1.055) ^ 2.4
 * and RsRGB, GsRGB, and BsRGB are defined as:
 
 * RsRGB = R8bit / 255
 * GsRGB = G8bit / 255
 * BsRGB = B8bit / 255
 * 
 * I have subsequently discovered 
 * (here: http://entropymine.com/imageworsener/srgbformula/)
 * that the cutoff point 0.03928, used with 12.92, is probably 
 * wrong, so I am going to use 0.04045 from now on.
*/

export function sRGBLuminance(rgb) {
  const mapColour = value =>
    value <= 0.04045 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);

  const r = mapColour(rgb[0] / 255);
  const g = mapColour(rgb[1] / 255);
  const b = mapColour(rgb[2] / 255);

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Converts an RGB colour value to HSV. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
 *
 * @param   Number  r       The red colour value    0..255
 * @param   Number  g       The green colour value  0..255
 * @param   Number  b       The blue colour value   0..255
 * @return  Array           The HSV representation  [0..360, 0..100%, 0..100%]
 */

export function RGBtoHSV(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const v = max * 100; // V = MAX
  const d = max - min;
  const s = max === 0 ? 0 : d / max * 100;

  let h = 0;

  if (max !== min) {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;

      case g:
        h = (b - r) / d + 2;
        break;

      case b:
        h = (r - g) / d + 4;
        break;
    }

    h *= 60;
  }

  return [Math.round(h), Math.round(s), Math.round(v)];
}

/**
 * Converts an HSV colour value to HSL. Conversion formula
 * adapted from Bob's answer on
 * https://stackoverflow.com/questions/3423214/convert-hsb-hsv-color-to-hsl
 *
 * @param   Number  h       Hue                 0..360
 * @param   Number  s       Saturation          0..100%
 * @param   Number  v       Value / Brightness  0..100%
 * @return  Array           The HSL representation [0..360, 0..100%, 0..100%]
 */

export function HSVtoHSL(h, s, v) {
  s /= 100;
  v /= 100;

  const l = (2 - s) * v / 2; // l -> 0..1

  if (l !== 0) {
    if (l === 1) {
      s = 0;
    } else if (l < 0.5) {
      s = s * v / (l * 2);
    } else {
      s = s * v / (2 - l * 2);
    }
  }

  return [Math.round(h), Math.round(s * 100), Math.round(l * 100)];
}

/**
 * Converts an HSL colour value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
 *
 * @param   Number  h       Hue         0..360
 * @param   Number  s       Saturation  0..100%
 * @param   Number  l       Luminance   0..100%
 * @return  Array           The RGB representation [0..255, 0..255, 0..255]
 */

export function HSLtoRGB(h, s, l) {
  s /= 100; // % -> 0..1
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const hp = h / 60.0;
  const x = c * (1 - Math.abs(hp % 2 - 1));
  const m = l - c / 2;

  let r, g, b;

  if (hp >= 0 && hp <= 1) {
    [r, g, b] = [c, x, 0];
  } else if (hp >= 1 && hp <= 2) {
    [r, g, b] = [x, c, 0];
  } else if (hp >= 2 && hp <= 3) {
    [r, g, b] = [0, c, x];
  } else if (hp >= 3 && hp <= 4) {
    [r, g, b] = [0, x, c];
  } else if (hp >= 4 && hp <= 5) {
    [r, g, b] = [x, 0, c];
  } else if (hp >= 5 && hp <= 6) {
    [r, g, b] = [c, 0, x];
  } else {
    [r, g, b] = [0.9, 0.9, 0.9]; // Should never hit this
  }

  return [
    Math.round((r + m) * 255),
    Math.round((g + m) * 255),
    Math.round((b + m) * 255)
  ];
}
