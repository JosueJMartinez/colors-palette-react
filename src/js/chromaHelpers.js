import chroma from "chroma-js";

const lvls = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

function genPalette(starterPalette) {
  const { paletteName, id, emoji } = starterPalette;
  let newPalette = {
    paletteName,
    id,
    emoji,
    colors: {},
  };
  lvls.map(l => (newPalette.colors[l] = []));

  starterPalette.colors.map(c => {
    let scale = getScale(c.color, 10).reverse();
    for (let i in scale) {
      newPalette.colors[lvls[i]].push({
        name: `${c.name} ${lvls[i]}`,
        id: c.name.toLowerCase().replace(/ /g, "-"),
        hex: scale[i],
        rgb: chroma(scale[i]).css(),
        hsl: chroma(scale[i]).css("hsl"),
      });
    }
    return newPalette;
  });
  return newPalette;
}

function getRange(hexColor) {
  const end = "#fff";
  return [chroma(hexColor).darken(1.4).hex(), hexColor, end];
}

function getScale(hexColor, numOfColors) {
  return chroma.scale(getRange(hexColor)).mode("lab").colors(numOfColors);
}

export default genPalette;
