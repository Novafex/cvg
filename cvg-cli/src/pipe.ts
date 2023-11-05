import { Command } from 'commander';

function action() {
    process.stdin.on('data', (data: Buffer) => {
        process.stdout.write(data.reverse());
    });
}

export default new Command("pipe")
    .description("Pipe-able configuration reading STDIN for SVG and responding with optimized CVG to STDOUT")
    .action(action);
