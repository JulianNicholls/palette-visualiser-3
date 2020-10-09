type RGB = {
  r: number;
  g: number;
  b: number;
};

/**
 * Convert a string representation of a colour in RGB to an array of three
 * values
 *
 * @param   {string}    colour
 *
 * @return  {Object}    The RGB representation [0..255, 0..255, 0..255]
 */
function rgbStrToObject(colour: string): RGB {
  const rgbArray = colour.match(/#?(..)(..)(..)/);
  if (rgbArray) {
    const [r, g, b] = rgbArray.slice(1, 4).map((part) => parseInt(part, 16));

    return { r, g, b };
  } else return { r: 0, g: 0, b: 0 };
}

/**
 * Convert an object representation of a colour in RGB to a #rrggbb string
 *
 * @param    {Object}    The RGB representation [0..255, 0..255, 0..255]
 *
 * @return   {string}    colour
 */
function rgbObjectToStr(colour: RGB): string {
  const toHexStr = (dec: number): string => {
    const str = dec.toString(16).toLowerCase();

    return dec < 16 ? '0' + str : str;
  };

  const { r, g, b } = colour;
  return `#${toHexStr(r)}${toHexStr(g)}${toHexStr(b)}`;
}

function rgbLightness(colour: RGB): number {
  const { r, g, b } = colour;
  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  return (max + min) / 2 / 255;
}

type ValIndex = {
  val: number;
  index: number;
};

function colourOrder(colour: RGB): ValIndex[] {
  let high = { val: -1, index: -1 };
  let low = { val: 300, index: -1 };
  const rawValues = Object.values(colour);

  rawValues.map((val, index) => {
    if (val > high.val) high = { val, index };
    if (val < low.val) low = { val, index };
  });

  if (low.index === high.index) low.index = high.index + 1;

  let mid = { index: 3 - high.index - low.index, val: 0 };
  mid.val = rawValues[mid.index];

  return [low, mid, high];
}

function saturatePC(colour: RGB, percent: number): RGB {
  const greyValue = Math.round(rgbLightness(colour) * 255);
  const [low, mid, high] = colourOrder(colour);

  // Return the same colour if it's grey
  if (low.val === high.val) return colour;

  const range = Math.round(Math.min(greyValue, 255 - greyValue));
  const maxChange = Math.min(255 - high.val, low.val);
  const changeAmount = Math.min((range * percent) / 100, maxChange);
  const midRatio = (greyValue - mid.val) / (greyValue - high.val);

  const rawValues = [];
  rawValues[high.index] = Math.round(high.val + changeAmount);
  rawValues[low.index] = Math.round(low.val - changeAmount);
  rawValues[mid.index] = Math.round(
    greyValue + (rawValues[high.index] - greyValue) * midRatio
  );

  return { r: rawValues[0], g: rawValues[1], b: rawValues[2] };
}

function desaturatePC(colour: RGB, percent: number): RGB {
  const greyValue = Math.round(rgbLightness(colour) * 255);
  const [low, mid, high] = colourOrder(colour);

  // Return the same colour if it's grey
  if (low.val === high.val) return colour;

  const range = Math.round(Math.min(greyValue, 255 - greyValue));
  const maxChange = greyValue - low.val;
  const changeAmount = Math.min((range * percent) / 100, maxChange);
  const midRatio = (greyValue - mid.val) / (greyValue - high.val);

  const rawValues = [];
  rawValues[high.index] = Math.round(high.val - changeAmount);
  rawValues[low.index] = Math.round(low.val + changeAmount);
  rawValues[mid.index] = Math.round(
    greyValue + (rawValues[high.index] - greyValue) * midRatio
  );

  return { r: rawValues[0], g: rawValues[1], b: rawValues[2] };
}

const baseColour1 = { r: 205, g: 228, b: 219 };
const baseColour2 = { r: 173, g: 31, b: 104 };

console.log(
  //   `
  // baseColour1: (r: ${baseColour1.r}, g: ${baseColour1.g}, b: ${baseColour1.b}) ()
  // baseColour2: (r: ${baseColour2.r}, g: ${baseColour2.g}, b: ${baseColour2.b})
  //   `
  baseColour1,
  saturatePC(baseColour1, 50),
  '\n',
  baseColour2,
  desaturatePC(baseColour2, 50)
);
