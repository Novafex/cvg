import { CVG } from './generic.js';
export { CVGChild, CVGElement, CVGElementAttributes, CVGRoot, CVGRootAttributeAspect, CVGRootAttributeAspectAxis, CVGRootAttributeAspectOp, CVGRootAttributeDimensions, CVGRootAttributePosition, CVGRootAttributeViewport, CVGRootAttributes, CVGViewport, CVGViewportAll, CVGViewportShort, Unit } from './generic.js';

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

export { CVG, compressSVGElement, parseSVGString };
