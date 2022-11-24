"use strict";
/**
 * @author luciozhang
 * @description js代码由注释生成markdown文件
 */
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
const configJ2VPath = path_1.default.resolve(process.cwd(), 'docs', '.vitepress', 'jsdoc2vitepress.config.json');
const configJ2MPath = path_1.default.resolve(process.cwd(), 'docs', '.vitepress', 'jsdoc2md.config.json');
const jsdocToMd = () => __awaiter(void 0, void 0, void 0, function* () {
    const { markdownDirs } = yield fs_extra_1.default.readJSON(configJ2VPath);
    markdownDirs.forEach((sourceObject) => __awaiter(void 0, void 0, void 0, function* () {
        const { root, output, ingoreList } = sourceObject;
        const fileList = yield fs_extra_1.default.readdir(root);
        fileList.forEach((fileName) => {
            if (ingoreList.indexOf(fileName) === -1) {
                makeMarkDownDoc(fileName, root, output);
            }
        });
    }));
});
exports.jsdocToMd = jsdocToMd;
const makeMarkDownDoc = (sourceName, sourceRootPath, outputPath) => {
    let sourcePath = `${sourceRootPath}/${sourceName}`;
    const outputName = sourceName.replace('.js', '').replace('.ts', '');
    // 处理js文件的路径，需要区分是文件或目录，目录会将目录下所有文件生成为一个md
    const stat = fs_extra_1.default.lstatSync(sourcePath);
    if (stat.isDirectory()) {
        sourcePath = `${sourcePath}/*`;
    }
    console.log('Start Generate Markdowm: ', sourcePath);
    jsdoc_to_markdown_1.default
        .render({
        'example-lang': 'javascript',
        files: path_1.default.resolve(process.cwd(), sourcePath),
        'name-format': 'backticks',
        'heading-depth': 2,
        'module-index-format': 'none',
        configure: path_1.default.resolve(process.cwd(), configJ2MPath),
    })
        .then((mdStr) => {
        // 删除第一行的a标签，要不vueperss生成侧边栏的时候，会出错
        const lines = mdStr.split('\n');
        lines.splice(0, 1);
        const newtext = lines.join('\n');
        // 获取剩下的一行
        fs_extra_1.default.outputFile(path_1.default.resolve(process.cwd(), `${outputPath}/${outputName}.md`), newtext);
        console.log('Success Generate Markdowm: ', sourcePath);
    });
};
//# sourceMappingURL=jsdoc-to-md.js.map