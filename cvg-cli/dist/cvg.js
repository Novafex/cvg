import { DOMParser } from 'xmldom';
export function parseSVG(input) {
    return new Promise((resolve, reject) => resolve(new DOMParser({
        locator: {},
        errorHandler: reject,
    }).parseFromString(input, 'image/svg+xml')));
}
export function svgToCVG(svg) {
    return new Promise((resolve, reject) => {
        if (svg.tagName !== 'svg')
            return reject(new Error('expected root element to be a svg tag'));
        const ret = [{}];
        // Check if viewbox
        if (svg.hasAttribute('viewBox')) {
            const [x, y, w, h] = svg.getAttribute('viewBox').split(' ');
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
                    ret[0].preserveAspectRatio = svg.getAttribute('preserveAspectRatio');
                if (svg.hasAttribute('x'))
                    ret[0].x = svg.getAttribute('x');
                if (svg.hasAttribute('y'))
                    ret[0].y = svg.getAttribute('y');
            }
        }
        else if (svg.hasAttribute('width') || svg.hasAttribute('height')) {
            ret[0] = {
                width: parseInt(svg.getAttribute('width') ?? svg.getAttribute('height')),
                height: parseInt(svg.getAttribute('height') ?? svg.getAttribute('width')),
            };
            if (svg.hasAttribute('preserveAspectRatio'))
                ret[0].preserveAspectRatio = svg.getAttribute('preserveAspectRatio');
            if (svg.hasAttribute('x'))
                ret[0].x = svg.getAttribute('x');
            if (svg.hasAttribute('y'))
                ret[0].y = svg.getAttribute('y');
        }
        for (let i = 0; i < svg.childNodes.length; i++) {
            const node = svg.childNodes.item(i);
            if (node.nodeName === 'path') {
                ret.push(node.getAttribute('d'));
            }
        }
        resolve(ret);
    });
}
//# sourceMappingURL=cvg.js.map