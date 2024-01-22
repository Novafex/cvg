"use strict";Object.defineProperty(exports, "__esModule", {value: true});// src/expand.tsx
var _react = require('react');
function expandCVG(input) {
  const rootAttrs = {};
  if (typeof input[0] === "string") {
    rootAttrs.viewport = input[0];
  } else if (Array.isArray(input[0])) {
    if (input[0].length === 2) {
      const [w, h] = input[0];
      rootAttrs.viewport = `0 0 ${w} ${h}`;
    } else if (input[0].length === 4) {
      const [x, y, w, h] = input[0];
      rootAttrs.viewport = `${x} ${y} ${w} ${h}`;
    } else {
      throw new TypeError("invalid CVG, viewport declaration has incorrect number of elements");
    }
  } else if (typeof input[0] === "object") {
    for (const attr in input[0])
      rootAttrs[attr] = input[0][attr].toString();
  } else {
    throw new TypeError("invalid CVG, incorrect root declaration");
  }
  const children = [];
  for (let i = 1; i < input.length; i++) {
    const child = input[i];
    if (typeof child === "string") {
      children.push(/* @__PURE__ */ React.createElement("path", { d: child }));
    } else if (Array.isArray(child)) {
      if (child.length < 2)
        throw new TypeError(`invalid CVG, element ${i - 1} is too small`);
      const [tag, attrs, innerText] = child;
      children.push(_react.createElement.call(void 0, tag, {
        ...attrs
      }, innerText && innerText.length > 0 ? innerText : null));
    } else {
      throw new TypeError(`invalid CVG, element ${i - 1} does not have the right type`);
    }
  }
  return _react.createElement.call(void 0, "svg", rootAttrs, children);
}
function useExpandedCVG(def) {
  return _react.useMemo.call(void 0, () => expandCVG(def), [def]);
}

// src/cvg.tsx
function CVG(props) {
  const svg = useExpandedCVG(props.def);
  return svg;
}

// src/index.ts
var src_default = CVG;




exports.default = src_default; exports.expandCVG = expandCVG; exports.useExpandedCVG = useExpandedCVG;
//# sourceMappingURL=index.js.map