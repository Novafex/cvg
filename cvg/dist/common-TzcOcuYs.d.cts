/**
 * CVG TypeScript definitions
 *
 * @module CVG
 * @author Chris Pikul
 * @copyright 2024 Novafex Technologies
 * @license MIT
 */
/**
 * Helper type for a valid unit being either a string, or a number
 */
type Unit = string | number;
/**
 * Declares the viewport dimension parts as a static array of numbers.
 *
 * ```TypeScript
 * const viewport: CVGViewportAll = [ x, y, width, height ];
 * ```
 */
type CVGViewportAll = [number, number, number, number];
/**
 * Declares the viewport dimension parts as a short static array only including
 * the width & height. The x & y parts are defaulted to 0.
 *
 * ```TypeScript
 * const viewport: CVGViewportShort = [ width, height ];
 * ```
 */
type CVGViewportShort = [number, number];
/**
 * Declares the viewport attribute of the root SVG tag. Accepts multiple types.
 *
 * - `string` holding the entire viewport attribute (ex: `"0 0 960 960")
 * - `[width, height]` leaving the x & y defaulted to 0.
 * - `[x, y, width, height]` to declare all fields in numerical format
 */
type CVGViewport = string | CVGViewportShort | CVGViewportAll;
type CVGRootAttributeDimensions = {
    width?: Unit;
    height?: Unit;
};
type CVGRootAttributeAspectAxis = 'none' | 'xMinYMin' | 'xMidYMin' | 'xMaxYMin' | 'xMinYMid' | 'xMidYMid' | 'xMaxYMid' | 'xMinYMax' | 'xMidYMax' | 'xMaxYMax';
type CVGRootAttributeAspectOp = 'meet' | 'slice';
type CVGRootAttributeAspect = {
    preserveAspectRatio?: `${CVGRootAttributeAspectAxis} ${CVGRootAttributeAspectOp}`;
};
type CVGRootAttributePosition = {
    x?: Unit;
    y?: Unit;
};
type CVGRootAttributeViewport = {
    viewport?: string;
};
type CVGRootAttributes = CVGRootAttributeDimensions & CVGRootAttributeAspect & CVGRootAttributePosition & CVGRootAttributeViewport;
/**
 * Declares the options for the root SVG tag when expanded. Can accept a valid
 * viewport type to leave everything else default, or an object declaring
 * attributes to apply instead as key-value pairs.
 */
type CVGRoot = CVGViewport | CVGRootAttributes;
/**
 * Attributes that are part of an element ordered by key-value pairs.
 */
type CVGElementAttributes = {
    [key: string]: string | number;
};
/**
 * Custom element definition for any elements that cannot be quickly asserted.
 *
 * Tuple forming `[ tag, { ...attributes }, innerText? ]`
 *
 * The inner text portion is optional.
 */
type CVGElement = [string, CVGElementAttributes, string?];
/**
 * Any child element of a root SVG tag. When a string is provided, it is treated
 * as a path with the `d` attribute containing the string contents. Otherwise it
 * follows the usual {@link CVGElement} logic.
 */
type CVGChild = string | CVGElement;
/**
 * Definitions for a compressed vector graphics format (CVG). Holds the information
 * needed to expand back to a standard SVG format.
 *
 * Held as a tuple for deconstruction and usage. The first element is always the
 * root declaration and can either be a viewport statement, or an object declaring
 * manual attributes for the SVG.
 *
 * The remaining elements are {@link CVGChild} definitions.
 */
type CVG = [CVGRoot, ...CVGChild[]];

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
 * Expands CVG objects into SVG source code.
 *
 * @see {@link expandCVGToSVGElement} for expanding to a DOM node instead.
 * @param input Input CVG object
 * @param withXMLDecl Whether to include the initial document type XML declaration
 * @returns string of SVG code, non-formatted
 */
declare function expandCVGToSVGCode(input: CVG, withXMLDecl?: boolean): Promise<string>;

export { type CVG as C, type Unit as U, type CVGViewportAll as a, type CVGViewportShort as b, type CVGViewport as c, type CVGRootAttributeDimensions as d, expandCVGToSVGCode as e, type CVGRootAttributeAspectAxis as f, type CVGRootAttributeAspectOp as g, type CVGRootAttributeAspect as h, type CVGRootAttributePosition as i, type CVGRootAttributeViewport as j, type CVGRootAttributes as k, type CVGRoot as l, type CVGElementAttributes as m, type CVGElement as n, type CVGChild as o };
