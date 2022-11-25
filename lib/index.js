#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const init_docs_1 = require("./init-docs");
const jsdoc_to_md_1 = require("./jsdoc-to-md");
const md_to_vitepress_1 = require("./md-to-vitepress");
const program = new commander_1.Command();
program
    .name('jsdoc2vitepress')
    .description('Generates vitepress API documentation from jsdoc annotated source code.')
    .version('1.0.0');
program
    .command('init')
    .description('init vitepress directory.')
    .action(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, init_docs_1.initDocs)();
}));
program
    .command('start')
    .description('Generates vitepress API documentation from jsdoc annotated source code and run Vitepress')
    .action(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, jsdoc_to_md_1.jsdocToMd)();
    yield new Promise(resolve => setTimeout(resolve, 5000));
    yield (0, md_to_vitepress_1.startVitePress)();
}));
program
    .command('build')
    .description('Generates vitepress API documentation from jsdoc annotated source code and build Vitepress')
    .action(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, jsdoc_to_md_1.jsdocToMd)();
    yield new Promise(resolve => setTimeout(resolve, 5000));
    yield (0, md_to_vitepress_1.buildVitePress)();
}));
program.parse();
//# sourceMappingURL=index.js.map