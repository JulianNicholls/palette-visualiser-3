// const ratioThreshold = 4.45; // Officially, it's 4.5:1
// const largeThreshold = 3; // 3:1 for large text

/**
 * Convert a string representation of a colour in RGB to an array of three
 * values
 *
 * @param   {string}    colour
 *
 * @return  {Object}    The RGB representation [0..255, 0..255, 0..255]
 */
function rgbStrToObject(colour) {
  const rgbArray = colour.match(/#?(..)(..)(..)/);

  for (let i = 0; i < 3; ++i) {
    rgbArray[i] = parseInt(rgbArray[i + 1], 16);
  }

  return {
    r: rgbArray[0],
    g: rgbArray[1],
    b: rgbArray[2]
  };
}

/**
 * Convert an object representation of a colour in RGB to a string
 *
 * @param    {Object}    The RGB representation [0..255, 0..255, 0..255]
 *
 * @return   {string}    colour
 */
// function rgbObjectToStr(colour) {
//   const toHexStr = dec => {
//     const str = dec.toString(16).toLowerCase();

//     return dec < 16 ? '0' + str : str;
//   };

//   return '#' + toHexStr(colour.r) + toHexStr(colour.g) + toHexStr(colour.b);
// }

/**
 * Contrast Ratio = (Lighter + 0.05) / (Darker + 0.05)
 *
 * @param   {Object}    One colour
 * @param   {Object}    Other colour
 *
 * @return  {Number}    Contrast ratio between them
 */
// function contrastRatio(rgbA, rgbB) {
//   const a = sRGBLuminance(rgbA) + 0.05;
//   const b = sRGBLuminance(rgbB) + 0.05;

//   return a > b ? a / b : b / a;
// }

/**
 * The relative brightness of any point in a colourspace, normalised to 0 for
 * darkest black and 1 for lightest white, with a Gamma of 2.4.
 
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
// function sRGBLuminance(colour) {
//   const mapColour = value =>
//     value <= 0.04045 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);

//   const r = mapColour(colour.r / 255);
//   const g = mapColour(colour.g / 255);
//   const b = mapColour(colour.b / 255);

//   return 0.2126 * r + 0.7152 * g + 0.0722 * b;
// }

/**
 * Converts an RGB colour value to HSV. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
 *
 * @param   {Object}    Colour
 *
 * @return  {Object}    The HSV representation  [0..360, 0..100%, 0..100%]
 */
function RGBtoHSV(colour) {
  const r = colour.r / 255,
    g = colour.g / 255,
    b = colour.b / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const v = max * 100; // V = MAX
  const d = max - min;
  const s = max === 0 ? 0 : (d / max) * 100;

  let h = 0;

  if (d !== 0) {
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

      default:
        // Placate ESLint
        break;
    }

    h *= 60;
  }

  return {
    h: Math.round(h),
    s: Math.round(s),
    v: Math.round(v)
  };
}

/**
 * Converts an HSV colour value to HSL. Conversion formula
 * adapted from Bob's answer on
 * https://stackoverflow.com/questions/3423214/convert-hsb-hsv-color-to-hsl
 *
 * @param   {Object}    Colour
 *
 * @return  {Object}    The HSL representation [0..360, 0..100%, 0..100%]
 */
function HSVtoHSL(colour) {
  let { h } = colour,
    s = colour.s / 100,
    v = colour.v / 100;

  const l = ((2 - s) * v) / 2; // l -> 0..1

  if (l !== 0) {
    if (l === 1) {
      s = 0;
    } else if (l < 0.5) {
      s = (s * v) / (l * 2);
    } else {
      s = (s * v) / (2 - l * 2);
    }
  }

  return {
    h: Math.round(h),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}

/**
 * Converts an HSL colour value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
 *
 * @param   {Object}    Colour
 *
 * @return  {Array}     The RGB representation [0..255, 0..255, 0..255]
 */
function HSLtoRGB(colour) {
  const { h } = colour,
    s = colour.s / 100, // % -> 0..1
    l = colour.l / 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const hp = h / 60.0;
  const x = c * (1 - Math.abs((hp % 2) - 1));
  const m = l - c / 2;

  let r, g, b;

  if (hp >= 0 && hp < 1) {
    [r, g, b] = [c, x, 0];
  } else if (hp >= 1 && hp < 2) {
    [r, g, b] = [x, c, 0];
  } else if (hp >= 2 && hp < 3) {
    [r, g, b] = [0, c, x];
  } else if (hp >= 3 && hp < 4) {
    [r, g, b] = [0, x, c];
  } else if (hp >= 4 && hp < 5) {
    [r, g, b] = [x, 0, c];
  } else if (hp >= 5 && hp < 6) {
    [r, g, b] = [c, 0, x];
  } else {
    [r, g, b] = [0.9, 0.9, 0.9]; // Should never hit this
  }

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255)
  };
}

function RGBtoHSL(rgb) {
  const r = rgb.r / 255,
    g = rgb.g / 255,
    b = rgb.b / 255;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);
  const delta = max - min;
  let h, s, l;

  if (delta === 0) h = 0;
  else if (max === r) h = ((g - b) / delta) % 6;
  else if (max === g) h = (b - r) / delta + 2;
  else if (max === b) h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  if (h < 0) h += 360;

  l = (max + min) / 2;

  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  return {
    h: Math.round(h),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}

let rgbi = rgbStrToObject('#A130D6');

if (process.argv[2]) {
  rgbi = {
    r: parseInt(process.argv[2], 10),
    g: parseInt(process.argv[3], 10),
    b: parseInt(process.argv[4], 10)
  };
}

const hsv = RGBtoHSV(rgbi);
const hsl = HSVtoHSL(hsv);
const hslDirect = RGBtoHSL(rgbi);
const rgbo = HSLtoRGB(hsl);
const rgboDirect = HSLtoRGB(hslDirect);

console.log('RGB in:                  ', rgbi);
console.log('HSV:                     ', hsv);
console.log('HSL via HSV / HSL direct:', hsl, '|', hslDirect);
console.log('RGB out via HSV:         ', rgbo);
console.log('RGB out direct:          ', rgboDirect);
