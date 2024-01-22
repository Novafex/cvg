import { C as CVG } from './common-TzcOcuYs.js';
export { o as CVGChild, n as CVGElement, m as CVGElementAttributes, l as CVGRoot, h as CVGRootAttributeAspect, f as CVGRootAttributeAspectAxis, g as CVGRootAttributeAspectOp, d as CVGRootAttributeDimensions, i as CVGRootAttributePosition, j as CVGRootAttributeViewport, k as CVGRootAttributes, c as CVGViewport, a as CVGViewportAll, b as CVGViewportShort, U as Unit, e as expandCVGToSVGCode } from './common-TzcOcuYs.js';

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

/**
 * Compresses a DOM SVG element into CVG definition object
 *
 * @param svg Incoming {@link SVGElement} DOM node
 * @returns Promise resolving to a {@link CVG} definition object
 */
declare function compressSVGElement(svg: SVGElement): Promise<CVG>;
/**
 * Expands CVG into a DOM-ready SVG element.
 *
 * @see {@link expandCVGToSVGCode} to produce string source-code instead
 * @param cvg Input {@link CVG} definition
 * @returns Promise resolving to a {@link SVGElement} DOM node.
 */
declare function expandCVGToSVGElement(cvg: CVG): Promise<SVGElement>;

export { CVG, compressSVGElement, expandCVGToSVGElement };
