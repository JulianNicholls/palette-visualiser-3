interface RGB {
  r: number;
  g: number;
  b: number;
}

interface HSL {
  h: number;
  s: number;
  l: number;
}

interface HSV {
  h: number;
  s: number;
  v: number;
}

interface ColourInfoData {
  rgbs: RGB;
  luminance: string;
  hsvs: HSV;
}

interface SelectedColour {
  bg: string;
  fg: string;
}
