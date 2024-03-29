/// <reference path="src/types.d.ts" />
const {
  rgbStrToObject,
  RGBtoHSV,
  RGBtoHSL,
  RGBtoHSL2,
  HSLtoRGB,
} = require('./src/conversions');
const {
  contrastRatio,
  sRGBLuminance,
  W3CLuminance,
  ColourDifference,
} = require('./test/luminance');

let rgbi = rgbStrToObject('#A130D6');
let rgbi2 = null;

if (process.argv[2]) {
  const args = process.argv.slice(2);

  if (args[0].length > 2) {
    rgbi = rgbStrToObject(args[0]);

    if (args[1]) rgbi2 = rgbStrToObject(args[1]);
  } else {
    rgbi = {
      r: parseInt(args[0], 10),
      g: parseInt(args[1], 10),
      b: parseInt(args[2], 10),
    };
  }
} else {
  console.log(process.argv);
}

const hsv = RGBtoHSV(rgbi);
const hsl = RGBtoHSL(rgbi);
const hsl12 = RGBtoHSL2(rgbi);
const rgbo = HSLtoRGB(hsl);
const sLum = sRGBLuminance(rgbi);
const wLum = W3CLuminance(rgbi);

console.log('RGB in:    ', rgbi);
console.log('HSV:       ', hsv);
console.log('HSL:       ', hsl);
console.log('HSL2:      ', hsl12);
console.log('RGB out:   ', rgbo);
console.log('sRGB / W3C:', sLum.toFixed(4), wLum.toFixed(3));

if (rgbi2) {
  const hsv2 = RGBtoHSV(rgbi2);
  const hsl2 = RGBtoHSL(rgbi2);
  const hsl22 = RGBtoHSL2(rgbi2);
  const rgbo2 = HSLtoRGB(hsl2);
  const sLum2 = sRGBLuminance(rgbi2);
  const wLum2 = W3CLuminance(rgbi2);

  console.log();
  console.log('RGB 2 in:  ', rgbi2);
  console.log('HSV:       ', hsv2);
  console.log('HSL:       ', hsl2);
  console.log('HSL2:      ', hsl22);
  console.log('RGB 2 out: ', rgbo2);
  console.log('sRGB / W3C:', sLum2.toFixed(4), '/', wLum2.toFixed(3));

  console.log();
  console.log('sRGB Ratio:       ', contrastRatio(rgbi, rgbi2).toFixed(2));
  console.log('W3C Difference:   ', Math.abs(wLum2 - wLum).toFixed(3));
  console.log('Colour Difference:', ColourDifference(rgbi, rgbi2).toFixed(1));
}

export {};
