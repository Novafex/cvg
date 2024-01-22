#!/usr/bin/env node

import { Command } from 'commander';

import compress from './compress';

const program = new Command("cvg")
    .version("0.1.0")
    .description("Parsing and generating optimized vector graphics based on authored SVG input files")
    .addCommand(compress);
    
program.parse(process.argv); 