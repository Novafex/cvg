import { C as CVG } from './common-TzcOcuYs.js';
export { o as CVGChild, n as CVGElement, m as CVGElementAttributes, l as CVGRoot, h as CVGRootAttributeAspect, f as CVGRootAttributeAspectAxis, g as CVGRootAttributeAspectOp, d as CVGRootAttributeDimensions, i as CVGRootAttributePosition, j as CVGRootAttributeViewport, k as CVGRootAttributes, c as CVGViewport, a as CVGViewportAll, b as CVGViewportShort, U as Unit, e as expandCVGToSVGCode } from './common-TzcOcuYs.js';

/**
 * Parses the incoming XML source code into a DOM Document using `xmldom`.
 *
 * @param input XML input source
 * @returns DOM Document
 */
declare function parseSVGString(input: string): Promise<Document>;
/**
 * Compresses the given SVG DOM element into a {@link CVG} definition object.
 *
 * @see {@link parseFromString} for parsing of SVG strings
 * @param svg Incoming SVG element as a DOM Element
 */
declare function compressSVGElement(svg: Element): Promise<CVG>;
/**
 * Compresses the given SVG source code into CVG. It uses both the
 * {@link parseSVGString} and {@link compressSVGElement} functions to do so.
 * Internally this uses a DOM-style library to walk the element.
 *
 * @param code SVG source code
 * @returns Promise resolving to CVG
 * @throws on any parsing errors
 */
declare function compressSVGCodeToCVG(code: string): Promise<CVG>;

export { CVG, compressSVGCodeToCVG, compressSVGElement, parseSVGString };
