import { Command } from "commander";

import compress from './compress.js';
import expand from "./expand.js";

const program = new Command("cvg")
    .version("0.1.0")
    .description("Parsing and generating optimized vector graphics based on authored SVG input files")
    .addCommand(compress)
    .addCommand(expand);

program.parse(process.argv); 