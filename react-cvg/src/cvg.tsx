import type { CVG as CVGDef } from "./types";
import { useExpandedCVG } from './expand';

/**
 * Properties for a CVG element
 */
export type CVGProps = {
    /**
     * Definition for the CVG, accepting the CVG `object` as `JSON.parse` would
     * produce from reading the file.
     */
    def: CVGDef;
};

/**
 * Component which expands (hydrates) compressed vector graphics definition into
 * SVG. It memoizes the results to help speed up future renders.
 * 
 * @component
 * @param props.def CVG definition object (required)
 */
export default function CVG(props: CVGProps) {
    const svg = useExpandedCVG(props.def);
    return svg;
}