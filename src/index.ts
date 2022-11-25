#!/usr/bin/env node

import { Command } from 'commander';
import { initDocs } from './init-docs';
import { jsdocToMd } from './jsdoc-to-md';
import { startVitePress, buildVitePress } from './md-to-vitepress';

const program = new Command();

program
  .name('jsdoc2vitepress')
  .description('Generates vitepress API documentation from jsdoc annotated source code.')
  .version('1.0.0');

program
  .command('init')
  .description('init vitepress directory.')
  .action(async () => {
    await initDocs();
  });

program
  .command('start')
  .description('Generates vitepress API documentation from jsdoc annotated source code and run Vitepress')
  .action(async () => {
    await jsdocToMd();
    await new Promise(resolve => setTimeout(resolve, 5000));
    await startVitePress();
  });

program
  .command('build')
  .description('Generates vitepress API documentation from jsdoc annotated source code and build Vitepress')
  .action(async () => {
    await jsdocToMd();
    await new Promise(resolve => setTimeout(resolve, 5000));
    await buildVitePress();
  });

program.parse();
