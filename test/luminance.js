/**
 * Contrast Ratio = (Lighter + 0.05) / (Darker + 0.05)
 *
 * @param   {Object}    First colour
 * @param   {Object}    Second colour
 *
 * @return  {Number}    Contrast ratio between them
 */
function contrastRatio(rgbA, rgbB) {
  const a = sRGBLuminance(rgbA) + 0.05;
  const b = sRGBLuminance(rgbB) + 0.05;

  return a > b ? a / b : b / a;
}

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
 *
 * @param   {Object}    Colour
 *
 * @return  {Number}    The luminance
 */
function sRGBLuminance(colour) {
  const mapColour = value =>
    value <= 0.04045 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);

  const r = mapColour(colour.r / 255);
  const g = mapColour(colour.g / 255);
  const b = mapColour(colour.b / 255);

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * The much simpler W3C suggested version.
 *
 * @param   {Object}    Colour
 *
 * @return  {Number}    The luminance
 */
function W3CLuminance(colour) {
  const { r, g, b } = colour;

  return (299 * r + 587 * g + 114 * b) / 255000;
}

/**
 * A colour difference comparison
 *
 * @param   {Object}    Colour 1
 * @param   {Object}    Colour 2
 *
 * @return  {Number}    The difference
 */
function ColourDifference(c1, c2) {
  const { r: r1, g: g1, b: b1 } = c1;
  const { r: r2, g: g2, b: b2 } = c2;

  const minr = Math.min(r1, r2);
  const maxr = Math.max(r1, r2);

  const ming = Math.min(g1, g2);
  const maxg = Math.max(g1, g2);

  const minb = Math.min(b1, b2);
  const maxb = Math.max(b1, b2);

  return maxr - minr + (maxg - ming) + (maxb - minb);
}

module.exports = {
  contrastRatio,
  sRGBLuminance,
  W3CLuminance,
  ColourDifference,
};
