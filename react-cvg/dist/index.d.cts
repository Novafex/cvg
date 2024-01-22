import * as react from 'react';
import { ReactNode } from 'react';
import { CVG as CVG$1 } from '@novafex/cvg';

/**
 * Properties for a CVG element
 */
type CVGProps = {
    /**
     * Definition for the CVG, accepting the CVG `object` as `JSON.parse` would
     * produce from reading the file.
     */
    def: CVG$1;
};
/**
 * Component which expands (hydrates) compressed vector graphics definition into
 * SVG. It memoizes the results to help speed up future renders.
 *
 * @component
 * @param props.def CVG definition object (required)
 */
declare function CVG(props: CVGProps): react.ReactNode;

/**
 * Expands CVG objects into SVG DOM nodes. This returns a {@link SVGElement} that
 * is ready for use inside the DOM.
 *
 * @see {@link expandCVGToCode} for non-DOM source code instead
 * @param input Input CVG object
 * @returns SVG DOM node
 */
declare function expandCVG(input: CVG$1): ReactNode;
declare function useExpandedCVG(def: CVG$1): ReactNode;

export { CVG as default, expandCVG, useExpandedCVG };
