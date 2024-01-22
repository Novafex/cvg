import { Command } from 'commander';
import Chalk from 'chalk';
import { globIterate } from 'glob';
import Path from 'path';
import FS from 'fs/promises';
import { expandCVGToCode } from 'cvg-common';
async function action() {
    const opts = this.opts();
    for await (const file of globIterate(this.args)) {
        const abs = Path.resolve(process.cwd(), file);
        console.log(Chalk.cyan(`processing input file: ${abs}`));
        try {
            const rawCVG = await FS.readFile(abs);
            const cvg = JSON.parse(rawCVG.toString());
            const svg = expandCVGToCode(cvg, true);
            const withoutExt = abs.substring(0, abs.lastIndexOf('.'));
            let outPath = '.';
            if (opts.outDir)
                outPath = Path.join(opts.outDir, Path.basename(withoutExt + '.svg'));
            else
                outPath = withoutExt + '.svg';
            await FS.writeFile(outPath, svg, 'utf-8');
            console.log(Chalk.greenBright(`Wrote output SVG to ${outPath}`));
        }
        catch (err) {
            console.error(Chalk.red(`failed to expand file ${abs}: `), err);
        }
    }
}
export default new Command("expand")
    .description("transform compact CVG into SVG")
    .arguments("[globs...]")
    .option('-o, --out-dir <PATH>', 'output directory to place CVG files, will default to same as input location')
    .action(action);
//# sourceMappingURL=expand.js.map