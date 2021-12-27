export const AAAThreshold: number = 7; // 7:1 for AAA Text
export const AAThreshold: number = 4.5; // 4.5:1 for AA Text
export const largeThreshold: number = 3; // 3:1 for large text (18pt or 14pt bold)

/**
 * Convert a string representation of a colour in RGB to an array of three
 * values
 *
 * @param   {string}    colour
 *
 * @return  {Object}    The RGB representation [0..255, 0..255, 0..255]
 */
export function rgbStrToObject(colour: string): RGB {
  const rgbArray = colour.match(/#?(..)(..)(..)/);

  if(!rgbArray) throw new Error('Empty or invalid string passed to rgbStrToObject');

  const [r, g, b] = rgbArray.slice(1, 4).map((part) => parseInt(part, 16));

  return { r, g, b };
}

/**
 * Convert an object representation of a colour in RGB to a #rrggbb string
 *
 * @param    {Object}    The RGB representation [0..255, 0..255, 0..255]
 *
 * @return   {string}    colour
 */
export function rgbObjectToStr(colour: RGB): string {
  const toHexStr = (dec: number): string => {
    const str = dec.toString(16).toLowerCase();

    return dec < 16 ? '0' + str : str;
  };

  const { r, g, b } = colour;
  return `#${toHexStr(r)}${toHexStr(g)}${toHexStr(b)}`;
}

/**
 * Contrast Ratio = (Lighter + 0.05) / (Darker + 0.05)
 *
 * @param   {Object}    One colour
 * @param   {Object}    Other colour
 *
 * @return  {Number}    Contrast ratio between them
 */
export function contrastRatio(rgbA: RGB, rgbB: RGB) {
  const a = sRGBLuminance(rgbA) + 0.05;
  const b = sRGBLuminance(rgbB) + 0.05;

  return a > b ? a / b : b / a;
}

/**
 * The relative brightness of any point in a colourspace, normalised to 0 for
 * darkest black and 1 for lightest white, with a Gamma of 2.4.
 *
 * Note 1: For the sRGB colourspace, the relative luminance of a colour is defined as
 *   L = 0.2126 * R + 0.7152 * G + 0.0722 * B where R, G and B are defined as:
 *
 * if RsRGB <= 0.03928 then R = RsRGB/12.92 else R = ((RsRGB+0.055)/1.055) ^ 2.4
 * if GsRGB <= 0.03928 then G = GsRGB/12.92 else G = ((GsRGB+0.055)/1.055) ^ 2.4
 * if BsRGB <= 0.03928 then B = BsRGB/12.92 else B = ((BsRGB+0.055)/1.055) ^ 2.4
 *
 * and RsRGB, GsRGB, and BsRGB are defined as:
 *
 * RsRGB = R8bit / 255
 * GsRGB = G8bit / 255
 * BsRGB = B8bit / 255
 *
 * I have subsequently discovered
 * (here: http://entropymine.com/imageworsener/srgbformula/)
 * that the cutoff point 0.03928, used with 12.92, is probably wrong, so I
 * am using 0.04045 from now on.
 *
 * @param   {Object}    Colour
 *
 * @return  {Number}    The luminance
 */
export function sRGBLuminance(colour: RGB): number {
  const mapColour = (value: number) =>
    value <= 0.04045 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);

  const r = mapColour(colour.r / 255);
  const g = mapColour(colour.g / 255);
  const b = mapColour(colour.b / 255);

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Converts an RGB colour value to HSV. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
 *
 * @param   {Object}    Colour
 *
 * @return  {Object}    The HSV representation  [0..360, 0..100%, 0..100%]
 */
export function RGBtoHSV(colour: RGB): HSV {
  const r = colour.r / 255;
  const g = colour.g / 255;
  const b = colour.b / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const v = max * 100; // V = MAX
  const delta = max - min;
  const s = max === 0 ? 0 : (delta / max) * 100;

  let h = 0;

  if (delta !== 0) {
    if (max === r) h = (g - b) / delta + (b > g ? 6 : 0);
    else if (max === g) h = (b - r) / delta + 2;
    else if (max === b) h = (r - g) / delta + 4;
  }

  h = Math.round(h * 60);

  return {
    h,
    s: Math.round(s),
    v: Math.round(v),
  };
}

/**
 * Converts an RGB colour value to HSL. Conversion formula
 * adapted from https://css-tricks.com/converting-color-spaces-in-javascript/
 *
 * @param   {Object}    Colour
 *
 * @return  {Object}    The HSL representation  [0..360, 0..100%, 0..100%]
 */
export function RGBtoHSL(colour: RGB): HSL {
  const r = colour.r / 255;
  const g = colour.g / 255;
  const b = colour.b / 255;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);
  const delta = max - min;
  let h = 0;

  if (delta !== 0) {
    if (max === r) h = ((g - b) / delta) % 6;
    else if (max === g) h = (b - r) / delta + 2;
    else if (max === b) h = (r - g) / delta + 4;
  }

  h = Math.round(h * 60);

  if (h < 0) h += 360;

  const l = (max + min) / 2;
  const s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  return {
    h: Math.round(h),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

export function RGBtoHSL2(colour: RGB): HSL {
  const r = colour.r / 255;
  const g = colour.g / 255;
  const b = colour.b / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let [hue, sat, light] = [NaN, 0, (max + min) / 2];
  const d = max - min;

  if (d !== 0) {
    sat = (light === 0 || light === 1) ? 0 : (max - light) / Math.min(light, 1-light);

    switch(max) {
      case r: hue = (g - b) / d + (g < b ? 6 : 0);
      break;

      case g: hue = (b - r) / d + 2;
      break;

      case b: hue = (r - g) / d + 4;
      break;
    }

    hue = hue * 60;
  }

  return {
    h: Math.round(hue),
    s: Math.round(sat * 100),
    l: Math.round(light * 100),
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
export function HSLtoRGB(colour: HSL): RGB {
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
    b: Math.round((b + m) * 255),
  };
}
