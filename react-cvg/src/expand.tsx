import type { CVG, CVGChild, Unit } from '@novafex/cvg';
import { createElement, useMemo, type ReactNode } from "react";

/**
 * Expands CVG objects into SVG DOM nodes. This returns a {@link SVGElement} that
 * is ready for use inside the DOM.
 * 
 * @see {@link expandCVGToCode} for non-DOM source code instead
 * @param input Input CVG object
 * @returns SVG DOM node
 */
export function expandCVG(input: CVG): ReactNode {
    if (!input || !Array.isArray(input)) {
        console.error('CVG requires a definition file, but none was supplied');
        return null;
    }
    
    // Start with the root portion
    const rootAttrs: Record<string, string> = {};

    if (typeof input[0] === 'string') {
        // String is a viewport declaration
        rootAttrs.viewport = input[0];
    } else if (Array.isArray(input[0])) {
        // Array is a viewport declaration as well, but in parts
        if (input[0].length === 2) {
            // Short form
            const [ w, h ] = input[0];
            rootAttrs.viewport = `0 0 ${w} ${h}`;
        } else if (input[0].length === 4) {
            // Long form
            const [ x, y, w, h ] = input[0];
            rootAttrs.viewport = `${x} ${y} ${w} ${h}`;
        } else {
            throw new TypeError('invalid CVG, viewport declaration has incorrect number of elements');
        }
    } else if (typeof input[0] === 'object') {
        // Object is a list of attributes for the root tag
        for (const attr in input[0])
            rootAttrs[attr] = (input[0] as Record<string, Unit>)[attr].toString();
    } else {
        throw new TypeError('invalid CVG, incorrect root declaration');
    }

    const children: ReactNode[] = [];

    // Go through the remaining children
    for (let i=1; i < input.length; i++) {
        const child = input[i] as CVGChild;
        if (typeof child === 'string') {
            // String only is a path definition
            children.push(<path d={child} />);
        } else if (Array.isArray(child)) {
            // Arrays are custom element definitions with more "meat"
            if (child.length < 2)
                throw new TypeError(`invalid CVG, element ${i-1} is too small`);
            
            const [ tag, attrs, innerText ] = child;

            children.push(createElement(tag, {
                ...attrs,
            }, (innerText && innerText.length > 0) ? innerText : null))
        } else {
            throw new TypeError(`invalid CVG, element ${i-1} does not have the right type`);
        }
    }

    // Build the final root
    return createElement('svg', rootAttrs, children);
}

export function useExpandedCVG(def: CVG): ReactNode {
    return useMemo(() => expandCVG(def), [def]);
}