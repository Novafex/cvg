
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
import type { CVG, CVGChild, CVGRootAttributeAspect, Unit } from './types';

const SVGNS = "http://www.w3.org/2000/svg";

/**
 * Compresses a DOM SVG element into CVG definition object
 * 
 * @param svg Incoming {@link SVGElement} DOM node
 * @returns Promise resolving to a {@link CVG} definition object
 */
export function compressSVGElement(svg: SVGElement): Promise<CVG> {
    return new Promise<CVG>((resolve, reject) => {
        if (!svg || !(svg instanceof SVGElement) || svg.tagName !== 'svg')
            return reject(new TypeError('compressSVGElement must be provided a SVGElement object'));

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

        // All done, return the results
        resolve(ret);
    });
}

/**
 * Expands CVG into a DOM-ready SVG element.
 * 
 * @see {@link expandCVGToSVGCode} to produce string source-code instead
 * @param cvg Input {@link CVG} definition
 * @returns Promise resolving to a {@link SVGElement} DOM node.
 */
export function expandCVGToSVGElement(cvg: CVG): Promise<SVGElement> {
    return new Promise<SVGElement>((resolve, reject) => {
        if (!cvg || !Array.isArray(cvg) || cvg.length === 0)
            return reject(new TypeError('expandCVGToSVGElement requires valid CVG definition as an input'));

        const svg = document.createElementNS(SVGNS, "svg") as SVGElement;

        // Handle the root declaration, which is first portion
        if (typeof cvg[0] === 'string') {
            // String is a viewport declaration
            svg.setAttribute("viewport", cvg[0]);
        } else if (Array.isArray(cvg[0])) {
            // Array is a viewport declaration as well, but in parts
            if (cvg[0].length === 2) {
                // Short form
                const [ w, h ] = cvg[0];
                svg.setAttribute("viewport", `0 0 ${w} ${h}`);
            } else if (cvg[0].length === 4) {
                // Long form
                const [ x, y, w, h ] = cvg[0];
                svg.setAttribute("viewport", `${x} ${y} ${w} ${h}`);
            } else {
                throw new TypeError('invalid CVG, viewport declaration has incorrect number of elements');
            }
        } else if (typeof cvg[0] === 'object') {
            // Object is a list of attributes for the root tag
            for (const attr in cvg[0])
                svg.setAttribute(attr, (cvg[0] as Record<string, Unit>)[attr].toString());
        } else {
            throw new TypeError('invalid CVG, incorrect root declaration');
        }
    
        // Go through the remaining children
        for (let i=1; i < cvg.length; i++) {
            const child = cvg[i] as CVGChild;
            if (typeof child === 'string') {
                // String only is a path definition
                const el = document.createElementNS(SVGNS, 'path');
                el.setAttribute('d', child);
                svg.appendChild(el);
            } else if (Array.isArray(child)) {
                // Arrays are custom element definitions with more "meat"
                if (child.length < 2)
                    throw new TypeError(`invalid CVG, element ${i-1} is too small`);
                
                const [ tag, attrs, innerText ] = child;
                const el = document.createElementNS(SVGNS, tag);
    
                for (const attr in attrs)
                    el.setAttribute(attr, attrs[attr].toString());
                
                if (innerText && innerText.length > 0)
                    el.append(innerText);
                svg.appendChild(el);
            } else {
                throw new TypeError(`invalid CVG, element ${i-1} does not have the right type`);
            }
        }
    });
}

export { expandCVGToSVGCode } from './common';

export type * from './types';