const extractSvg = (content) => {
  const startIndex = content.indexOf('<svg')
  const endIndex = content.lastIndexOf('</svg>') + '</svg>'.length
  return content.slice(startIndex, endIndex)
}

const replaceSvgAttribute = (svg, attribute, value) => {
  const reg = new RegExp(`${attribute}="[^"]*"`, 'g')
  let result = svg.replace(reg, `${attribute}="${value}"`)
  if (!svg.includes(`${attribute}="${value}"`)) {
    result = result.replace(/<svg/i, `<svg ${attribute}="${value}"`);
  }
  return result;
}

export const svgs = {}
const svgFiles = import.meta.glob('./*.svg', { eager: true })
for (const key in svgFiles) {
  const name = key.replace(/\.\/|.svg/g, '') + 'Svg'
  const content = decodeURIComponent(svgFiles[key].default)
  let svg = extractSvg(content)
  svg = replaceSvgAttribute(svg, 'width', '24px')
  svg = replaceSvgAttribute(svg, 'height', '24px')
  svgs[name] = svg
}
