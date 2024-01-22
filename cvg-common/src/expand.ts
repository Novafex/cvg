import type { CVG, CVGChild, Unit } from './types';

const SVGNS = "http://www.w3.org/2000/svg";

/**
 * Expands CVG objects into SVG source code. This returns text instead of nodes
 * for use in Node or other non-browser environments.
 * 
 * @see {@link expandCVG} for expanding to a DOM node instead.
 * @param input Input CVG object
 * @param withXMLDecl Whether to include the initial document type XML declaration
 * @returns string of SVG code, non-formatted
 */
export function expandCVGToCode(input: CVG, withXMLDecl = false): string {
    if (!input || !Array.isArray(input) || input.length === 0)
        throw new TypeError('invalid CVG argument in expandCVGToCode');

    const nodes: string[] = [];

    if (withXMLDecl)
        nodes.push('<?xml version="1.0"?>');

    // Handle the root declaration, which is first portion
    if (typeof input[0] === 'string') {
        // String is a viewport declaration
        nodes.push(`<svg xmlns="${SVGNS}" viewport="${input[0]}">`);
    } else if (Array.isArray(input[0])) {
        // Array is a viewport declaration as well, but in parts
        if (input[0].length === 2) {
            // Short form
            const [ w, h ] = input[0];
            nodes.push(`<svg xmlns="${SVGNS}" viewport="0 0 ${w} ${h}">`);
        } else if (input[0].length === 4) {
            // Long form
            const [ x, y, w, h ] = input[0];
            nodes.push(`<svg xmlns="${SVGNS}" viewport="${x} ${y} ${w} ${h}">`);
        } else {
            throw new TypeError('invalid CVG, viewport declaration has incorrect number of elements');
        }
    } else if (typeof input[0] === 'object') {
        // Object is a list of attributes for the root tag
        nodes.push(`<svg xmlns="${SVGNS}"`);
        for (const attr in input[0]) {
            nodes.push(` ${attr}="${(input[0] as Record<string, Unit>)[attr].toString()}"`);
        }
        nodes.push('>');
    } else {
        throw new TypeError('invalid CVG, incorrect root declaration');
    }

    // Go through the remaining children
    for (let i=1; i < input.length; i++) {
        const child = input[i] as CVGChild;
        if (typeof child === 'string') {
            // String only is a path definition
            nodes.push(`<path d="${child}"/>`);
        } else if (Array.isArray(child)) {
            // Arrays are custom element definitions with more "meat"
            if (child.length < 2)
                throw new TypeError(`invalid CVG, element ${i-1} is too small`);
            
            const [ tag, attrs, innerText ] = child;
            nodes.push(`<${tag} `);

            for (const attr in attrs)
                nodes.push(` ${attr}="${attrs[attr].toString()}"`);
            
            if (innerText && innerText.length > 0)
                nodes.push(`>${innerText}</${tag}>`);
            else
                nodes.push('/>');
        } else {
            throw new TypeError(`invalid CVG, element ${i-1} does not have the right type`);
        }
    }

    nodes.push('</svg>');
    return nodes.join('');
}

/**
 * Expands CVG objects into SVG DOM nodes. This returns a {@link SVGElement} that
 * is ready for use inside the DOM.
 * 
 * @see {@link expandCVGToCode} for non-DOM source code instead
 * @param input Input CVG object
 * @returns SVG DOM node
 */
export function expandCVG(input: CVG): SVGElement {
    if (!document) throw new Error('cannot expand CVG without "document" available, ensure you are running in a browser environment');
    const svg = document.createElementNS(SVGNS, "svg") as SVGElement;

    // Handle the root declaration, which is first portion
    if (typeof input[0] === 'string') {
        // String is a viewport declaration
        svg.setAttribute("viewport", input[0]);
    } else if (Array.isArray(input[0])) {
        // Array is a viewport declaration as well, but in parts
        if (input[0].length === 2) {
            // Short form
            const [ w, h ] = input[0];
            svg.setAttribute("viewport", `0 0 ${w} ${h}`);
        } else if (input[0].length === 4) {
            // Long form
            const [ x, y, w, h ] = input[0];
            svg.setAttribute("viewport", `${x} ${y} ${w} ${h}`);
        } else {
            throw new TypeError('invalid CVG, viewport declaration has incorrect number of elements');
        }
    } else if (typeof input[0] === 'object') {
        // Object is a list of attributes for the root tag
        for (const attr in input[0])
            svg.setAttribute(attr, (input[0] as Record<string, Unit>)[attr].toString());
    } else {
        throw new TypeError('invalid CVG, incorrect root declaration');
    }

    // Go through the remaining children
    for (let i=1; i < input.length; i++) {
        const child = input[i] as CVGChild;
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

    return svg;
}