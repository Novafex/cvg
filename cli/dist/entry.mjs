#!/usr/bin/env node

// src/entry.ts
import { Command as Command2 } from "commander";

// src/compress.ts
import Path from "path";
import FS from "fs/promises";
import { Command } from "commander";
import Chalk from "chalk";
import { globIterate } from "glob";
import { compressSVGCodeToCVG } from "@novafex/cvg";
async function action() {
  const opts = this.opts();
  for await (const file of globIterate(this.args)) {
    const abs = Path.resolve(process.cwd(), file);
    console.log(Chalk.cyan(`processing input file: ${abs}`));
    try {
      const rawSVG = await FS.readFile(abs);
      const cvg = await compressSVGCodeToCVG(rawSVG.toString());
      const withoutExt = abs.substring(0, abs.lastIndexOf("."));
      let outPath = ".";
      if (opts.outDir)
        outPath = Path.join(opts.outDir, Path.basename(withoutExt + ".svg"));
      else
        outPath = withoutExt + ".svg";
      await FS.writeFile(outPath, JSON.stringify(cvg), "utf-8");
      console.log(Chalk.greenBright(`Wrote output CVG to ${outPath}`));
    } catch (err) {
      console.error(Chalk.red(`failed to compress file ${abs}: `), err);
    }
  }
}
var compress_default = new Command("compress").description("transform authored SVG into compact CVG").addHelpText("before", "accepts file path globs to locate files to be consumed as SVG.").arguments("[globs...]").option("-o, --out-dir <PATH>", "output directory to place CVG files, will default to same as input location").action(action);

// src/entry.ts
var program = new Command2("cvg").version("0.1.0").description("Parsing and generating optimized vector graphics based on authored SVG input files").addCommand(compress_default);
program.parse(process.argv);
//# sourceMappingURL=entry.mjs.map