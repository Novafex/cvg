// src/common.ts
var SVGNS = "http://www.w3.org/2000/svg";
function expandCVGToSVGCode(input, withXMLDecl = false) {
  return new Promise((resolve, reject) => {
    if (!input || !Array.isArray(input) || input.length === 0)
      return reject(new TypeError("invalid CVG argument in expandCVGToCode"));
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
        return reject(new TypeError("invalid CVG, viewport declaration has incorrect number of elements"));
      }
    } else if (typeof input[0] === "object") {
      nodes.push(`<svg xmlns="${SVGNS}"`);
      for (const attr in input[0]) {
        nodes.push(` ${attr}="${input[0][attr].toString()}"`);
      }
      nodes.push(">");
    } else {
      return reject(new TypeError("invalid CVG, incorrect root declaration"));
    }
    for (let i = 1; i < input.length; i++) {
      const child = input[i];
      if (typeof child === "string") {
        nodes.push(`<path d="${child}"/>`);
      } else if (Array.isArray(child)) {
        if (child.length < 2)
          return reject(new TypeError(`invalid CVG, element ${i - 1} is too small`));
        const [tag, attrs, innerText] = child;
        nodes.push(`<${tag} `);
        for (const attr in attrs)
          nodes.push(` ${attr}="${attrs[attr].toString()}"`);
        if (innerText && innerText.length > 0)
          nodes.push(`>${innerText}</${tag}>`);
        else
          nodes.push("/>");
      } else {
        return reject(new TypeError(`invalid CVG, element ${i - 1} does not have the right type`));
      }
    }
    nodes.push("</svg>");
    resolve(nodes.join(""));
  });
}

// src/browser.ts
var SVGNS2 = "http://www.w3.org/2000/svg";
function compressSVGElement(svg) {
  return new Promise((resolve, reject) => {
    if (!svg || !(svg instanceof SVGElement) || svg.tagName !== "svg")
      return reject(new TypeError("compressSVGElement must be provided a SVGElement object"));
    const ret = [{}];
    if (svg.hasAttribute("viewBox")) {
      const [x, y, w, h] = svg.getAttribute("viewBox").split(" ");
      if (x != "0" || y != "0")
        ret[0] = [parseInt(x), parseInt(y), parseInt(w), parseInt(h)];
      else
        ret[0] = [parseInt(w), parseInt(h)];
      if (svg.hasAttribute("preserveAspectRatio") || svg.hasAttribute("x") || svg.hasAttribute("y")) {
        ret[0] = {
          viewport: `${x} ${y} ${w} ${h}`
        };
        if (svg.hasAttribute("preserveAspectRatio"))
          ret[0].preserveAspectRatio = svg.getAttribute("preserveAspectRatio");
        if (svg.hasAttribute("x"))
          ret[0].x = svg.getAttribute("x");
        if (svg.hasAttribute("y"))
          ret[0].y = svg.getAttribute("y");
      }
    } else if (svg.hasAttribute("width") || svg.hasAttribute("height")) {
      ret[0] = {
        width: parseInt(svg.getAttribute("width") ?? svg.getAttribute("height")),
        height: parseInt(svg.getAttribute("height") ?? svg.getAttribute("width"))
      };
      if (svg.hasAttribute("preserveAspectRatio"))
        ret[0].preserveAspectRatio = svg.getAttribute("preserveAspectRatio");
      if (svg.hasAttribute("x"))
        ret[0].x = svg.getAttribute("x");
      if (svg.hasAttribute("y"))
        ret[0].y = svg.getAttribute("y");
    }
    for (let i = 0; i < svg.childNodes.length; i++) {
      const node = svg.childNodes.item(i);
      if (node.nodeName === "path") {
        ret.push(node.getAttribute("d"));
      }
    }
    resolve(ret);
  });
}
function expandCVGToSVGElement(cvg) {
  return new Promise((resolve, reject) => {
    if (!cvg || !Array.isArray(cvg) || cvg.length === 0)
      return reject(new TypeError("expandCVGToSVGElement requires valid CVG definition as an input"));
    const svg = document.createElementNS(SVGNS2, "svg");
    if (typeof cvg[0] === "string") {
      svg.setAttribute("viewport", cvg[0]);
    } else if (Array.isArray(cvg[0])) {
      if (cvg[0].length === 2) {
        const [w, h] = cvg[0];
        svg.setAttribute("viewport", `0 0 ${w} ${h}`);
      } else if (cvg[0].length === 4) {
        const [x, y, w, h] = cvg[0];
        svg.setAttribute("viewport", `${x} ${y} ${w} ${h}`);
      } else {
        throw new TypeError("invalid CVG, viewport declaration has incorrect number of elements");
      }
    } else if (typeof cvg[0] === "object") {
      for (const attr in cvg[0])
        svg.setAttribute(attr, cvg[0][attr].toString());
    } else {
      throw new TypeError("invalid CVG, incorrect root declaration");
    }
    for (let i = 1; i < cvg.length; i++) {
      const child = cvg[i];
      if (typeof child === "string") {
        const el = document.createElementNS(SVGNS2, "path");
        el.setAttribute("d", child);
        svg.appendChild(el);
      } else if (Array.isArray(child)) {
        if (child.length < 2)
          throw new TypeError(`invalid CVG, element ${i - 1} is too small`);
        const [tag, attrs, innerText] = child;
        const el = document.createElementNS(SVGNS2, tag);
        for (const attr in attrs)
          el.setAttribute(attr, attrs[attr].toString());
        if (innerText && innerText.length > 0)
          el.append(innerText);
        svg.appendChild(el);
      } else {
        throw new TypeError(`invalid CVG, element ${i - 1} does not have the right type`);
      }
    }
  });
}
export {
  compressSVGElement,
  expandCVGToSVGCode,
  expandCVGToSVGElement
};
/**
 * CVG - Compressed Vector Graphics
 * --------------------------------
 * 
 * Defines the common functionality shared between all platforms
 * 
 * @module CVG
 * @author Chris Pikul
 * @copyright 2024 Novafex Technologies
 * @license MIT
 */
/**
 * CVG - Compressed Vector Graphics
 * --------------------------------
 * 
 * Defines the browser DOM specific functionality
 * 
 * @module CVG
 * @author Chris Pikul
 * @copyright 2024 Novafex Technologies
 * @license MIT
*/
//# sourceMappingURL=browser.js.map