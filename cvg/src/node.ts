/**
 * CVG - Compressed Vector Graphics
 * --------------------------------
 * 
 * Defines the node specific functionality
 * 
 * @module CVG
 * @author Chris Pikul
 * @copyright 2024 Novafex Technologies
 * @license MIT
 */
import { DOMParser } from 'xmldom';
import type { CVG, CVGRootAttributeAspect } from './types';

/**
 * Parses the incoming XML source code into a DOM Document using `xmldom`.
 * 
 * @param input XML input source
 * @returns DOM Document 
 */
export function parseSVGString(input: string): Promise<Document> {
    return new Promise<Document>((resolve, reject) => {
        const parser = new DOMParser({
            locator: {},
            errorHandler: reject,
        });
        const doc = parser.parseFromString(input, 'image/svg+xml');
        resolve(doc);
    });
}

/**
 * Compresses the given SVG DOM element into a {@link CVG} definition object.
 * 
 * @see {@link parseFromString} for parsing of SVG strings
 * @param svg Incoming SVG element as a DOM Element
 */
export function compressSVGElement(svg: Element): Promise<CVG> {
    return new Promise<CVG>((resolve, reject) => {
        if (svg.tagName !== 'svg')
            return reject(new Error('expected root element to be a svg tag'));

        const ret: CVG = [{}];
        // Check if viewbox
        if (svg.hasAttribute('viewBox')) {
            const [ x, y, w, h ] = (svg.getAttribute('viewBox') as string).split(' ');

            // Check if we need the start
            if (x != "0" || y != "0")
                ret[0] = [parseInt(x), parseInt(y), parseInt(w), parseInt(h)];
            else
                ret[0] = [parseInt(w), parseInt(h)];

            // See if we need to use a full attribute object
            if (svg.hasAttribute('preserveAspectRatio') || svg.hasAttribute('x') || svg.hasAttribute('y')) {
                ret[0] = {
                    viewport: `${x} ${y} ${w} ${h}`,
                };

                if (svg.hasAttribute('preserveAspectRatio'))
                    ret[0].preserveAspectRatio = svg.getAttribute('preserveAspectRatio') as CVGRootAttributeAspect['preserveAspectRatio'];

                if (svg.hasAttribute('x'))
                    ret[0].x = svg.getAttribute('x') as string;

                if (svg.hasAttribute('y'))
                    ret[0].y = svg.getAttribute('y') as string;
            }
        } else if (svg.hasAttribute('width') || svg.hasAttribute('height')) {
            ret[0] = {
                width: parseInt(svg.getAttribute('width') ?? svg.getAttribute('height') as string),
                height: parseInt(svg.getAttribute('height') ?? svg.getAttribute('width') as string),
            };

            if (svg.hasAttribute('preserveAspectRatio'))
                ret[0].preserveAspectRatio = svg.getAttribute('preserveAspectRatio') as CVGRootAttributeAspect['preserveAspectRatio'];

            if (svg.hasAttribute('x'))
                ret[0].x = svg.getAttribute('x') as string;

            if (svg.hasAttribute('y'))
                ret[0].y = svg.getAttribute('y') as string;
        }

        for (let i=0; i < svg.childNodes.length; i++) {
            const node = svg.childNodes.item(i);

            if (node.nodeName === 'path') {
                ret.push((node as Element).getAttribute('d') as string);
            }
        }

        resolve(ret);
    });
}

/**
 * Expands the given CVG definition into a SVG DOM Element.
 * 
 * @param cvg Incoming CVG object defining the graphic
 * @returns Promise resolving to an `Element`
 */
export function expandCVGToSVGElement(cvg: CVG): Promise<Element> {
    return new Promise<Element>(() => {
        throw new Error('not implemented yet');
    });
}

export type * from './types';
