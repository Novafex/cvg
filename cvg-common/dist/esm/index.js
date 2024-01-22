// src/expand.ts
var SVGNS = "http://www.w3.org/2000/svg";
function expandCVGToCode(input, withXMLDecl = false) {
  if (!input || !Array.isArray(input) || input.length === 0)
    throw new TypeError("invalid CVG argument in expandCVGToCode");
  const nodes = [];
  if (withXMLDecl)
    nodes.push('<?xml version="1.0"?>');
  if (typeof input[0] === "string") {
    nodes.push(`<svg xmlns="${SVGNS}" viewport="${input[0]}">`);
  } else if (Array.isArray(input[0])) {
    if (input[0].length === 2) {
      const [w, h] = input[0];
      nodes.push(`<svg xmlns="${SVGNS}" viewport="0 0 ${w} ${h}">`);
    } else if (input[0].length === 4) {
      const [x, y, w, h] = input[0];
      nodes.push(`<svg xmlns="${SVGNS}" viewport="${x} ${y} ${w} ${h}">`);
    } else {
      throw new TypeError("invalid CVG, viewport declaration has incorrect number of elements");
    }
  } else if (typeof input[0] === "object") {
    nodes.push(`<svg xmlns="${SVGNS}"`);
    for (const attr in input[0]) {
      nodes.push(` ${attr}="${input[0][attr].toString()}"`);
    }
    nodes.push(">");
  } else {
    throw new TypeError("invalid CVG, incorrect root declaration");
  }
  for (let i = 1; i < input.length; i++) {
    const child = input[i];
    if (typeof child === "string") {
      nodes.push(`<path d="${child}"/>`);
    } else if (Array.isArray(child)) {
      if (child.length < 2)
        throw new TypeError(`invalid CVG, element ${i - 1} is too small`);
      const [tag, attrs, innerText] = child;
      nodes.push(`<${tag} `);
      for (const attr in attrs)
        nodes.push(` ${attr}="${attrs[attr].toString()}"`);
      if (innerText && innerText.length > 0)
        nodes.push(`>${innerText}</${tag}>`);
      else
        nodes.push("/>");
    } else {
      throw new TypeError(`invalid CVG, element ${i - 1} does not have the right type`);
    }
  }
  nodes.push("</svg>");
  return nodes.join("");
}
function expandCVG(input) {
  if (!document)
    throw new Error('cannot expand CVG without "document" available, ensure you are running in a browser environment');
  const svg = document.createElementNS(SVGNS, "svg");
  if (typeof input[0] === "string") {
    svg.setAttribute("viewport", input[0]);
  } else if (Array.isArray(input[0])) {
    if (input[0].length === 2) {
      const [w, h] = input[0];
      svg.setAttribute("viewport", `0 0 ${w} ${h}`);
    } else if (input[0].length === 4) {
      const [x, y, w, h] = input[0];
      svg.setAttribute("viewport", `${x} ${y} ${w} ${h}`);
    } else {
      throw new TypeError("invalid CVG, viewport declaration has incorrect number of elements");
    }
  } else if (typeof input[0] === "object") {
    for (const attr in input[0])
      svg.setAttribute(attr, input[0][attr].toString());
  } else {
    throw new TypeError("invalid CVG, incorrect root declaration");
  }
  for (let i = 1; i < input.length; i++) {
    const child = input[i];
    if (typeof child === "string") {
      const el = document.createElementNS(SVGNS, "path");
      el.setAttribute("d", child);
      svg.appendChild(el);
    } else if (Array.isArray(child)) {
      if (child.length < 2)
        throw new TypeError(`invalid CVG, element ${i - 1} is too small`);
      const [tag, attrs, innerText] = child;
      const el = document.createElementNS(SVGNS, tag);
      for (const attr in attrs)
        el.setAttribute(attr, attrs[attr].toString());
      if (innerText && innerText.length > 0)
        el.append(innerText);
      svg.appendChild(el);
    } else {
      throw new TypeError(`invalid CVG, element ${i - 1} does not have the right type`);
    }
  }
  return svg;
}
export {
  expandCVG,
  expandCVGToCode
};
//# sourceMappingURL=index.js.map