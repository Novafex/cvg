"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  default: () => src_default,
  expandCVG: () => expandCVG,
  useExpandedCVG: () => useExpandedCVG
});
module.exports = __toCommonJS(src_exports);

// src/expand.tsx
var import_react = require("react");
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
      children.push((0, import_react.createElement)(tag, {
        ...attrs
      }, innerText && innerText.length > 0 ? innerText : null));
    } else {
      throw new TypeError(`invalid CVG, element ${i - 1} does not have the right type`);
    }
  }
  return (0, import_react.createElement)("svg", rootAttrs, children);
}
function useExpandedCVG(def) {
  return (0, import_react.useMemo)(() => expandCVG(def), [def]);
}

// src/cvg.tsx
function CVG(props) {
  const svg = useExpandedCVG(props.def);
  return svg;
}

// src/index.ts
var src_default = CVG;
//# sourceMappingURL=index.js.map