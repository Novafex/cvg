# React CVG

[Compressed Vector Graphics (CVG)](https://github.com/novafex/cvg) is an
alternative format for encoding vector graphics which is based on
interoperability with SVG. Essentially, it transforms SVG for optimized 
over-the-wire transmission, and usage within JavaScript environments. It does 
this by converting SVG's XML nodes into a JSON structure with some liberties 
taken in flexibility for short-hand declarations.

> [!WARNING]
> Not for production use yet as it is still a heavy work-in-progress.

```console
npm install --save @novafex/react-cvg
yarn add @novafex/react-cvg
```

## Usage

This library provides one component `CVG` which takes a single prop `def`. Use
this prop to supply the CVG definition object and the component will expand it
to browser-ready SVG. This process is memoized to prevent accidental re-renders
from taking too many frames.

If you need to generate CVG from SVG it is recommended to do this before-hand and
load the CVG over-the-wire via `JSON.parse()`. The `@novafex/cvg` library is
available as well which can help generate the CVG if you need to.

To generate it before hand, it is recommended to use the `@novafex/cvg-cli` tool
in your console to consume SVG files. Otherwise, [Tacklebox](https://tacklebox.novafex.tech)
can also do this for you.

## Credits

Created and written by Chris Pikul

## License

MIT License

Copyright (c) 2024 Novafex Technologies

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
