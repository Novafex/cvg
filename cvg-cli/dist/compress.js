import { Command } from 'commander';
import Chalk from 'chalk';
import { globIterate } from 'glob';
import Path from 'path';
import FS from 'fs/promises';
import { parseSVG, svgToCVG } from './cvg.js';
async function action() {
    const opts = this.opts();
    for await (const file of globIterate(this.args)) {
        const abs = Path.resolve(process.cwd(), file);
        console.log(Chalk.cyan(`processing input file: ${abs}`));
        try {
            const rawSVG = await FS.readFile(abs);
            const svg = await parseSVG(rawSVG.toString());
            if (!svg || !svg.documentElement)
                throw new Error('invalid input, no valid DOM found');
            const cvg = await svgToCVG(svg.documentElement);
            const withoutExt = abs.substring(0, abs.lastIndexOf('.'));
            let outPath = '.';
            if (opts.outDir)
                outPath = Path.join(opts.outDir, withoutExt + '.svg');
            else
                outPath = withoutExt + '.svg';
            await FS.writeFile(outPath, JSON.stringify(cvg), 'utf-8');
            console.log(Chalk.greenBright(`Wrote output CVG to ${outPath}`));
        }
        catch (err) {
            console.error(Chalk.red(`failed to compress file ${abs}: `), err);
        }
    }
}
export default new Command("compress")
    .description("transform authored SVG into compact CVG")
    .addHelpText('before', 'accepts file path globs to locate files to be consumed as SVG.')
    .arguments("[globs...]")
    .option('-o, --out-dir <PATH>', 'output directory to place CVG files, will default to same as input location')
    // .option('-p, --pipe', 'watches STDIN for SVG input and responds with CVG output', false)
    .action(action);
//# sourceMappingURL=compress.js.map