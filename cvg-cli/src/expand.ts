import { Command } from 'commander';

function action() {
}

export default new Command("expand")
    .description("transform compact CVG into SVG")
    .arguments("[globs...]")
    .action(action);
