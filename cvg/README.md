# CVG - Compressed Vector Graphics

Compressed Vector Graphics (CVG) is an alternative format for encoding vector
graphics which is based on interoperability with SVG. Essentially, it transforms
SVG for optimized over-the-wire transmission, and usage within JavaScript
environments. It does this by converting SVG's XML nodes into a JSON structure
with some liberties taken in flexibility for short-hand declarations.

> [!WARNING]
> Not for production use yet as it is still a heavy work-in-progress.

## Implementations

It's suggested to use the [CLI](https://github.com/novafex/cvg/cvg-cli) for use
in transforming files locally in your shell. For [React](https://react.dev) projects
there is a simple component [react-cvg](https://github.com/novafex/cvg/react-cvg)
which expands CVG into the SVG for use in browsers.

## Format

The CVG format is based on JSON objects makes heavy usage of tuples and dynamic
types. There are TypeScript definitions for use with other libraries as well that
will help.

A CVG "definition" is held as an array, the first element is the _root declaration_
which declares the attributes within the root SVG node. After the root declaration,
the remaining elements are children of the root node.

### Root Declaration

The root declaration accepts variable types depending on how much definition is
needed. As is the whole point of CVG, using the least amount of information is
the target.

```
CVGRoot = CVGViewport | object
CVGViewport = string | [number, number] | [number, number, number, number]
```

- `string` will use the contents as the `viewport` attribute on the root node.
- `[number, number]` interprets as `[width, height]` for the viewport attribute
    and will set the position parts as 0.
- `[number, number, number, number]` interprets as `[x, y, width, height]` and
    will construct the viewport attribute using all values.
- `object` should be a string indexible object in which each attribute is declared
    as properties in it. They are passed through directly.

### Children

After the [root declaration](#root-declaration), the remaining elements in the
CVG definition are considered children of the root element and define the parts
of the graphic.

```
CVGChild = string | CVGElement
CVGElement = [ string, object, string? ]
```

If the child is a `string` type, it is treated as short-hand for a `path` node
with a `d` path definition being supplied by the string. This makes it easier
for quick path-only icons. The contents of the string are taken directly.

For more flexibility, the element can be declared manually with a tuple containing
looking like `[tag, attributes, innerContent]`. The `tag` is a string representing
the SVG tag name such as "path", or "circle". The attributes object is a string-
indexable record containing the attributes as key/value properties. Finally, the
last `innerContent` portion is for injection of text inside the node and is used
for `style` tags or other text block elements.

> [!WARNING]
> There is a known limitation in which groups and nested elements are not implemented
> yet. They will be added, but the current version does not handle it.

## Credits

Created and written by Chris Pikul

## License

MIT License

Copyright (c) 2023 Novafex Technologies

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
