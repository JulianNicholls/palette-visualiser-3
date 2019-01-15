const HTMLColours = require('../src/HTMLColours');
const { rgbStrToObject, sRGBLuminance } = require('../src/conversions');

const colours = [...HTMLColours];

colours.forEach(colour => {
  colour.rgb = rgbStrToObject(colour.value);
  const luminance = sRGBLuminance(colour.rgb);
  colour.luminance = luminance;
});

colours.sort((a, b) => (a.luminance < b.luminance ? -1 : 1));

colours.forEach(({ name, value, luminance }) => {
  console.log(`${name} (${value}) ${luminance.toFixed(3)}`);
});
