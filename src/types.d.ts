type RGB = {
  r: number;
  g: number;
  b: number;
};

type HSL = {
  h: number;
  s: number;
  l: number;
};

type HSV = {
  h: number;
  s: number;
  v: number;
};

type ColourInfoData = {
  rgbs: RGB;
  luminance: string;
  hsvs: HSV;
};

type SelectedColour = {
  bg: string;
  fg: string;
};

interface RGBInputProps {
  rgb: string;
  index: number;
  handleChangeRGB: (index: number, value: string) => void;
}
