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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsdocToMd = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const jsdoc_to_markdown_1 = __importDefault(require("jsdoc-to-markdown"));
const ora_1 = __importDefault(require("ora"));
const configJ2VPath = path_1.default.resolve(process.cwd(), 'docs', '.vitepress', 'jsdoc2vitepress.config.json');
const configJ2MPath = path_1.default.resolve(process.cwd(), 'docs', '.vitepress', 'jsdoc2md.config.json');
/**
 * @module jsdoc-to-md
 * @description Generates Markdown API documentation from jsdoc annotated source code.
 */
/**
 * @exports jsdocToMd Generates Markdown
 * @returns {Promise} Return promise to check if generate success
 */
const jsdocToMd = () => __awaiter(void 0, void 0, void 0, function* () {
    const loading = (0, ora_1.default)('Generates Markdown');
    try {
        const { markdownDirs } = yield fs_extra_1.default.readJSON(configJ2VPath);
        yield Promise.all(markdownDirs.map((sourceObject) => __awaiter(void 0, void 0, void 0, function* () {
            const { root, output, ingoreList } = sourceObject;
            yield makeMarkDownForFiles(root, output, ingoreList);
        })));
        loading.succeed('Generates Markdown success');
    }
    catch (error) {
        loading.fail(`Generates Markdown fail: ${error}`);
    }
});
exports.jsdocToMd = jsdocToMd;
const makeMarkDownForFiles = (root, output, ingoreList) => __awaiter(void 0, void 0, void 0, function* () {
    const fileList = yield fs_extra_1.default.readdir(root);
    yield Promise.all(fileList.map((fileName) => __awaiter(void 0, void 0, void 0, function* () {
        if (ingoreList.indexOf(fileName) === -1) {
            yield makeMarkDownDoc(fileName, root, output);
        }
    })));
});
const makeMarkDownDoc = (sourceName, sourceRootPath, outputPath) => __awaiter(void 0, void 0, void 0, function* () {
    let sourcePath = `${sourceRootPath}/${sourceName}`;
    const outputName = sourceName.replace('.js', '').replace('.ts', '');
    const loading = (0, ora_1.default)(`Generates Markdown for ${sourcePath}`);
    try {
        // 处理js文件的路径，需要区分是文件或目录，目录会将目录下所有文件生成为一个md
        const stat = fs_extra_1.default.lstatSync(sourcePath);
        if (stat.isDirectory()) {
            sourcePath = `${sourcePath}/*`;
        }
        const mdStr = yield jsdoc_to_markdown_1.default.render({
            'example-lang': 'javascript',
            files: path_1.default.resolve(process.cwd(), sourcePath),
            'name-format': 'backticks',
            'heading-depth': 2,
            'module-index-format': 'none',
            configure: path_1.default.resolve(process.cwd(), configJ2MPath),
        });
        if (mdStr) {
            fs_extra_1.default.outputFile(path_1.default.resolve(process.cwd(), `${outputPath}/${outputName}.md`), mdStr);
            loading.succeed('Generates Markdown success in ' + `${outputPath}/${outputName}.md`);
        }
    }
    catch (error) {
        loading.fail(`Generates Markdown fail for ${sourcePath}: ${error}`);
    }
});
//# sourceMappingURL=jsdoc-to-md.js.map