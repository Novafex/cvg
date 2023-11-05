import { Command } from 'commander';
import Chalk from 'chalk';
function action() {
    const opts = this.opts();
    if (opts.pipe) {
        console.log(Chalk.blue('awaiting SVG input from STDIN...'));
    }
    else {
        console.log(Chalk.blue('finding files matching provided glob patterns...'));
    }
}
export default new Command("compress")
    .description("transform authored SVG into compact CVG")
    .addHelpText('before', 'accepts file path globs to locate files to be consumed as SVG.')
    .arguments("[globs...]")
    .option('-o, --out-dir <PATH>', 'output directory to place CVG files, will default to same as input location')
    .option('-p, --pipe', 'watches STDIN for SVG input and responds with CVG output', false)
    .action(action);
//# sourceMappingURL=compress.js.map