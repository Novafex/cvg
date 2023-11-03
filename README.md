# CVG - Compact Vector Graphics

Compact Vector Graphics, a way to make SVG graphics even smaller but still available for web and React. SVG is an XML based format and with that comes a lot of bloat for
things that are generally unncessary in the actual presentation and rendering of vector graphics. For authoring, using editors like Illustrator or Boxy, this format can
be useful. While SVG is still significantly smaller than rasterized formats such as PNG, or JPEG, it can still be even smaller. It is very common to package icon libraries
in bundles for web based applications, and this even stretches to native via React Native projects. We can make those bundles much much smaller with CVG by removing the
un-neccessary formatting directives and delivering a format that compresses well. Sending CVG over the wire in network calls can save bandwidth compared to traditional
formats.

## How Does It Work?

Essentially, all the extra fluff is removed from SVG and it is compressed down into a JSON format. JSON was chosen for the initial format since it is native to web and
JavaScript based systems, allowing for existing tools like TypeScript to handle it
well. When received by the frontend system it is "re-hydrated" back to SVG by filling in all the standard props.

An assumption on authoring the original SVG images is made in order to make the most
of CVG. Path only graphics work best and deliver more consistant iconography. Usages
of CSS and special gradients should be avoided. **CVG is targetting icon libraries**
which feature simpler vector graphic objects.

To compress even further, [SVGO](https://github.com/svg/svgo) will optimize the initial SVG before final compression.

There are plans to enhance the CVG format even further with another format for binary encoding of CVG called BCVG that will be included in this package.

## Credits

Created and written by Chris Pikul

## License

MIT License

Copyright (c) 2023 Novafex

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
