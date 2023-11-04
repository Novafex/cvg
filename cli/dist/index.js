import { Command } from "commander";
import pipe from "./pipe.js";
const program = new Command("cvg")
    .version("0.1.0")
    .description("Parsing and generating optimized vector graphics based on authored SVG input files")
    .addCommand(pipe);
console.log("starting cvg");
program.parse(process.argv);
//# sourceMappingURL=index.js.map